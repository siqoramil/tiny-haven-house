'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from '@/features/theme'
import { FavoritesProvider } from '@/features/favorites'
import { LanguageProvider, type Dictionary, type Language } from '@/shared/i18n'

/**
 * Every cross-cutting provider the app needs, composed in one place.
 * The language and its dictionary are resolved on the server from the URL and
 * handed down, so there is no client-side language detection to wait for.
 */
export function AppProviders({
  language,
  dictionary,
  children,
}: {
  language: Language
  dictionary: Dictionary
  children: ReactNode
}) {
  return (
    <ThemeProvider>
      <LanguageProvider language={language} dictionary={dictionary}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
