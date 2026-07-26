"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "../story-timeline/_components/Icons";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger, ScrollSmoother);

export default function ScrollImageReveal() {
  const [index, setIndex] = useState(1);
  const imageContainer = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const contentContainer = useRef<HTMLDivElement | null>(null);
  const imageContainer1 = useRef<HTMLDivElement | null>(null);
  const imageContainer2 = useRef<HTMLDivElement | null>(null);
  const imageContainer3 = useRef<HTMLDivElement | null>(null);
  const imageContainer4 = useRef<HTMLDivElement | null>(null);
  const imageContainer5 = useRef<HTMLDivElement | null>(null);
  const imageContainer6 = useRef<HTMLDivElement | null>(null);
  const image1 = useRef<HTMLImageElement | null>(null);
  const image2 = useRef<HTMLImageElement | null>(null);
  const image3 = useRef<HTMLImageElement | null>(null);
  const image4 = useRef<HTMLImageElement | null>(null);
  const image5 = useRef<HTMLImageElement | null>(null);
  const image6 = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2.5,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });
    const tl = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        start: "top top",
        end: "+=900%",
        pinSpacing: "true",
        scrub: true,
      },
    });

    tl.to(imageContainer3.current, {
      xPercent: 200.5,
    });

    tl.to(
      imageContainer4.current,
      {
        xPercent: 200.5,
      },
      "<",
    );

    tl.to(
      imageContainer5.current,
      {
        xPercent: 200.5,
      },
      "<",
    );

    tl.to(
      imageContainer6.current,
      {
        xPercent: 200.5,
      },
      "<",
    );

    tl.to(
      imageContainer2.current,
      {
        xPercent: 100.5,
      },
      "<",
    );

    tl.to(
      contentContainer.current,
      {
        backgroundColor: "#e7e4df",
      },
      "<",
    );

    const split = SplitText.create(headRef.current, {
      type: "lines",
      mask: "lines",
    });

    tl.from(split.lines, {
      yPercent: 100,
      stagger: 0.15,
      ease: "power4.out",
    });

    tl.to(".appear", {
      opacity: 1,
    });

    tl.fromTo(
      imageContainer1.current,
      {
        clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%)",
        onComplete: () => {
          setIndex(2);
        },

        onReverseComplete: () => {
          setIndex(1);
        },
      },
    );

    tl.to(image1.current, { scale: 1.15 }, "<");

    tl.fromTo(
      imageContainer2.current,
      {
        clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%)",
        onComplete: () => {
          setIndex(3);
        },

        onReverseComplete: () => {
          setIndex(2);
        },
      },
    );

    tl.to(image2.current, { scale: 1.15 }, "<");

    tl.fromTo(
      imageContainer3.current,
      {
        clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%)",
        onComplete: () => {
          setIndex(4);
        },

        onReverseComplete: () => {
          setIndex(3);
        },
      },
    );
    tl.to(image3.current, { scale: 1.15 }, "<");

    tl.fromTo(
      imageContainer4.current,
      {
        clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%)",
        onComplete: () => {
          setIndex(5);
        },

        onReverseComplete: () => {
          setIndex(4);
        },
      },
    );

    tl.to(image4.current, { scale: 1.15 }, "<");

    tl.fromTo(
      imageContainer5.current,
      {
        clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%)",
        onComplete: () => {
          setIndex(6);
        },

        onReverseComplete: () => {
          setIndex(5);
        },
      },
    );

    tl.to(image5.current, { scale: 1.15 }, "<");

    return () => smoother.kill();
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div
          className="bg-[#e7e4df] "
          style={{
            fontFamily: "Poppins",
          }}
          ref={container}
        >
          <header className="  flex justify-between items-center border-b border-black h-12 px-4">
            <p className="text-black">Animation for the win</p>
          </header>

          <main
            className="hidden md:flex relative min-h-[calc(100vh-48px)] bg-[#000000] text-black  "
            ref={contentContainer}
          >
            {/* Main Content */}
            <div className="flex gap-6 justify-between  min-h-[calc(100vh-48px)] w-full flex-2 pb-2 z-7 ">
              <div className="flex flex-col gap-6 justify-between pl-4">
                <div className="flex flex-col">
                  <h1
                    className="text-[70px] min-[1250px]:text-[110px] leading-[90%] font-bold"
                    ref={headRef}
                  >
                    Explore Experiment
                  </h1>
                  <a
                    href="#"
                    className="appear opacity-0 flex justify-between w-80 border-t border-t-black pt-2 mt-8"
                  >
                    <span className="text-sm">Learn More</span>
                    <Arrow direction="right" width={20} height={20} />
                  </a>
                </div>
                <p className="appear opacity-0 text-sm">
                  Animation for the win
                </p>
              </div>

              <div className="flex flex-col justify-between items-start text-[14] pr-4 pt-2">
                <p className="appear opacity-0 flex gap-1  text-[14]">
                  <span>{index}</span> <span>-</span> <span>6</span>
                </p>
                <div className="appear opacity-0 flex flex-col min-[900px]:flex-row  self-end items-start justify-end gap-4 ">
                  <h6 className="text-[14]  flex gap-1 font-medium w-fit">
                    <span>[06]</span>
                    <span>Featured</span>:
                  </h6>
                  <div className="flex flex-col gap-2 text-[14] ">
                    <p className="font-medium">Name:</p>
                    <ul className="flex flex-col gap-0">
                      <li
                        className={`${index === 1 ? "opacity-100" : "opacity-60"} transition-opacity leading-3.5`}
                      >
                        Suprematista
                      </li>
                      <li
                        className={`${index === 2 ? "opacity-100" : "opacity-60"} transition-opacity leading-3.5`}
                      >
                        Buntesglas
                      </li>
                      <li
                        className={`${index === 3 ? "opacity-100" : "opacity-60"} transition-opacity leading-3.5`}
                      >
                        Vierensee
                      </li>
                      <li
                        className={`${index === 4 ? "opacity-100" : "opacity-60"} transition-opacity leading-3.5`}
                      >
                        Vierensee
                      </li>
                      <li
                        className={`${index === 5 ? "opacity-100" : "opacity-60"} transition-opacity leading-3.5`}
                      >
                        Sesselbaa
                      </li>
                      <li
                        className={`${index === 6 ? "opacity-100" : "opacity-60"} transition-opacity leading-3.5`}
                      >
                        Salzfeld
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="font-medium opacity-0 appear">©2026</p>
              </div>
            </div>

            {/* Stacked Images */}
            <div
              className="w-full flex-1 flex flex-row-reverse gap-px  min-h-[calc(100vh-48px)]"
              ref={imageContainer}
            >
              <div
                className="relative w-full shrink-0  h-full z-6 overflow-hidden"
                ref={imageContainer1}
              >
                <Image
                  src="/scroll-image-reveal/building1.webp"
                  alt="building 1"
                  ref={image1}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="relative w-full shrink-0  h-full z-5 overflow-hidden"
                ref={imageContainer2}
              >
                <Image
                  src="/scroll-image-reveal/building2.webp"
                  alt="building 2"
                  ref={image2}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full shrink-0  h-full ">
                <div
                  ref={imageContainer3}
                  className="absolute top-0 left-0 w-full h-full z-4 overflow-hidden"
                >
                  <Image
                    src="/scroll-image-reveal/building3.webp"
                    alt="building 3"
                    fill
                    ref={image3}
                    className="object-cover z-4"
                  />
                </div>
                <div
                  ref={imageContainer4}
                  className="absolute top-0 left-0 w-full h-full z-3 overflow-hidden"
                >
                  <Image
                    src="/scroll-image-reveal/building4.webp"
                    alt="building 4"
                    fill
                    ref={image4}
                    className="object-cover z-3"
                  />
                </div>
                <div
                  ref={imageContainer5}
                  className="absolute top-0 left-0 w-full h-full z-2 overflow-hidden"
                >
                  <Image
                    src="/scroll-image-reveal/building5.webp"
                    alt="building 5"
                    ref={image5}
                    fill
                    className="object-cover z-2"
                  />
                </div>
                <div
                  ref={imageContainer6}
                  className="absolute top-0 left-0 w-full h-full z-1 overflow-hidden"
                >
                  <Image
                    src="/scroll-image-reveal/building6.webp"
                    alt="building 6"
                    ref={image6}
                    fill
                    className="object-cover z-1"
                  />
                </div>
              </div>
            </div>
          </main>

          <h1 className="md:hidden flex items-center justify-center text-5xl min-h-screen text-black">
            Open From Descktop
          </h1>
        </div>

        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-9xl">GG EZ</h1>
        </div>
      </div>
    </div>
  );
}
