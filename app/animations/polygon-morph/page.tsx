"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

export default function PolygonMorph() {
  const rectElement = useRef<HTMLDivElement | null>(null);
  const foxRef = useRef<HTMLImageElement | null>(null);
  const pandaRef = useRef<HTMLImageElement | null>(null);
  const gooseRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
      });

      tl.to(
        rectElement.current,
        {
          ease: "power1.inOut",
          clipPath:
            "polygon(57% 0%, 100% 74%, 100% 100%, 73% 100%, 0% 57%, 0% 41%, 0% 0%)",
        },
        "+=2",
      ).to(
        foxRef.current,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.3,
        },
        "<",
      );

      tl.to(
        rectElement.current,
        {
          ease: "power1.inOut",

          clipPath:
            "polygon(100% 38%, 100% 54%, 68% 100%, 36% 99%, 0% 17%, 0% 0%, 36% 0%)",
        },
        "+=2",
      ).to(
        pandaRef.current,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.3,
        },
        "<",
      );

      tl.to(
        rectElement.current,
        {
          ease: "power1.inOut",

          clipPath:
            "polygon(100% 0%, 100% 16%, 56% 100%, 43% 100%, 0% 57%, 0% 41%, 49% 0%)",
        },
        "+=2",
      ).to(
        foxRef.current,
        {
          opacity: 1,
          ease: "power2.out",
          duration: 0.3,
        },
        "<",
      );
    },
    { scope: rectElement },
  );

  return (
    <main className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <h1 className="text-2xl uppercase font-bold">Polygon Morph</h1>
      <div
        className="flex relative  justify-center items-center h-100 w-90 md:w-150 "
        style={{
          clipPath:
            "polygon(100% 0%, 100% 16%, 56% 100%, 43% 100%, 0% 57%, 0% 41%, 49% 0%)",
        }}
        ref={rectElement}
      >
        <Image
          ref={foxRef}
          src="/polygon-morph/fox.webp"
          alt="fox"
          width={0}
          height={0}
          priority
          className=" absolute inset-0 z-3"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
        <Image
          ref={pandaRef}
          src="/polygon-morph/panda.webp"
          alt="panda"
          width={0}
          height={0}
          priority
          className=" absolute inset-0 z-2"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
        <Image
          ref={gooseRef}
          src="/polygon-morph/goose.webp"
          alt="goose"
          width={0}
          height={0}
          priority
          className=" absolute inset-0 z-1"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </main>
  );
}
