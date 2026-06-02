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
  const linkedinUrl: string = block.linkedinUrl || LINKEDIN_URL
  const { nav, showLanguageSwitcher } = await getHeaderData(locale)

  return (
    <section className="relative flex h-[100svh] flex-col overflow-hidden md:flex-row">
      <style>{`html, body { overflow: hidden; height: 100svh; }`}</style>

      {/* Language switcher — fixed to the top-right of the screen */}
      {showLanguageSwitcher && (
        <div className="absolute right-6 top-6 z-20 md:right-12 lg:right-16">
          <LanguageSwitcher locale={locale} />
        </div>
      )}

      {/* Photo — full left half of the screen, edge to edge */}
      <div className="relative h-[50svh] w-full shrink-0 md:h-full md:w-1/2 md:shrink">
        {block.image && (
          <MediaImage
            media={block.image}
            className="h-full w-full object-cover object-[50%_28%] md:object-[50%_60%]"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}
      </div>

      {/* Content — right half */}
      <div className="flex min-h-0 flex-1 flex-col justify-center px-6 py-8 md:w-1/2 md:px-12 md:py-10 lg:px-16">
        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
          {nameLines.map((w, i) => (
            <span key={i} className="block">
              {w}
            </span>
          ))}
        </h1>
        {descriptor && (
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/55 md:mt-6 md:text-base">
            {descriptor}
          </p>
        )}

        {nav.length > 0 && (
          <nav className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:max-w-lg ">
            {nav.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                className="group flex items-center justify-between rounded-2xl border border-line px-4 py-4 text-base text-bone transition-colors hover:border-bone hover:text-accent"
              >
                <span>{link.label}</span>
                <Icon name="arrow" className="h-4 w-4 text-bone/35 group-hover:text-accent" />
              </Link>
            ))}
          </nav>
        )}

        <div className="mt-8 flex items-center gap-5">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center text-bone/45 hover:text-bone"
          >
            <Icon name="linkedin" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
