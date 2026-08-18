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

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 p-4 bg-primary-100 dark:bg-primary-900/50 rounded-full">
            <Quote className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm p-8 lg:p-12 pt-12">
            <div className="flex flex-col items-center text-center">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < currentTestimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-neutral-300 dark:text-neutral-600'
                    )}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8 max-w-2xl">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900/50">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="p-3 bg-white dark:bg-neutral-900 rounded-full shadow-sm hover:shadow-md transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 bg-white dark:bg-neutral-900 rounded-full shadow-sm hover:shadow-md transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
