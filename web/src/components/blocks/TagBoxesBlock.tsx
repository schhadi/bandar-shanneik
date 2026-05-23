import { Reveal } from '../Reveal'

export function TagBoxesBlock({ block }: { block: any }) {
  const items: any[] = block.items || []
  return (
    <Reveal>
      <div className="border border-line p-8">
        <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
          {block.heading || 'Areas of Interest'}
        </div>
        <ul className="flex flex-wrap gap-2">
          {items.map((t, i) => (
            <li key={i} className="tag transition-colors hover:border-accent hover:text-accent">
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
