import { cache } from 'react'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { header as staticHeader, LINKEDIN_URL } from '@/lib/staticContent'
import { resolveHref } from '@/lib/resolveLink'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNav } from './MobileNav'

const fetchHeader = cache(async (locale: Locale) => {
  const payload = await getPayload().catch(() => null)
  return (await payload?.findGlobal({ slug: 'header', locale, depth: 2 }).catch(() => null)) || staticHeader
})

export async function SiteHeader({ locale }: { locale: Locale }) {
  const header = await fetchHeader(locale)
  const cmsNav: any[] = (header as any)?.nav || []
  const navItems: any[] = cmsNav.length ? cmsNav : staticHeader.nav

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur">
      <div className="container-page flex items-center justify-between py-5">
        <Link href={`/${locale}`} className="font-display text-lg tracking-tight text-bone">
          {header.logoText || staticHeader.logoText}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item, i) => {
            const link = item?.link
            if (!link?.label) return null
            const href = resolveHref(link, locale)
            return (
              <Link
                key={i}
                href={href}
                target={link.newTab ? '_blank' : undefined}
                className="link-underline text-[15px] text-bone/75 hover:text-bone"
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden text-bone/70 transition-colors hover:text-accent md:inline-flex"
          >
            <Icon name="linkedin" className="h-[18px] w-[18px]" />
          </a>
          {(header.showLanguageSwitcher ?? true) && <LanguageSwitcher locale={locale} />}
          <MobileNav
            locale={locale}
            logoText={header.logoText || staticHeader.logoText}
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
