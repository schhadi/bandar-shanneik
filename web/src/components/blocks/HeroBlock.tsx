import { CTAButton } from '../CTAButton'
import { MediaImage } from '../Media'
import { Marquee } from '../Marquee'
import type { Locale } from '@/lib/i18n'

export function HeroBlock({ block, locale }: { block: any; locale: Locale }) {
  const title: string = block.title || ''
  const words = title.split(' ')

  return (
    <section className="relative flex min-h-[calc(100svh-80px)] flex-col overflow-hidden">
      {/* Status row */}
      <div className="container-page flex shrink-0 items-center justify-between border-b border-line py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
        <span>© {new Date().getFullYear()} — Senior Legal Consultant</span>
        <span className="hidden md:inline">Germany · Middle East · Europe</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Available
        </span>
      </div>

      {/* Title + portrait — fills remaining space */}
      <div className="container-page grid flex-1 items-center gap-6 py-4 md:grid-cols-12 md:gap-12 md:py-6">
        <div className="md:col-span-7">
          {block.eyebrow && <div className="eyebrow mb-6">{block.eyebrow}</div>}
          <h1 className="font-display font-light leading-[0.85] tracking-tightest text-bone text-[clamp(3.5rem,11vw,8.5rem)]">
            {words.map((w, i) => (
              <span key={i} className={i === words.length - 1 ? 'italic text-accent' : ''}>
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
        </div>

        <div className="md:col-span-5">
          {block.image && (
            <div className="overflow-hidden">
              <MediaImage
                media={block.image}
                className="h-[42vh] max-h-[460px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 md:h-[55vh]"
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
              />
            </div>
          )}
        </div>
      </div>

      {/* Description band — compact, also visible above the fold */}
      <div className="container-page grid shrink-0 gap-6 border-t border-line py-6 md:grid-cols-12">
        <div className="md:col-span-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">[ 01 ]</div>
        </div>
        <div className="md:col-span-7">
          {block.body && (
            <p className="max-w-2xl text-balance text-sm leading-relaxed text-bone/75 md:text-base">
              {block.body}
            </p>
          )}
        </div>
        <div className="flex items-center md:col-span-4 md:justify-end">
          {Array.isArray(block.ctas) && block.ctas.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {block.ctas.map((c: any, i: number) => (
                <CTAButton key={i} link={c?.link} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marquee tagline — bottom edge of the viewport */}
      <div className="shrink-0 border-y border-line bg-bone py-1 text-ink">
        <Marquee items={['Cross-border counsel', 'Corporate · M&A', 'Real estate', 'Arbitration', 'Governance']} />
      </div>
    </section>
  )
}
