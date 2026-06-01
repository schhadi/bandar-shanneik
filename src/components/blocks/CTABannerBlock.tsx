import Link from 'next/link'
import { resolveHref, type LinkData } from '@/lib/resolveLink'
import type { Locale } from '@/lib/i18n'

function CTALink({ link, locale }: { link: LinkData; locale: Locale }) {
  if (!link?.label) return null
  const href = resolveHref(link, locale)
  const className = 'btn-outline'
  if (link.type === 'external') {
    return (
      <a
        href={href}
        target={link.newTab ? '_blank' : undefined}
        rel={link.newTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {link.label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {link.label}
    </Link>
  )
}

export function CTABannerBlock({ block, locale }: { block: any; locale: Locale }) {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            {block.heading}
          </h2>
          {block.subtext && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-bone/75">{block.subtext}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          {(block.cta || []).map((c: any, i: number) => (
            <CTALink key={i} link={c?.link} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
