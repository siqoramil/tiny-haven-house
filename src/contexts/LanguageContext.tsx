'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n'

export type Language = 'en' | 'ru' | 'uz'

export const languages = [
  { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
  { code: 'uz' as Language, label: "O'zbek", flag: '🇺🇿' },
]

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Default translation function for SSR
const defaultT = (key: string): string => {
  // Use i18n.t directly for server-side rendering
  return i18n.t(key, { ns: 'common' })
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)

  // Return default values for SSR when context is not available
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: defaultT,
    }
  }
  return context
}

function LanguageProviderInner({ children }: { children: React.ReactNode }) {
  const { t: i18nT } = useTranslation('common')
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  // Initialize language from localStorage on client side
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null
    if (saved && ['en', 'ru', 'uz'].includes(saved)) {
      setLanguageState(saved)
      i18n.changeLanguage(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }, [])

  const t = useCallback((key: string): string => {
    return i18nT(key)
  }, [i18nT])

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProviderInner>
        {children}
      </LanguageProviderInner>
    </I18nextProvider>
  )
}
