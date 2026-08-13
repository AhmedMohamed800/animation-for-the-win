export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="realtive flex flex-col min-h-screen bg-[#191919]">
      <nav className="flex items-center justify-center sticky top-0 left-0 z-3  gap-4 bg-[#191919] border-b border-b-gray-100 p-4 ">
        <p className=" uppercase text-xl font-semibold">
          Animation For The Win
        </p>
      </nav>
      <main className=" h-full flex-1 bg-[#191919] mt-12">{children}</main>
    </div>
  );
}
