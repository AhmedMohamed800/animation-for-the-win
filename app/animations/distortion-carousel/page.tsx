"use client";

import horizontalLoop from "./_helpers/horizontalscroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);
export default function DistortionCarousel() {
  const loopRef = useRef<ReturnType<typeof horizontalLoop> | null>(null);
  const itemsElementContainer = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    {
      id: "#007",
      image: "/scroll-image-reveal/building6.webp",
      alt: "Image 6",
    },
    {
      id: "#008",
      image: "/scroll-image-reveal/building6.webp",
      alt: "Image 6",
    },
    {
      id: "#009",
      image: "/scroll-image-reveal/building6.webp",
      alt: "Image 6",
    },
    {
      id: "#010",
      image: "/scroll-image-reveal/building6.webp",
      alt: "Image 6",
    },
    {
      id: "#011",
      image: "/scroll-image-reveal/building6.webp",
      alt: "Image 6",
    },
  ];

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".item");
      loopRef.current = horizontalLoop(boxes, {
        paused: true,
        draggable: true,
        center: true,
        dragSpeed: 1,

        onChange: (_: HTMLDivElement, index: number) => {
          if (index === items.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(index + 1);
          }
        },
      });
    },
    { scope: container },
  );

  return (
    <div className="flex items-center min-h-screen    bg-white" ref={container}>
      <div ref={itemsElementContainer} className=" h-120 w-[200vw] ">
        {items.map((item, i) => {
          return (
            <article
              key={item.id}
              className={`item ${currentIndex === i ? "w-50 " : "w-50"} inline-block paddingTransition flex-2 relative bg-black h-120 `}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover rounded-md"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
