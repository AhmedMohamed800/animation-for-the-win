"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Card from "./_components/Card";

gsap.registerPlugin(useGSAP);

export default function GrdiCardReveal() {
  const cards = [
    {
      id: "001",
      imageSrc: "/grid-card-reveal/unkown1.png",
      imageAlt: "unkown1",
    },
    {
      id: "002",
      imageSrc: "/grid-card-reveal/unkown2.png",
      imageAlt: "unkown2",
    },
    {
      id: "003",
      imageSrc: "/grid-card-reveal/unkown3.png",
      imageAlt: "unkown3",
    },
    {
      id: "004",
      imageSrc: "/grid-card-reveal/unkown1.png",
      imageAlt: "unkown4",
    },
    {
      id: "005",
      imageSrc: "/grid-card-reveal/unkown2.png",
      imageAlt: "unkown5",
    },
    {
      id: "006",
      imageSrc: "/grid-card-reveal/unkown3.png",
      imageAlt: "unkown6",
    },
    {
      id: "007",
      imageSrc: "/grid-card-reveal/unkown1.png",
      imageAlt: "unkown7",
    },
    {
      id: "008",
      imageSrc: "/grid-card-reveal/unkown2.png",
      imageAlt: "unkown8",
    },
    {
      id: "009",
      imageSrc: "/grid-card-reveal/unkown3.png",
      imageAlt: "unkown9",
    },
    {
      id: "010",
      imageSrc: "/grid-card-reveal/unkown1.png",
      imageAlt: "unkown10",
    },
    {
      id: "011",
      imageSrc: "/grid-card-reveal/unkown2.png",
      imageAlt: "unkown11",
    },
    {
      id: "012",
      imageSrc: "/grid-card-reveal/unkown3.png",
      imageAlt: "unkown12",
    },
  ];

  return (
    <>
      <section className="flex justify-center items-center min-h-dvh bg-white">
        <h2 className="text-6xl lg:text-9xl text-black">Scroll Down</h2>
      </section>

      <section className="flex items-center min-h-[200dvh] h-full">
        <div className="grid grid-auto-fit-250 gap-1 w-full min-h-[40dvh] overflow-hidden">
          {cards.map((card) => {
            return <Card key={card.id} {...card} />;
          })}
        </div>
      </section>

      <section className="flex justify-center items-center min-h-dvh bg-white">
        <h2 className="text-6xl lg:text-9xl text-black">EZ</h2>
      </section>
    </>
  );
}
