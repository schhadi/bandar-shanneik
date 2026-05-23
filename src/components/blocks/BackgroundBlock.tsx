import { CTAButton } from '../CTAButton'
import { MediaImage } from '../Media'
import { RichTextRenderer } from '@/lib/lexical'
import { Reveal } from '../Reveal'
import { Tilt } from '../Tilt'
import { Magnetic } from '../Magnetic'
import type { Locale } from '@/lib/i18n'

export function BackgroundBlock({ block, locale }: { block: any; locale: Locale }) {
  return (
    <section className="container-page grid gap-16 py-28 md:grid-cols-12">
      {/* Sticky image column */}
      <div className="md:col-span-5">
        <div className="sticky top-32">
          {block.image && (
            <Tilt max={4}>
              <div className="img-zoom overflow-hidden">
                <MediaImage
                  media={block.image}
                  className="h-auto w-full object-contain grayscale transition-all duration-700 hover:grayscale-0"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  priority
                />
              </div>
            </Tilt>
          )}
          <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
            <span>Bandar Shanneik</span>
            <span>Senior Counsel</span>
          </div>
        </div>
      </div>

      {/* Text column */}
      <div className="md:col-span-7 md:pl-12">
        <Reveal>
          <div className="eyebrow mb-10">02 / {block.heading || 'Background'}</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="font-display text-6xl font-light leading-[0.9] tracking-display md:text-8xl">
            <span className="italic text-accent">A</span> practice at the{' '}
            <span className="italic">intersection</span> of two legal worlds.
          </h2>
        </Reveal>

        <Reveal delay={2} className="mt-12 max-w-xl text-lg leading-relaxed text-bone/75">
          <RichTextRenderer data={block.body} />
        </Reveal>

        {Array.isArray(block.cta) && block.cta.length > 0 && (
          <Reveal delay={3} className="mt-10 flex flex-wrap gap-3">
            {block.cta.map((c: any, i: number) => (
              <Magnetic key={i} strength={0.25}>
                <CTAButton link={c?.link} locale={locale} />
              </Magnetic>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
