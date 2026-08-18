'use client'

import { LocaleLink as Link, useLanguage } from '@/shared/i18n'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Home className="w-12 h-12 text-primary-600" />
        </div>

        {/* Content */}
        <h1 className="text-6xl font-display font-bold text-neutral-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-4">{t('notFound.title')}</h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
          {t('notFound.description')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('notFound.backHome')}
          </Link>
          <Link
            href="/houses"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:border-neutral-400 hover:bg-white transition-all"
          >
            <Search className="w-5 h-5" />
            {t('notFound.browse')}
          </Link>
        </div>
      </div>
    </div>
  )
}
