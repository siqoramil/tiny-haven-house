'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { LocaleLink as Link } from '@/shared/i18n'
import { X, Heart, Trash2, MapPin } from 'lucide-react'
import { useFavorites } from '../model/favorites-context'
import { useLanguage } from '@/shared/i18n'
import { cn } from '@/shared/lib'

interface FavoritesSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesSidebar({ isOpen, onClose }: FavoritesSidebarProps) {
  const { items, removeFromFavorites } = useFavorites()
  const { t } = useLanguage()

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-neutral-900 shadow-2xl z-50 transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {t('favorites.title')}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {items.length} {t('favorites.items')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-10 h-10 text-neutral-400" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {t('favorites.empty')}
                </p>
                <Link
                  href="/houses"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  {t('nav.houses')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-neutral-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
