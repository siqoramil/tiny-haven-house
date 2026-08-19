'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Heart, Menu, X } from 'lucide-react'
import { cn } from '@/shared/lib'
import { ThemeToggle } from '@/features/theme'
import { LanguageSwitcher } from '@/features/language-switch'
import { FavoritesSidebar, useFavorites } from '@/features/favorites'
import { LocaleLink as Link, stripLanguage, useLanguage } from '@/shared/i18n'

const navLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.houses', href: '/houses' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.contact', href: '/contact' },
]

/**
 * Only the home page puts a full-bleed dark hero behind the header, so only
 * there may the bar render transparent with white contents. The previous
 * version listed the *light* routes instead, which meant every route missing
 * from that list — house detail pages, 404 — drew white text on white.
 */
const routesWithHeroBehindHeader = ['/']

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  // Compare against locale-free paths so /uz/houses matches /houses
  const pathname = stripLanguage(usePathname())
  const { totalItems: favoritesItems } = useFavorites()
  const { t } = useLanguage()

  const overHero = routesWithHeroBehindHeader.includes(pathname)
  const onGlass = overHero && !isScrolled && !isMenuOpen

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-out',
        onGlass
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-line bg-surface/85 backdrop-blur-xl',
      )}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span
              className={cn(
                'grid h-9 w-9 place-items-center rounded-xl font-display text-lg font-semibold transition-colors',
                onGlass
                  ? 'bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm'
                  : 'bg-primary-600 text-white dark:bg-primary-400 dark:text-primary-950',
              )}
              aria-hidden
            >
              t
            </span>
            <span
              className={cn(
                'font-display text-xl font-semibold tracking-tight transition-colors',
                onGlass ? 'text-white' : 'text-ink',
              )}
            >
              TinyHaven
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    onGlass
                      ? active
                        ? 'bg-white/20 text-white'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                      : active
                        ? 'bg-primary-50 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200'
                        : 'text-muted hover:bg-sunken hover:text-ink',
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher onGlass={onGlass} />
            </div>
            <ThemeToggle onGlass={onGlass} />

            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              className={cn(
                'relative grid h-10 w-10 place-items-center rounded-xl transition-colors',
                onGlass
                  ? 'bg-white/15 text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-white/25'
                  : 'bg-sunken text-muted hover:bg-line hover:text-ink',
              )}
              aria-label={t('header.favorites')}
            >
              <Heart className="h-[18px] w-[18px]" />
              {favoritesItems > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-white ring-2 ring-surface">
                  {favoritesItems}
                </span>
              )}
            </button>

            <Link
              href="/houses"
              className={cn('btn btn-sm hidden lg:inline-flex', onGlass ? 'btn-invert' : 'btn-primary')}
            >
              {t('nav.findHome')}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={cn(
                'grid h-10 w-10 place-items-center rounded-xl transition-colors lg:hidden',
                onGlass
                  ? 'bg-white/15 text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm'
                  : 'bg-sunken text-muted hover:text-ink',
              )}
              aria-label={t('header.menu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-line bg-surface transition-[max-height,opacity] duration-300 ease-out lg:hidden',
          isMenuOpen ? 'max-h-[26rem] opacity-100' : 'max-h-0 border-transparent opacity-0',
        )}
      >
        <nav className="shell space-y-1 py-4">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  active
                    ? 'bg-primary-50 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200'
                    : 'text-muted hover:bg-sunken hover:text-ink',
                )}
              >
                {t(link.labelKey)}
              </Link>
            )
          })}

          <Link
            href="/houses"
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-primary mt-3 w-full"
          >
            {t('nav.findHome')}
          </Link>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm text-subtle">{t('header.language')}</span>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

      <FavoritesSidebar isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </header>
  )
}
