"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathHelper from "gsap/MotionPathHelper";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Card from "./_components/Card";

gsap.registerPlugin(
  useGSAP,
  MotionPathPlugin,
  MotionPathHelper,
  ScrollTrigger,
  ScrollSmoother,
);

export default function GrdiCardReveal() {
  const cardsItems = [
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
  const cardContainer = useRef<HTMLDivElement | null>(null);
  const sectionContainer = useRef<HTMLDivElement | null>(null);
  const initialPositionDiv = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const initialDiv = initialPositionDiv.current;

      const cards = gsap.utils.toArray<HTMLDivElement>(".card");
      const cardsContainer =
        gsap.utils.toArray<HTMLDivElement>(".card-container");

      let tl: gsap.core.Timeline;

      function createAnimation() {
        tl?.kill();

        cardsContainer.forEach((cardContainerElement, i) => {
          if (!initialDiv) return;

          const values = MotionPathPlugin.getRelativePosition(
            cardContainerElement,
            initialDiv,
          );

          gsap.set(cardContainerElement, {
            x: "+=" + values.x,
            y: "+=" + values.y,
            rotateY: 0,
            rotate: (i + 5) * 1,
          });
        });

        const move = gsap.timeline();

        cardsContainer.forEach((card, index) => {
          move.fromTo(
            card,
            { yPercent: index % 2 !== 0 ? 2 : -2 },
            {
              yPercent: index % 2 !== 0 ? -2 : 2,
              yoyo: true,
              repeat: -1,
              duration: 3,
              ease: "power2.inOut",
            },
            0,
          );
        });

        tl = gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: sectionContainer.current,
            scrub: true,
            pinSpacing: true,
            start: "-10% top",
            end: "+=500vh",
          },
        });

        tl.to(cardsContainer, {
          x: 0,
          y: 0,
          stagger: {
            amount: 0.1,
          },
          rotate: 0,
        });

        tl.to(
          cards,
          {
            rotateY: 0,

            stagger: {
              amount: 0.1,
            },
          },
          "<",
        );
      }

      createAnimation();

      const handleResize = () => {
        createAnimation();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        tl?.kill();
      };
    },
    { scope: sectionContainer },
  );

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2.5,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.kill();
      ScrollTrigger.killAll();
    };
  });

  return (
    <div
      id="smooth-wrapper"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div id="smooth-content">
        <section className="flex justify-center items-center min-h-dvh bg-white">
          <h2 className="text-6xl lg:text-9xl text-black">Scroll Down</h2>
        </section>

        <section
          className="flex flex-col items-center min-h-[100dvh] h-full pb-50 pt-50 overflow-hidden"
          ref={sectionContainer}
        >
          <div
            className="relative z-[-2] w-75 h-100"
            id="eleee"
            ref={initialPositionDiv}
          ></div>
          <div
            className="grid grid-auto-fit-250 gap-1 w-full min-h-[40dvh] "
            ref={cardContainer}
          >
            {cardsItems.map((card) => {
              return <Card key={card.id} {...card} />;
            })}
          </div>
        </section>

        <section className="flex justify-center items-center min-h-dvh bg-white">
          <h2 className="text-6xl lg:text-9xl text-black">EZ</h2>
        </section>
      </div>
    </div>
  );
}
