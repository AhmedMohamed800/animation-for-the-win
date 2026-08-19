"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import Flip from "gsap/Flip";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, Flip);

export default function GridShift() {
  const container = useRef<HTMLDivElement | null>(null);
  const mainSection = useRef<HTMLDivElement | null>(null);
  const imagesContainer = useRef<HTMLDivElement | null>(null);
  const firstSection = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.kill();
    };
  });

  useGSAP(
    () => {
      const imageElements = gsap.utils.toArray(
        '[data-element="image-container"]',
      ) as HTMLDivElement[];

      const state = Flip.getState(imageElements);

      imageElements.forEach((imageElement) => {
        mainSection.current?.appendChild(imageElement);
      });

      const flipAnimation = Flip.from(state, {
        duration: 2,
        ease: "expo.inOut",
        easeReverse: "power1.out",
        stagger: {
          amount: 0.05,
        },
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=600vh",
        scrub: true,
        animation: flipAnimation,
      });

      function resizeWindow() {
        window.location.reload();
      }

      window.addEventListener("resize", resizeWindow);

      return () => {
        window.removeEventListener("resize", resizeWindow);
      };
    },
    { scope: container },
  );

  return (
    <div
      id="smooth-wrapper"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div id="smooth-content" ref={container}>
        <section
          className="flex flex-col justify-between text-black bg-white min-h-screen pt-12  pb-0"
          ref={firstSection}
        >
          <div className="flex justify-between  px-8">
            <h1 className="text-4xl lg:text-6xl">
              Animation for the win is here all the time and in anytime
            </h1>
          </div>
          <div className="flex gap-4" ref={imagesContainer}>
            <div
              className=" relative flex-1 h-100"
              data-element="image-container"
            >
              <Image
                src="/scroll-columns/night1.png"
                alt="night-1"
                fill
                sizes="100"
                className="object-cover"
              />
            </div>
            <div
              className="relative flex-1 h-100"
              data-element="image-container"
            >
              <Image
                src="/scroll-columns/night2.jpg"
                alt="night-2"
                fill
                sizes="100"
                className="object-cover"
              />
            </div>
            <div
              className="relative flex-1 h-100"
              data-element="image-container"
            >
              <Image
                src="/scroll-columns/sun1.jpg"
                alt="sun1"
                fill
                sizes="100"
                className="object-cover"
              />
            </div>
            <div
              className="relative flex-1 h-100"
              data-element="image-container"
            >
              <Image
                src="/scroll-columns/flowers.png"
                alt="flowers"
                fill
                sizes="100"
                className="object-cover"
              />
            </div>
            <div
              className="relative flex-1 h-100"
              data-element="image-container"
            >
              <Image
                src="/scroll-columns/sun3.jpg"
                alt="sun3"
                fill
                sizes="100"
                className="object-cover"
              />
            </div>
            <div
              className="relative flex-1 h-100"
              data-element="image-container"
            >
              <Image
                src="/scroll-columns/valley.png"
                alt="night-1"
                fill
                sizes="100"
                className="object-cover"
              />
            </div>
          </div>
        </section>
        <main
          ref={mainSection}
          className="main grid bg-gray-100 h-full gap-4 px-4 py-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          }}
        ></main>
      </div>
    </div>
  );
}
