import ReactHoverComponent from "./_components/ReactHoverComponent";
import { ShiledIcon, AxeIcon, ArrowIcon, BugIcon } from "./_components/Icons";

export default function RectHover() {
  return (
    <div
      className="flex flex-col  gap-8 min-h-screen bg-white px-8 py-8"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div className="border-b-2 border-b-black pb-8">
        <h1 className="text-black text-[20px] lg:max-w-200 font-[600] leading-[110%]">
          Animation for the Win is a collection of web animation recreations
          inspired by some of the most creative websites on the internet.
        </h1>
      </div>

      <div
        className="grid flex-1 gap-5"
        style={{
          gridTemplateColumns: `repeat( auto-fit, minmax(250px, 1fr) )`,
        }}
      >
        <ReactHoverComponent color="#155DFC">
          <div className="flex flex-col  gap-6 justify-between h-full bg-[#CA1937]  flex-1 p-4">
            <h1 className="text-[40px]  font-bold">99%</h1>
            <AxeIcon />
            <p className="text-sm font-light leading-[120%]">
              Smooth animations on every frame.
            </p>
          </div>
        </ReactHoverComponent>
        <ReactHoverComponent color="#CA1937">
          <div className="flex flex-col gap-6 justify-between h-full bg-[#155DFC] flex-1 p-4">
            <h1 className="text-[40px] font-bold">100%</h1>
            <ShiledIcon />
            <p className="text-sm font-light leading-[120%]">
              Built from scratch. With precision always.
            </p>
          </div>
        </ReactHoverComponent>
        <ReactHoverComponent color="#15FC47">
          <div className="flex flex-col gap-6 justify-between h-full bg-[#6A15FC] flex-1 p-4">
            <h1 className="text-[40px] font-bold">99%+</h1>
            <ArrowIcon />
            <p className="text-sm font-light leading-[120%]">
              Pixel-perfect recreations. Every detail matters.
            </p>
          </div>
        </ReactHoverComponent>
        <ReactHoverComponent color="#6A15FC">
          <div className="flex flex-col gap-6 justify-between h-full bg-[#15FC47] flex-1 p-4">
            <h1 className="text-[40px] font-bold text-black">500,000</h1>
            <BugIcon />
            <p className="text-sm font-light leading-[120%] text-black">
              Frames animated and counting.
            </p>
          </div>
        </ReactHoverComponent>
      </div>
    </div>
  );
}
