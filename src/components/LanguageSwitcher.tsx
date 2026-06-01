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
        className="inline-flex items-center gap-1.5 text-[13px] uppercase tracking-[0.18em] text-bone/70 hover:text-bone"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {locale}
        <span className="text-accent/70">↓</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-3 w-36 overflow-hidden border border-line-strong bg-ink shadow-lg shadow-bone/10"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => switchTo(code)}
                className={`w-full px-4 py-3 text-left text-[13px] uppercase tracking-[0.18em] transition-colors hover:bg-ink-800 ${
                  code === locale ? 'text-accent' : 'text-bone/75'
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
