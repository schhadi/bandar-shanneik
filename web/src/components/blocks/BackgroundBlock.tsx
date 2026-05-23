import { CTAButton } from '../CTAButton'
import { MediaImage } from '../Media'
import { RichTextRenderer } from '@/lib/lexical'
import type { Locale } from '@/lib/i18n'

export function BackgroundBlock({ block, locale }: { block: any; locale: Locale }) {
  return (
    <section className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
      <div className="max-w-2xl">
        <h2 className="font-serif text-5xl text-forest">{block.heading || 'Background'}</h2>
        <div className="mt-6 text-sm leading-relaxed text-forest/80">
          <RichTextRenderer data={block.body} />
        </div>
        {Array.isArray(block.cta) && block.cta.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {block.cta.map((c: any, i: number) => (
              <CTAButton key={i} link={c?.link} locale={locale} />
            ))}
          </div>
        )}
      </div>
      <div>
        {block.image && (
          <MediaImage media={block.image} className="h-auto w-full rounded-lg object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
        )}
      </div>
    </section>
  )
}
