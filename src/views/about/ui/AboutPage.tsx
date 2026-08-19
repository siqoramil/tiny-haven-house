import Image from 'next/image'
import { ArrowRight, Award, Heart, Leaf, Users } from 'lucide-react'
import { createTranslator, LocaleLink as Link, type Language } from '@/shared/i18n'
import { getDictionary } from '@/shared/i18n/server'

export default async function AboutPage({ lang }: { lang: Language }) {
  const t = createTranslator(await getDictionary(lang))

  const values = [
    { icon: Heart, title: t('about.qualityTitle'), description: t('about.qualityDesc') },
    { icon: Leaf, title: t('about.sustainabilityTitle'), description: t('about.sustainabilityDesc') },
    { icon: Users, title: t('about.customerTitle'), description: t('about.customerDesc') },
    { icon: Award, title: t('about.excellenceTitle'), description: t('about.excellenceDesc') },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: t('about.sarahRole'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
      bio: t('about.sarahBio'),
    },
    {
      name: 'Michael Chen',
      role: t('about.michaelRole'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      bio: t('about.michaelBio'),
    },
    {
      name: 'Emily Rodriguez',
      role: t('about.emilyRole'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
      bio: t('about.emilyBio'),
    },
    {
      name: 'David Park',
      role: t('about.davidRole'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
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
    <div className="pt-16 lg:pt-20">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="section-tight bg-gradient-to-b from-primary-50 to-canvas dark:from-stone-900 dark:to-canvas">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">{t('about.heroLabel')}</span>
            <h1 className="font-display text-display-lg font-semibold">
              {t('about.heroTitle')}{' '}
              <span className="italic text-primary-700 dark:text-primary-300">
                {t('about.heroTitleHighlight')}
              </span>
            </h1>
            <p className="lede mt-6">{t('about.heroDescription')}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/houses" className="btn btn-primary">
                {t('about.exploreHomes')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                {t('about.getInTouch')}
              </Link>
            </div>
          </div>

          {/* `pb-14 pr-6` reserves room for the stats card that overhangs the
              frame, so it can never collide with the section below. */}
          <div className="relative pb-14 pr-6 lg:pb-0 lg:pr-0">
            {/* The image frame itself must be the positioned ancestor — without
                `relative` here the filled image escaped this rounded box and
                stretched across the whole column. */}
            <div className="img-frame aspect-[4/3] rounded-4xl shadow-lift">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="absolute bottom-0 right-0 grid grid-cols-2 gap-6 rounded-3xl border border-line bg-surface p-6 shadow-lift lg:-bottom-8 lg:-left-8 lg:right-auto">
              <div>
                <div className="font-display text-3xl font-semibold text-primary-700 dark:text-primary-300">
                  500+
                </div>
                <div className="mt-0.5 text-xs text-subtle">{t('about.homesSold')}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold text-primary-700 dark:text-primary-300">
                  10+
                </div>
                <div className="mt-0.5 text-xs text-subtle">{t('about.years')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Mission */}
      <section className="section bg-stone-950 text-stone-300">
        <div className="shell-narrow text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-primary-400">
            {t('about.missionLabel')}
          </span>
          <h2 className="font-display text-display-md font-semibold text-white">
            {t('about.missionTitle')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-400 sm:text-xl">
            {t('about.missionDescription')}
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- Values */}
      <section className="section">
        <div className="shell">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">{t('about.valuesLabel')}</span>
            <h2 className="font-display text-display-md font-semibold">{t('about.valuesTitle')}</h2>
            <p className="lede mt-4">{t('about.valuesDescription')}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map((value) => (
              <div key={value.title} className="card h-full p-7">
                <span className="icon-tile mb-6 h-12 w-12">
                  <value.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2.5 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Timeline */}
      <section className="section bg-sunken">
        <div className="shell">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">{t('about.journeyLabel')}</span>
            <h2 className="font-display text-display-md font-semibold">{t('about.journeyTitle')}</h2>
            <p className="lede mt-4">{t('about.journeyDescription')}</p>
          </div>

          <ol className="relative mx-auto max-w-2xl space-y-5 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-line">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative flex items-start gap-6 pl-8">
                <span
                  className="absolute left-0 top-6 h-[15px] w-[15px] rounded-full border-[3px] border-canvas bg-primary-600 dark:bg-primary-400"
                  aria-hidden
                />
                <div className="card flex-1 p-5 sm:flex sm:items-baseline sm:gap-5">
                  <span className="mb-1 block font-display text-xl font-semibold text-primary-700 dark:text-primary-300 sm:mb-0 sm:w-16 sm:shrink-0">
                    {milestone.year}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{milestone.event}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Team */}
      <section className="section">
        <div className="shell">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">{t('about.teamLabel')}</span>
            <h2 className="font-display text-display-md font-semibold">{t('about.teamTitle')}</h2>
            <p className="lede mt-4">{t('about.teamDescription')}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="img-frame mx-auto aspect-square w-40 rounded-4xl sm:w-44">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="176px"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-primary-700 dark:text-primary-300">
                  {member.role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden bg-primary-800 py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(60rem 30rem at 85% 0%, rgb(157 198 172 / 0.28), transparent 65%)',
          }}
        />
        <div className="shell relative text-center">
          <h2 className="mx-auto max-w-3xl font-display text-display-md font-semibold text-white">
            {t('about.ctaTitle')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-100">{t('about.ctaSubtitle')}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/houses" className="btn btn-lg btn-invert">
              {t('about.browseHomes')}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn btn-lg btn-glass">
              {t('about.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
