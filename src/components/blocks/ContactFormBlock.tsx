import { labels, type Locale } from '@/lib/i18n'

type ProfessionalNote = {
  intro?: string
  linkLabel?: string
  linkUrl?: string
  email?: string
}

// Despite the name, this block no longer renders a form — it presents the two
// contact channels (general enquiries and professional legal matters) as cards.
export function ContactFormBlock({ block, locale }: { block: any; locale: Locale }) {
  const l = labels[locale]
  const note: ProfessionalNote | undefined = block.professionalNote
  const introParagraphs: string[] = String(block.intro || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="container-page pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-medium leading-tight md:text-5xl">
          {block.heading || 'Get in touch'}
        </h2>
        {introParagraphs.length > 0 && (
          <div className="mt-5 space-y-4 text-base leading-relaxed text-bone/80 md:text-lg">
            {introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
        {block.email && (
          <div className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_1px_3px_rgba(17,17,17,0.05)] md:p-8">
            <div className="text-base font-semibold uppercase tracking-wider text-accent">
              {l.generalEnquiries}
            </div>
            <a
              href={`mailto:${block.email}`}
              className="link-underline mt-4 text-lg text-bone md:text-xl"
            >
              {block.email}
            </a>
          </div>
        )}

        {(note?.email || (note?.linkLabel && note?.linkUrl)) && (
          <div className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_1px_3px_rgba(17,17,17,0.05)] md:p-8">
            <div className="text-base font-semibold uppercase tracking-wider text-accent">
              {l.professionalMatters}
            </div>
            {note?.linkLabel && note?.linkUrl && (
              <a
                href={note.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-flex items-center gap-1.5 text-lg font-medium text-bone md:text-xl"
              >
                {note.linkLabel}
                <span aria-hidden="true">→</span>
              </a>
            )}
            {note?.email && (
              <a
                href={`mailto:${note.email}`}
                className="link-underline mt-2 text-base text-bone/70"
              >
                {note.email}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
