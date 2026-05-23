import { Reveal } from '../Reveal'

const kindLabel: Record<string, string> = {
  'peer-reviewed': 'Peer-reviewed',
  'book-chapter': 'Book chapter',
  'legal-article': 'Legal article',
  'working-paper': 'Working paper',
  other: 'Publication',
}

type Entry = {
  year: string
  kind: string
  title: string
  venue?: string
  status?: string
}

function entriesFromBlock(block: any): Entry[] {
  if (block.mode === 'manual') {
    return (block.manualItems || []).map((m: any) => ({
      year: m.year,
      kind: m.kind || 'other',
      title: m.title,
      venue: m.venue,
      status: m.status,
    }))
  }
  const pubs: any[] = block.publications || []
  return pubs
    .filter((p) => typeof p === 'object' && p)
    .map((p: any) => ({
      year: p.year,
      kind: p.kind || 'other',
      title: p.title,
      venue: p.venue,
      status: p.status,
    }))
}

export function ResearchTimelineBlock({ block }: { block: any }) {
  const entries = entriesFromBlock(block)
  return (
    <div>
      <Reveal>
        <div className="mb-8 flex items-baseline justify-between border-b border-line pb-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">
            {block.heading || 'Selected Publications'}
          </h3>
          <span className="font-mono text-[11px] text-bone/30">
            {entries.length.toString().padStart(2, '0')}
          </span>
        </div>
      </Reveal>
      <ul>
        {entries.map((e, i) => (
          <Reveal
            as="li"
            key={i}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="group grid grid-cols-12 gap-6 border-b border-line py-8 transition-colors hover:bg-ink-800/40"
          >
            <div className="col-span-2 font-mono text-sm text-accent">{e.year}</div>
            <div className="col-span-10">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                {kindLabel[e.kind] || 'Publication'}
              </div>
              <h4 className="font-display text-2xl font-light leading-snug transition-colors group-hover:text-accent md:text-3xl">
                {e.title}
              </h4>
              {(e.venue || e.status) && (
                <div className="mt-3 text-sm text-bone/60">
                  {e.venue && <span className="text-bone/80">{e.venue}</span>}
                  {e.venue && e.status && ' — '}
                  {e.status && <span className="italic">{e.status}</span>}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

export function ResearchTimelineSection({ block }: { block: any }) {
  return (
    <section className="container-page border-t border-line py-28">
      <ResearchTimelineBlock block={block} />
    </section>
  )
}
