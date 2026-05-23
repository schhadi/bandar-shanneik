import Link from 'next/link'
import { Icon } from './Icon'
import { resolveHref, type LinkData } from '@/lib/resolveLink'
import type { Locale } from '@/lib/i18n'
import clsx from 'clsx'

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

  const inner = (
    <>
      {link.icon && link.icon !== 'none' ? <Icon name={link.icon} className="h-4 w-4" /> : null}
      <span>{link.label}</span>
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
