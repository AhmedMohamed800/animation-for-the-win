"use client";

import Image from "next/image";
import verticalLoop from "@/app/animations/vertical-scroll-drag/_helpers/verticalLoop";
import gsap from "gsap";
import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function VerticalScrollDrag() {
  const itemsElementContainer = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const container = useRef<HTMLDivElement | null>(null);
  const [pressed, setPressed] = useState(false);
  const items = [
    {
      id: "#001",
      image: "/scroll-image-reveal/building1.webp",
      alt: "Image 1",
    },
    {
      id: "#002",
      image: "/scroll-image-reveal/building2.webp",
      alt: "Image 2",
    },
    {
      id: "#003",
      image: "/scroll-image-reveal/building3.webp",
      alt: "Image 3",
    },
    {
      id: "#004",
      image: "/scroll-image-reveal/building4.webp",
      alt: "Image 4",
    },
    {
      id: "#005",
      image: "/scroll-image-reveal/building5.webp",
      alt: "Image 5",
    },
    {
      id: "#006",
      image: "/scroll-image-reveal/building6.webp",
      alt: "Image 6",
    },
  ];
  const loopRef = useRef<ReturnType<typeof verticalLoop> | null>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".item");
      loopRef.current = verticalLoop(boxes, {
        paused: true,
        draggable: true,
        center: true,
        dragSpeed: 0.4,

        onChange: (_: HTMLDivElement, index: number) => {
          if (index === items.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(index + 1);
          }
        },
      });

      const loop = loopRef.current as any;

      let autoPlay: gsap.core.Tween;

      const scheduleNext = () => {
        autoPlay?.kill();

        autoPlay = gsap.delayedCall(4, () => {
          loop.next({
            duration: 0.6,
            ease: "power2.out",
            onComplete: scheduleNext,
          });
        });
      };

      scheduleNext();

      loop.draggable.vars.onPress = () => {
        autoPlay?.kill();
        gsap.killTweensOf(loop);
        setPressed(true);

        gsap.to(boxes, {
          ease: "power2.out",
          paddingBottom: 5,
          paddingTop: 5,
        });
      };

      loop.draggable.vars.onRelease = () => {
        scheduleNext();
        setPressed(false);

        gsap.to(boxes, {
          ease: "power2.out",
          paddingBottom: 60,
          paddingTop: 40,
        });
      };
    },

    { scope: container },
  );

  return (
    <div
      className="flex h-screen justify-between px-4 gap-4  bg-white text-black overflow-hidden"
      style={{
        fontFamily: "Poppins",
      }}
      ref={container}
    >
      <div className="flex-1 flex flex-col justify-between py-4">
        <h1 className="text-xl font-medium">Animation for the win</h1>
        <h2 className="text-4xl font-medium">Unique JS effects</h2>
        <p className="font-medium  max-w-100">
          Start bulind with an ever-growing collection of unique, well-crafted
          JS effect
        </p>
      </div>
      <main
        className="flex flex-col  flex-1 translate-y-[-50%] "
        ref={itemsElementContainer}
      >
        {items.map((item, i) => {
          return (
            <article
              key={item.id}
              className={`item flex flex-col pb-15 pt-10 gap-2`}
            >
              {item.image === "N/A" ? (
                <>
                  <div
                    className={`flex  item-bg w-full h-70 bg-black transition-active-vertical-scroll-drag rounded-md ${pressed ? "activeElement" : currentIndex === i && !pressed ? "activeElement" : "notActive"}    `}
                    style={{
                      transform: `scale(${currentIndex === i ? "1" : "0.75"})`,
                    }}
                  ></div>
                  <p
                    className={`text-gray-400 text-sm transition-opacity ${pressed && "hidden"} ${currentIndex !== i && "opacity-0"}`}
                  >
                    {item.id}
                  </p>
                </>
              ) : (
                <>
                  <div
                    className={`flex  item-bg w-full h-70 shadow transition-active-vertical-scroll-drag rounded-md ${pressed ? "activeElement" : currentIndex === i && !pressed ? "activeElement" : "notActive"}    `}
                    style={{
                      transform: `scale(${currentIndex === i ? "1" : "0.75"})`,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <p
                    className={`text-gray-400 text-sm transition-opacity ${pressed && "hidden"} ${currentIndex !== i && "opacity-0"}`}
                  >
                    {item.id}
                  </p>
                </>
              )}
            </article>
          );
        })}
      </main>
      <div className="flex-1 flex flex-col justify-between items-end py-4">
        <p></p>
        <h2 className="text-4xl font-medium">Made with care</h2>
        <p className="uppercase text-gray-400 text-sm">
          Drag to explore the collection
        </p>
      </div>
    </div>
  );
}
