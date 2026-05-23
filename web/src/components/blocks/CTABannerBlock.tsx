import { CTAButton } from '../CTAButton'
import { Reveal } from '../Reveal'
import type { Locale } from '@/lib/i18n'

export function CTABannerBlock({ block, locale }: { block: any; locale: Locale }) {
  return (
    <section className="border-y border-line bg-bone text-ink">
      <div className="container-page py-28 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/55 before:block before:h-px before:w-8 before:bg-ink/30">
                → Get in touch
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-7xl font-light leading-[0.88] tracking-display text-ink md:text-[9rem]">
                {block.heading?.split(' ').map((w: string, i: number, arr: string[]) => (
                  <span key={i} className={i === arr.length - 1 ? 'italic text-accent' : ''}>
                    {w}
                    {i < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end gap-8 md:col-span-5">
            {block.subtext && (
              <Reveal delay={2}>
                <p className="max-w-sm text-base leading-relaxed text-ink/70">{block.subtext}</p>
              </Reveal>
            )}
            <Reveal delay={3} className="flex flex-wrap gap-3">
              {(block.cta || []).map((c: any, i: number) => (
                <CTAButton key={i} link={c?.link} locale={locale} />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
