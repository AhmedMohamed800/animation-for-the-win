import PapperEdge from "../_components/PapperEdge";

export default function SecondBookPage() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden rounded-xs bg-white text-black">
      <PapperEdge color="#155dfc" />

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="flex items-start justify-between border-b border-black/15 pb-5 sm:pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/50 sm:text-xs sm:tracking-[0.25em]">
                Chapter 02
              </span>

              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl">
                Second
              </h1>
            </div>

            <span className="pt-1 text-[10px] uppercase tracking-widest text-black/50 sm:text-xs">
              02 / 04
            </span>
          </header>

          {/* Intro */}
          <section className="mt-10 sm:mt-14 md:mt-16">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 sm:text-xs">
              Exploration
            </p>

            <h2 className="mt-4 max-w-3xl text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              The second page is where the ideas start taking shape.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-black/60 sm:mt-7 sm:text-base sm:leading-7">
              Every project starts with an experiment. Some work, some fail, and
              some lead somewhere completely unexpected.
            </p>
          </section>

          {/* Main content */}
          <section className="mt-12 grid gap-8 sm:mt-16 md:mt-20 md:grid-cols-[0.45fr_1fr] md:gap-10">
            {/* Text */}
            <div className="order-2 flex flex-col justify-end md:order-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 sm:text-xs">
                Note 02
              </span>

              <p className="mt-3 max-w-md text-base leading-6 sm:text-lg sm:leading-7">
                Don&lsquo;t aim for perfect on the first attempt. Build
                something, break it, learn from it, and build it again.
              </p>

              <div className="mt-6 h-px w-16 bg-[#155dfc]" />
            </div>

            {/* Visual */}
            <div className="order-1 hidden lg:flex items-center justify-center  aspect-video bg-[#155dfc] sm:aspect-video md:order-2">
              <div className="flex h-full items-center justify-center p-6 text-center text-white sm:p-8">
                <span className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  KEEP
                  <br />
                  GOING
                </span>
              </div>
            </div>
          </section>

          {/* Metadata */}
          <section className="mt-12 grid grid-cols-2 gap-y-6 border-t border-black/15 pt-6 sm:mt-16 sm:grid-cols-3 sm:gap-y-0 sm:pt-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 sm:text-xs">
                Date
              </span>

              <p className="mt-1.5 text-sm sm:mt-2 sm:text-base">August 2026</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 sm:text-xs">
                Category
              </span>

              <p className="mt-1.5 text-sm sm:mt-2 sm:text-base">Exploration</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 sm:text-xs">
                Page
              </span>

              <p className="mt-1.5 text-sm sm:mt-2 sm:text-base">02</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
