import { notFound } from 'next/navigation'
import { isLanguage } from '@/shared/i18n'
import { AboutPage } from '@/views/about'

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLanguage(lang)) notFound()

  return <AboutPage lang={lang} />
}
