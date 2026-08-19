'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '@/entities/testimonial'
import { cn } from '@/shared/lib'
import { useLanguage } from '@/shared/i18n'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useLanguage()

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  const goToNext = () =>
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

  const current = testimonials[currentIndex]

  return (
    <section className="section bg-primary-50 dark:bg-stone-900">
      <div className="shell">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-display-md font-semibold">{t('testimonials.title')}</h2>
          <p className="lede mt-4">{t('testimonials.subtitle')}</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <figure className="card relative px-6 pb-8 pt-12 text-center sm:px-12 sm:pb-10 sm:pt-14">
            <span
              className="absolute -top-6 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-primary-600 text-white shadow-card dark:bg-primary-400 dark:text-primary-950"
              aria-hidden
            >
              <Quote className="h-5 w-5" fill="currentColor" />
            </span>

            <div
              className="mb-6 flex items-center justify-center gap-1"
              aria-label={`${current.rating} / 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  aria-hidden
                  className={cn(
                    'h-4 w-4',
                    i < current.rating ? 'fill-clay-400 text-clay-400' : 'text-stone-300 dark:text-stone-700',
                  )}
                />
              ))}
            </div>

            {/* Fixed min-height stops the card from jumping between quotes. */}
            <blockquote className="min-h-[8rem] font-display text-xl leading-relaxed text-ink sm:min-h-[7rem] sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-8 flex items-center justify-center gap-3.5">
              <span className="img-frame h-14 w-14 rounded-full ring-2 ring-primary-200 ring-offset-2 ring-offset-surface dark:ring-primary-800">
                <Image
                  src={current.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </span>
              <span className="text-left">
                <span className="block font-semibold text-ink">{current.name}</span>
                <span className="block text-sm text-subtle">{current.location}</span>
              </span>
            </figcaption>
          </figure>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="icon-btn h-11 w-11 border border-line bg-surface hover:bg-sunken"
              aria-label={t('testimonials.previous')}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={testimonial.name}
                  aria-current={index === currentIndex}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300 ease-out',
                    index === currentIndex
                      ? 'w-8 bg-primary-600 dark:bg-primary-400'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400 dark:bg-stone-700 dark:hover:bg-stone-600',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="icon-btn h-11 w-11 border border-line bg-surface hover:bg-sunken"
              aria-label={t('testimonials.next')}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
