import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

export interface HorizontalLoopOptions {
  draggable?: boolean;
  inertia?: boolean;

  center?: boolean;
  dragSpeed?: number;

  snapToCenter?: boolean;
  snapDuration?: number;
  snapEase?: string;
  navDuration?: number;
  navEase?: string;
  onChange?: (element: HTMLElement, index: number) => void;
}

export interface HorizontalLoopInstance {
  next: (opts?: gsap.TweenVars) => void;
  previous: (opts?: gsap.TweenVars) => void;
  toIndex: (index: number, opts?: gsap.TweenVars) => void;
  current: () => number;

  refresh: () => void;
  destroy: () => void;
}

// ----------------------------------------------------------------------------
// Engine
// ----------------------------------------------------------------------------

export default function horizontalLoop(
  items: HTMLElement[] | NodeListOf<HTMLElement>,
  config: HorizontalLoopOptions = {},
): HorizontalLoopInstance {
  const els = Array.from(items);
  if (els.length === 0) {
    throw new Error("horizontalLoop: at least one item is required.");
  }

  const container = els[0].parentElement;
  if (!container) {
    throw new Error(
      "horizontalLoop: items must be attached to a parent container.",
    );
  }

  if (process.env.NODE_ENV !== "production") {
    const pos = getComputedStyle(container).position;
    if (pos === "static") {
      // eslint-disable-next-line no-console
      console.warn(
        "[horizontalLoop] Container has position: static. Set position: relative " +
          "on it so offsetLeft measurements stay in a stable, predictable frame.",
      );
    }
  }

  const n = els.length;
  const centerMode = config.center !== false;
  const dragSpeed = config.dragSpeed ?? 1;

  // --------------------------------------------------------------------------
  // Live measurement state
  // --------------------------------------------------------------------------

  const centers = new Float64Array(n);
  let totalWidth = 0;

  /** READ PHASE ONLY. Never mutate styles in here (avoids layout thrashing -
   *  all reads happen together, before any writes happen in reposition()). */
  function measure(): void {
    for (let i = 0; i < n; i++) {
      const el = els[i];
      centers[i] = el.offsetLeft + el.offsetWidth / 2;
    }
    const firstLeft = els[0].offsetLeft;
    const lastRight = els[n - 1].offsetLeft + els[n - 1].offsetWidth;
    // Infer the gap between items from the first pair so the wrap seam
    // (last item -> first item) keeps consistent spacing. Falls back to 0
    // for a single item.
    const gap =
      n > 1
        ? Math.max(
            0,
            els[1].offsetLeft - (els[0].offsetLeft + els[0].offsetWidth),
          )
        : 0;
    totalWidth = Math.max(1, lastRight - firstLeft + gap);
  }

  function wrap(d: number, t: number): number {
    if (t <= 0) return 0;
    let r = (d + t / 2) % t;
    if (r < 0) r += t;
    return r - t / 2;
  }

  const setX = els.map(
    (el) => gsap.quickSetter(el, "x", "px") as (v: number) => void,
  );

  let virtualX = 0; // the content-coordinate currently aligned to the focal point
  let lastIndex = -1;

  const HYSTERESIS_PX = 8;

  function reposition(): void {
    measure();
    const focal = centerMode ? container.clientWidth / 2 : 0;

    let globalBestIndex = 0;
    let globalBestAbs = Infinity;
    let currentIndexAbs = Infinity;

    for (let i = 0; i < n; i++) {
      const wrapped = wrap(centers[i] - virtualX, totalWidth);
      const translate = focal - centers[i] + wrapped;
      setX[i](translate);

      const dist = Math.abs(wrapped);
      if (dist < globalBestAbs) {
        globalBestAbs = dist;
        globalBestIndex = i;
      }
      if (i === lastIndex) currentIndexAbs = dist;
    }

    let nextIndex = globalBestIndex;
    if (lastIndex !== -1 && globalBestIndex !== lastIndex) {
      if (globalBestAbs >= currentIndexAbs - HYSTERESIS_PX) {
        nextIndex = lastIndex;
      }
    }

    if (nextIndex !== lastIndex) {
      lastIndex = nextIndex;
      config.onChange?.(els[nextIndex], nextIndex);
    }
  }

  let active = false;
  let idleHandle: ReturnType<typeof setTimeout> | null = null;

  function wake(graceMs = 300): void {
    active = true;
    if (idleHandle) clearTimeout(idleHandle);
    idleHandle = setTimeout(() => {
      active = false;
    }, graceMs);
  }

  function tick(): void {
    if (active) reposition();
  }
  gsap.ticker.add(tick);

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => wake());
    resizeObserver.observe(container);
    els.forEach((el) => resizeObserver!.observe(el));
  }

  // --------------------------------------------------------------------------
  // Navigation (next / previous / toIndex)
  // --------------------------------------------------------------------------
  let navTween: gsap.core.Tween | null = null;
  let settleTween: gsap.core.Tween | null = null;

  function killTransientTweens(): void {
    navTween?.kill();
    settleTween?.kill();
  }

  function navTo(targetIndex: number, opts?: gsap.TweenVars): void {
    const idx = ((targetIndex % n) + n) % n;

    measure();
    const wrapped = wrap(centers[idx] - virtualX, totalWidth);
    const targetVirtualX = virtualX + wrapped;

    killTransientTweens();
    const state = { x: virtualX };
    navTween = gsap.to(state, {
      x: targetVirtualX,
      duration: opts?.duration ?? config.navDuration ?? 0.6,
      ease: opts?.ease ?? config.navEase ?? "power3.inOut",
      onUpdate() {
        virtualX = state.x;
        reposition();
      },
      ...opts,
    });
  }

  function next(opts?: gsap.TweenVars): void {
    navTo(lastIndex + 1, opts);
  }
  function previous(opts?: gsap.TweenVars): void {
    navTo(lastIndex - 1, opts);
  }
  function toIndex(index: number, opts?: gsap.TweenVars): void {
    navTo(index, opts);
  }
  function current(): number {
    return lastIndex;
  }

  /** Animate the nearest item into exact center alignment. Runs after a
   *  drag/throw settles. Uses the same shortest-path wrap math as navTo. */
  function settleToCenter(): void {
    if (config.snapToCenter === false) return;
    measure();

    let bestWrapped = 0;
    let bestAbs = Infinity;
    for (let i = 0; i < n; i++) {
      const wrapped = wrap(centers[i] - virtualX, totalWidth);
      if (Math.abs(wrapped) < bestAbs) {
        bestAbs = Math.abs(wrapped);
        bestWrapped = wrapped;
      }
    }

    killTransientTweens();
    const targetVirtualX = virtualX + bestWrapped;
    const state = { x: virtualX };
    settleTween = gsap.to(state, {
      x: targetVirtualX,
      duration: config.snapDuration ?? 0.5,
      ease: config.snapEase ?? "power3.out",
      onUpdate() {
        virtualX = state.x;
        reposition();
      },
    });
  }

  // --------------------------------------------------------------------------
  // Draggable + Inertia
  // --------------------------------------------------------------------------
  let draggableInstance: Draggable | null = null;
  let proxy: HTMLDivElement | null = null;

  if (config.draggable !== false) {
    proxy = document.createElement("div");
    proxy.style.position = "absolute";
    proxy.style.width = "0px";
    proxy.style.height = "0px";
    proxy.style.opacity = "0";
    proxy.style.pointerEvents = "none";
    container.appendChild(proxy);

    let dragStartVirtualX = 0;
    let dragStartProxyX = 0;

    draggableInstance = Draggable.create(proxy, {
      type: "x",
      trigger: container,
      inertia: config.inertia !== false,
      allowNativeTouchScrolling: false,
      onPress(this: Draggable) {
        killTransientTweens();
        dragStartVirtualX = virtualX;
        dragStartProxyX = this.x;
        wake();
      },
      onDrag(this: Draggable) {
        console.log("??");
        virtualX = dragStartVirtualX - (this.x - dragStartProxyX) * dragSpeed;
        reposition();
      },
      onThrowUpdate(this: Draggable) {
        virtualX = dragStartVirtualX - (this.x - dragStartProxyX) * dragSpeed;
        reposition();
      },
      onRelease(this: Draggable) {
        // If inertia is off (or didn't kick in), settle immediately.
        if (!this.tween) settleToCenter();
      },
      onThrowComplete() {
        settleToCenter();
      },
    })[0];
  }

  // --------------------------------------------------------------------------
  // Public refresh/destroy
  // --------------------------------------------------------------------------
  function refresh(): void {
    wake();
    reposition();
  }

  function destroy(): void {
    gsap.ticker.remove(tick);
    resizeObserver?.disconnect();
    draggableInstance?.kill();
    navTween?.kill();
    settleTween?.kill();
    if (idleHandle) clearTimeout(idleHandle);
    proxy?.remove();
    els.forEach((el) => gsap.set(el, { clearProps: "transform" }));
  }

  measure();
  virtualX = centers[0];
  reposition();
  requestAnimationFrame(() => {
    measure();
    virtualX = centers[0];
    reposition();
  });

  return { next, previous, toIndex, current, refresh, destroy };
}
