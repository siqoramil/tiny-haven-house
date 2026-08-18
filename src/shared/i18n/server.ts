import type { Language } from './config'
import type { Dictionary } from './translator'

// Dynamic imports keep each language in its own chunk, so a request only ever
// loads the dictionary it needs instead of all three.
const loaders: Record<Language, () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((m) => m.default),
  ru: () => import('./locales/ru.json').then((m) => m.default),
  uz: () => import('./locales/uz.json').then((m) => m.default),
}

/** Server-side only — client components read translations from LanguageProvider. */
export function getDictionary(language: Language): Promise<Dictionary> {
  return loaders[language]()
}
