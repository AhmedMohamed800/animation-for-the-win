"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Arrow } from "./_components/Icons";
import { useRef, useState } from "react";
import horizontalLoop from "./_helpers/horizontalLoop";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(useGSAP, Observer);

export default function StotyTimeline() {
  const container = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      year: 1935,
      title: "The Big Idea",
      description: "Started with a sketch on the back of a receipt.",
    },
    {
      year: 1938,
      title: "First Customer",
      description: "Paid with cash and unsolicited advice.",
    },
    {
      year: 1947,
      title: "Things Got Serious",
      description: "Someone suggested keeping records. Wild concept.",
    },
    {
      year: 1954,
      title: "Office Upgrade",
      description: "We finally got a chair that didn't squeak.",
    },
    {
      year: 1969,
      title: "Dreaming Bigger",
      description: "Turns out aiming for the moon wasn't just a metaphor.",
    },
    {
      year: 1991,
      title: "Hello, Internet",
      description: "The modem song became our national anthem.",
    },
    {
      year: 2009,
      title: "Going Digital",
      description: "The filing cabinet has never recovered.",
    },
    {
      year: 2013,
      title: "Fresh Coat of Paint",
      description: "Same team. Slightly cooler logo.",
    },
    {
      year: 2015,
      title: "Coffee Budget Doubled",
      description: "Coincidentally, so did productivity.",
    },
    {
      year: 2018,
      title: "Oops, It Worked",
      description: "We honestly didn't expect Plan B to become Plan A.",
    },
    {
      year: 2021,
      title: "Remote Everything",
      description: "Pets became unofficial team members.",
    },
    {
      year: 2022,
      title: "Back Together",
      description: "Turns out people are taller than profile pictures.",
    },
    {
      year: 2025,
      title: "The Story Continues",
      description: "We're still pretending the roadmap is under control.",
    },
  ];
  const totalTicks = (items.length - 1) * 5 + 1;

  const loopRef = useRef<ReturnType<typeof horizontalLoop> | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const boxes = gsap.utils.toArray<HTMLElement>(container.current.children);

      loopRef.current = horizontalLoop(boxes, {
        paused: true,
      });

      const radius = 1200;

      gsap.ticker.add(updateArc);

      function updateArc() {
        const center = window.innerWidth / 2;

        boxes.forEach((box) => {
          const rect = box.getBoundingClientRect();

          const dx = rect.left + rect.width / 2 - center;

          const x = gsap.utils.clamp(-radius + 1, radius - 1, dx);

          const y = radius - Math.sqrt(radius * radius - x * x);

          const rotation = (x / radius) * 35;

          gsap.set(box, {
            y,
            rotation,
            transformOrigin: "center center",
          });
        });
      }

      let animating = false;

      const observer = Observer.create({
        target: window,
        type: "wheel,touch",
        wheelSpeed: 1,

        onDown: () => {
          if (animating) return;
          animating = true;
          loopRef.current?.next({
            duration: 0.6,
            ease: "power2.out",
            onStart: () => {
              setCurrentIndex(loopRef.current?.current());
            },
            onComplete: () => {
              animating = false;
            },
          });
        },

        onUp: () => {
          if (animating) return;

          animating = true;
          loopRef.current?.previous({
            duration: 0.6,
            ease: "power2.out",
            onStart: () => {
              setCurrentIndex(loopRef.current?.current());
            },
            onComplete: () => {
              animating = false;
            },
          });
        },
      });

      return () => {
        gsap.ticker.remove(updateArc);
        observer.kill();
      };
    },
    { scope: container },
  );

  const handleBoxClick = (index: number) => {
    console.log(index, loopRef.current?.current());
    loopRef.current?.toIndex(index - 1, {
      duration: 0.6,
      ease: "power2.out",
    });

    setCurrentIndex(loopRef.current?.current());
  };

  const handleNext = () => {
    loopRef.current?.next({
      duration: 0.6,
      ease: "power2.out",
    });

    setCurrentIndex(loopRef.current?.current());
  };

  const handlePrev = () => {
    loopRef.current?.previous({
      duration: 0.5,
      ease: "power1.inOut",
      overwrite: true,
    });
    setCurrentIndex(loopRef.current?.current());
  };

  return (
    <div className="relative flex flex-col bg-[#e4e6e7] min-h-screen overflow-clip">
      <main className="relative flex items-center pb-24 lg:pb-46  z-5 flex-1 gap-3">
        <svg
          className="absolute z-3  -top-23 w-full h-full   pointer-events-none"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
        >
          <path
            d="M-40 260 Q480  15 1000 243"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>

        <div ref={container} className="flex gap-0 items-center">
          {items.map((item, index) => (
            <div
              key={item.year}
              className="realtive z-6 flex flex-col gap-2  justify-center items-center w-[15%] min-[480px]:w-[20%]! sm:w-[33%]! min-[800px]:w-[calc(100%/3)]!  lg:w-[calc(100%/3)]! shrink-0  "
            >
              <span
                className={`block h-3 w-3 ${(currentIndex + 1) % items.length === index ? "bg-[#61686b]" : "bg-white animate-pulse"} rounded-full cursor-pointer`}
                onClick={() => handleBoxClick(index)}
              ></span>
              <h2 className={`text-[#61686b] font-bold text-3xl`}>
                {item.year}
              </h2>
              <p
                className={`text-[#61686b] font-light text-center transition-story-timeline ${(currentIndex + 1) % items.length === index ? "opacity-0" : "opacity-100"}`}
              >
                {item.title}
              </p>

              <div className=" absolute translate-y-50 flex text-center flex-col gap-3 ">
                <h3
                  className={`text-[#61686b] text-3xl mb-4  font-light  transition-story-timeline ${(currentIndex + 1) % items.length === index ? "opacity-100" : "opacity-0"} `}
                >
                  {item.year}
                </h3>
                <p
                  className={`text-[#73848c] text-5xl leading-[110%] uppercase font-extralight w-full  transition-story-timeline ${(currentIndex + 1) % items.length === index ? "opacity-100" : "opacity-0"} `}
                >
                  {item.title}
                </p>
                <p
                  className={`text-black text-[18px] mt-1  transition-story-timeline ${(currentIndex + 1) % items.length === index ? "opacity-100" : "opacity-0"} `}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="relative z-5 flex items-center gap-2 self-center text-sm mb-12 bg-[#cdd7dc] rounded-full p-0.5">
        <button
          className="flex justify-center items-center gap-0.5 text-black bg-[#ffffff80]  rounded-full px-4 h-10 cursor-pointer"
          onClick={handlePrev}
        >
          <Arrow direction="left" width={16} height={16} /> Back
        </button>

        <div className="relative flex-1 h-10  w-100">
          {/* Tick marks */}
          <div className="absolute inset-0 flex items-center justify-between">
            {Array.from({ length: totalTicks }).map((_, i) => {
              const isMajor = i % 5 === 0;

              return (
                <span
                  key={i}
                  className={`block w-px ${
                    isMajor ? "h-6 bg-white/60" : "h-4 bg-white/30"
                  }`}
                />
              );
            })}
          </div>

          {/* Floating year */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-full px-6 h-11 cursor-pointer flex items-center justify-center text-black font-medium ">
              {items[(currentIndex + 1) % items.length].year}
            </div>
          </div>
        </div>

        <button
          className="flex justify-center items-center gap-0.5 text-black  bg-[#ffffff80] rounded-full px-4 h-10 cursor-pointer"
          onClick={handleNext}
        >
          Next
          <Arrow direction="right" width={16} height={16} />
        </button>
      </div>

      {/* Background */}
      <div className="flex absolute top-0 left-0 w-full h-full z-3 bg-[#e4e6e7]">
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
        <div className="border-l border-white flex-1 "></div>
      </div>

      {/* Backgroun Blur */}
      <div className="absolute top-0 left-0 flex justify-between items-end  w-full h-full z-4">
        <div className="relative -bottom-20 opacity-80 bg-[#ef476f] w-100 h-[50%] blur-[100px] rounded-full"></div>
        <div className="relative -bottom-50 opacity-80 bg-[#ffd166] w-100  h-[50%] blur-[100px] rounded-full"></div>
        <div className="relative -bottom-50 opacity-80 bg-[#ef476f] w-100  h-[50%] blur-[100px] rounded-full"></div>
        <div className="relative -bottom-50 opacity-80 bg-[#06d6a0] w-100  h-[50%] blur-[100px] rounded-full"></div>
        <div className="relative -bottom-50 opacity-80 bg-[#118ab2] w-100  h-[50%] blur-[100px] rounded-full"></div>
        <div className="relative -bottom-50 opacity-80 bg-[#ffd166] w-100  h-[50%] blur-[100px] rounded-full"></div>
        <div className="relative -bottom-20 opacity-80  bg-[#ef476f] w-100 h-[50%] blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
}
