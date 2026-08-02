"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger);

export default function ScrollHorizontalShift() {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const firstContainerChild = useRef<HTMLDivElement | null>(null);
  const secondContainer = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

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
        trigger: wrapper.current,
        pin: true,
        start: "top top",
        end: "+=1500vh",
        scrub: true,
        pinSpacing: true,
      },
    });

    timeline.current
      .to(secondContainer.current, {
        xPercent: -100,
        duration: 2,
      })
      .fromTo(
        ".reveal-image-container",
        {
          clipPath: "polygon(100% 0%, 100% 100%, 30% 100%, 30% 0%);",
          left: -300,
        },
        {
          clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)",
          duration: 2,
          left: 0,
        },
        "<",
      )
      .to(
        firstContainerChild.current,
        {
          xPercent: -100,
          duration: 0.8,
        },
        "<1.22",
      )
      .to(".reveal-image", {
        yPercent: -100,
        duration: 1,
      });

    return () => smoother.kill();
  });

  return (
    <div
      id="smooth-wrapper"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div id="smooth-content" className="overflow-hidden">
        <div id="wrapper" className="w-[200vw] " ref={wrapper}>
          <div className="flex min-h-screen ">
            <div className="flex w-screen bg-white">
              <div
                className="relative z-2 flex flex-col w-[80%]"
                ref={firstContainerChild}
              >
                <div className="relative flex-3 h-full w-full bg-black">
                  <Image
                    src="/scroll-image-reveal/building1.webp"
                    alt="building1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative flex-3 h-full w-full bg-black">
                  <Image
                    src="/scroll-image-reveal/building2.webp"
                    alt="building1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-2 items-center justify-center h-full w-full bg-blue-300">
                  <h3 className="text-3xl text-black font-light">View all</h3>
                </div>
              </div>
              <div className="flex flex-col justify-center text-black px-10 gap-8">
                <h2 className="flex flex-col w-full text-5xl font-medium uppercase">
                  <span>Who said</span>
                  <div className="flex gap-12">
                    <span>That the</span>
                    <span>pleasure</span>
                  </div>
                  <span className="self-end">It just can&lsquo;t be</span>{" "}
                  <span className="self-end">Functiona</span>
                </h2>
                <p className="text-[18px] font-light">
                  We create spaces that don&lsquo;t follow trends, but instead
                  embrace craftsmanship, local workshops, sustainability, and
                  the enjoyment of their occupants. Spaces of calm, but also
                  spaces to share.
                </p>
              </div>
            </div>
            <div
              className="w-screen flex items-center justify-center bg-pink-600"
              ref={secondContainer}
            >
              <div className="reveal-image-container relative overflow-hidden w-[65%] h-[70%] rounded-sm">
                <div className="relative w-full h-full bg-fixed">
                  <Image
                    src="/scroll-image-reveal/building3.webp"
                    alt="building1"
                    fill
                    className="object-cover rounded-sm "
                  />
                </div>
                <div className="reveal-image -top-full relative w-full h-full">
                  <Image
                    src="/scroll-image-reveal/building4.webp"
                    alt="building1"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen w-full bg-amber-100">
          <h1 className="text-black text-6xl font-medium">
            Animation For The Win
          </h1>
        </div>
      </div>
    </div>
  );
}
