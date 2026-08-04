import TrainsitoinLink from "./_components/TransitionLink";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex gap-4 bg-white border-b border-b-black p-4 ">
        <TrainsitoinLink
          href="/animations/page-transition-columns"
          label="Page one"
        />
        <TrainsitoinLink
          href="/animations/page-transition-columns/second-page"
          label="Page Two"
        />
      </nav>
      <main className="bg-white">{children}</main>
    </>
  );
}
