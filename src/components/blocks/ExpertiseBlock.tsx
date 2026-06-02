import { labels, type Locale } from '@/lib/i18n'

type Item = { label?: string }
type Jurisdiction = { name?: string }

function MetaLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-xs uppercase tracking-wider text-bone/55">{children}</div>
}

export function ExpertiseBlock({ block, locale }: { block: any; locale: Locale }) {
  const l = labels[locale]
  const heading: string = block.heading || 'Areas of Expertise'
  const intro: string | undefined = block.intro
  const jurisdictions: Jurisdiction[] = block.jurisdictions || []
  const items: Item[] = block.items || []

  return (
    <section className="container-page py-20 md:py-28">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-medium leading-tight md:text-5xl">{heading}</h1>
        {intro && (
          <p className="mt-6 text-base leading-relaxed text-bone/80 md:text-lg">{intro}</p>
        )}
      </div>

      {jurisdictions.length > 0 && (
        <div className="mt-10">
          <MetaLabel>{l.jurisdictions}</MetaLabel>
          <p className="text-base text-bone">
            {jurisdictions.map((j) => j.name).filter(Boolean).join(' · ')}
          </p>
        </div>
      )}

      {items.length > 0 && (
        <ul className="mt-16 grid gap-x-12 gap-y-4 md:mt-24 md:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-2xl font-medium leading-snug tracking-[-0.02em] text-bone md:text-3xl"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
