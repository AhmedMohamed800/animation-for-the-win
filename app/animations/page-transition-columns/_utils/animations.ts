import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("pageEase", "0.76,0,0.24,1");

export const animatePageIn = () => {
  const banners = document.querySelectorAll(".banner");
  const bannerContainer = document.querySelector("#bannerContainer");

  gsap.set(bannerContainer, { display: "flex" });
  gsap.set(banners, {
    display: "block",
    transformOrigin: "right center",
  });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(bannerContainer, { display: "none" });
      gsap.set(banners, { display: "none" });
    },
  });

  tl.fromTo(
    banners,
    {
      clipPath: "inset(0 0 0 0)",
      scaleX: 1,
    },
    {
      clipPath: "inset(0 100% 0 0)",
      scaleX: 1.05,
      duration: 0.8,
      ease: "pageEase",
      stagger: {
        each: 0.08,
        from: "end",
      },
    },
  );
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const banners = document.querySelectorAll(".banner");
  const bannerContainer = document.querySelector("#bannerContainer");

  gsap.set(bannerContainer, { display: "flex" });
  gsap.set(banners, {
    display: "block",
    transformOrigin: "left center",
  });

  gsap.fromTo(
    banners,
    {
      clipPath: "inset(0 100% 0 0)",
      scaleX: 1.05,
    },
    {
      clipPath: "inset(0 0% 0 0)",
      scaleX: 1,
      duration: 0.8,
      ease: "pageEase",
      stagger: {
        each: 0.08,
      },
      onComplete: () => router.push(href),
    },
  );
};
