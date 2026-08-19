'use client'

import { ArrowLeft, Compass, Search } from 'lucide-react'
import { LocaleLink as Link, useLanguage } from '@/shared/i18n'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-[70svh] items-center justify-center px-5 py-24 pt-32">
      <div className="text-center">
        <span className="icon-tile mx-auto mb-8 h-20 w-20 rounded-4xl">
          <Compass className="h-9 w-9" />
        </span>

        <p className="font-display text-display-xl font-semibold leading-none text-primary-700 dark:text-primary-300">
          404
        </p>
        <h1 className="mt-6 font-display text-display-sm font-semibold">{t('notFound.title')}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">{t('notFound.description')}</p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" />
            {t('notFound.backHome')}
          </Link>
          <Link href="/houses" className="btn btn-secondary">
            <Search className="h-4 w-4" />
            {t('notFound.browse')}
          </Link>
        </div>
      </div>
    </div>
  )
}
