import clsx from 'clsx'
import { CTAButton } from '../CTAButton'
import { MediaImage } from '../Media'
import type { Locale } from '@/lib/i18n'

export function HeroBlock({ block, locale }: { block: any; locale: Locale }) {
  const imgClass = clsx('h-full w-full object-cover', {
    'rounded-3xl': block.imageStyle === 'rounded' || !block.imageStyle,
    'rounded-none': block.imageStyle === 'sharp',
    'rounded-full': block.imageStyle === 'circle',
  })
  return (
    <section className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
      <div className="fade-in">
        {block.eyebrow && (
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            {block.eyebrow}
          </div>
        )}
        <h1 className="font-serif text-5xl leading-tight text-forest md:text-7xl">
          {block.title}
        </h1>
        {block.body && (
          <p className="mt-8 max-w-md text-base leading-relaxed text-forest/75">{block.body}</p>
        )}
        {Array.isArray(block.ctas) && block.ctas.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4">
            {block.ctas.map((c: any, i: number) => (
              <CTAButton key={i} link={c?.link} locale={locale} />
            ))}
          </div>
        )}
      </div>
      <div className="fade-in">
        {block.image && (
          <div className="overflow-hidden">
            <MediaImage media={block.image} className={imgClass} priority sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  )
}
