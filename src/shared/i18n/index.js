import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru/translation.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
    },
    lng: 'ru',              // дефолтная локаль
    fallbackLng: 'ru',      // если перевода нет — берём ru
    interpolation: {
      escapeValue: false,   // React сам экранирует
    },
  });

export default i18next;