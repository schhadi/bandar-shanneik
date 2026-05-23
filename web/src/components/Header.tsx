import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { resolveHref } from '@/lib/resolveLink'
import { LanguageSwitcher } from './LanguageSwitcher'

export async function SiteHeader({ locale }: { locale: Locale }) {
  const payload = await getPayload()
  const header = await payload.findGlobal({ slug: 'header', locale, depth: 2 }).catch(() => null)

  const logoText = header?.logoText || 'Bandar Shanneik'
  const navItems: any[] = (header as any)?.nav || []

  return (
    <header className="relative z-30">
      <div className="h-1 w-full bg-accent-purple" />
      <div className="container-page flex items-center justify-between py-6">
        <Link href={`/${locale}`} className="font-serif text-xl text-forest">
          {logoText}
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item: any, i: number) => {
            const link = item?.link
            if (!link?.label) return null
            const href = resolveHref(link, locale)
            return (
              <Link
                key={i}
                href={href}
                target={link.newTab ? '_blank' : undefined}
                className="border-b border-forest/30 pb-1 text-sm text-forest hover:border-forest"
              >
                {link.label}
              </Link>
            )
          })}
          {(header?.showLanguageSwitcher ?? true) && <LanguageSwitcher locale={locale} />}
        </nav>
      </div>
    </header>
  )
}
