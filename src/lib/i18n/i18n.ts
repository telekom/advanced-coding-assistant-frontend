import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './lng/en.json';
import de from './lng/de.json';
import it from './lng/it.json';
import es from './lng/es.json';
import sk from './lng/sk.json';
import fr from './lng/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['de', 'en', 'es', 'fr', 'it', 'sk', 'fancy'],
    returnObjects: true,
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
      it: {
        translation: it,
      },
      es: {
        translation: es,
      },
      sk: {
        translation: sk,
      },
      fr: {
        translation: fr,
      },
    },
  });

export default i18n;
