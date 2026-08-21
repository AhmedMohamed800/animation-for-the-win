"use client";
import { imageData } from "./data";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Carousel({
  setActiveIndex,
}: {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const RADIUS_X = 340;
  const RADIUS_Y = 190;
  const container = useRef<HTMLDivElement>(null);

  const positionElement = (
    index: number,
    angle: number = 0,
  ): { x: number; y: number } => {
    const wrapper = gsap.utils.wrap(0, 360);
    const ANGLE = wrapper(index * Math.floor(360 / imageData.length)) + angle;
    const angleInRadians = (ANGLE * Math.PI) / 180;

    const x = RADIUS_X * Math.cos(angleInRadians);
    const y = RADIUS_Y * Math.sin(angleInRadians);

    return { x, y };
  };

  const { contextSafe } = useGSAP(
    () => {
      const items = gsap.utils.toArray(".item") as HTMLDivElement[];

      const tl = gsap.timeline({});

      const rotation = { angle: 0 };

      tl.to(items, {
        scale: 1,
        rotate: 25,
        x: (index) => positionElement(index).x,
        y: (index) => positionElement(index).y,
        stagger: {
          each: 0.01,
        },
      });

      tl.to(
        rotation,
        {
          angle: 360,
          duration: 50,
          repeat: -1,
          ease: "none",

          onUpdate: () => {
            items.forEach((item, index) => {
              const { x, y } = positionElement(index, rotation.angle);

              gsap.set(item, {
                x,
                y,
              });
            });
          },
        },
        "0",
      );
    },
    { scope: container },
  );

  const onElementEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(e.currentTarget.dataset.index);
    const items = gsap.utils.toArray(".item") as HTMLDivElement[];
    const filterdItems = items.filter((_, i) => i != index);

    gsap.to(filterdItems, {
      filter: "grayscale(100%)",
      duration: 1,
      ease: "power2.out",
    });

    gsap.set(e.currentTarget, { zIndex: 2 });

    gsap.to(e.currentTarget, {
      scale: 1.3,
      ease: "power2.out",
    });

    setActiveIndex(index);
  });

  const onElementLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    setActiveIndex(-1);
    gsap.set(e.currentTarget, { zIndex: 0 });

    const items = gsap.utils.toArray(".item") as HTMLDivElement[];

    gsap.to(items, {
      filter: "grayscale(0%)",
      duration: 1,

      ease: "power2.out",
    });

    gsap.to(e.currentTarget, {
      scale: 1,
      ease: "power2.out",
    });
  });

  return (
    <div
      className="relative flex justify-center items-center flex-1 translate-x-[-5%]"
      ref={container}
    >
      <div className="-rotate-25 relative ">
        <div className="">
          {imageData.map((imageDataEle, index) => {
            return (
              <div
                key={imageDataEle.id}
                onMouseEnter={(e) => onElementEnter(e)}
                onMouseLeave={(e) => onElementLeave(e)}
                data-index={index}
                className="item absolute top-0 left-0 h-20 w-30 lg:h-30 lg:w-55 origin-center  scale-0"
              >
                <Image
                  src={imageDataEle.src}
                  alt={imageDataEle.alt}
                  data-index={index}
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
