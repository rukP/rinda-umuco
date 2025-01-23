import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.artwork": "Artwork",
      "nav.music": "Music",
      "nav.stories": "Stories & Proverbs",
      "nav.create": "Add Content",
      "nav.login": "Login",
      "nav.signup": "Sign Up",
      "home.title": "Preserve & Share Rwandan Culture",
      "home.subtitle": "Discover and contribute to Rwanda's rich cultural heritage",
      "featured.title": "Featured Content",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.login": "Login",
      "auth.signup": "Sign Up",
      "auth.name": "Full Name",
    }
  },
  rw: {
    translation: {
      "nav.home": "Ahabanza",
      "nav.artwork": "Ubuhanzi",
      "nav.music": "Umuziki",
      "nav.stories": "Inkuru n'Imigani",
      "nav.create": "Ongeramo Ibitekerezo",
      "nav.login": "Injira",
      "nav.signup": "Iyandikishe",
      "home.title": "Kurinda no Gusangira Umuco w'u Rwanda",
      "home.subtitle": "Menya kandi utange umusanzu ku muco w'u Rwanda",
      "featured.title": "Ibiranga Umuco",
      "auth.email": "Imeyili",
      "auth.password": "Ijambo ry'ibanga",
      "auth.login": "Injira",
      "auth.signup": "Iyandikishe",
      "auth.name": "Amazina",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;