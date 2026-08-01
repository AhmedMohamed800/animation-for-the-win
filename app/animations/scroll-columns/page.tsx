"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function ScrollColumns() {
  const cardsContainer = useRef<HTMLDivElement | null>(null);
  const containerElement = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const Header = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    timeline.current = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: cardsContainer.current,
        pin: true,
        start: "top 90%",
        end: "+=1500vh bottom",
        scrub: true,
        pinSpacing: true,
      },
    });

    timeline.current

      .from(Header.current, { yPercent: -1200, skewY: 0.4 }, "<")
      .from(cardsContainer.current, { scale: 1.5 }, "<")
      .to(".middle", { y: -1100 }, "<")
      .to(".item", { y: -1000 }, "<")
      .to(Header.current, { yPercent: 700, skewY: 0.4 });

    return () => smoother.kill();
  });

  return (
    <div
      id="smooth-wrapper"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div id="smooth-content">
        <div className="text-white text-6xl bg-black flex items-center justify-center min-h-screen">
          Scroll Down
        </div>
        <div
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
          ref={containerElement}
        >
          <h1
            className="text-center text-5xl lg:text-7xl font-bold uppercase relative  z-100"
            ref={Header}
          >
            Animation For The Win
          </h1>
          <div className="absolute top-0 left-0 h-full z-10 w-full bg-black opacity-60"></div>

          {/* Elements */}
          <div
            className="absolute top-0 left-0 flex h-[150dvh] w-full justify-between gap-4 px-4"
            ref={cardsContainer}
          >
            <div className="item hidden lg:flex flex-col w-full h-full gap-4 -translate-y-36">
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/camera.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/dinner.jpg"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/drink.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1 ">
                <Image
                  src="/scroll-columns/flowers.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="middle flex flex-col w-full  h-full gap-4">
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/food.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/healthy.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/night1.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1 ">
                <Image
                  src="/scroll-columns/night2.jpg"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="item flex flex-col w-full  h-full gap-4 -translate-y-36">
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/sun1.jpg"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/sun2.jpg"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1">
                <Image
                  src="/scroll-columns/sun3.jpg"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full flex-1 ">
                <Image
                  src="/scroll-columns/valley.png"
                  alt="camera"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-white text-6xl bg-black flex items-center justify-center min-h-screen">
          Scroll UP
        </div>
      </div>
    </div>
  );
}
