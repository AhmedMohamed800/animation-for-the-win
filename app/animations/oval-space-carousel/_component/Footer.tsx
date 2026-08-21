"use client";
import { imageData } from "./data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

export default function Footer({ activeIndex }: { activeIndex: number }) {
  const footer = useRef<HTMLDivElement | null>(null);
  const activeElement = imageData[activeIndex];

  useGSAP(
    () => {
      const activeElementId = document.querySelector(
        "#activeElementId",
      ) as HTMLParagraphElement;
      const activeElementDetails = document.querySelector(
        "#activeElementDetails",
      ) as HTMLParagraphElement;

      const tl = gsap.timeline();

      tl.to(activeElementId, {
        duration: 1,
        scrambleText: {
          text: activeElement ? activeElement.id : "000",
          chars: "0123456789",
          speed: 0.1,
        },
      }).to(
        activeElementDetails,
        {
          duration: 1,
          scrambleText: {
            text: activeElement
              ? activeElement.details
              : "Hover Over an element",
            speed: 0.1,
          },
        },
        "0",
      );
    },
    { dependencies: [activeIndex], scope: footer },
  );

  return (
    <footer className="flex p-4 gap-4" ref={footer}>
      <p id="activeElementId"> 000</p>
      <p
        className="flex-1 justify-center items-center text-center"
        id="activeElementDetails"
      >
        Hover Over an element
      </p>
    </footer>
  );
}
