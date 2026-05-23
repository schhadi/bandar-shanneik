import { Reveal } from '../Reveal'

export function ServiceCardsBlock({ block }: { block: any }) {
  const cards: any[] = block.cards || []
  return (
    <section className="container-page border-t border-line py-28">
      {/* Header: heading left, intro right */}
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="eyebrow mb-8">04 / Services</div>
            <h2 className="font-display text-6xl font-light leading-[0.9] tracking-display md:text-8xl">
              {block.heading?.split(' ').map((w: string, i: number, arr: string[]) => (
                <span key={i} className={i === arr.length - 1 ? 'italic text-accent' : ''}>
                  {w}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              )) || 'Legal Services'}
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-8">
          {block.intro && (
            <Reveal delay={1}>
              <p className="text-base leading-relaxed text-bone/70 md:text-lg">{block.intro}</p>
            </Reveal>
          )}
        </div>
      </div>

      {/* Service list — hover-expanding editorial rows */}
      <ul className="mt-24 border-t border-line">
        {cards.map((c, i) => (
          <Reveal
            as="li"
            key={i}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="group relative isolate border-b border-line"
          >
            {/* Hover background swipe */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-bone/[0.04] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
            />
            <div className="grid items-start gap-6 px-2 py-10 md:grid-cols-12 md:gap-12 md:py-14">
              {/* Number */}
              <div className="md:col-span-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40 transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-5">
                <h3 className="font-display text-4xl font-light leading-[0.95] tracking-display text-bone transition-colors group-hover:text-accent md:text-6xl">
                  <span className="inline-block transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
                    {c.title}
                  </span>
                </h3>
              </div>

              {/* Body */}
              <div className="md:col-span-5">
                {c.body && (
                  <p className="text-base leading-relaxed text-bone/70 md:text-lg">{c.body}</p>
                )}
              </div>

              {/* Arrow */}
              <div className="hidden md:col-span-1 md:flex md:justify-end">
                <span className="font-mono text-2xl text-bone/40 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
