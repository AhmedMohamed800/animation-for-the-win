"use client";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../_utils/animation";
import BookMark from "./BookMark";

interface Props {
  href: string;
  label: string;
  className?: string;
  color: string;
}

const TrainsitoinLink = ({ href, label, className, color }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = () => {
    if (pathName !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col  relative w-[50px] ${className}`}
    >
      <BookMark color={color} direction="right" />

      <button
        className="relative  font-light uppercase z-10 w-full h-[200px] text-[20px] cursor-pointer f text-white"
        style={{
          writingMode: "vertical-rl",
          backgroundColor: color,
        }}
      >
        {label}
      </button>

      <BookMark color={color} direction="left" />
    </div>
  );
};

export default TrainsitoinLink;
