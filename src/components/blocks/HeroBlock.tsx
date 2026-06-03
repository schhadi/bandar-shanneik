import Link from 'next/link'
import { MediaImage } from '../Media'
import { Icon } from '../Icon'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { getHeaderData } from '@/lib/header'
import type { Locale } from '@/lib/i18n'

const LINKEDIN_URL = 'https://linkedin.com/in/bandar-shanneik'

export async function HeroBlock({ block, locale }: { block: any; locale: Locale }) {
  const title: string = block.title || ''
  const nameLines = title.split(' ').filter(Boolean)
  const descriptor: string | undefined = block.descriptor
  const subheading: string | undefined = block.subheading
  const linkedinUrl: string = block.linkedinUrl || LINKEDIN_URL
  const { nav, showLanguageSwitcher } = await getHeaderData(locale)
  // Contact is reachable from the header/footer; keep the home boxes focused.
  const navLinks = nav.filter((link) => !link.href.replace(/\/$/, '').endsWith('/contact'))

  return (
    <section className="relative flex h-[100svh] flex-col overflow-hidden md:flex-row">
      <style>{`html, body { overflow: hidden; height: 100svh; }`}</style>

      {/* LinkedIn + language switcher — desktop: fixed to the top-right of the screen */}
      <div className="absolute right-6 top-6 z-20 hidden items-center gap-4 md:flex md:right-12 lg:right-16">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-8 w-8 items-center justify-center text-bone/55 hover:text-accent"
        >
          <Icon name="linkedin" className="h-4 w-4" />
        </a>
        {showLanguageSwitcher && <LanguageSwitcher locale={locale} />}
      </div>

      {/* Photo — full left half of the screen, edge to edge */}
      <div className="relative h-[46svh] w-full shrink-0 md:h-full md:w-1/2 md:shrink">
        {block.image && (
          <MediaImage
            media={block.image}
            className="h-full w-full object-cover object-[50%_22%] md:object-[50%_60%]"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}
      </div>

      {/* Content — right half */}
      <div className="flex min-h-0 flex-1 flex-col justify-start px-6 py-6 md:w-1/2 md:justify-center md:px-12 md:py-10 lg:px-16">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
            {nameLines.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>

          {/* LinkedIn + language switcher — mobile: beside the name */}
          <div className="flex shrink-0 items-center gap-4 pt-1 md:hidden">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center text-bone/55 hover:text-accent"
            >
              <Icon name="linkedin" className="h-4 w-4" />
            </a>
            {showLanguageSwitcher && <LanguageSwitcher locale={locale} />}
          </div>
        </div>
        {descriptor && (
          <p className="mt-5 text-sm uppercase tracking-wider text-accent md:mt-6">
            {descriptor}
          </p>
        )}
        {subheading && (
          <p className="mt-3 max-w-sm text-base leading-relaxed text-bone/70 md:text-lg">
            {subheading}
          </p>
        )}

        {navLinks.length > 0 && (
          <nav className="mt-8 grid grid-cols-2 gap-2.5 md:mt-10 md:max-w-xs">
            {navLinks.map((link, i) => {
              // Centre the last item when the count is odd so it doesn't sit
              // alone on the left of the row.
              const isLoneLast = i === navLinks.length - 1 && navLinks.length % 2 === 1
              return (
                <Link
                  key={i}
                  href={link.href}
                  target={link.newTab ? '_blank' : undefined}
                  className={`rounded-xl border border-line px-4 py-2.5 text-sm text-bone transition-colors hover:border-bone hover:text-accent ${
                    isLoneLast ? 'col-span-2 w-2/5 justify-self-center' : ''
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </section>
  )
}
