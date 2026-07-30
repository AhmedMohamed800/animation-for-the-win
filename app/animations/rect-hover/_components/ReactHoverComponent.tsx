"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode, useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function ReactHoverComponent({
  children,
  color = "0000FF",
}: {
  children: ReactNode;
  color: string;
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

  const handlePointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target;

    if (
      !(target instanceof HTMLDivElement) ||
      !target.classList.contains("box")
    ) {
      return;
    }

    const targets: HTMLDivElement[] = [target];

    const next = target.nextElementSibling as HTMLDivElement | null;

    if (next && Number(next.dataset.column) !== 1) {
      targets.push(next);
    }

    for (const box of targets) {
      box.classList.remove("flash");

      // Force reflow so the animation can restart
      void box.offsetWidth;

      box.classList.add("flash");
    }
  };

  return (
    <div className="relative w-full h-full">
      {children}
      {/*  */}
      <div
        className="absolute top-0 left-0 w-full h-full grid overflow-clip"
        style={{
          gridTemplateColumns: `repeat( auto-fit, minmax(${cubeSize}px, 1fr) )`,
        }}
        ref={grid}
        onPointerOver={handlePointerOver}
      >
        {Array.from({
          length:
            Math.ceil(coordination.width / cubeSize) *
            Math.ceil(coordination.height / cubeSize),
        }).map((ele, index: number) => {
          return (
            <div
              key={index}
              className={`box `}
              data-row={
                (index % Math.floor(coordination.height / cubeSize)) + 1
              }
              data-column={
                (index % Math.floor(coordination.width / cubeSize)) + 1
              }
              style={{
                height: cubeSize,
                opacity: 0,
                backgroundColor: color,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
