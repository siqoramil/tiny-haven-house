import { languageCookie, type Language } from './config'

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

/**
 * Persists an explicit language choice so the middleware can honour it the
 * next time a visitor lands on a path with no language prefix.
 */
export function rememberLanguage(code: Language): void {
  document.cookie = `${languageCookie}=${code}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`
}
