'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check, Globe } from 'lucide-react'
import {
  languages,
  rememberLanguage,
  stripLanguage,
  useLanguage,
  type Language,
} from '@/shared/i18n'
import { cn } from '@/shared/lib'

interface LanguageSwitcherProps {
  /** True while the trigger sits on a dark hero rather than the header bar. */
  onGlass?: boolean
}

export default function LanguageSwitcher({ onGlass = false }: LanguageSwitcherProps) {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // The language lives in the URL, so switching is a navigation. The cookie
  // only tells the middleware which language to pick for an unprefixed path.
  const switchTo = (code: Language) => {
    rememberLanguage(code)
    const rest = stripLanguage(pathname)
    router.push(rest === '/' ? `/${code}` : `/${code}${rest}`)
    setIsOpen(false)
  }

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

  const current = languages.find((lang) => lang.code === language)

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`${t('header.language')}: ${current?.label ?? language}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          'flex h-10 items-center gap-1.5 rounded-xl px-2.5 transition-colors',
          onGlass
            ? 'bg-white/15 text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-white/25'
            : isOpen
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200'
              : 'bg-sunken text-muted hover:bg-line hover:text-ink',
        )}
      >
        <Globe className="h-[18px] w-[18px]" />
        <span className="text-xs font-semibold uppercase tracking-wide">{language}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="panel absolute right-0 top-full z-50 mt-2 w-52 animate-pop-in overflow-hidden p-2"
        >
          <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
            {t('header.language')}
          </p>
          {languages.map((lang) => {
            const selected = language === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => switchTo(lang.code)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                  selected ? 'bg-primary-50 dark:bg-primary-900/40' : 'hover:bg-sunken',
                )}
              >
                <span className="text-xl leading-none" aria-hidden>
                  {lang.flag}
                </span>
                <span
                  className={cn(
                    'flex-1 text-sm font-medium',
                    selected ? 'text-primary-800 dark:text-primary-200' : 'text-ink',
                  )}
                >
                  {lang.label}
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
