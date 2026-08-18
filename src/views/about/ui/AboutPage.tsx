import Image from 'next/image'
import { LocaleLink as Link } from '@/shared/i18n'
import { ArrowRight, Heart, Users, Award, Leaf } from 'lucide-react'
import { createTranslator, type Language } from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'

export default async function AboutPage({ lang }: { lang: Language }) {
  const t = createTranslator(await getDictionary(lang))

  const values = [
    {
      icon: Heart,
      title: t('about.qualityTitle'),
      description: t('about.qualityDesc'),
    },
    {
      icon: Leaf,
      title: t('about.sustainabilityTitle'),
      description: t('about.sustainabilityDesc'),
    },
    {
      icon: Users,
      title: t('about.customerTitle'),
      description: t('about.customerDesc'),
    },
    {
      icon: Award,
      title: t('about.excellenceTitle'),
      description: t('about.excellenceDesc'),
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: t('about.sarahRole'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: t('about.sarahBio'),
    },
    {
      name: 'Michael Chen',
      role: t('about.michaelRole'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: t('about.michaelBio'),
    },
    {
      name: 'Emily Rodriguez',
      role: t('about.emilyRole'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: t('about.emilyBio'),
    },
    {
      name: 'David Park',
      role: t('about.davidRole'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: t('about.davidBio'),
    },
  ]

  const milestones = [
    { year: '2014', event: t('about.m2014') },
    { year: '2016', event: t('about.m2016') },
    { year: '2018', event: t('about.m2018') },
    { year: '2020', event: t('about.m2020') },
    { year: '2022', event: t('about.m2022') },
    { year: '2024', event: t('about.m2024') },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-800 dark:to-neutral-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">{t('about.heroLabel')}</span>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                {t('about.heroTitle')}
                <span className="text-primary-600 dark:text-primary-400"> {t('about.heroTitleHighlight')}</span>
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
                {t('about.heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/houses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
                >
                  {t('about.exploreHomes')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-xl font-semibold hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                >
                  {t('about.getInTouch')}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                  alt="Beautiful tiny home"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">{t('about.homesSold')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">{t('about.years')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary-400 font-medium mb-4 block">{t('about.missionLabel')}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              {t('about.missionTitle')}
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              {t('about.missionDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">{t('about.valuesLabel')}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              {t('about.valuesTitle')}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {t('about.valuesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">{t('about.journeyLabel')}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              {t('about.journeyTitle')}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {t('about.journeyDescription')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

              {/* Milestones */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-6 pl-20">
                    {/* Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full ring-4 ring-white dark:ring-neutral-800" />

                    {/* Content */}
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm flex-1">
                      <div className="text-primary-600 dark:text-primary-400 font-bold mb-1">{milestone.year}</div>
                      <div className="text-neutral-700 dark:text-neutral-300">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-medium mb-4 block">{t('about.teamLabel')}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              {t('about.teamTitle')}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {t('about.teamDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="192px"
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            {t('about.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/houses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-neutral-100 transition-all"
            >
              {t('about.browseHomes')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-all border border-primary-500"
            >
              {t('about.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
