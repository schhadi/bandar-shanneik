'use client'

import { usePathname, useRouter } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname() || `/${locale}`
  const next: Locale = LOCALES.find((l) => l !== locale) ?? locale

  function switchTo() {
    const parts = pathname.split('/').filter(Boolean)
    parts[0] = next
    router.push('/' + parts.join('/'))
  }

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={`Switch language to ${next.toUpperCase()}`}
      className="text-sm text-bone/70 hover:text-accent"
    >
      {next.toUpperCase()}
    </button>
  )
}
