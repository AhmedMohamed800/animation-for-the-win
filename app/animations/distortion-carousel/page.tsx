"use client";

import horizontalLoop from "./_helpers/variableWidthLoop";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Silk from "./_components/Silk";
import DistortionImage from "./_components/DistortionImage";

gsap.registerPlugin(useGSAP);

export default function DistortionCarousel() {
  const loopRef = useRef<ReturnType<typeof horizontalLoop> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Fixed width for the Silk canvas layer (equal to the active/expanded item
  // width). Kept constant so the canvas never resizes as flexBasis animates
  // between the base and active widths — only the visible crop changes.
  const [silkWidth, setSilkWidth] = useState<number | null>(null);

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
  ];

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray<HTMLElement>(".item");

      const baseBasis = boxes[0].getBoundingClientRect().width;
      const activeBasis = baseBasis * 3;

      setSilkWidth(activeBasis);

      loopRef.current = horizontalLoop(boxes, {
        draggable: true,
        inertia: true,
        center: true,
        dragSpeed: 1,

        onChange: (element, index) => {
          setCurrentIndex(index);

          gsap.to(".item", {
            flexBasis: baseBasis,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(element, {
            flexBasis: activeBasis,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });

      return () => loopRef.current?.destroy();
    },
    { scope: container },
  );

  useGSAP(() => {
    const onResize = () => loopRef.current?.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-white" ref={container}>
      <div
        className="relative h-screen items-center flex right-[-50%] translate-x-[-50%]"
        style={{ position: "relative", width: "max-content" }}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <article
              key={item.id}
              className="item mx-2 relative bg-black h-120 overflow-hidden"
              style={{ flex: "0 0 clamp(170px, 22vw, 240px)" }}
            >
              <div
                className="absolute top-0 left-1/2 h-full pointer-events-none "
                style={{
                  width: silkWidth ? `${silkWidth}px` : "100%",
                  transform: "translateX(-50%)",
                }}
                aria-hidden="true"
              >
                <Silk
                  speed={5}
                  scale={1}
                  color="#FFFFFF"
                  noiseIntensity={1.5}
                  rotation={0}
                />

                <div
                  style={{ opacity: isActive ? 1 : 0 }}
                  className="transition-opacity duration-500 delay-300 ease-out"
                >
                  <DistortionImage
                    src={item.image}
                    alt={item.alt}
                    className={`object-cover w-full cursor-default ${isActive && "z-10"}`}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
