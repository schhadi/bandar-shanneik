import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'
import { resolveHref } from '@/lib/resolveLink'

export async function SiteFooter({ locale }: { locale: Locale }) {
  const payload = await getPayload()
  const footer = await payload.findGlobal({ slug: 'footer', locale, depth: 2 }).catch(() => null)
  const columns: any[] = (footer as any)?.columns || []

  return (
    <footer className="relative border-t border-line">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + tagline */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{footer?.brandName || 'Bandar Shanneik'}</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/55">{footer?.tagline}</p>
          </div>

          {/* Link columns */}
          {columns.map((col: any, i: number) => (
            <div key={i} className="md:col-span-2">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">
                {col.heading}
              </div>
              <ul className="space-y-2">
                {(col.links || []).map((entry: any, j: number) => {
                  const link = entry?.link
                  if (!link?.label) return null
                  const href = resolveHref(link, locale)
                  const cn = 'link-underline text-sm text-bone/80 hover:text-accent'
                  return (
                    <li key={j}>
                      {link.type === 'external' ? (
                        <a
                          href={href}
                          target={link.newTab ? '_blank' : undefined}
                          rel={link.newTab ? 'noopener noreferrer' : undefined}
                          className={cn}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={href} className={cn}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Back to top */}
          <div className="md:col-span-2 md:col-start-11 md:text-right">
            <a
              href="#top"
              className="link-underline inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55 hover:text-bone"
            >
              <span>Back to top</span>
              <span className="text-accent">↑</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/35 md:flex-row md:items-center md:justify-between">
          <div>{footer?.copyright}</div>
          <div>
            /{locale.toUpperCase()} · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}
