export const LOCALES = ['en', 'de'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export const dict = {
  en: {
    skipToContent: 'Skip to content',
    languageSwitcher: 'Language',
    languageNames: { en: 'English', de: 'Deutsch' },
  },
  de: {
    skipToContent: 'Zum Inhalt springen',
    languageSwitcher: 'Sprache',
    languageNames: { en: 'English', de: 'Deutsch' },
  },
} as const

export function t<K extends keyof (typeof dict)['en']>(locale: Locale, key: K) {
  return dict[locale][key]
}
