import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  User,
  Briefcase,
  TrendingUp,
  GraduationCap,
  MessageSquare,
  Bell,
  Shield,
  ChevronRight,
  Globe,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../translations';
import { QuickAccessType } from './QuickAccessModal';

interface NavigationMenuModalProps {
  onClose: () => void;
  onOpenProfile: () => void;
  onOpenQuickAccess: (type: QuickAccessType) => void;
  onOpenAssistant: () => void;
  onOpenNotifications: () => void;
  onOpenPrivacy: () => void;
}

export const NavigationMenuModal: React.FC<NavigationMenuModalProps> = ({
  onClose,
  onOpenProfile,
  onOpenQuickAccess,
  onOpenAssistant,
  onOpenNotifications,
  onOpenPrivacy,
}) => {
  const { lang, setLang, t } = useLanguage();

  const handleAction = (callback: () => void) => {
    onClose();
    callback();
  };

  const MENU_LINKS = [
    {
      title: lang === 'fr' ? 'Mon Profil Professionnel' : 'My Professional Profile',
      subtitle: lang === 'fr' ? 'CV, compétences et dossier FNE' : 'CV, skills and FNE file',
      icon: User,
      color: 'text-brand-blue bg-brand-blue/10',
      action: () => handleAction(onOpenProfile),
      badge: 'Actif',
    },
    {
      title: lang === 'fr' ? 'Mes Offres d\'emploi' : 'Job Opportunities',
      subtitle: lang === 'fr' ? 'Consulter les offres par région' : 'Browse regional job openings',
      icon: Briefcase,
      color: 'text-brand-green bg-brand-green/10',
      action: () => handleAction(() => onOpenQuickAccess('opportunities')),
      badge: 'Nouveau',
    },
    {
      title: lang === 'fr' ? 'Ma Stratégie d\'insertion' : 'Career Strategy',
      subtitle: lang === 'fr' ? 'Parcours personnalisé étape par étape' : 'Step-by-step personalized journey',
      icon: TrendingUp,
      color: 'text-brand-purple bg-brand-purple/10',
      action: () => handleAction(() => onOpenQuickAccess('strategy')),
      badge: null,
    },
    {
      title: lang === 'fr' ? 'Certifications gratuites' : 'Free Certifications',
      subtitle: lang === 'fr' ? 'Formations recommandées' : 'Recommended training modules',
      icon: GraduationCap,
      color: 'text-brand-orange bg-brand-orange/10',
      action: () => handleAction(() => onOpenQuickAccess('certifications')),
      badge: 'Gratuit',
    },
    {
      title: lang === 'fr' ? 'FNE Assistant (Coach IA)' : 'FNE Assistant (AI Coach)',
      subtitle: lang === 'fr' ? 'Conseils recrutement 24h/24' : '24/7 Career guidance and tips',
      icon: MessageSquare,
      color: 'text-brand-blue bg-brand-blue/10',
      action: () => handleAction(onOpenAssistant),
      badge: '24h/24',
    },
    {
      title: lang === 'fr' ? 'Notifications' : 'Notifications',
      subtitle: lang === 'fr' ? 'Alertes opportunités et rappels' : 'Opportunity alerts and reminders',
      icon: Bell,
      color: 'text-amber-600 bg-amber-50',
      action: () => handleAction(onOpenNotifications),
      badge: null,
    },
    {
      title: lang === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy',
      subtitle: lang === 'fr' ? 'Protection de vos données FNE' : 'Your data protection rules',
      icon: Shield,
      color: 'text-neutral-600 bg-neutral-100',
      action: () => handleAction(onOpenPrivacy),
      badge: null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-sm flex-col bg-card shadow-2xl border-l border-border"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-neutral-50 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/logo-Db6BS50q.png"
              alt="FNE360"
              className="h-9 w-auto"
            />
            <span className="font-bold text-foreground text-sm tracking-tight">
              Menu FNE360
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Card Shortcut */}
        <div className="p-4 border-b border-border bg-surface-blue/30">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-sm font-bold">
              <User className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-sm truncate">
                Jeune Diplômé
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Dossier FNE-CMR-2026-8941
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleAction(onOpenProfile)}
              className="rounded-lg bg-card border border-border px-2.5 py-1 text-xs font-semibold text-brand-blue hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Voir
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {MENU_LINKS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="group flex w-full items-center justify-between gap-3 rounded-2xl p-3 text-left hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${item.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-none">
                  {item.badge && (
                    <span className="rounded-full bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 text-[10px] font-semibold text-brand-green">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Language Switcher & Footer info */}
        <div className="border-t border-border bg-neutral-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              Langue / Language
            </span>
            <div className="flex items-center gap-1 bg-card border border-border rounded-full p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`rounded-full px-2.5 py-1 transition-colors cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-brand-blue text-white shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`rounded-full px-2.5 py-1 transition-colors cursor-pointer ${
                  lang === 'en'
                    ? 'bg-brand-blue text-white shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <p className="text-[11px] text-center text-muted-foreground">
            Fonds National de l'Emploi (FNE) • Cameroun
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
