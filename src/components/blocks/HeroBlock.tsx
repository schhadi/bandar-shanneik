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
    <section className="container-page flex h-[100svh] flex-col overflow-hidden">
      <style>{`html, body { overflow: hidden; height: 100svh; }`}</style>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-8 py-6 md:grid-cols-12 md:grid-rows-1 md:gap-16 md:py-10">
        <div className="relative min-h-0 md:col-span-7">
          {block.image && (
            <MediaImage
              media={block.image}
              className="h-full w-full object-cover object-[47%_22%]"
              priority
              sizes="(min-width: 768px) 58vw, 92vw"
            />
          )}
        </div>

        <div className="flex flex-col justify-end md:col-span-5 md:justify-center">
          <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
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
            <nav className="mt-8 grid grid-cols-2 gap-3 md:mt-10">
              {nav.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  target={link.newTab ? '_blank' : undefined}
                  className="group flex items-center justify-between border border-line px-4 py-4 text-base text-bone transition-colors hover:border-bone hover:text-accent"
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
            {showLanguageSwitcher && <LanguageSwitcher locale={locale} />}
          </div>
        </div>
      </div>
    </section>
  )
}
