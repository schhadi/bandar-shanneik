import { Icon } from '../Icon'

const kindLabel: Record<string, string> = {
  'peer-reviewed': 'PEER-REVIEWED',
  'book-chapter': 'BOOK CHAPTER',
  'legal-article': 'LEGAL ARTICLE',
  'working-paper': 'WORKING PAPER',
  other: 'PUBLICATION',
}

export function ResearchTimelineBlock({ block }: { block: any }) {
  let entries: Array<{
    year: string
    kind: string
    title: string
    venue?: string
    status?: string
  }> = []

  if (block.mode === 'manual') {
    entries = (block.manualItems || []).map((m: any) => ({
      year: m.year,
      kind: m.kind || 'other',
      title: m.title,
      venue: m.venue,
      status: m.status,
    }))
  } else {
    const pubs: any[] = block.publications || []
    entries = pubs
      .filter((p) => typeof p === 'object' && p)
      .map((p: any) => ({
        year: p.year,
        kind: p.kind || 'other',
        title: p.title,
        venue: p.venue,
        status: p.status,
      }))
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-forest">{block.heading || 'Selected Publications'}</h3>
      </div>
      <div className="mt-2 h-px w-full bg-gold/40" />
      <ol className="relative mt-8 space-y-10 border-l-2 border-gold/50 pl-8">
        {entries.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[39px] top-1 inline-block h-5 w-5 rounded-full border-2 border-gold bg-cream-50" />
            <div className="inline-flex rounded-lg border border-gold/50 px-3 py-1 text-xs text-gold-dark">
              {e.year}
            </div>
            <div className="mt-3 text-xs font-medium tracking-widest text-gold">
              {kindLabel[e.kind] || 'PUBLICATION'}
            </div>
            <h4 className="mt-1 font-serif text-lg leading-snug text-forest">{e.title}</h4>
            {(e.venue || e.status) && (
              <div className="mt-2 text-sm text-forest/70">
                {e.venue && <span className="font-medium text-forest">{e.venue}</span>}
                {e.venue && e.status && ' '}
                {e.status && <span>- {e.status}</span>}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ResearchTimelineSection({ block }: { block: any }) {
  return (
    <section className="container-page py-16">
      <ResearchTimelineBlock block={block} />
    </section>
  )
}
