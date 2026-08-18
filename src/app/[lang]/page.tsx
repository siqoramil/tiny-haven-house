import { notFound } from 'next/navigation'
import { isLanguage } from '@/shared/i18n'
import { HomePage } from '@/views/home'

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLanguage(lang)) notFound()

  return <HomePage lang={lang} />
}
