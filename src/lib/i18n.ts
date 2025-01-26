import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  rw: {
    translation: {
      "nav.home": "Ahabanza",
      "nav.artwork": "Ubuhanzi",
      "nav.music": "Umuziki",
      "nav.stories": "Inkuru n'Imigani",
      "nav.create": "Ongeramo Ibitekerezo",
      "nav.login": "Injira",
      "nav.signup": "Iyandikishe",
      "nav.myProfile": "Umwirondoro Wanjye",
      "home.title": "Kurinda no Gusangira Umuco w'u Rwanda",
      "home.subtitle": "Menya kandi utange umusanzu ku muco w'u Rwanda",
      "featured.title": "Ibiranga Umuco",
      "auth.email": "Imeyili",
      "auth.password": "Ijambo ry'ibanga",
      "auth.login": "Injira",
      "auth.signup": "Iyandikishe",
      "auth.name": "Amazina",
      "content.creator": "Umuhanga",
      "content.inspiration": "Icyatumye",
      "content.lesson": "Icyo twigiye ku nkuru",
      "content.comments": "Ibitekerezo",
      "content.addComment": "Ongeraho igitekerezo...",
      "content.post": "Ohereza",
      "content.share": "Sangiza abandi",
      "content.lyrics": "Amagambo y'indirimbo",
      "content.dance": "Imbyino",
      "content.story": "Inkuru yose",
      "artwork.gallery.title": "Ububiko bw'Ubuhanzi bw'u Rwanda",
      "artwork.gallery.subtitle": "Reba ubuhanzi bugaragaza ubutunzi bw'umuco w'u Rwanda",
      "music.title": "Ububiko bw'Indirimbo z'u Rwanda",
      "music.subtitle": "Umva injyana n'amagambo by'umuziki w'u Rwanda",
      "stories.title": "Inkuru n'Imigani by'u Rwanda",
      "stories.subtitle": "Menya ubushishozi n'ubwenge biri mu migani y'u Rwanda"
    }
  },
  en: {
    translation: {
      "nav.home": "Home",
      "nav.artwork": "Artwork",
      "nav.music": "Music",
      "nav.stories": "Stories & Proverbs",
      "nav.create": "Add Content",
      "nav.login": "Login",
      "nav.signup": "Sign Up",
      "nav.myProfile": "My Profile",
      "home.title": "Preserve & Share Rwandan Culture",
      "home.subtitle": "Discover and contribute to Rwanda's rich cultural heritage",
      "featured.title": "Featured Content",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.login": "Login",
      "auth.signup": "Sign Up",
      "auth.name": "Full Name",
      "content.creator": "Creator",
      "content.inspiration": "Inspiration",
      "content.lesson": "Lesson from the Story",
      "content.comments": "Comments",
      "content.addComment": "Add a comment...",
      "content.post": "Post",
      "content.share": "Share",
      "content.lyrics": "Lyrics",
      "content.dance": "Dance Performance",
      "content.story": "Full Story",
    }
  },
  fr: {
    translation: {
      "nav.home": "Accueil",
      "nav.artwork": "Art",
      "nav.music": "Musique",
      "nav.stories": "Histoires et Proverbes",
      "nav.create": "Ajouter du Contenu",
      "nav.login": "Se Connecter",
      "nav.signup": "S'inscrire",
      "nav.myProfile": "Mon Profil",
      "home.title": "Préserver et Partager la Culture Rwandaise",
      "home.subtitle": "Découvrez et contribuez au riche patrimoine culturel du Rwanda",
      "featured.title": "Contenu en Vedette",
      "auth.email": "Email",
      "auth.password": "Mot de passe",
      "auth.login": "Se Connecter",
      "auth.signup": "S'inscrire",
      "auth.name": "Nom Complet",
      "content.creator": "Créateur",
      "content.inspiration": "Inspiration",
      "content.lesson": "Leçon de l'Histoire",
      "content.comments": "Commentaires",
      "content.addComment": "Ajouter un commentaire...",
      "content.post": "Publier",
      "content.share": "Partager",
      "content.lyrics": "Paroles",
      "content.dance": "Performance de Danse",
      "content.story": "Histoire Complète",
      "artwork.gallery.title": "Galerie d'Art Rwandais",
      "artwork.gallery.subtitle": "Découvrez de belles œuvres d'art qui mettent en valeur le riche patrimoine artistique du Rwanda",
      "music.title": "Collection de Musique Rwandaise",
      "music.subtitle": "Découvrez les rythmes et mélodies du patrimoine musical rwandais",
      "stories.title": "Histoires et Proverbes Rwandais",
      "stories.subtitle": "Découvrez la sagesse dans les traditions orales du Rwanda"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "rw", // Set Kinyarwanda as default
    fallbackLng: "rw",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;