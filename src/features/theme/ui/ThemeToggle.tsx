'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '../model/theme-context'
import { useLanguage } from '@/shared/i18n'
import { cn } from '@/shared/lib'

const themeOptions = [
  { value: 'light', labelKey: 'theme.light', icon: Sun, descKey: 'theme.lightDesc' },
  { value: 'dark', labelKey: 'theme.dark', icon: Moon, descKey: 'theme.darkDesc' },
  { value: 'system', labelKey: 'theme.system', icon: Monitor, descKey: 'theme.systemDesc' },
] as const

interface ThemeToggleProps {
  /** True while the trigger sits on a dark hero rather than the header bar. */
  onGlass?: boolean
}

export default function ThemeToggle({ onGlass = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Until the stored preference is read the server markup is what's on screen,
  // so keep its icon. Swapping one glyph after mount beats gating the page.
  const CurrentIcon = mounted && resolvedTheme === 'dark' ? Moon : Sun

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t('theme.title')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          'grid h-10 w-10 place-items-center rounded-xl transition-colors',
          onGlass
            ? 'bg-white/15 text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-white/25'
            : isOpen
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200'
              : 'bg-sunken text-muted hover:bg-line hover:text-ink',
        )}
      >
        <CurrentIcon className="h-[18px] w-[18px]" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="panel absolute right-0 top-full z-50 mt-2 w-60 animate-pop-in overflow-hidden p-2"
        >
          <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
            {t('theme.title')}
          </p>
          {themeOptions.map((option) => {
            const selected = theme === option.value
            const Icon = option.icon
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setTheme(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                  selected ? 'bg-primary-50 dark:bg-primary-900/40' : 'hover:bg-sunken',
                )}
              >
                <span
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-lg',
                    selected
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                      : 'bg-sunken text-subtle',
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-sm font-medium',
                      selected ? 'text-primary-800 dark:text-primary-200' : 'text-ink',
                    )}
                  >
                    {t(option.labelKey)}
                  </span>
                  <span className="block truncate text-xs text-subtle">{t(option.descKey)}</span>
                </span>
                {selected && (
                  <Check className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-300" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
