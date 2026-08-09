import "./card.css";
import Image from "next/image";
import { AnimationStampIcon, HTMLIcon } from "./Icons";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
}

export default function Card({ imageSrc, imageAlt }: CardProps) {
  return (
    <div className="card-container">
      <div className="card is-flipped" style={{ transform: "rotateY(180deg)" }}>
        <div className="realtive card-face">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100"
            className="object-cover"
          />
        </div>

        <div className="flex justify-center relative items-center overflow-hidden card-back">
          <div className="absolute right-0 top-0 w-full h-full border z-10  border-[#b44e0a]"></div>
          <h3 className="text-2xl font-medium rotate-270 uppercase">
            Animation for the win
          </h3>

          <AnimationStampIcon className="absolute -right-16 -top-2 opacity-50 rotate-290 " />

          <HTMLIcon className="absolute left-5 -bottom-5 opacity-50 w-15 h-15 -rotate-20 " />
        </div>
      </div>
    </div>
  );
}
