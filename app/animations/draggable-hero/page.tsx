"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

export default function DraggableHero() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const draggableElements = gsap.utils.toArray<HTMLElement>(".draggable");

      Draggable.create(".draggable", {
        bounds: container.current,
        inertia: true,
        edgeResistance: 0.6,
        onPress: (self) => {
          draggableElements.forEach((element: HTMLElement) => {
            element.classList.remove("draggableActive");
          });

          if (!self.target.getAttribute("data-label")) {
            self.target.parentElement.classList.add("draggableActive");
          } else {
            self.target.classList.add("draggableActive");
          }
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      className=" relative"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div
        className="flex gap-4 overflow-hidden  justify-center items-center  bg-[#f5f5f4] min-h-dvh sticky top-0 z-1 text-black"
        ref={container}
      >
        <div className="flex flex-col gap-6 max-w-230">
          <div className="flex gap-8 items-center" id="first_row">
            <h2 className="draggable text-8xl font-light" data-label="Text">
              Animation
            </h2>
            <p className="draggable text-[16px]" data-label="Text">
              Every recreation in this series breaks down a real-world
              interaction, explores the techniques behind it, and rebuilds it
              from scratch using modern web technologies.
            </p>
          </div>
          <h2
            className="draggable text-8xl font-light  self-center"
            data-label="Text"
          >
            For The
          </h2>

          <h2 className="draggable text-8xl font-light" data-label="Text">
            Win ^_^
          </h2>

          <div
            className="draggable flex flex-col gap-2 self-center translate-y-20"
            data-label="Group"
          >
            <button className="bg-black text-white rounded-full py-2 px-4">
              Go to Know me
            </button>
            <p className="text-center text-gray-400 text-sm">or scroll down</p>
          </div>
        </div>

        {/* background */}
        <div className="flex absolute top-0 left-0 w-full z-[-1] h-full">
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
          <div className="flex-1 border-r border-r-gray-200"></div>
        </div>
      </div>
      <div className="flex justify-center items-center font-medium bg-[#ffffff] min-h-dvh relative z-2 text-black">
        <h2 className="text-6xl lg:text-9xl">Cool Right?</h2>
      </div>
    </div>
  );
}
