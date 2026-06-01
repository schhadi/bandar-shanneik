import { CTAButton } from '../CTAButton'
import { MediaImage } from '../Media'
import { RichTextRenderer } from '@/lib/lexical'
import type { Locale } from '@/lib/i18n'

export function BackgroundBlock({ block, locale }: { block: any; locale: Locale }) {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {block.image && (
          <div className="md:col-span-5">
            <MediaImage
              media={block.image}
              className="h-auto w-full object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
              priority
            />
          </div>
        )}

        <div className={block.image ? 'md:col-span-7' : 'md:col-span-12'}>
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            {block.heading || 'Background'}
          </h2>

          <div className="mt-8 max-w-2xl text-base leading-relaxed text-bone/80">
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
      </div>
    </section>
  )
}
