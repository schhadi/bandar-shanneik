import { cache } from 'react'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { header as staticHeader } from '@/lib/staticContent'
import { resolveHref } from '@/lib/resolveLink'
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
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="border-b border-line bg-ink/80">
        <div className="container-page flex items-center justify-between py-5">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{header.logoText || staticHeader.logoText}</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item, i) => {
              const link = item?.link
              if (!link?.label) return null
              const href = resolveHref(link, locale)
              return (
                <Link
                  key={i}
                  href={href}
                  target={link.newTab ? '_blank' : undefined}
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.25em] text-bone/80 hover:text-bone"
                >
                  <span className="text-accent/70">0{i + 1}</span>
                  <span className="ml-2">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
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
      </div>
    </header>
  )
}
