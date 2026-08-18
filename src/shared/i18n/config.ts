// Edge-safe: this module must stay free of React so middleware can import it.

export const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
] as const

export type Language = (typeof languages)[number]['code']

export const languageCodes: readonly Language[] = languages.map((l) => l.code)

export const defaultLanguage: Language = 'en'

// Cookie the middleware reads to remember a visitor's choice
export const languageCookie = 'NEXT_LOCALE'

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (languageCodes as readonly string[]).includes(value)
}

/** '/uz/houses/foo' -> '/houses/foo' — for comparing against locale-free paths */
export function stripLanguage(pathname: string): string {
  const [, first, ...rest] = pathname.split('/')
  if (!isLanguage(first)) return pathname
  return '/' + rest.join('/')
}

/** '/houses' -> '/uz/houses'. Leaves mailto:, tel:, #anchors and absolute URLs alone. */
export function localizeHref(language: Language, href: string): string {
  if (!href.startsWith('/')) return href
  return href === '/' ? `/${language}` : `/${language}${href}`
}
