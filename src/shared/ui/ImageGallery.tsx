'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/shared/lib'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Image */}
        <div className="lg:col-span-3 relative aspect-[16/10] rounded-2xl overflow-hidden group">
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Main image`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
          <button
            onClick={() => openLightbox(currentIndex)}
            className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <div className="p-3 bg-white/90 rounded-full">
              <ZoomIn className="w-6 h-6 text-neutral-700" />
            </div>
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-neutral-700" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-sm rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="lg:col-span-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 lg:pr-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'flex-shrink-0 relative aspect-[4/3] lg:aspect-[16/10] w-24 lg:w-full rounded-xl overflow-hidden ring-2 transition-all',
                index === currentIndex
                  ? 'ring-primary-500 ring-offset-2'
                  : 'ring-transparent hover:ring-neutral-300'
              )}
            >
              <Image
                src={image}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 96px, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[80vh] m-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Full size`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Thumbnails in Lightbox */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-xl">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={cn(
                  'relative w-16 h-12 rounded-lg overflow-hidden ring-2 transition-all',
                  index === currentIndex
                    ? 'ring-white'
                    : 'ring-transparent opacity-50 hover:opacity-100'
                )}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
