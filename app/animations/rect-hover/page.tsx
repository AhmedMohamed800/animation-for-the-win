import ReactHoverComponent from "./_components/ReactHoverComponent";
import { ShiledIcon, AxeIcon, ArrowIcon, BugIcon } from "./_components/Icons";

export default function RectHover() {
  return (
    <div
      className="flex flex-col  gap-8 justify-center min-h-screen bg-white px-8 py-5"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div className="border-b-2 border-b-black pb-8">
        <h1 className="text-black text-[20px] max-w-120 font-[600] leading-[110%]">
          Animation for the Win is a collection of web animation recreations
          inspired by some of the most creative websites on the internet.
        </h1>
      </div>

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: `repeat( auto-fit, minmax(250px, 1fr) )`,
        }}
      >
        <ReactHoverComponent>
          <div className="flex flex-col  gap-6 justify-between h-100 bg-black flex-1 p-2">
            <h1 className="text-7xl">99%</h1>
            <AxeIcon />
            <p className="text-xl font-bold leading-[120%]">
              Smooth animations on every frame.
            </p>
          </div>
        </ReactHoverComponent>
        <ReactHoverComponent>
          <div className="flex flex-col gap-6 justify-between h-100 bg-black flex-1 p-2">
            <h1 className="text-7xl">100%</h1>
            <ShiledIcon />
            <p className="text-xl font-bold leading-[120%]">
              Built from scratch. With precision always.
            </p>
          </div>
        </ReactHoverComponent>
        <ReactHoverComponent>
          <div className="flex flex-col gap-6 justify-between h-100 bg-black flex-1 p-2">
            <h1 className="text-7xl">99%+</h1>
            <ArrowIcon />
            <p className="text-xl font-bold leading-[120%]">
              Pixel-perfect recreations. Every detail matters.
            </p>
          </div>
        </ReactHoverComponent>
        <ReactHoverComponent>
          <div className="flex flex-col gap-6 justify-between h-100 bg-black flex-1 p-2">
            <h1 className="text-7xl">500,000</h1>
            <BugIcon />
            <p className="text-xl font-bold leading-[120%]">
              Frames animated and counting.
            </p>
          </div>
        </ReactHoverComponent>
      </div>
    </div>
  );
}
