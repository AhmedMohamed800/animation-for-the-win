"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  DragSpeed,
  CSSBased,
  ExtensibleAPI,
  InfiniteIcon,
  ConditionalActivation,
  ConfigureIcon,
} from "./_components/Icons";
import Card from "./_components/Card";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function DrawSVGHandmade() {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.kill();
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
        <section className="flex justify-center text-center items-center min-h-screen bg-white text-black text-6xl">
          Scroll Down
        </section>
        <section className="flex items-center justify-center min-h-screen bg-black text-white py-16">
          <div
            className="grid gap-16 mx-auto px-4 lg:px-0 lg:max-w-225"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            <Card
              title="Drag Speed."
              description="Drag it like you mean it. The faster you drag, the faster the slides run away."
            >
              <DragSpeed />
            </Card>

            <Card
              title="CSS Based Styling"
              svgAnimationSpeed={0.1}
              description="No JavaScript bullying your styles. Just pure CSS doing its little magic trick."
            >
              <CSSBased />
            </Card>

            <Card
              title="Extensible API."
              description="Built to be extended, because apparently one feature is never enough."
            >
              <ExtensibleAPI />
            </Card>

            <Card
              title="Infinite."
              svgAnimationSpeed={0.1}
              description="It keeps going. And going. And going. Please send help."
            >
              <InfiniteIcon />
            </Card>

            <Card
              title="Conditional Activation."
              svgAnimationSpeed={0.3}
              description="Only activates when it feels like it. Even animations need boundaries."
            >
              <ConditionalActivation />
            </Card>

            <Card
              title="Configuration Setup."
              svgAnimationSpeed={0.2}
              description="Give it some options and pretend you know exactly what you're doing."
            >
              <ConfigureIcon />
            </Card>
          </div>
        </section>

        <section className="flex justify-center items-center min-h-screen bg-white text-black text-6xl">
          Scroll Up
        </section>
      </div>
    </div>
  );
}
