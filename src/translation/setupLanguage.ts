import language from '@/appLocalStorages/language';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: language.get() || 'vi',
    fallbackLng: language.get() || 'vi',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: true,
    },
    cache: {
      enabled: true,
    },
  });

export default i18n;
