import clsx from 'clsx'
import { CTAButton } from '../CTAButton'
import type { Locale } from '@/lib/i18n'

export function CTABannerBlock({ block, locale }: { block: any; locale: Locale }) {
  const bg = block.background || 'forest'
  const wrapClass = clsx('rounded-md px-8 py-12 md:px-14', {
    'bg-forest text-cream-50': bg === 'forest',
    'bg-cream-100 text-forest': bg === 'cream',
    'bg-gold text-white': bg === 'gold',
  })
  const subColor = clsx({
    'text-cream-100/80': bg === 'forest',
    'text-forest/70': bg === 'cream',
    'text-white/85': bg === 'gold',
  })
  return (
    <section className="container-page py-12">
      <div className={wrapClass}>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl">{block.heading}</h3>
            {block.subtext && <p className={`mt-2 text-sm ${subColor}`}>{block.subtext}</p>}
          </div>
          <div className="flex gap-3">
            {(block.cta || []).map((c: any, i: number) => (
              <CTAButton key={i} link={c?.link} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
