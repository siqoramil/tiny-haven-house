'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { Language } from './config'
import { createTranslator, type Dictionary, type Translate } from './translator'

interface LanguageContextValue {
  language: Language
  t: Translate
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * Seeded by the server with the language already resolved from the URL, so the
 * first client render matches the server markup exactly. Nothing is read from
 * localStorage and nothing is hidden while waiting for hydration.
 */
export function LanguageProvider({
  language,
  dictionary,
  children,
}: {
  language: Language
  dictionary: Dictionary
  children: ReactNode
}) {
  const value = useMemo<LanguageContextValue>(
    () => ({ language, t: createTranslator(dictionary) }),
    [language, dictionary],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
