"use client";

import Carousel from "./Carousel";
import Footer from "./Footer";

export default function PageWrapper() {
  return (
    <div className="flex flex-col flex-1 h-full">
      <Carousel />
      <Footer />
    </div>
  );
}
