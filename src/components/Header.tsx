import { cache } from 'react'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { getStaticHeader } from '@/lib/staticContent'
import { resolveHref } from '@/lib/resolveLink'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNav } from './MobileNav'

const LINKEDIN_URL = 'https://linkedin.com/in/bandar-shanneik'

const fetchHeader = cache(async (locale: Locale) => {
  const payload = await getPayload().catch(() => null)
  return (
    (await payload?.findGlobal({ slug: 'header', locale, depth: 2 }).catch(() => null)) ||
    getStaticHeader(locale)
  )
})

export async function SiteHeader({ locale }: { locale: Locale }) {
  const staticHeader = getStaticHeader(locale)
  const header = await fetchHeader(locale)
  const cmsNav: any[] = (header as any)?.nav || []
  const navItems: any[] = cmsNav.length ? cmsNav : staticHeader.nav

  return (
    <header className="border-b border-line">
      <div className="container-page flex items-center justify-between py-6">
        <Link href={`/${locale}`} className="text-sm font-medium tracking-tight">
          {header.logoText || staticHeader.logoText}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item, i) => {
            const link = item?.link
            if (!link?.label) return null
            const href = resolveHref(link, locale)
            return (
              <Link
                key={i}
                href={href}
                target={link.newTab ? '_blank' : undefined}
                className="text-sm text-bone hover:text-accent"
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-bone/70 hover:text-accent"
          >
            <Icon name="linkedin" className="h-4 w-4" />
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {(header.showLanguageSwitcher ?? true) && <LanguageSwitcher locale={locale} />}
          <MobileNav
            locale={locale}
            logoText={header.logoText || staticHeader.logoText}
            linkedinUrl={LINKEDIN_URL}
            links={navItems
              .map((item) => {
                const link = item?.link
                if (!link?.label) return null
                return { href: resolveHref(link, locale), label: link.label, newTab: link.newTab }
              })
              .filter(Boolean) as { href: string; label: string; newTab?: boolean }[]}
          />
        </div>
      </div>
    </header>
  )
}
