import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { header as staticHeader } from '@/lib/staticContent'
import { resolveHref } from '@/lib/resolveLink'
import { LanguageSwitcher } from './LanguageSwitcher'

export async function SiteHeader({ locale }: { locale: Locale }) {
  const payload = await getPayload().catch(() => null)
  const header = (await payload?.findGlobal({ slug: 'header', locale, depth: 2 }).catch(() => null)) || staticHeader
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

          <div className="flex items-center gap-4">
            {(header.showLanguageSwitcher ?? true) && <LanguageSwitcher locale={locale} />}
          </div>
        </div>
      </div>
    </header>
  )
}
