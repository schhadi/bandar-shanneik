import Link from 'next/link'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { Magnetic } from '../Magnetic'
import { resolveHref, type LinkData } from '@/lib/resolveLink'
import type { Locale } from '@/lib/i18n'

function OnDarkButton({ link, locale }: { link: LinkData; locale: Locale }) {
  if (!link?.label) return null
  const href = resolveHref(link, locale)
  const arrow = link.newTab ? '↗' : '→'
  const className =
    'group relative inline-flex items-center justify-between gap-8 overflow-hidden whitespace-nowrap rounded-full border border-ink/30 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-colors duration-500 ease-out-expo hover:border-accent hover:text-bone'
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
      />
      <span className="relative z-10">{link.label}</span>
      <span className="relative z-10 inline-flex items-center text-base leading-none transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
        {arrow}
      </span>
    </>
  )
  if (link.type === 'external') {
    return (
      <a
        href={href}
        target={link.newTab ? '_blank' : undefined}
        rel={link.newTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}

export function CTABannerBlock({ block, locale }: { block: any; locale: Locale }) {
  const words = (block.heading || '').split(' ')
  return (
    <section className="border-y border-line bg-bone text-ink">
      <div className="container-page py-20 md:py-28">
        <div className="grid items-end gap-10 md:grid-cols-12">
          {/* Heading */}
          <div className="md:col-span-7">
            <Reveal>
              <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 before:block before:h-px before:w-8 before:bg-ink/30">
                → Get in touch
              </div>
            </Reveal>
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-display text-ink md:text-6xl lg:text-7xl">
              <SplitText
                text={block.heading || ''}
                splitBy="char"
                delayStep={26}
                accentLastWord
              />
            </h2>
          </div>

          {/* Subtext + button */}
          <div className="flex flex-col items-start gap-6 md:col-span-5 md:items-end">
            {block.subtext && (
              <Reveal delay={2}>
                <p className="max-w-xs text-sm leading-relaxed text-ink/65 md:text-right">{block.subtext}</p>
              </Reveal>
            )}
            <Reveal delay={3}>
              <div className="flex flex-wrap gap-3">
                {(block.cta || []).map((c: any, i: number) => (
                  <Magnetic key={i} strength={0.3}>
                    <OnDarkButton link={c?.link} locale={locale} />
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
