"use client";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../_utils/animations";

interface Props {
  href: string;
  label: string;
}

const TrainsitoinLink = ({ href, label }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = () => {
    console.log(href, pathName);
    if (pathName !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <button
      className={`text-[16px] cursor-pointer text-black ${href === pathName ? "font-bold" : "font-normal"}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TrainsitoinLink;
