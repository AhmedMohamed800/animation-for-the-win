"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function ReactHoverComponent({
  children,
}: {
  children: ReactNode;
}) {
  const grid = useRef<HTMLDivElement | null>(null);
  const [coordination, setCoordination] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const cubeSize = 20;

  useEffect(() => {
    if (!grid.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setCoordination({
        width,
        height,
      });
    });

    observer.observe(grid.current);

    return () => observer.disconnect();
  }, []);

  const { contextSafe } = useGSAP({ scope: grid });

  const mouseOverGrid = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target;

    if (
      !(target instanceof HTMLDivElement) ||
      !target.classList.contains("box")
    )
      return;

    const next = target.nextElementSibling as HTMLDivElement | null;

    const targets: HTMLDivElement[] = [target];

    if (next && Number(next.dataset.column) !== 1) {
      targets.push(next);
    }

    gsap.killTweensOf(targets);

    gsap.fromTo(
      targets,
      {
        opacity: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.25,
      },
    );
  });

  return (
    <div className="relative w-full h-full">
      {children}
      {/*  */}
      <div
        className="absolute top-0 left-0   w-full h-full grid   overflow-clip"
        style={{
          gridTemplateColumns: `repeat( auto-fit, minmax(${cubeSize}px, 1fr) )`,
        }}
        ref={grid}
        onMouseMove={mouseOverGrid}
      >
        {Array.from({
          length:
            Math.ceil(coordination.width / cubeSize) *
            Math.ceil(coordination.height / cubeSize),
        }).map((ele, index: number) => {
          return (
            <div
              key={index}
              className="box bg-blue-600"
              data-row={
                (index % Math.floor(coordination.height / cubeSize)) + 1
              }
              data-column={
                (index % Math.floor(coordination.width / cubeSize)) + 1
              }
              style={{
                height: cubeSize,
                opacity: 0,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
