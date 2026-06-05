import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getHeaderData } from '@/lib/header'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNav } from './MobileNav'

const LINKEDIN_URL = 'https://linkedin.com/in/bandar-shanneik'

export async function SiteHeader({ locale }: { locale: Locale }) {
  const { logoText, nav, showLanguageSwitcher } = await getHeaderData(locale)

  return (
    <header className="border-b border-line">
      <div className="container-page flex items-center justify-between py-6">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium tracking-tight transition-colors hover:text-accent"
        >
          {logoText}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              className="text-sm text-bone transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden text-bone/70 transition-colors hover:text-accent md:inline-flex"
          >
            <Icon name="linkedin" className="h-4 w-4" />
          </a>
          {showLanguageSwitcher && <LanguageSwitcher locale={locale} />}
          <MobileNav locale={locale} logoText={logoText} linkedinUrl={LINKEDIN_URL} links={nav} />
        </div>
      </div>
    </header>
  )
}
