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
  const className = clsx(
    variant === 'plain'
      ? 'link-underline text-sm text-bone'
      : 'btn-outline',
  )

  if (link.type === 'external') {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {link.label}
      </a>
    )
  }
  return (
    <Link href={href} target={target} rel={rel} className={className}>
      {link.label}
    </Link>
  )
}
