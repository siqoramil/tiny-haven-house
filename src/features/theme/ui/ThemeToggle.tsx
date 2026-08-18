'use client'

import { useState, useRef, useEffect } from 'react'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { useTheme } from '../model/theme-context'
import { useLanguage } from '@/shared/i18n'
import { cn } from '@/shared/lib'

const themeOptions = [
  { value: 'light', labelKey: 'theme.light', icon: Sun, descKey: 'theme.lightDesc' },
  { value: 'dark', labelKey: 'theme.dark', icon: Moon, descKey: 'theme.darkDesc' },
  { value: 'system', labelKey: 'theme.system', icon: Monitor, descKey: 'theme.systemDesc' },
] as const

interface ThemeToggleProps {
  useLightStyle?: boolean
}

export default function ThemeToggle({ useLightStyle = true }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()
  const { t } = useLanguage()
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

  // Until the stored preference is read, render what the server rendered.
  // Swapping the icon after mount is a one-element change; gating the whole
  // page on it (the old behaviour) cost a blank screen until hydration.
  const CurrentIcon = mounted && resolvedTheme === 'dark' ? Moon : Sun

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
        aria-label={t('theme.title')}
      >
        <CurrentIcon className={cn(
          'w-5 h-5 transition-colors',
          isOpen
            ? 'text-primary-600 dark:text-primary-400'
            : useLightStyle
              ? 'text-neutral-600 dark:text-neutral-300'
              : 'text-white'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <p className="px-3 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {t('theme.title')}
            </p>
            {themeOptions.map((themeOption) => {
              const isSelected = theme === themeOption.value
              const Icon = themeOption.icon
              return (
                <button
                  key={themeOption.value}
                  type="button"
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all',
                    isSelected
                      ? 'bg-primary-50 dark:bg-primary-900/30'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-primary-100 dark:bg-primary-800'
                      : 'bg-neutral-100 dark:bg-neutral-700'
                  )}>
                    <Icon className={cn(
                      'w-4.5 h-4.5',
                      isSelected
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-500 dark:text-neutral-400'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      'font-medium block text-sm',
                      isSelected
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-neutral-700 dark:text-neutral-200'
                    )}>
                      {t(themeOption.labelKey)}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {t(themeOption.descKey)}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
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
