"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CorrectIcon, FirstLine, SecondLine } from "./_components/Icons";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  useGSAP,
  ScrollSmoother,
  ScrollTrigger,
  DrawSVGPlugin,
  SplitText,
);

export default function SvgMovingLine() {
  const firstContainer = useRef<HTMLDivElement | null>(null);
  const secondContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    const firstTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: firstContainer.current,
        start: "top 90%",
        toggleActions: "play reset play reset",
      },
    });

    const splitHead = SplitText.create(".headText", {
      type: "lines",
      mask: "lines",
    });

    const splitPara = SplitText.create(".paraText", {
      type: "lines",
      mask: "lines",
    });

    firstTimeLine
      .from(splitHead.lines, { y: 40 })
      .from("#FirstLine", { drawSVG: "100% 100%" })
      .from(splitPara.lines, { y: 30, stagger: 0.1 });

    const secondTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: secondContainer.current,
        start: "-40% top",
        toggleActions: "play reset play reset",
      },
    });
    secondTimeLine
      .from("#SecondLine", {
        drawSVG: "0% 0%",
        ease: "power2.out",
        duration: 2,
      })
      .from(
        ".koshari",
        {
          scale: 0.6,
          ease: "power2.out",
          duration: 2,
        },
        "<",
      );
    return () => {
      smoother.kill();
    };
  });

  return (
    <div id="smooth-content" className="">
      <div
        id="wrapper"
        style={{
          fontFamily: "Poppins",
        }}
      >
        <div className=" flex items-center justify-center  min-h-screen bg-white">
          <h2 className=" text-5xl text-black">Scroll Down</h2>
        </div>
        <div className="min-h-screen bg-[#f4f1eb]">
          <div className="bg-[#f4f1eb] h-70 w-full"></div>
          <main className="flex flex-col items-center overflow-hidden">
            <div
              className="flex flex-col gap-12 mx-auto text-center text-black max-w-250 mb-32"
              ref={firstContainer}
            >
              <h1 className="headText text-4xl font-medium">
                Why Animation For The Win?
              </h1>
              <div className="mx-auto">
                <FirstLine />
              </div>
              <p className="paraText font-light text-[16px]  leading-[180%]">
                Animation isn&lsquo;t just about making things
                move&lsquo;it&lsquo;s about creating memorable experiences.
                Every recreation in this series breaks down a real-world
                interaction, explores the techniques behind it, and rebuilds it
                from scratch using modern web technologies.
              </p>
            </div>

            <div
              className="flex flex-col justify-between relative  w-full  min-h-187.5 px-24 max-w-360"
              ref={secondContainer}
            >
              <div className="flex justify-between w-full">
                <article className="relative z-3 flex gap-4 bg-white rounded-xl items-start px-6 py-6 w-100 ">
                  <div className=" bg-amber-300 w-fit p-1.5 mt-0.5 rounded-full">
                    <CorrectIcon color="blue" width={12} height={12} />
                  </div>
                  <div className="flex flex-col gap-1 text-black">
                    <h3 className="text-[18px] font-bold">
                      Learn by Recreating
                    </h3>
                    <p className="text-[16px] font-light">
                      Every animation is rebuilt from scratch to understand how
                      it works.
                    </p>
                  </div>
                </article>
                <article className="flex gap-4 bg-white rounded-xl items-start px-6 py-6 w-100 translate-y-20">
                  <div className=" bg-amber-300 w-fit p-1.5 mt-0.5 rounded-full">
                    <CorrectIcon color="blue" width={12} height={12} />
                  </div>
                  <div className="flex flex-col gap-2 text-black">
                    <h3 className="text-[18px] font-bold">
                      Modern Web Animations
                    </h3>
                    <p className="text-[16px] font-light">
                      Built with GSAP, React, and Next.js for smooth, performant
                      interactions.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex justify-between w-full">
                <article className="flex gap-4 bg-white rounded-xl items-start px-6 py-6 w-100 -translate-y-20 translate-x-15">
                  <div className=" bg-amber-300 w-fit p-1.5 mt-0.5 rounded-full">
                    <CorrectIcon color="blue" width={12} height={12} />
                  </div>
                  <div className="flex flex-col gap-1 text-black">
                    <h3 className="text-[18px] font-bold">
                      Real-World Inspiration
                    </h3>
                    <p className="text-[16px] font-light">
                      Inspired by award-winning websites and creative digital
                      experiences.
                    </p>
                  </div>
                </article>
                <article className="relative z-6 flex gap-4 bg-white rounded-xl items-start px-6 py-6 w-100 -translate-x-15">
                  <div className=" bg-amber-300 w-fit p-1.5 mt-0.5 rounded-full">
                    <CorrectIcon color="blue" width={12} height={12} />
                  </div>
                  <div className="flex flex-col gap-2 text-black">
                    <h3 className="text-[18px] font-bold">
                      Open Source Examples
                    </h3>
                    <p className="text-[16px] font-light">
                      Explore the source code, and use the techniques in your
                      projects.
                    </p>
                  </div>
                </article>
              </div>

              {/* Second Line */}
              <div className="absolute z-2 -left-20 top-0 mx-auto  w-full h-full ">
                <SecondLine />
              </div>
              {/* Plate */}
              <div className="absolute koshari image-container z-5 left-[50%] top-20 translate-x-[-50%]  w-fit h-fit ">
                <Image
                  src="/svg-moving-line/Koshari.png"
                  alt="Koshari"
                  className="wrap-image "
                  width={620}
                  height={620}
                />
              </div>
              {/* onion 1 */}
              <div
                className="absolute  z-5 right-0  top-[50%] translate-y-[-50%]   w-fit h-fit "
                data-lag="0.1"
              >
                <Image
                  src="/svg-moving-line/onion.png"
                  alt="onion 1"
                  className=""
                  width={150}
                  height={150}
                />
              </div>
              {/* onion 2 */}
              <div
                className="absolute  z-5 left-0  top-[50%] translate-y-[-50%]   w-fit h-fit "
                data-lag="0.1"
              >
                <Image
                  src="/svg-moving-line/onion.png"
                  alt="onion 2"
                  width={250}
                  height={250}
                />
              </div>
              {/* onion 3 */}
              <div
                className="absolute  z-5 right-[30%]  -top-20    w-fit h-fit "
                data-lag="0.1"
              >
                <Image
                  src="/svg-moving-line/onion.png"
                  alt="onion 3"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </main>
          <div className="bg-[#f4f1eb] h-70 w-full"></div>
        </div>
        <div className="flex items-center justify-center  min-h-screen bg-white">
          <h2 className=" text-5xl text-black">Scroll Up</h2>
        </div>
      </div>
    </div>
  );
}
