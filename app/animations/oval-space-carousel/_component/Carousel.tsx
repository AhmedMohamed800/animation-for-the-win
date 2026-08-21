"use client";
import { imageData } from "./data";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Carousel() {
  const RADIUS_X = 350;
  const RADIUS_Y = 200;

  const container = useRef<HTMLDivElement>(null);

  const positionElement = (
    index: number,
    angle: number = 0,
  ): { x: number; y: number } => {
    const wrapper = gsap.utils.wrap(0, 360);
    const ANGLE = wrapper(index * Math.floor(360 / imageData.length)) + angle;
    const angleInRadians = (ANGLE * Math.PI) / 180;

    const x = Math.ceil(RADIUS_X * Math.cos(angleInRadians));
    const y = Math.ceil(RADIUS_Y * Math.sin(angleInRadians));

    return { x, y };
  };

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".item") as HTMLDivElement[];

      const rotation = { angle: 360 };

      gsap.to(rotation, {
        angle: 0,
        duration: 50,
        repeat: -1,
        ease: "none",

        onUpdate: () => {
          items.forEach((item, index) => {
            const { x, y } = positionElement(index, rotation.angle);

            gsap.set(item, {
              top: y,
              left: x,
            });
          });
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      className="relative flex justify-center items-center flex-1"
      ref={container}
    >
      <div className="-rotate-25  relative ">
        <div className="">
          {imageData.map((imageDataEle, index) => {
            const { x, y } = positionElement(index);
            return (
              <div
                key={imageDataEle.id}
                className="item absolute top-0 left-0 h-35 w-60 origin-center rotate-25"
                style={{ top: `${y}px`, left: `${x}px` }}
              >
                <Image
                  src={imageDataEle.src}
                  alt={imageDataEle.alt}
                  fill
                  sizes="100"
                  className=" object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
