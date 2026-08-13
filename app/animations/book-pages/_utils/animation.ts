import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollToPlugin, ScrollTrigger);

export const animatePageIn = () => {
  const pageTitle = document.querySelector(".page-title");
  const bookContent = document.querySelector(".book-content");
  const bookCover = document.querySelector(".book-cover");

  document.fonts.ready.then(() => {
    const split = SplitText.create(pageTitle, { type: "chars", mask: "chars" });

    gsap.set(split.chars, {
      xPercent: 100,
    });

    gsap.set(pageTitle, {
      opacity: 1,
    });

    gsap.set(bookContent, {
      backgroundColor: bookContent?.getAttribute("data-color") ?? "#fff",
    });

    const tl = gsap.timeline({});

    tl.to(split.chars, {
      xPercent: 0,
      stagger: {
        amount: 0.2,
        ease: "back.out",
        from: "end",
      },

      duration: 2,
    })
      .fromTo(
        bookCover,
        {
          rotateY: 0,
        },
        {
          rotateY: 180,
          duration: 2,
          boxShadow: 0,
        },
        "<",
      )
      .to(bookCover, {});
  });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const pageTitle = document.querySelector(".page-title");
  const bookCover = document.querySelector(".book-cover");
  const bookContent = document.querySelector(".book-content");

  document.fonts.ready.then(() => {
    const split = SplitText.create(pageTitle, { type: "chars", mask: "chars" });

    const tl = gsap.timeline({
      onComplete: () => router.push(href),
      onStart() {
        gsap.to(window, { duration: 1, scrollTo: { y: 0 } });
      },
    });

    tl.to(split.chars, {
      xPercent: 100,
      stagger: {
        amount: 0.2,
        ease: "back.in",
        from: "end",
      },

      duration: 0.6,
    }).to(
      bookCover,
      {
        rotateY: 0,
        duration: 0.6,
      },
      ">",
    );
  });
};
