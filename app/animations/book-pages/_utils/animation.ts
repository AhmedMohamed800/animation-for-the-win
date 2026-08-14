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
  const book = document.querySelector(".book");

  document.fonts.ready.then(() => {
    const split = SplitText.create(pageTitle, { type: "chars", mask: "chars" });

    document.body.style.overflow = "hidden";

    gsap.set(split.chars, {
      xPercent: 100,
    });

    gsap.set(pageTitle, {
      opacity: 1,
    });

    gsap.set(bookContent, {
      backgroundColor: bookContent?.getAttribute("data-color") ?? "#fff",
    });

    if (!sessionStorage.getItem("first_time")) {
      gsap.set(book, {
        yPercent: 30,
      });
      sessionStorage.setItem("first_time", "true");
    }

    const tl = gsap.timeline({
      onStart: () => {
        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: 0 },
        });
      },
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    tl.to(book, {
      yPercent: 0,
    })
      .fromTo(
        bookCover,
        {
          rotateY: 0,
        },
        {
          rotateY: -180,
          duration: 2,
        },
      )
      .to(
        split.chars,
        {
          xPercent: 0,
          stagger: {
            amount: 0.2,
            ease: "power2.out",
            from: "end",
          },
          duration: 0.5,
        },
        "<20%",
      );
  });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const pageTitle = document.querySelector(".page-title");
  const bookCover = document.querySelector(".book-cover");
  const book = document.querySelector(".book");

  document.fonts.ready.then(() => {
    const split = SplitText.create(pageTitle, { type: "chars", mask: "chars" });

    gsap.set(book, {
      y: 0,
    });

    const tl = gsap.timeline({
      onStart: () => {
        document.body.style.overflow = "hidden";

        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: 0 },
        });
      },

      onComplete: () => {
        router.push(href);
      },
    });

    tl.to(bookCover, {
      rotateY: 0,
      duration: 2,
    }).to(
      split.chars,
      {
        xPercent: 100,
        stagger: {
          amount: 0.1,
          ease: "power2.out",
          from: "end",
        },

        duration: 0.5,
      },
      "-=1.3",
    );
  });
};
