"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function RectMask() {
  const [positionX, setPositionX] = useState<number>(100);
  const [width, setWidth] = useState<number>(100);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = event.clientX;
    const maxX = window.innerWidth - 50;

    if (x <= 50) {
      setPositionX(50);
    } else if (x >= maxX) {
      setPositionX(maxX);
    } else {
      setPositionX(x);
    }
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
    <div
      className="relative flex flex-col gap-4 px-16 mb-16 flex-1 overflow-x-clip"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMosueLeave}
      onMouseEnter={handleMosueEnter}
    >
      <div
        className=" absolute top-0 h-screen bg-white opacity-90 transition-width-rect-mask "
        style={{
          mixBlendMode: "difference",
          left: `${positionX}px`,
          width: `${width}px`,
          transform: "translateX(-50%)",
        }}
      ></div>

      <header className=" flex justify-between py-4 border-foreground border-b text-[18px]">
        <h2 className="">Animation For The Win</h2>

        <p>Nice!</p>
      </header>
      <main className=" flex flex-col justify-center  h-full flex-1 gap-8 ">
        <p className="flex gap-4 text-[18px]">
          <span className="text-red-500">01</span> <span>/</span>{" "}
          <span>Signal</span>
        </p>
        <h1 className="text-9xl">
          Designing digital experiences, products, and platforms— from early
          concepts to polished reality.
        </h1>
        <div className="text-xl">
          <p>
            An independent digital practice shaping product thinking, visual
          </p>
          <p>direction and technical execution into working systems.</p>
        </div>
      </main>

      <div>
        <p className="flex items-center gap-2">
          <span className="block w-3 h-3 bg-red-600"></span>Based in Egypt
        </p>
      </div>
    </div>
  );
}
