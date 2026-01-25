import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations directly
import enCommon from '../../public/locales/en/common.json'
import ruCommon from '../../public/locales/ru/common.json'
import uzCommon from '../../public/locales/uz/common.json'

const resources = {
  en: {
    common: enCommon,
  },
  ru: {
    common: ruCommon,
  },
  uz: {
    common: uzCommon,
  },
}

// Only initialize once
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // default language
      fallbackLng: 'en',
      defaultNS: 'common',
      ns: ['common'],

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    })
}

export default i18n
