"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Observer from "gsap/Observer";
import { useState, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, Observer);

export default function ScrollGalelry() {
  const imageContainer = useRef<HTMLDivElement | null>(null);
  const imageContainerColumn = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { id: "image001", src: "/scroll-gallery/image1.jpg", alt: "image1" },
    { id: "image002", src: "/scroll-gallery/image2.jpg", alt: "image2" },
    { id: "image003", src: "/scroll-gallery/image3.jpg", alt: "image3" },
    { id: "image004", src: "/scroll-gallery/image4.jpg", alt: "image4" },
    { id: "image005", src: "/scroll-gallery/image5.jpg", alt: "image5" },
    { id: "image006", src: "/scroll-gallery/image6.jpg", alt: "image6" },
    { id: "image007", src: "/scroll-gallery/image7.jpg", alt: "image7" },
    { id: "image008", src: "/scroll-gallery/image8.jpg", alt: "image8" },
  ];

  const paragraphes = [
    { id: "para001", text: "First Work" },
    { id: "para002", text: "Second Work" },
    { id: "para003", text: "Third Work" },
    { id: "para004", text: "Forth Work" },
    { id: "para005", text: "Fifth Work" },
    { id: "para006", text: "Sixth Work" },
    { id: "para007", text: "Seventh Work" },
    { id: "para008", text: "Eighth Work" },
  ];

  useGSAP(() => {
    const clampIndex = gsap.utils.clamp(0, images.length - 1);
    const imageElements = gsap.utils.toArray<HTMLImageElement>(".image");
    const imageColumnConatinerElements =
      gsap.utils.toArray<HTMLImageElement>(".imageColumn");

    let currentIndex = 0;
    let zCounter = 1;
    let animation = false;

    gsap.set(imageElements, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      transformOrigin: "center center",
    });

    gsap.set(imageElements[currentIndex], {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    });

    const changeImage = (direction: 1 | -1) => {
      animation = true;
      const nextIndex = clampIndex(currentIndex + direction);

      if (nextIndex === currentIndex) {
        animation = false;

        return;
      }
      zCounter++;
      gsap.set(imageElements[nextIndex].parentElement, { zIndex: zCounter });

      gsap.fromTo(
        imageElements[nextIndex],
        {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        },
        {
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
          ease: "power1.inOut",
          duration: 0.6,
          onComplete: () => {
            animation = false;
          },
        },
      );

      currentIndex = nextIndex;
      setCurrentIndex(nextIndex);
    };

    const observer = Observer.create({
      onUp: () => !animation && changeImage(1),
      onDown: () => !animation && changeImage(-1),
      wheelSpeed: -1,
      tolerance: 100,
    });

    return () => observer.kill();
  });

  useGSAP(() => {
    const container = imageContainerColumn.current;
    const target = itemRefs.current[currentIndex];
    if (!container || !target) return;

    const targetCenter = target.offsetTop + target.offsetHeight / 2;

    const windowCenter = container.parentElement!.clientHeight / 2;

    gsap.to(container, {
      y: windowCenter - targetCenter,
      duration: 0.6,
      ease: "circ.out",
    });
  }, [currentIndex]);

  return (
    <div className="flex justify-between items-center min-h-dvh bg-[#f1f1f1] px-4">
      <div className="hidden lg:flex flex-col uppercase gap-2 flex-1 text-black">
        {paragraphes.map((para, i) => {
          return (
            <div
              className={`flex justify-between w-[70%] text-[12px] transition-colors   ${currentIndex === i ? "text-black font-medium" : "text-gray-500"}`}
              key={para.id}
            >
              <div className="flex gap-8">
                <p className=" ">(00{i + 1})</p>
                <p className="pr-8 text-left">{para.text}</p>
              </div>
              <p>See Case</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-2 max-w-125 ">
        <div className="relative w-full  h-110" ref={imageContainer}>
          {images.map((image, i) => {
            return (
              <div
                key={image.id}
                className={`w-full h-110 absolute top-[50%] translate-y-[-50%] left-0  rounded-md`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-index={i}
                  sizes="500"
                  fill
                  className="image  object-cover rounded-md border border-black"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center flex-1  w-full overflow-hidden">
        <div className="flex  relative h-screen mx-auto ">
          <div className="absolute top-[50%] translate-y-[-50%]  left-1/2 -translate-x-1/2 w-18 h-18 border border-gray-400 rounded-sm z-10 pointer-events-none" />
          <div
            ref={imageContainerColumn}
            className="absolute top-0 left-0 w-full flex flex-col gap-2 "
          >
            {images.map((image, i) => (
              <div
                key={image.id + "2"}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`imageColumn relative self-center w-16 h-16 rounded-sm ${
                  i === currentIndex && "opacity-40"
                }`}
                style={{ transition: "opacity 0.5s ease-in-out" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  sizes="50"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            ))}
          </div>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 h-45 rounded-sm bg-white/10 backdrop-blur-md z-10 pointer-events-none"
            style={{
              maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 40%, transparent 100%)",
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
