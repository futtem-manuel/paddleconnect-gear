import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          common: {
            appName: 'PaddleRank',
            login: 'Login',
            register: 'Register',
            dashboard: 'Dashboard',
            messages: 'Messages',
            findPlayers: 'Find Players',
            joinCommunity: 'Join our growing community of padel enthusiasts',
            success: 'Success'
          },
          settings: {
            selectLanguage: 'Select Language',
            languageChanged: 'Language changed successfully'
          }
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;