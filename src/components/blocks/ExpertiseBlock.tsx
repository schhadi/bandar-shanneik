import { labels, type Locale } from '@/lib/i18n'

type Area = { title?: string; description?: string }
type Jurisdiction = { name?: string }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-xs uppercase tracking-wider text-accent">{children}</div>
}

export function ExpertiseBlock({ block, locale }: { block: any; locale: Locale }) {
  const l = labels[locale]
  const heading: string = block.heading || 'Advisory'
  const lead: string | undefined = block.lead
  const intro: string | undefined = block.intro
  const jurisdictions: Jurisdiction[] = block.jurisdictions || []
  const areas: Area[] = block.areas || []

  return (
    <section className="container-page py-16 md:py-24">
      {/* Opening */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-medium leading-tight md:text-5xl">{heading}</h1>
        {lead && (
          <p className="mt-6 text-xl font-medium leading-snug text-bone md:text-2xl">{lead}</p>
        )}
        {intro && (
          <p className="mt-5 text-base leading-relaxed text-bone/75 md:text-lg">{intro}</p>
        )}
      </div>

      {/* Bar admissions */}
      {jurisdictions.length > 0 && (
        <div className="mt-12 md:mt-16">
          <Eyebrow>{l.admittedIn}</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-8">
            {jurisdictions.map((j, i) => (
              <div key={i} className="text-lg text-bone md:text-xl">
                {j.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice areas with descriptions */}
      {areas.length > 0 && (
        <div className="mt-14 md:mt-20">
          <Eyebrow>{l.practiceAreas}</Eyebrow>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
            {areas.map((a, i) => (
              <div key={i}>
                <h3 className="text-lg font-medium leading-snug text-bone md:text-xl">{a.title}</h3>
                {a.description && (
                  <p className="mt-2 text-sm leading-relaxed text-bone/70">{a.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
