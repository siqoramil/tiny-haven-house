import { Calendar, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/features/contact-form'
import { createTranslator, type Language } from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'

export default async function ContactPage({ lang }: { lang: Language }) {
  const t = createTranslator(await getDictionary(lang))

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone'),
      details: [t('contact.phoneDetail1'), t('contact.phoneDetail2')],
      action: { label: t('contact.callNow'), href: 'tel:+18001234567' },
    },
    {
      icon: Mail,
      title: t('contact.email'),
      details: [t('contact.emailDetail1'), t('contact.emailDetail2')],
      action: { label: t('contact.sendEmail'), href: 'mailto:hello@tinyhaven.com' },
    },
    {
      icon: MapPin,
      title: t('contact.office'),
      details: [t('contact.officeDetail1'), t('contact.officeDetail2')],
      action: { label: t('contact.getDirections'), href: 'https://maps.google.com' },
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      details: [t('contact.hoursDetail1'), t('contact.hoursDetail2')],
      action: null,
    },
  ]

  const quickActions = [
    {
      icon: Calendar,
      title: t('contact.scheduleViewing'),
      description: t('contact.scheduleDesc'),
      cta: t('contact.bookNow'),
      href: 'tel:+18001234567',
    },
    {
      icon: MessageCircle,
      title: t('contact.liveChat'),
      description: t('contact.liveChatDesc'),
      cta: t('contact.startChat'),
      href: 'mailto:hello@tinyhaven.com',
    },
  ]

  const faqs = [
    { question: t('contact.faqQ1'), answer: t('contact.faqA1') },
    { question: t('contact.faqQ2'), answer: t('contact.faqA2') },
    { question: t('contact.faqQ3'), answer: t('contact.faqA3') },
    { question: t('contact.faqQ4'), answer: t('contact.faqA4') },
  ]

  return (
    <div className="pt-16 lg:pt-20">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-canvas py-16 dark:from-stone-900 dark:to-canvas lg:py-20">
        <div className="shell-narrow text-center">
          <span className="eyebrow">{t('contact.getInTouch')}</span>
          <h1 className="font-display text-display-lg font-semibold">{t('contact.title')}</h1>
          <p className="lede mt-5">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* --------------------------------------------------------- Info cards */}
      {/* Pulled up into the hero's foot so the two bands read as one unit
          instead of leaving the dead white gap the old spacing produced. */}
      <div className="shell -mt-10 lg:-mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => (
            <div key={item.title} className="card flex h-full flex-col p-6">
              <span className="icon-tile mb-5 h-11 w-11">
                <item.icon className="h-5 w-5" />
              </span>
              <h2 className="mb-2 font-semibold">{item.title}</h2>
              <div className="space-y-0.5">
                {item.details.map((detail) => (
                  <p key={detail} className="text-sm text-muted">
                    {detail}
                  </p>
                ))}
              </div>
              {item.action && (
                <a
                  href={item.action.href}
                  className="mt-auto pt-4 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {item.action.label} &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------- Form + side */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-display-sm font-semibold">
              {t('contact.sendMessage')}
            </h2>
            <p className="mb-8 mt-2 text-muted">{t('contact.formSubtitle')}</p>
            <ContactForm />
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="mb-5 text-lg font-semibold">{t('contact.quickActions')}</h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <a
                    key={action.title}
                    href={action.href}
                    className="group flex items-start gap-4 rounded-2xl border border-line bg-sunken p-4 transition-colors hover:border-primary-300 hover:bg-surface dark:hover:border-primary-700"
                  >
                    <span className="icon-tile h-10 w-10 rounded-xl">
                      <action.icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{action.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{action.description}</span>
                    </span>
                    <span className="shrink-0 self-center text-sm font-semibold text-primary-700 transition-transform group-hover:translate-x-0.5 dark:text-primary-300">
                      &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-5 text-lg font-semibold">{t('contact.ourLocation')}</h2>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-sunken">
                <iframe
                  src="https://www.google.com/maps?q=45.5152,-122.6784&z=13&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.ourLocation')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- FAQ */}
      <section className="section bg-sunken">
        <div className="shell">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-display-md font-semibold">{t('contact.faq')}</h2>
            <p className="lede mt-4">{t('contact.faqSubtitle')}</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="card group p-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sunken text-lg leading-none text-subtle transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- CTA */}
      <section className="section-tight bg-stone-950 text-center text-stone-400">
        <div className="shell-narrow">
          <h2 className="font-display text-display-sm font-semibold text-white">
            {t('contact.preferPhone')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg">{t('contact.phoneSubtitle')}</p>
          <a href="tel:+18001234567" className="btn btn-lg btn-primary mt-8">
            <Phone className="h-[18px] w-[18px]" />
            {t('contact.callPhone')}
          </a>
        </div>
      </section>
    </div>
  )
}
