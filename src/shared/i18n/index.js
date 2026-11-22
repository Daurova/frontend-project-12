// src/shared/i18n/index.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru/translation.json';

// Фабрика: новый чистый экземпляр на каждый запуск приложения
export const createI18n = () => {
  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
  return i18n;
};
