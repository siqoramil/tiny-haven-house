'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, ShoppingCart, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import CartSidebar from './CartSidebar'
import FavoritesSidebar from './FavoritesSidebar'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLanguage } from '@/contexts/LanguageContext'

const navLinkKeys = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.houses', href: '/houses' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems: cartItems } = useCart()
  const { totalItems: favoritesItems } = useFavorites()
  const { t } = useLanguage()

  // Pages without dark hero should always use light header style
  const pagesWithLightBackground = ['/houses', '/about', '/contact']
  const useLightStyle = pagesWithLightBackground.includes(pathname) || isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        useLightStyle
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-sm dark:shadow-neutral-900/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className={cn(
              'p-2 rounded-lg transition-colors',
              useLightStyle ? 'bg-primary-600' : 'bg-white/20 backdrop-blur-sm'
            )}>
              <Home className={cn(
                'w-5 h-5',
                useLightStyle ? 'text-white' : 'text-white'
              )} />
            </div>
            <span className={cn(
              'text-xl font-display font-bold transition-colors',
              useLightStyle ? 'text-neutral-900 dark:text-white' : 'text-white'
            )}>
              TinyHaven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === link.href
                    ? useLightStyle
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'bg-white/20 text-white'
                    : useLightStyle
                      ? 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher useLightStyle={useLightStyle} />
            <ThemeToggle useLightStyle={useLightStyle} />

            {/* Favorites Button */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className={cn(
                "relative p-2.5 rounded-xl transition-colors",
                useLightStyle
                  ? "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
              )}
              aria-label={t('header.favorites')}
            >
              <Heart className={cn(
                "w-5 h-5",
                useLightStyle ? "text-neutral-600 dark:text-neutral-300" : "text-white"
              )} />
              {favoritesItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favoritesItems}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "relative p-2.5 rounded-xl transition-colors",
                useLightStyle
                  ? "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
              )}
              aria-label={t('header.cart')}
            >
              <ShoppingCart className={cn(
                "w-5 h-5",
                useLightStyle ? "text-neutral-600 dark:text-neutral-300" : "text-white"
              )} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>

            <Link
              href="/houses"
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all',
                useLightStyle
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-white text-neutral-900 hover:bg-neutral-100'
              )}
            >
              {t('nav.findHome')}
            </Link>
          </div>

          {/* Actions - Mobile */}
          <div className="lg:hidden flex items-center gap-1">
            {/* Favorites Button */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className={cn(
                "relative p-2 rounded-lg transition-colors",
                useLightStyle
                  ? "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  : "hover:bg-white/10"
              )}
              aria-label={t('header.favorites')}
            >
              <Heart className={cn(
                'w-5 h-5',
                useLightStyle ? 'text-neutral-600 dark:text-neutral-300' : 'text-white'
              )} />
              {favoritesItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesItems}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "relative p-2 rounded-lg transition-colors",
                useLightStyle
                  ? "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  : "hover:bg-white/10"
              )}
              aria-label={t('header.cart')}
            >
              <ShoppingCart className={cn(
                'w-5 h-5',
                useLightStyle ? 'text-neutral-600 dark:text-neutral-300' : 'text-white'
              )} />
              {cartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>

            <ThemeToggle useLightStyle={useLightStyle} />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                useLightStyle
                  ? 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-neutral-900/50 transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="px-4 py-4 space-y-1">
          {navLinkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/houses"
              className="block w-full px-4 py-3 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {t('nav.findHome')}
            </Link>
          </div>

          {/* Language Switcher in Mobile Menu */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-2">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

      {/* Sidebars */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesSidebar isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </header>
  )
}
