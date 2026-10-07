/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  User,
  Headphones,
  Play,
  Radio as RadioIcon,
  TrendingUp,
  Search,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './translations';
import { SlideshowModal } from './components/SlideshowModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfilePage } from './components/ProfilePage';
import { OpportunitiesPage } from './components/OpportunitiesPage';
import { AssistantModal } from './components/AssistantModal';
import { QuickAccessModal, QuickAccessType } from './components/QuickAccessModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ReviewsSection } from './components/ReviewsSection';

interface Partner {
  name: string;
  img: string;
}

const PARTNERS: Partner[] = [
  { name: 'MINEPIA', img: '/assets/minepia.jpg' },
  { name: 'MPMEESA', img: '/assets/mpmeesa.jpg' },
  { name: 'MINEFOP', img: '/assets/p1-CWAm2XVb.jpg' },
  { name: 'MINJEC', img: '/assets/p2-CoosTKHp.jpg' },
  { name: 'FNE', img: '/assets/p3-CvxaeUy0.jpg' },
  { name: 'MINESUP', img: '/assets/p4-CEXITq2q.jpg' },
  { name: 'CIOP', img: '/assets/p5-BXKY48IV.jpg' },
  { name: 'MINADER', img: '/assets/p6-sjUekUBw.jpg' },
  { name: 'PNUD', img: '/assets/p9-Cj2VkDCs.jpg' },
  { name: 'MTN FOUNDATION', img: '/assets/p10-BXAOlI09.jpg' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MortarboardIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 10l-10-5L2 10l10 5 10-5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function MainContent() {
  const { lang, setLang, t } = useLanguage();

  // Modals state
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showOpportunities, setShowOpportunities] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState<QuickAccessType | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Duplicated array for seamless infinite marquee
  const marqueePartners = [...PARTNERS, ...PARTNERS];

  // Full-screen Opportunities Page view (Exact design of retail-pixel-redo.lovable.app)
  if (showOpportunities) {
    return (
      <OpportunitiesPage
        onBack={() => setShowOpportunities(false)}
        onOpenProfile={() => {
          setShowOpportunities(false);
          setShowProfile(true);
        }}
      />
    );
  }

  // Full-screen Profile Page view
  if (showProfile) {
    return (
      <div className="min-h-screen bg-background">
        <ProfilePage
          onBack={() => setShowProfile(false)}
          onOpenAssistant={() => {
            setShowProfile(false);
            setShowAssistant(true);
          }}
        />
        {/* Assistant Modal if invoked from Profile */}
        <AnimatePresence>
          {showAssistant && <AssistantModal onClose={() => setShowAssistant(false)} />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8 font-sans antialiased text-foreground">
      {/* Slideshow Modal */}
      <AnimatePresence>
        {showSlideshow && <SlideshowModal onClose={() => setShowSlideshow(false)} />}
      </AnimatePresence>

      {/* Notifications Drawer */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationsModal
            onClose={() => setShowNotifications(false)}
            onClearUnread={() => setHasUnreadNotifications(false)}
          />
        )}
      </AnimatePresence>

      {/* Assistant Modal */}
      <AnimatePresence>
        {showAssistant && <AssistantModal onClose={() => setShowAssistant(false)} />}
      </AnimatePresence>

      {/* Quick Access Modal */}
      <AnimatePresence>
        {showQuickAccess && (
          <QuickAccessModal
            type={showQuickAccess}
            onClose={() => setShowQuickAccess(null)}
            onSelectType={(newType) => {
              if (newType === 'profile') {
                setShowQuickAccess(null);
                setShowProfile(true);
              } else if (newType === 'opportunities') {
                setShowQuickAccess(null);
                setShowOpportunities(true);
              } else {
                setShowQuickAccess(newType);
              }
            }}
            onOpenAssistant={() => setShowAssistant(true)}
            onOpenOpportunities={() => {
              setShowQuickAccess(null);
              setShowOpportunities(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      </AnimatePresence>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-full px-5 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-background pt-4 pb-1 sm:flex sm:justify-between">
          <img
            src="/assets/logo-Db6BS50q.png"
            alt="FNE360 — Emploi, Formation, Entrepreneuriat"
            className="h-[86px] w-auto shrink-0 -ml-[20px]"
          />

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              aria-label={t('a11y.lang')}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <span className={lang === 'en' ? 'text-brand-blue font-bold' : 'text-muted-foreground'}>
                EN
              </span>
              <span className={lang === 'fr' ? 'text-brand-blue font-bold' : 'text-muted-foreground'}>
                FR
              </span>
            </button>

            {/* Notifications Button */}
            <button
              type="button"
              onClick={() => setShowNotifications(true)}
              aria-label={t('a11y.notifications')}
              className="relative shrink-0 rounded-full p-2 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Bell className="h-6 w-6 text-foreground" />
              {hasUnreadNotifications && (
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" />
              )}
            </button>

            {/* WhatsApp FNE Assistant Button */}
            <button
              type="button"
              onClick={() => setShowAssistant(true)}
              aria-label={t('a11y.whatsapp')}
              className="shrink-0 rounded-full p-2 hover:bg-neutral-100 transition-colors cursor-pointer text-foreground hover:text-brand-green"
              title="Assistant FNE360"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </button>

            {/* Opportunités Button (Direct link to 174 offres) */}
            <button
              type="button"
              onClick={() => setShowOpportunities(true)}
              aria-label="Opportunités et Emplois"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200/80 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer"
              title="Jobel Opportunités (174 offres)"
            >
              <Search className="h-3.5 w-3.5 text-sky-600" />
              <span className="hidden sm:inline">Opportunités</span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-600 px-1 text-[10px] font-bold text-white">
                174
              </span>
            </button>

            {/* Profile Button */}
            <button
              type="button"
              onClick={() => setShowProfile(true)}
              aria-label={t('a11y.profile')}
              className="shrink-0 rounded-full p-2 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Mon Profil"
            >
              <User className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </header>

        {/* Hero Interactive Banner */}
        <motion.button
          type="button"
          onClick={() => setShowSlideshow(true)}
          aria-label={t('a11y.play')}
          whileHover={{ scale: 1.006 }}
          whileTap={{ scale: 0.995 }}
          className="relative mt-0.5 block w-full overflow-hidden rounded-2xl border border-border cursor-pointer group shadow-xs"
          style={{ aspectRatio: '20 / 9.9' }}
        >
          <img
            src="/assets/hero-screenshot.jpg"
            alt={t('home.hero.alt')}
            className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-lg backdrop-blur-xs">
              <Play className="h-6 w-6 fill-brand-blue ml-0.5" />
            </span>
          </div>
        </motion.button>

        {/* Section: Comment ça marche ? */}
        <section className="mt-6 rounded-2xl border-2 border-border bg-card p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
          <h2 className="text-base font-bold text-foreground">{t('home.steps.title')}</h2>
          <div className="mt-4 space-y-3">
            {[
              {
                n: 1,
                bg: 'bg-surface-blue',
                fg: 'text-brand-blue',
                key: 'home.step.1',
              },
              {
                n: 2,
                bg: 'bg-surface-green',
                fg: 'text-brand-green',
                key: 'home.step.2',
              },
              {
                n: 3,
                bg: 'bg-[oklch(0.96_0.03_50)]',
                fg: 'text-brand-orange',
                key: 'home.step.3',
              },
              {
                n: 4,
                bg: 'bg-[oklch(0.95_0.04_300)]',
                fg: 'text-brand-purple',
                key: 'home.step.4',
              },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${step.bg} text-sm font-bold ${step.fg}`}
                >
                  {step.n}
                </div>
                <p className="text-sm text-muted-foreground">{t(step.key)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Découvrez la Solution FNE360 (Audio Banner) */}
        <section className="mt-4 flex items-center gap-4 rounded-2xl bg-surface-green p-4">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[oklch(0.88_0.06_150)]">
            <Headphones className="h-7 w-7 text-brand-green" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-brand-green">{t('home.welcome.tag')}</p>
            <p className="mt-0.5 text-sm font-bold text-foreground">{t('home.welcome.title')}</p>
            <p className="text-xs text-muted-foreground">{t('home.welcome.sub')}</p>
          </div>
          <motion.button
            type="button"
            onClick={() => setShowSlideshow(true)}
            aria-label={t('a11y.play')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
          >
            <Play className="h-5 w-5 fill-brand-green text-brand-green ml-0.5" />
          </motion.button>
        </section>

        {/* Section: Accès rapides (Grille 2x2 selon capture d'écran) */}
        <section className="mt-7">
          <h2 className="mb-3 text-base font-bold text-foreground">{t('home.quick.title')}</h2>
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
            {[
              {
                key: 'home.quick.radio',
                type: 'profile' as QuickAccessType,
                color: 'text-brand-blue',
                Icon: User,
              },
              {
                key: 'home.quick.strategy',
                type: 'strategy' as QuickAccessType,
                color: 'text-brand-green',
                Icon: TrendingUp,
              },
              {
                key: 'home.quick.certifications',
                type: 'certifications' as QuickAccessType,
                color: 'text-brand-orange',
                Icon: MortarboardIcon,
              },
              {
                key: 'home.quick.opportunities',
                type: 'opportunities' as QuickAccessType,
                color: 'text-purple-500',
                Icon: Search,
              },
            ].map(({ key, type, color, Icon }) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => {
                  if (type === 'profile') {
                    setShowProfile(true);
                  } else if (type === 'opportunities') {
                    setShowOpportunities(true);
                  } else {
                    setShowQuickAccess(type);
                  }
                }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center justify-center gap-2.5 rounded-3xl border border-border/80 bg-card py-6 px-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)] hover:shadow-md hover:border-brand-blue/30 transition-all text-center cursor-pointer group"
              >
                <span className={color}>
                  <Icon className="h-8 w-8 stroke-[1.8] transition-transform group-hover:scale-110" />
                </span>
                <span className="text-sm font-bold text-foreground group-hover:text-brand-blue transition-colors leading-tight">
                  {t(key)}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Section: Mes offres d'emploi personnalisées (Au dessus des partenaires) */}
        <section className="mt-7 rounded-2xl bg-surface-blue p-5 border border-brand-blue/15">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-border bg-card overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
              <img
                src="/assets/assistant-BnbvCQio.png"
                alt="Mes offres d'emploi personnalisées"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{t('home.assistant.title')}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t('home.assistant.sub')}</p>
              <p className="mt-1 text-xs font-semibold text-brand-blue">
                {t('home.assistant.tag')}
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => setShowQuickAccess('opportunities')}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
          >
            <span>{t('home.assistant.cta')}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </section>

        {/* Section: Suivez-nous & Réseaux sociaux (Juste en bas de l'encadré mes offres d'emploi personnalisées) */}
        <section className="mt-5 text-center">
          <h2 className="text-sm font-bold text-foreground">{t('home.follow')}</h2>
          <div className="mt-3 flex items-center justify-center gap-3.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-2xs hover:scale-105 transition-transform"
            >
              <FacebookIcon className="h-4.5 w-4.5 fill-[#1877F2] text-[#1877F2]" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-2xs hover:scale-105 transition-transform"
            >
              <span className="text-sm font-bold text-foreground">𝕏</span>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-2xs hover:scale-105 transition-transform"
            >
              <YouTubeIcon className="h-4.5 w-4.5 fill-[#FF0000] text-white" />
            </a>
          </div>
        </section>

        {/* Section: Partenaires Emploi Jeunes (Marquee) */}
        <section className="mt-7 -mx-5">
          <h2 className="mb-3 px-5 text-base font-bold text-foreground">
            {t('home.partners.title')}
          </h2>
          <div className="group relative overflow-hidden">
            <div className="animate-marquee gap-4 px-5">
              {marqueePartners.map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex h-48 w-64 flex-none flex-col overflow-hidden rounded-3xl bg-card shadow-[0_2px_12px_rgba(15,23,42,0.06)] border border-border/40"
                >
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="h-32 w-full object-cover"
                    style={{
                      objectPosition: partner.name === 'MPMEESA' ? 'center 70%' : 'center center',
                    }}
                    loading="lazy"
                  />
                  <div className="flex flex-1 items-center justify-center px-3 bg-card">
                    <span className="text-sm font-bold tracking-wide text-foreground text-center">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Nos Statistiques & Politique de confidentialité */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
          <div className="rounded-xl bg-surface-blue/40 p-4">
            <h3 className="text-sm font-bold text-foreground">{t('home.stats.title')}</h3>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xl font-bold text-brand-purple">25K+</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t('home.stats.users')}</p>
              </div>
              <div>
                <p className="text-xl font-bold text-brand-green">500+</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t('home.stats.jobs')}</p>
              </div>
              <div>
                <p className="text-xl font-bold text-brand-orange">50+</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {t('home.stats.partners')}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="mt-3 flex w-full items-center gap-3 rounded-xl bg-surface-blue/40 p-4 text-left hover:bg-surface-blue/70 transition-colors cursor-pointer"
          >
            <Shield className="h-5 w-5 text-brand-green flex-none" />
            <span className="text-sm font-semibold text-foreground">{t('home.privacy')}</span>
          </button>
        </section>

        {/* Section: News Banner */}
        <section className="mt-4 relative overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.08)] border border-border">
          <img
            src="/assets/fne-news.jpg"
            alt={t('home.news.alt')}
            className="block w-full object-cover"
            style={{ aspectRatio: '16 / 10' }}
            loading="lazy"
          />
        </section>

        {/* Section: Avis des Utilisateurs */}
        <section className="mt-8 text-center">
          <ReviewsSection
            isOpen={isReviewsOpen}
            onToggle={() => setIsReviewsOpen(!isReviewsOpen)}
          />
        </section>

        {/* Footer */}
        <footer className="mt-6 pt-4 text-center">
          <p className="text-sm font-semibold text-foreground">© 2026 Samexim Digital</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('home.footer.rights')}</p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
