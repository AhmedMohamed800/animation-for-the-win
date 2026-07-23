import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen p-8">
      <h1 className="text-2xl uppercase font-medium ">
        You can view the animations that I created Here
      </h1>

      <div className="flex mt-4 gap-4">
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
      </div>
    </div>
  );
}
