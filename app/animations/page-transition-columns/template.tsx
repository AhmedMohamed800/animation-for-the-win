"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { animatePageIn } from "./_utils/animations";
gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id="bannerContainer"
        className="flex fixed min-h-screen w-full top-0 left-0 z-10 "
      >
        <div className="banner h-[100dv] w-1/4 shrink-0 bg-black "></div>
        <div className="banner h-[100dv] w-1/4 shrink-0 bg-black  "></div>
        <div className="banner h-[100dv] w-1/4 shrink-0 bg-black "></div>
        <div className="banner h-[100dv] w-1/4 shrink-0 bg-black"></div>
      </div>

      {children}
    </div>
  );
}
