"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { animatePageIn } from "./_utils/animation";
import TrainsitoinLink from "./_components/TransitionLink";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    animatePageIn();
  }, []);

  const pathname = usePathname();
  const pageName = pathname
    .split("/")
    [pathname.split("/").length - 1].replace("-", " ");

  return (
    <>
      <h1 className="page-title opacity-0 uppercase font-bold text-4xl lg:text-6xl mb-12 pl-8 lg:pl-16">
        {pageName}
      </h1>

      <div className="book relative flex flex-1 lg:flex-0">
        <div
          className="book-content w-[75%]  rounded-l-none rounded-sm ml-6 py-12 pr-4 pl-1 lg:px-16"
          data-color={`${pageName.includes("second page") ? "#155dfc" : "#fb2c36"}`}
          style={{
            backgroundColor: `${pageName.includes("second page") ? "#155dfc" : "#fb2c36"}`,
            perspective: "2000px",
          }}
        >
          {children}

          {/**/}
          <div
            className="book-cover absolute bg-inherit inset-0 size-full rounded-l-none rounded-sm z-2 "
            style={{
              transform: "rotateY(0deg)",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transition: "background-color 0.1s 2s linear",
              boxShadow: "box-shadow:2px 2px 4px #333333",
            }}
          ></div>
        </div>
        <div className="relative -z-1 flex flex-col w-12 pt-4 gap-5  items-start ">
          <TrainsitoinLink
            label="First Page"
            href="/animations/book-pages"
            color="#fb2c36"
          />
          <TrainsitoinLink
            label="Second Page"
            href="/animations/book-pages/second-page"
            color="#155dfc"
          />
        </div>
      </div>
    </>
  );
}
