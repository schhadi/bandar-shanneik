import Image from 'next/image'
import { labels, type Locale } from '@/lib/i18n'
import { ExpertiseAreas } from './ExpertiseAreas'

type Area = { title?: string; description?: string }
type Jurisdiction = { name?: string }
type Membership = { name?: string }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">{children}</div>
  )
}

export function ExpertiseBlock({ block, locale }: { block: any; locale: Locale }) {
  const l = labels[locale]
  const heading: string = block.heading || 'Advisory'
  const lead: string | undefined = block.lead
  const intro: string | undefined = block.intro
  const jurisdictions: Jurisdiction[] = block.jurisdictions || []
  const areas: Area[] = block.areas || []
  const memberships: Membership[] = block.memberships || []
  const position = block.position as
    | { label?: string; title?: string; firm?: string; blurb?: string; linkUrl?: string }
    | undefined

  return (
    <section className="container-page py-16 md:py-24">
      {/* Opening */}
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-medium leading-tight md:text-5xl">{heading}</h1>
          {lead && (
            <p className="mt-6 text-xl font-medium leading-snug text-bone md:text-2xl">{lead}</p>
          )}
          {intro && (
            <p className="mt-5 text-base leading-relaxed text-bone/75 md:text-lg">{intro}</p>
          )}
        </div>

        {position?.title && (
          <aside className="shrink-0 self-start md:mt-2 md:w-72">
            {position.label && (
              <div className="text-base font-semibold uppercase tracking-wider text-accent">
                {position.label}
              </div>
            )}
            <h2 className="mt-3 text-xl font-medium leading-snug text-bone md:text-2xl">
              {position.title}
            </h2>
            {position.firm && (
              <div className="mt-5 rounded-2xl border border-line bg-white p-6 text-center shadow-[0_1px_3px_rgba(17,17,17,0.05)]">
                <Image
                  src="/daburon-partners-logo.jpg"
                  alt={position.firm}
                  width={1560}
                  height={300}
                  className="mx-auto h-auto w-full max-w-[220px]"
                />
                {position.blurb && (
                  <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-bone/65">
                    {position.blurb}
                  </p>
                )}
                {position.linkUrl && (
                  <a
                    href={position.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                  >
                    daburon-partners.com
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            )}
          </aside>
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

      {/* Practice areas — click a heading to reveal its description */}
      {areas.length > 0 && (
        <div className="mt-14 md:mt-20">
          <Eyebrow>{l.practiceAreas}</Eyebrow>
          <ExpertiseAreas areas={areas} />
        </div>
      )}

      {/* Memberships */}
      {memberships.length > 0 && (
        <div className="mt-14 md:mt-20">
          <Eyebrow>{l.memberships}</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
            {memberships.map((m, i) => (
              <div key={i} className="text-base text-bone md:text-lg">
                {m.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
