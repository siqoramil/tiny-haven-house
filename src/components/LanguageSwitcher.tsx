'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage, languages, Language } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  useLightStyle?: boolean
}

export default function LanguageSwitcher({ useLightStyle = true }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = languages.find(l => l.code === language)

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2.5 rounded-xl transition-all duration-200',
          'border-2',
          isOpen
            ? 'bg-white dark:bg-neutral-800 border-primary-500 ring-4 ring-primary-100 dark:ring-primary-900/30 shadow-lg'
            : useLightStyle
              ? 'bg-neutral-100 dark:bg-neutral-800 border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700'
              : 'bg-white/20 backdrop-blur-sm border-transparent hover:bg-white/30'
        )}
        aria-label={t('header.language')}
      >
        <Globe className={cn(
          'w-5 h-5 transition-colors',
          isOpen
            ? 'text-primary-600 dark:text-primary-400'
            : useLightStyle
              ? 'text-neutral-600 dark:text-neutral-300'
              : 'text-white'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <p className="px-3 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {t('header.language')}
            </p>
            {languages.map((lang) => {
              const isSelected = language === lang.code
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all',
                    isSelected
                      ? 'bg-primary-50 dark:bg-primary-900/30'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                  )}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className={cn(
                    'font-medium flex-1',
                    isSelected
                      ? 'text-primary-700 dark:text-primary-300'
                      : 'text-neutral-700 dark:text-neutral-200'
                  )}>
                    {lang.label}
                  </span>
                  {isSelected && (
                    <Check className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
