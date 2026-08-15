"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  svgAnimationSpeed?: number;
}

export default function Card({
  title,
  description,
  children,
  svgAnimationSpeed = 0.6,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const paths = gsap.utils.toArray("path");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play reset play reset",
        },
      });

      tl.from(paths, {
        drawSVG: 0,
        ease: "none",
        stagger: {
          each: svgAnimationSpeed,
        },
      })
        .from(
          '[data-animation="title"]',
          {
            opacity: 0,
            y: 70,
          },
          "<",
        )
        .from(
          '[data-animation="description"]',
          {
            opacity: 0,
            y: 70,
          },
          ">",
        );
    },
    { scope: cardRef },
  );

  return (
    <article ref={cardRef} className="flex flex-col gap-2 text-white">
      <div className="w-full mb-1">{children}</div>
      <h2 className="text-[18px] font-medium" data-animation="title">
        {title}
      </h2>
      <p className="text-sm" data-animation="description">
        {description}
      </p>
    </article>
  );
}
