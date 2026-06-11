import Image from 'next/image'
import { labels, type Locale } from '@/lib/i18n'
import { ExpertiseAreas } from './ExpertiseAreas'

type Area = { title?: string; description?: string }
type Jurisdiction = { name?: string }
type Membership = { name?: string }
type Language = { native?: string; name?: string }

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
  const languages: Language[] = block.languages || []
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
          <div className="grid gap-1 sm:grid-cols-3 sm:gap-4">
            {jurisdictions.map((j, i) => (
              <div
                key={i}
                className="-mx-3 rounded-lg px-3 py-2 text-lg text-bone transition-[background-color,transform,color] duration-300 ease-out hover:translate-x-1.5 hover:bg-ink-800 hover:text-accent md:text-xl"
              >
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
          <div className="grid gap-1 sm:grid-cols-2 sm:gap-4">
            {memberships.map((m, i) => (
              <div
                key={i}
                className="-mx-3 rounded-lg px-3 py-2 text-base text-bone transition-[background-color,transform,color] duration-300 ease-out hover:translate-x-1.5 hover:bg-ink-800 hover:text-accent md:text-lg"
              >
                {m.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages — subtle inline row of native-script endonyms */}
      {languages.length > 0 && (
        <div className="mt-14 md:mt-20">
          <Eyebrow>{l.languages}</Eyebrow>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-bone/70 md:text-lg">
            {languages.map((lang, i) => (
              <span key={i} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-bone/25">
                    ·
                  </span>
                )}
                <span dir="auto" lang={lang.native === 'العربية' ? 'ar' : undefined}>
                  {lang.native}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
