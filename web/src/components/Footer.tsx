import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { resolveHref } from '@/lib/resolveLink'
import { Icon } from './Icon'

export async function SiteFooter({ locale }: { locale: Locale }) {
  const payload = await getPayload()
  const footer = await payload.findGlobal({ slug: 'footer', locale, depth: 2 }).catch(() => null)
  const columns: any[] = (footer as any)?.columns || []
  const bottomLinks: any[] = (footer as any)?.bottomLinks || []

  return (
    <footer className="border-t border-gold/40 pt-12">
      <div className="container-page grid gap-12 pb-10 md:grid-cols-[1.4fr_repeat(3,_1fr)]">
        <div>
          <div className="font-serif text-2xl text-forest">{footer?.brandName || 'Bandar Shanneik'}</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-forest/70">{footer?.tagline}</p>
        </div>
        {columns.map((col: any, i: number) => (
          <div key={i} className="border-l border-gold/40 pl-6">
            <div className="mb-4 text-xs font-semibold tracking-widest text-forest">
              {col.heading?.toUpperCase()}
            </div>
            <ul className="space-y-2">
              {(col.links || []).map((entry: any, j: number) => {
                const link = entry?.link
                if (!link?.label) return null
                const href = resolveHref(link, locale)
                return (
                  <li key={j}>
                    {link.type === 'external' ? (
                      <a
                        href={href}
                        target={link.newTab ? '_blank' : undefined}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 text-sm text-forest/80 hover:text-forest"
                      >
                        {link.icon === 'arrow' ? null : link.label === 'LinkedIn' ? (
                          <>
                            <Icon name="linkedin" className="h-4 w-4" /> {link.label}
                          </>
                        ) : (
                          link.label
                        )}
                      </a>
                    ) : (
                      <Link href={href} className="text-sm text-forest/80 hover:text-forest">
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gold/40">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-5 text-xs text-forest/60 md:flex-row md:items-center">
          <div>{footer?.copyright}</div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {bottomLinks.map((entry: any, i: number) => {
              const link = entry?.link
              if (!link?.label) return null
              const href = resolveHref(link, locale)
              return (
                <Link key={i} href={href} className="hover:text-forest">
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
