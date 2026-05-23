import { Reveal } from '../Reveal'

export function PracticeAreasBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <section className="container-page py-20">
      <Reveal>
        <div className="mb-8 flex items-baseline justify-between border-b border-line pb-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">
            {block.heading || 'Practice Areas'}
          </h3>
          <span className="font-mono text-[11px] text-bone/30">
            {items.length.toString().padStart(2, '0')}
          </span>
        </div>
      </Reveal>
      <ul className="flex flex-wrap gap-2">
        {items.map((t, i) => (
          <Reveal as="li" key={i} delay={(Math.min(i % 4, 3) + 1) as 1 | 2 | 3} className="tag transition-colors hover:border-accent hover:text-accent">
            {t.label}
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
