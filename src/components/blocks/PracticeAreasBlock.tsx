import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'

export function PracticeAreasBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <section className="container-page border-t border-line py-28">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Heading column */}
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow mb-8">05 / Areas</div>
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-display md:text-6xl">
              {block.heading || 'Practice Areas'}
            </h2>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
              {items.length.toString().padStart(2, '0')} disciplines
            </div>
          </Reveal>
        </div>

        {/* Items — editorial display list */}
        <ul className="md:col-span-8 md:col-start-5">
          {items.map((t, i) => (
            <Reveal
              as="li"
              key={i}
              delay={(Math.min(i % 4, 3) + 1) as 1 | 2 | 3}
              className="group flex items-baseline justify-between gap-6 border-b border-line py-5 transition-colors"
            >
              <span className="flex items-baseline gap-6">
                <span className="font-mono text-[11px] tracking-[0.25em] text-bone/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-3xl font-light italic leading-tight transition-colors group-hover:text-accent md:text-4xl">
                  {t.label}
                </span>
              </span>
              <span className="font-mono text-base text-bone/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
