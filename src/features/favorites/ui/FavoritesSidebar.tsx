'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Heart, MapPin, Trash2, X } from 'lucide-react'
import { useFavorites } from '../model/favorites-context'
import { cn, formatPrice } from '@/shared/lib'
import { LocaleLink as Link, useLanguage } from '@/shared/i18n'

interface FavoritesSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesSidebar({ isOpen, onClose }: FavoritesSidebarProps) {
  const { items, removeFromFavorites } = useFavorites()
  const { t } = useLanguage()

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          'fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label={t('favorites.title')}
        // Kept mounted for the slide transition; hidden from the a11y tree and
        // from tab order while closed so it cannot trap focus off-screen.
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-surface shadow-pop transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-line p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clay-100 text-clay-600 dark:bg-clay-900/40 dark:text-clay-300">
              <Heart className="h-[18px] w-[18px]" fill="currentColor" />
            </span>
            <div>
              <h2 className="font-semibold leading-tight">{t('favorites.title')}</h2>
              <p className="text-sm text-subtle">
                {items.length} {t('favorites.items')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="icon-btn h-10 w-10"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-sunken text-subtle">
                <Heart className="h-7 w-7" />
              </span>
              <p className="mb-6 text-muted">{t('favorites.empty')}</p>
              <Link href="/houses" onClick={onClose} className="btn btn-primary btn-sm">
                {t('nav.houses')}
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-2xl border border-line bg-sunken p-3">
                  <span className="img-frame h-20 w-20 shrink-0 rounded-xl">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-ink">{item.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-subtle">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <p className="mt-1 font-semibold text-primary-700 dark:text-primary-300">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromFavorites(item.id)}
                    aria-label={`${t('houseDetail.removeFromFavorites')} — ${item.name}`}
                    className="icon-btn h-9 w-9 shrink-0 self-start hover:bg-clay-50 hover:text-clay-600 dark:hover:bg-clay-900/30 dark:hover:text-clay-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  )
}
