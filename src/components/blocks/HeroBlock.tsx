import { CTAButton } from '../CTAButton'
import { MediaImage } from '../Media'
import type { Locale } from '@/lib/i18n'

export function HeroBlock({ block, locale }: { block: any; locale: Locale }) {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7 md:order-2">
          <h1 className="text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            {block.title}
          </h1>
          {block.body && (
            <p className="mt-8 max-w-xl text-base leading-relaxed text-bone/75">{block.body}</p>
          )}
          {Array.isArray(block.ctas) && block.ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {block.ctas.map((c: any, i: number) => (
                <CTAButton key={i} link={c?.link} locale={locale} />
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-5 md:order-1">
          {block.image && (
            <MediaImage
              media={block.image}
              className="h-auto w-full max-w-md object-cover"
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          )}
        </div>
      </div>
    </section>
  )
}
