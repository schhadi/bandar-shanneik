export const LOCALES = ['de', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'de'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export const dict = {
  de: {
    skipToContent: 'Zum Inhalt springen',
    languageSwitcher: 'Sprache',
    languageNames: { en: 'English', de: 'Deutsch' },
  },
  en: {
    skipToContent: 'Skip to content',
    languageSwitcher: 'Language',
    languageNames: { en: 'English', de: 'Deutsch' },
  },
} as const

export function t<K extends keyof (typeof dict)['en']>(locale: Locale, key: K) {
  return dict[locale][key]
}

// UI micro-labels rendered by block components (not editable content).
export const labels = {
  de: {
    affiliation: 'Zugehörigkeit',
    admittedIn: 'Jurisdiktionen',
    practiceAreas: 'Tätigkeitsfelder',
    memberships: 'Mitgliedschaften',
    jurisdictions: 'Jurisdiktionen',
    languages: 'Sprachen',
    researchAreas: 'Forschungsschwerpunkte',
    project: 'Projekt',
    downloadCv: 'Lebenslauf herunterladen →',
    currentPosition: 'Aktuelle Zugehörigkeit',
    affiliatedPrefix: 'Verbunden mit dem Projekt ',
    affiliatedSuffix: '',
    orWriteDirectly: 'Oder schreiben Sie direkt',
    orByEmail: 'oder per E-Mail an',
    atConnector: ' bei ',
  },
  en: {
    affiliation: 'Affiliation',
    admittedIn: 'Jurisdictions',
    practiceAreas: 'Practice areas',
    memberships: 'Memberships',
    jurisdictions: 'Jurisdictions',
    languages: 'Languages',
    researchAreas: 'Research areas',
    project: 'Project',
    downloadCv: 'Download CV →',
    currentPosition: 'Current affiliation',
    affiliatedPrefix: 'Affiliated with the ',
    affiliatedSuffix: ' project',
    orWriteDirectly: 'Or write directly',
    orByEmail: 'or by email at',
    atConnector: ' at ',
  },
} as const

export type Labels = (typeof labels)['en']
