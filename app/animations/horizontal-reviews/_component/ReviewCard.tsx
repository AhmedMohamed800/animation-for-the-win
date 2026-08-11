import Image from "next/image";

interface ReviewCardProps {
  pfImageSrc: string;
  pfImageAlt: string;
  name: string;
  position: string;
  review: string;
  index: number;
}

export default function ReviewCard({
  pfImageSrc,
  pfImageAlt,
  name,
  position,
  review,
  index,
}: ReviewCardProps) {
  return (
    <article
      className="reviewCard flex flex-col justify-between p-4 bg-white text-black h-100 flex-1"
      style={{ transform: `translateY(${index * 50}px)` }}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14">
          <Image
            src={pfImageSrc}
            alt={pfImageAlt}
            fill
            sizes="100"
            className=" object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-[16px]">{name}</h3>
          <p className="text-sm font-light">{position}</p>
        </div>
      </div>
      <p className="text-xl">{review}</p>
    </article>
  );
}
