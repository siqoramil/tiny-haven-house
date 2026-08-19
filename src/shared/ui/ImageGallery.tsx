'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const { t } = useLanguage()

  const goToPrevious = useCallback(
    () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)),
    [images.length],
  )
  const goToNext = useCallback(
    () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)),
    [images.length],
  )

  // Locking scroll via a style assignment inside the click handler (the old
  // approach) leaks the lock whenever the component unmounts while open.
  useEffect(() => {
    if (!isLightboxOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false)
      if (event.key === 'ArrowLeft') goToPrevious()
      if (event.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLightboxOpen, goToPrevious, goToNext])

  const hasMultiple = images.length > 1

  return (
    <>
      {/* The thumbnail rail is a sibling row under the stage, not a side column
          with its own scrollbar — that column never matched the stage height
          and left a stray scrollbar down the middle of the page. */}
      <div className="space-y-3">
        <div className="img-frame group aspect-[16/10] rounded-3xl sm:aspect-[2/1]">
          <Image
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`${alt} — ${currentIndex + 1}`}
            fill
            priority
            className="animate-fade-in object-cover"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={t('gallery.viewFullSize')}
            className="absolute inset-0 flex items-center justify-center bg-stone-950/0 transition-colors hover:bg-stone-950/20"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-stone-800 opacity-0 shadow-lift transition-opacity group-hover:opacity-100">
              <Expand className="h-5 w-5" />
            </span>
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label={t('gallery.previous')}
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-stone-700 shadow-card transition-all hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label={t('gallery.next')}
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-stone-700 shadow-card transition-all hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-stone-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {hasMultiple && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`${alt} — ${index + 1}`}
                aria-current={index === currentIndex}
                className={cn(
                  'img-frame aspect-[4/3] w-28 shrink-0 rounded-xl transition-all sm:w-36',
                  index === currentIndex
                    ? 'ring-2 ring-primary-600 ring-offset-2 ring-offset-canvas dark:ring-primary-400'
                    : 'opacity-65 hover:opacity-100',
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-stone-950/95 p-4 sm:p-10"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label={t('common.close')}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} — ${currentIndex + 1}`}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                aria-label={t('gallery.previous')}
                className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                aria-label={t('gallery.next')}
                className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              <div
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl bg-black/50 p-2 backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`${alt} — ${index + 1}`}
                    className={cn(
                      'img-frame h-11 w-16 rounded-lg transition-all',
                      index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-90',
                    )}
                  >
                    <Image src={image} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
