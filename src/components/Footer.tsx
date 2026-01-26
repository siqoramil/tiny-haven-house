'use client'

import Link from 'next/link'
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export default function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    explore: [
      { label: t('footer.allHouses'), href: '/houses' },
      { label: t('footer.featuredHomes'), href: '/houses?featured=true' },
      { label: t('footer.cabins'), href: '/houses?type=cabin' },
      { label: t('footer.containerHomes'), href: '/houses?type=container' },
      { label: t('footer.aFrames'), href: '/houses?type=a-frame' },
    ],
    company: [
      { label: t('footer.aboutUs'), href: '/about' },
      { label: t('footer.contact'), href: '/contact' },
      { label: t('footer.careers'), href: '/careers' },
      { label: t('footer.press'), href: '/press' },
    ],
    resources: [
      { label: t('footer.tinyLivingGuide'), href: '/guides/tiny-living' },
      { label: t('footer.financingOptions'), href: '/financing' },
      { label: t('footer.faq'), href: '/faq' },
      { label: t('footer.blog'), href: '/blog' },
    ],
  }

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">TinyHaven</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@tinyhaven.com" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" />
                hello@tinyhaven.com
              </a>
              <a href="tel:+18001234567" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                1-800-123-4567
              </a>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4" />
                Portland, Oregon, USA
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} TinyHaven. {t('footer.allRightsReserved')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link href="/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
