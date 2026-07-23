"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function RectMask() {
  const [width, setWidth] = useState<number>(1);

  const rectRef = useRef<HTMLDivElement>(null);
  const rectContainer = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    xTo.current = gsap.quickTo(rectRef.current!, "left", {
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (width === 1) {
      setWidth(100);
    }
    const x = Math.max(50, Math.min(event.clientX, window.innerWidth - 50));

    xTo.current?.(x);
  };

  const handleMosueLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setWidth(1);
    event.preventDefault();
  };

  const handleMosueEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setWidth(100);
    event.preventDefault();
  };

  return (
    <>
      <div
        className="relative min-h-full flex flex-col gap-4 px-16 pb-16 flex-1 overflow-x-clip"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMosueLeave}
        onMouseEnter={handleMosueEnter}
        ref={rectContainer}
      >
        <div
          className=" absolute top-0 h-screen bg-white opacity-90 transition-width-rect-mask "
          ref={rectRef}
          style={{
            mixBlendMode: "difference",
            width: `${width}px`,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></div>

        <header className=" flex justify-between py-4 border-foreground border-b text-[18px]">
          <h2 className="">Animation For The Win</h2>

          <p>Nice!</p>
        </header>
        <main className=" flex flex-col justify-center  h-full flex-1 gap-8 ">
          <p className="flex gap-4 text-[clamp(0.9rem,0.8rem+0.3vw,1.125rem)]">
            <span className="text-blue-600">01</span> <span>/</span>{" "}
            <span>Signal</span>
          </p>
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] max-w-6xl">
            Designing digital experiences, products, and platforms— from early
            concepts to polished reality.
          </h1>
          <div className="text-[clamp(1rem,0.9rem+0.6vw,1.25rem)] leading-relaxed">
            <p>
              An independent digital practice shaping product thinking, visual
            </p>
            <p>direction and technical execution into working systems.</p>
          </div>
        </main>

        <div>
          <p className="flex items-center gap-2">
            <span className="block w-3 h-3 bg-blue-600"></span>Based in Egypt
          </p>
        </div>
      </div>
    </>
  );
}
