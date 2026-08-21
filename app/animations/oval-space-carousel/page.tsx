import PageWrapper from "./_component/PageWrapper";

export default function OvalSpaceCarousel() {
  return (
    <div
      className="flex flex-col flex-1 bg-black text-white mih-h-screen"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <nav className="flex items-center justify-center  text-2xl font-medium py-4  ">
        Animation for the win
      </nav>
      <PageWrapper />
    </div>
  );
}
