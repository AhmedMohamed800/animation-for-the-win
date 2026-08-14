import PapperEdge from "./_components/PapperEdge";

export default function BookPages() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden rounded-xs bg-white text-black">
      <PapperEdge color="red" />

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="flex items-start justify-between border-b border-black/15 pb-5 sm:pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/50 sm:text-xs sm:tracking-[0.25em]">
                Chapter 01
              </span>

              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl">
                First
              </h1>
            </div>

            <span className="pt-1 text-[10px] uppercase tracking-widest text-black/50 sm:text-xs">
              01 / 04
            </span>
          </header>

          {/* Intro */}
          <section className="mt-10 sm:mt-14 md:mt-16">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 sm:text-xs">
              Introduction
            </p>

            <h2 className="mt-4 max-w-3xl text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              A collection of ideas, experiments and things worth remembering.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-black/60 sm:mt-7 sm:text-base sm:leading-7">
              This is the beginning of the story. A place where thoughts,
              projects and experiments are collected together, one page at a
              time.
            </p>
          </section>

          {/* Visual */}
          <section className="mt-12 hidden lg:grid gap-8 sm:mt-16 md:mt-20 md:grid-cols-[1fr_0.45fr] md:gap-10">
            <div className="aspect-[16/10] bg-black sm:aspect-[16/9]">
              <div className="flex h-full items-center justify-center p-6 text-center text-white sm:p-8">
                <span className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  MAKE
                  <br />
                  SOMETHING
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 sm:text-xs">
                Note 01
              </span>

              <p className="mt-3 max-w-md text-base leading-6 sm:text-lg sm:leading-7">
                Good work doesn&lsquo;t have to shout. Sometimes the smallest
                detail is what makes the whole page memorable.
              </p>
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
              <p className="mt-1.5 text-sm sm:mt-2 sm:text-base">Experiments</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/40 sm:text-xs">
                Page
              </span>
              <p className="mt-1.5 text-sm sm:mt-2 sm:text-base">01</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
