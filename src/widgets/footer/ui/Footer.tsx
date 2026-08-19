'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import { Facebook, Instagram, Twitter, Youtube } from '@/shared/ui'
import { LocaleLink as Link, useLanguage } from '@/shared/i18n'

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export default function Footer() {
  const { t } = useLanguage()

  const columns = [
    {
      heading: t('footer.explore'),
      links: [
        { label: t('footer.allHouses'), href: '/houses' },
        { label: t('footer.featuredHomes'), href: '/houses?featured=true' },
        { label: t('footer.cabins'), href: '/houses?type=cabin' },
        { label: t('footer.containerHomes'), href: '/houses?type=container' },
        { label: t('footer.aFrames'), href: '/houses?type=a-frame' },
      ],
    },
    {
      heading: t('footer.company'),
      links: [
        { label: t('footer.aboutUs'), href: '/about' },
        { label: t('footer.contact'), href: '/contact' },
        { label: t('footer.careers'), href: '/careers' },
        { label: t('footer.press'), href: '/press' },
      ],
    },
    {
      heading: t('footer.resources'),
      links: [
        { label: t('footer.tinyLivingGuide'), href: '/guides/tiny-living' },
        { label: t('footer.financingOptions'), href: '/financing' },
        { label: t('footer.faq'), href: '/faq' },
        { label: t('footer.blog'), href: '/blog' },
      ],
    },
  ]

  const contacts = [
    { icon: Mail, label: 'hello@tinyhaven.com', href: 'mailto:hello@tinyhaven.com' },
    { icon: Phone, label: '1-800-123-4567', href: 'tel:+18001234567' },
    { icon: MapPin, label: 'Portland, Oregon, USA', href: null },
  ]

  return (
    // The footer keeps one fixed dark identity in both themes — it is the
    // page's baseline, not another surface that has to flip with the palette.
    <footer className="bg-stone-950 text-stone-400">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl bg-primary-500 font-display text-lg font-semibold text-white"
                aria-hidden
              >
                t
              </span>
              <span className="font-display text-xl font-semibold text-white">TinyHaven</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed">{t('footer.description')}</p>

            <ul className="mt-7 space-y-3">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="inline-flex items-center gap-3 text-sm transition-colors hover:text-white"
                    >
                      <contact.icon className="h-4 w-4 shrink-0 text-primary-400" />
                      {contact.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-3 text-sm">
                      <contact.icon className="h-4 w-4 shrink-0 text-primary-400" />
                      {contact.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {column.heading}
              </h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-6 py-6 md:flex-row">
          <p className="order-3 text-sm text-stone-500 md:order-1">
            &copy; {new Date().getFullYear()} TinyHaven. {t('footer.allRightsReserved')}
          </p>

          <div className="order-1 flex items-center gap-1 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full text-stone-500 transition-colors hover:bg-white/10 hover:text-white"
              >
                <social.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          <div className="order-2 flex items-center gap-6 md:order-3">
            <Link href="/privacy" className="text-sm text-stone-500 transition-colors hover:text-white">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="/terms" className="text-sm text-stone-500 transition-colors hover:text-white">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
