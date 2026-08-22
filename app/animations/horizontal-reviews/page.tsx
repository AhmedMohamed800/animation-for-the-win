"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import ReviewCard from "./_component/ReviewCard";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function HorizontalReviews() {
  const reviewsData = [
    {
      id: "001Rev",
      pfImageSrc: "/horizontal-reviews/dinamow.jpg",
      pfImageAlt: "Dinamow",
      name: "Abdelrhman Mohammed",
      position: "Backend Developer",
      review:
        "Bro animated one div and suddenly he's a senior frontend developer.",
    },
    {
      id: "002Rev",
      pfImageSrc: "/horizontal-reviews/mekawy.jpg",
      pfImageAlt: "Mekawy",
      name: "Mohamed Mekawy",
      position: "Unemployed (Product Designer)",
      review: "The animation is smoother than my career.",
    },
    {
      id: "003Rev",
      pfImageSrc: "/horizontal-reviews/jinx.jpg",
      pfImageAlt: "jinx",
      name: "Ahmed Mohamed",
      position: "Frontend Developer",
      review:
        "This is what happens when you give a frontend developer too much free time.",
    },
    {
      id: "004Rev",
      pfImageSrc: "/horizontal-reviews/webToso.jpg",
      pfImageAlt: "WebToso",
      name: "WebToso",
      position: "Creative Developer",
      review: "This is really good! God bless you, the ideas are amazing.",
    },
    {
      id: "005Rev",
      pfImageSrc: "/horizontal-reviews/fs.webp",
      pfImageAlt: "Bakr",
      name: "Mohamed Bakr",
      position: "Cyber Security Specialist",
      review:
        "I checked the website for vulnerabilities. Unfortunately, the only thing vulnerable was my ego.",
    },
    {
      id: "006Rev",
      pfImageSrc: "/horizontal-reviews/bondok.jpeg",
      pfImageAlt: "bondok",
      name: "Eng. Bondok",
      position: "House Cat",
      review: "Meow meow. 🐈",
    },
  ];

  const RefviewSection = useRef<HTMLDivElement | null>(null);
  const RefviewsContainer = useRef<HTMLDivElement | null>(null);
  const pointParentRef = useRef<HTMLDivElement | null>(null);

  const [pointCount, setPointCount] = useState(0);

  useEffect(() => {
    const updatePoints = () => {
      setPointCount(Math.ceil(window.innerWidth / 5));
    };

    updatePoints();

    window.addEventListener("resize", updatePoints);

    return () => window.removeEventListener("resize", updatePoints);
  }, []);

  useGSAP(() => {
    const reviewCards = gsap.utils.toArray(".reviewCard");
    const refviewsContainerEle = RefviewsContainer.current;
    const distance =
      (refviewsContainerEle?.getBoundingClientRect().width ?? 0) * -1 +
      (refviewsContainerEle?.parentElement?.getBoundingClientRect().width ??
        0) -
      32;
    const smoother = ScrollSmoother.create({
      smooth: 2.5,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    let activeIndex: number = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: RefviewSection.current,
        start: "top top",
        end: "+=800dvh",
        pin: true,
        scrub: true,
        pinSpacing: true,
        onUpdate(self) {
          const children = pointParentRef.current?.children;
          if (!children?.length) return;

          const newIndex = Math.min(
            Math.floor(self.progress * children.length),
            children.length - 1,
          );

          if (newIndex === activeIndex) return;

          gsap.to(
            [
              children[activeIndex],
              children[activeIndex - 1],
              children[activeIndex + 1],
              children[activeIndex + 2],
              children[activeIndex - 2],
            ].filter(Boolean),
            {
              opacity: 0.2,
              height: 12,
              duration: 0.1,
              ease: "circ",
            },
          );

          // activate only the new bar
          gsap.to([children[newIndex]].filter(Boolean), {
            opacity: 1,
            height: 30,
            duration: 0.1,
            ease: "circ",
          });

          gsap.to(
            [children[newIndex - 1], children[newIndex + 1]].filter(Boolean),
            {
              opacity: 0.7,
              height: 25,
              duration: 0.1,
              ease: "circ",
            },
          );

          gsap.to(
            [children[newIndex - 2], children[newIndex + 2]].filter(Boolean),
            {
              opacity: 0.5,
              height: 20,
              duration: 0.1,
              ease: "circ",
            },
          );

          activeIndex = newIndex;
        },
      },
    });

    tl.to(RefviewsContainer.current, {
      x: distance,
      duration: 10,
    }).to(
      reviewCards,
      {
        y: 0,
        stagger: 0.2,
        duration: 10,
      },
      "<",
    );

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
        <div className="flex items-center justify-center min-h-dvh bg-white">
          <h2 className="text-6xl lg-text-9xl text-black">Scroll Down</h2>
        </div>

        <div
          className="flex flex-col gap-8 justify-center min-h-dvh pb-20  bg-[#303930] overflow-hidden"
          ref={RefviewSection}
        >
          <h1 className="px-8 text-6xl">Trusted People.</h1>
          <div
            className="flex gap-1 px-8 items-end h-[30px]"
            ref={pointParentRef}
          >
            {Array.from({ length: pointCount }).map((_, index) => (
              <div
                key={index}
                data-index={index}
                className="point h-3 w-1  bg-white"
                style={{ opacity: 0.2 }}
              />
            ))}
          </div>
          <div
            className="flex gap-8 w-[2450px] translate-x-8 lg:translate-x-100 mt-10"
            ref={RefviewsContainer}
          >
            {reviewsData.map((review, index) => {
              return <ReviewCard key={review.id} {...review} index={index} />;
            })}
          </div>
        </div>

        <div className="flex items-center justify-center min-h-dvh bg-white">
          <h2 className="text-6xl lg-text-9xl text-black">Scroll Up</h2>
        </div>
      </div>
    </div>
  );
}
