"use client";
import Noise from "./_components/Noise";
import { BackNetSVG, NetSVG, BacketballSVG } from "./_components/Icons";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function BasketballNetScroll() {
  const conatiner = useRef<HTMLDivElement | null>(null);
  const ball = useRef<SVGSVGElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: conatiner.current,
          start: "top top",
          end: "+=1000vh",
          pin: true,
          scrub: true,
        },
      });

      tl.to(ball.current, {
        y: window.innerHeight - 100,
        duration: 3,
      });

      tl.to(conatiner.current, {
        backgroundColor: "#88080899",
        duration: 1,
      });

      tl.to(conatiner.current, {
        backgroundColor: "#111111",
        duration: 1,
      });

      tl.to(content.current, {
        opacity: 1,
        duration: 2,
      });
    });
  });

  return (
    <>
      <div
        className="relative min-h-screen w-full bg-[#111111] overflow-clip"
        ref={conatiner}
      >
        <main className="relative z-6 flex flex-col gap-8 lg:gap-32 mx-4 md:mx-6 lg:mx-16">
          <h1 className="text-[#F0EBE1] text-left lg:text-center text-6xl pt-16 flex-1">
            How the night began
          </h1>

          <div
            className="flex flex-col gap:4 lg:gap-64 lg:flex-row justify-between items-center  lg:opacity-0"
            ref={content}
          >
            <div className="flex flex-col gap-4">
              <p className="text-[#f0ebe173] text-sm uppercase tracking-widest  ">
                First Basketball of the night
              </p>
              <h2 className="italic text-[#F0EBE1] text-9xl">Siwsh.</h2>
              <p className="text-[#f0ebe173] text-sm">
                No rim. No backboard. Just net.
              </p>
              <p className="text-[#f0ebe173] text-sm">
                His first basket was a{" "}
                <em className="text-[#F0EBE1]">
                  turnaround fadeaway jump shot.
                </em>
                A 2-point play that nobody in Kaseya Center could have known was
                the opening note of something historic.
              </p>
            </div>

            <div className="w-full border mt-4 lg:mt-0 border-[#43434373]">
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://www.youtube.com/embed/MhrkZNTfSAM?autoplay=1&mute=1&controls=0&loop=1&playlist=MhrkZNTfSAM&playsinline=1&rel=0"
                  title="YouTube video player"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </main>

        {/* Ball */}

        <BacketballSVG
          width={150}
          height={150}
          ref={ball}
          classes="absolute -top-40 left-[50%] -translate-x-[50%] z-4 opacity-0 lg:opacity-100"
        />

        {/* Net */}
        <div className="absolute bottom-0 left-0 flex flex-col items-end w-full opacity-0 lg:opacity-100">
          <BackNetSVG
            width={520}
            height={400}
            classes="absolute bottom-32 left-[50%] -translate-x-[50%] "
          />
          <NetSVG
            width={550}
            height={450}
            classes="absolute bottom-0 left-[50%] -translate-x-[50%] z-[7]"
          />
        </div>

        {/* Noise Background */}
        <div className="absolute top-0 left-0 w-full h-full z-4">
          <Noise
            patternSize={250}
            patternScaleX={2}
            patternScaleY={2}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>
      </div>

      {/*  Dummy Content */}
      <div className="min-h-screen "></div>
      <div className="min-h-screen hidden lg:block"></div>
    </>
  );
}
