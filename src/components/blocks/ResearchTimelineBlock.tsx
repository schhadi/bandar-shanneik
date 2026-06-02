type Entry = {
  year: string
  kind?: string
  title: string
  venue?: string
  status?: string
}

function entriesFromBlock(block: any): Entry[] {
  if (block.mode === 'manual') {
    return (block.manualItems || []).map((m: any) => ({
      year: m.year,
      kind: m.kind,
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
      kind: p.kind,
      title: p.title,
      venue: p.venue,
      status: p.status,
    }))
}

export function ResearchTimelineBlock({ block }: { block: any }) {
  const entries = entriesFromBlock(block)
  return (
    <div>
      <h3 className="mb-6 text-sm uppercase tracking-wider text-bone/55">
        {block.heading || 'Selected Publications'}
      </h3>
      <ul className="space-y-3">
        {entries.map((e, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 text-base leading-snug">
            <div className="col-span-2 text-bone/55 md:col-span-1">{e.year}</div>
            <div className="col-span-10 md:col-span-11">
              <span className="text-bone">{e.title}</span>
              {e.venue && <span className="text-bone/70"> — {e.venue}</span>}
              {e.status && <span className="text-bone/55 italic"> ({e.status})</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ResearchTimelineSection({ block }: { block: any }) {
  const padding = block.compact ? 'pb-16 md:pb-20' : 'py-24 md:py-32'
  return (
    <section className={`container-page ${padding}`}>
      <ResearchTimelineBlock block={block} />
    </section>
  )
}
