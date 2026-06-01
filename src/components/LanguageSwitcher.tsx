'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LOCALES, type Locale, dict } from '@/lib/i18n'

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname() || `/${locale}`
  const [open, setOpen] = useState(false)

  function switchTo(next: Locale) {
    const parts = pathname.split('/').filter(Boolean)
    parts[0] = next
    router.push('/' + parts.join('/'))
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="text-sm text-bone/70 hover:text-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {locale.toUpperCase()}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-32 border border-line bg-ink"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => switchTo(code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-ink-800 ${
                  code === locale ? 'text-accent' : 'text-bone/80'
                }`}
              >
                {dict[locale].languageNames[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
