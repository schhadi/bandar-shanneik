import Link from 'next/link'
import clsx from 'clsx'
import { resolveHref, type LinkData } from '@/lib/resolveLink'
import type { Locale } from '@/lib/i18n'

export function CTAButton({ link, locale }: { link: LinkData; locale: Locale }) {
  if (!link?.label) return null
  const href = resolveHref(link, locale)
  const target = link.newTab ? '_blank' : undefined
  const rel = link.newTab ? 'noopener noreferrer' : undefined
  const variant = link.variant || 'primary'
  const className = clsx({
    'btn-primary': variant === 'primary',
    'btn-outline': variant === 'outline',
    'btn-plain': variant === 'plain',
  })

  const arrow = link.newTab ? '↗' : '→'

  const inner =
    variant === 'plain' ? (
      <span className="inline-flex items-center gap-2">
        {link.label} <span className="text-accent">{arrow}</span>
      </span>
    ) : (
      <>
        <span className="btn-label">{link.label}</span>
        <span className="btn-arrow">{arrow}</span>
      </>
    )

  if (link.type === 'external') {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} target={target} rel={rel} className={className}>
      {inner}
    </Link>
  )
}
