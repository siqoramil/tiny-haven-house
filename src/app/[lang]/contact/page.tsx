import { notFound } from 'next/navigation'
import { isLanguage } from '@/shared/i18n'
import { ContactPage } from '@/views/contact'

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLanguage(lang)) notFound()

  return <ContactPage lang={lang} />
}
