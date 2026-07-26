import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen p-8">
      <h1 className="text-2xl uppercase font-medium ">
        You can view the animations that I created Here
      </h1>

      <div className="flex flex-wrap mt-4 gap-4">
        <Link
          href="/animations/polygon-morph"
          className="border border-foreground px-4 py-2 hover:opacity-90"
        >
          Polygon Morph
        </Link>
        <Link
          href="/animations/rect-mask"
          className="border border-foreground px-4 py-2 hover:opacity-90"
        >
          Rectangle Mask
        </Link>

        <Link
          href="/animations/story-timeline"
          className="border border-foreground px-4 py-2 hover:opacity-90"
        >
          Story Timeline
        </Link>

        <Link
          href="/animations/basketball-net-scroll"
          className="border border-foreground px-4 py-2 hover:opacity-90"
        >
          Basketball Net Scroll
        </Link>

        <Link
          href="/animations/scroll-image-reveal"
          className="border border-foreground px-4 py-2 hover:opacity-90"
        >
          Scroll Image Reveal
        </Link>
      </div>
    </div>
  );
}
