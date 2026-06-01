import { MediaImage } from '../Media'
import { Icon } from '../Icon'
import type { Locale } from '@/lib/i18n'

type Facet = {
  label?: string
  role?: string
  org?: string
  orgUrl?: string
  meta?: string
  projectLabel?: string
  projectUrl?: string
}

function FacetBlock({ facet }: { facet: Facet }) {
  if (!facet?.org) return null
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-bone/45">{facet.label}</div>
      <p className="mt-1.5 text-sm text-bone/80 md:text-base">
        {facet.role && <span className="text-bone">{facet.role}</span>}
        {facet.role && facet.org && <span className="text-bone/50">, </span>}
        {facet.orgUrl ? (
          <a
            href={facet.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="a-accent"
          >
            {facet.org}
          </a>
        ) : (
          facet.org
        )}
      </p>
      {(facet.meta || facet.projectLabel) && (
        <p className="mt-1 text-xs text-bone/55 md:text-sm">
          {facet.meta}
          {facet.projectLabel && (
            <>
              {facet.projectUrl ? (
                <a
                  href={facet.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-accent"
                >
                  {facet.projectLabel}
                </a>
              ) : (
                facet.projectLabel
              )}
            </>
          )}
        </p>
      )}
    </div>
  )
}

export function HeroBlock({ block, locale: _locale }: { block: any; locale: Locale }) {
  const name: string = block.name || block.title || 'Bandar Shanneik'
  const descriptor: string = block.descriptor || ''
  const tagline: string = block.tagline || block.body || ''
  const linkedin: string = block.linkedin || 'https://www.linkedin.com/in/bandar-shanneik'

  return (
    <section className="container-page flex h-[calc(100svh-73px)] items-center overflow-hidden py-6 md:py-8">
      <div className="grid w-full items-center gap-8 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <div className="order-1 md:order-1 md:col-span-5">
          {block.image && (
            <MediaImage
              media={block.image}
              className="mx-auto h-[38vh] w-auto max-w-full object-cover object-center md:h-[70vh] md:max-h-[620px]"
              priority
              sizes="(min-width: 768px) 42vw, 80vw"
            />
          )}
        </div>

        {/* Name + descriptor + facets */}
        <div className="order-2 md:order-2 md:col-span-7 md:pl-6">
          <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[0.98] tracking-tight text-bone">
            {name}
          </h1>
          {descriptor && (
            <p className="mt-4 font-display text-[clamp(1.25rem,2.6vw,1.85rem)] leading-snug text-accent">
              {descriptor}
            </p>
          )}
          {tagline && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg">
              {tagline}
            </p>
          )}

          {(block.practice || block.research) && (
            <div className="mt-7 grid max-w-xl gap-x-10 gap-y-5 sm:grid-cols-2">
              <FacetBlock facet={block.practice} />
              <FacetBlock facet={block.research} />
            </div>
          )}

          <div className="mt-6">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex text-bone/55 transition-colors hover:text-accent"
            >
              <Icon name="linkedin" className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
