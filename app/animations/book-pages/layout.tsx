export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-container realtive flex flex-col min-h-screen bg-[#191919]">
      <nav className="sticky top-0 left-0 z-30 flex items-center justify-center gap-4 border-b border-white/15 bg-black/30 p-4 backdrop-blur-xl">
        <p className="text-xl font-semibold uppercase">Animation For The Win</p>
      </nav>
      <main className=" h-full flex-1 bg-[#191919] mt-12">{children}</main>
    </div>
  );
}
