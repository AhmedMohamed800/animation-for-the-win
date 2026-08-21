"use client";

import Carousel from "./Carousel";
import Footer from "./Footer";
import { useState } from "react";

export default function PageWrapper() {
  // -1 means no element has been selected
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <div className="flex flex-col flex-1 h-full overflow-clip">
      <Carousel setActiveIndex={setActiveIndex} />
      <Footer activeIndex={activeIndex} />
    </div>
  );
}
