"use client"

export function Banner() {
  return (
    <section
      className="relative isolate w-full overflow-hidden rounded-none bg-gradient-to-r from-pink-500 to-fuchsia-600"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h1 id="cta-heading" className="text-balance text-3xl font-semibold text-white md:text-5xl">
          Discover Our Latest Collection
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-sm text-white/90 md:text-base">Special offers available now</p>
        <div className="mt-6">
          <a
            href="#collections"
            className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-fuchsia-700 shadow-sm transition hover:bg-slate-100"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}
