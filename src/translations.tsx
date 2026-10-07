import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  fr: {
    "home.hero.alt": "Construisez votre avenir professionnel — By FNE",
    "home.steps.title": "Comment ça marche ?",
    "home.step.1": "Créez votre profil et construisez votre CV professionnel",
    "home.step.2": "Découvrez la stratégie qui convient le mieux à votre profil",
    "home.step.3": "Passez les certifications gratuites recommandées",
    "home.step.4": "Explorez les opportunités adaptées à votre parcours",
    "home.welcome.tag": "Bienvenue dans un monde de possibilités",
    "home.welcome.title": "Découvrez la Solution FNE360",
    "home.welcome.sub": "Écoutez et inspirez-vous",
    "home.quick.title": "Accès rapides",
    "home.quick.radio": "Mon profil",
    "home.quick.strategy": "Ma stratégie",
    "home.quick.certifications": "Certifications",
    "home.quick.services": "Ma stratégie",
    "home.quick.opportunities": "Opportunités",
    "home.quick.resources": "Ressources",
    "home.floating.jobs": "Offres d'emploi",
    "home.partners.title": "Partenaires Emploi Jeunes",
    "home.assistant.title": "Mes offres d'emploi personnalisées",
    "home.assistant.sub": "Explorez les qui vous ressemble",
    "home.assistant.tag": "Mise à jour toutes les 24h",
    "home.assistant.cta": "174 Offres disponibles",
    "home.stats.title": "Nos Statistiques",
    "home.stats.users": "Utilisateurs",
    "home.stats.jobs": "Emplois",
    "home.stats.partners": "Partenaires",
    "home.privacy": "Politique de confidentialité",
    "home.about.title": "Mes Offres d'emploi personnalisées",
    "home.about.sub": "Découvrez les opportunités ciblées selon vos compétences et votre région",
    "home.about.tag": "Matching intelligent FNE360 en temps réel",
    "home.news.alt": "Signature d'un accord de partenariat",
    "home.follow": "Suivez-nous",
    "home.reviews": "Avis des Utilisateurs",
    "home.footer.rights": "Tous droits réservés",
    "a11y.notifications": "Notifications",
    "a11y.lang": "Sélecteur de langue",
    "a11y.whatsapp": "WhatsApp FNE Assistant",
    "a11y.profile": "Profil",
    "a11y.play": "Lire",
    "a11y.back": "Retour à l'accueil",
    "slideshow.intro.kicker": "Bienvenue",
    "slideshow.intro.t": "Bienvenue dans un monde de possibilités",
    "slideshow.intro.d": "Le Fonds national de l'emploi vous présente…",
    "slideshow.tagline.t": "FNE360, la solution ultime contre le chômage des jeunes",
    "slideshow.tagline.d": "Un outil moderne et efficace au service de la jeunesse camerounaise.",
    "slideshow.path.kicker": "Votre parcours",
    "slideshow.path.t": "Un parcours en 5 étapes",
    "slideshow.path.d": "Découvrez comment FNE360 vous accompagne, pas à pas.",
    "slideshow.step1.t": "Formation certifiante",
    "slideshow.step1.d": "Passez des formations certifiantes gratuites et reconnues pour renforcer vos compétences.",
    "slideshow.step2.t": "Certificat d'aptitude à la recherche d'emploi",
    "slideshow.step2.d": "Obtenez le CARE et maîtrisez les codes de la recherche d'emploi.",
    "slideshow.step3.t": "Opportunités d'emploi",
    "slideshow.step3.d": "Explorez les offres adaptées à votre profil et à votre région.",
    "slideshow.step4.t": "FNE Assistant — Coach IA",
    "slideshow.step4.d": "CV, lettres, entretiens, business plan : votre coach IA vous accompagne 24h/24.",
    "slideshow.step5.t": "Radio Solution Emploi",
    "slideshow.step5.d": "Restez au parfum de l'actualité et des meilleures stratégies pour conquérir le marché.",
    "slideshow.music.pause": "Pause musique",
    "slideshow.music.play": "Lire musique"
  },
  en: {
    "home.hero.alt": "Build your professional future — By FNE",
    "home.steps.title": "How it works",
    "home.step.1": "Create your profile and build your professional resume",
    "home.step.2": "Discover the strategy that best fits your profile",
    "home.step.3": "Take the recommended free certifications",
    "home.step.4": "Explore opportunities tailored to your journey",
    "home.welcome.tag": "Welcome to a world of possibilities",
    "home.welcome.title": "Discover the FNE360 Solution",
    "home.welcome.sub": "Listen and get inspired",
    "home.quick.title": "Quick access",
    "home.quick.radio": "Mon profil",
    "home.quick.strategy": "Ma stratégie",
    "home.quick.certifications": "Certifications",
    "home.quick.services": "Ma stratégie",
    "home.quick.opportunities": "Opportunités",
    "home.quick.resources": "Resources",
    "home.floating.jobs": "Job Offers",
    "home.partners.title": "Youth Employment Partners",
    "home.assistant.title": "My Personalized Job Offers",
    "home.assistant.sub": "Explore opportunities that fit your profile",
    "home.assistant.tag": "Updated every 24h",
    "home.assistant.cta": "174 Available Offers",
    "home.stats.title": "Our Statistics",
    "home.stats.users": "Users",
    "home.stats.jobs": "Jobs",
    "home.stats.partners": "Partners",
    "home.privacy": "Privacy policy",
    "home.about.title": "My Personalized Job Offers",
    "home.about.sub": "Discover opportunities matched to your skills and region",
    "home.about.tag": "Real-time smart FNE360 matching",
    "home.news.alt": "Signing of a partnership agreement",
    "home.follow": "Follow us",
    "home.reviews": "User Reviews",
    "home.footer.rights": "All rights reserved",
    "a11y.notifications": "Notifications",
    "a11y.lang": "Language selector",
    "a11y.whatsapp": "WhatsApp FNE Assistant",
    "a11y.profile": "Profile",
    "a11y.play": "Play",
    "a11y.back": "Back to home",
    "slideshow.intro.kicker": "Welcome",
    "slideshow.intro.t": "Welcome to a world of possibilities",
    "slideshow.intro.d": "The National Employment Fund presents…",
    "slideshow.tagline.t": "FNE360, the ultimate solution to youth unemployment",
    "slideshow.tagline.d": "A modern and effective tool serving Cameroonian youth.",
    "slideshow.path.kicker": "Your journey",
    "slideshow.path.t": "A 5-step journey",
    "slideshow.path.d": "Discover how FNE360 supports you, step by step.",
    "slideshow.step1.t": "Certifying training",
    "slideshow.step1.d": "Take free, recognized certifying training to strengthen your skills.",
    "slideshow.step2.t": "Job Search Aptitude Certificate",
    "slideshow.step2.d": "Earn the CARE and master the codes of the job search.",
    "slideshow.step3.t": "Job opportunities",
    "slideshow.step3.d": "Explore openings tailored to your profile and your region.",
    "slideshow.step4.t": "FNE Assistant — AI Coach",
    "slideshow.step4.d": "Resumes, cover letters, interviews, business plans: your AI coach supports you 24/7.",
    "slideshow.step5.t": "Radio Solution Emploi",
    "slideshow.step5.d": "Stay up to date and get the best strategies to conquer the job market.",
    "slideshow.music.pause": "Pause music",
    "slideshow.music.play": "Play music"
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (k) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('fne360.lang');
      return (stored === 'en' || stored === 'fr') ? stored : 'fr';
    } catch {
      return 'fr';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('fne360.lang', newLang);
    } catch {}
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] ?? translations.fr[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
