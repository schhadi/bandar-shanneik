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
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/80 hover:text-bone"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {locale}
        <span className="text-accent/70">↓</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-3 w-32 overflow-hidden border border-line bg-ink-800/95 backdrop-blur"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => switchTo(code)}
                className={`w-full px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-ink-700 ${
                  code === locale ? 'text-accent' : 'text-bone/70'
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
