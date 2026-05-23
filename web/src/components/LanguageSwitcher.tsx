'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LOCALES, type Locale, dict } from '@/lib/i18n'
import { Icon } from './Icon'

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
        className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-4 py-2 text-sm text-forest hover:border-forest/40"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {dict[locale].languageNames[locale]}
        <Icon name="chevron-down" className="h-4 w-4" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-forest/10 bg-cream-50 shadow-lg"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => switchTo(code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-cream-100 ${
                  code === locale ? 'font-medium text-forest' : 'text-forest/70'
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
