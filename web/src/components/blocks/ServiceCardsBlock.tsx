import { Reveal } from '../Reveal'

export function ServiceCardsBlock({ block }: { block: any }) {
  const cards: any[] = block.cards || []
  return (
    <section className="container-page border-t border-line py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow mb-8">04 / Services</div>
            <h2 className="font-display text-6xl font-light leading-[0.9] tracking-display">
              {block.heading || 'Legal Services'}
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          {block.intro && (
            <Reveal delay={1}>
              <p className="text-base leading-relaxed text-bone/70 md:text-lg">{block.intro}</p>
            </Reveal>
          )}
        </div>
      </div>

      <ul className="mt-20 grid border-y border-line md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal
            as="li"
            key={i}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="group relative flex min-h-[320px] flex-col justify-between border-line p-10 transition-colors duration-500 hover:bg-ink-800 md:border-r [&:last-child]:border-r-0"
          >
            <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </div>
            <div>
              <h3 className="font-display text-3xl font-light leading-tight text-bone transition-colors group-hover:text-accent md:text-4xl">
                {c.title}
              </h3>
              {c.body && (
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/60">{c.body}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
