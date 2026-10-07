import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Bell, Shield, X, Globe, User, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId?: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  candidateId = 'FNE-2026-4421',
}) => {
  const { lang, setLang } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [profilePublic, setProfilePublic] = React.useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Paramètres (Settings)</h3>
                <p className="text-xs text-muted-foreground">Préférences de l'application & profil</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Langue */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-neutral-50/70 p-3.5">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-brand-blue" />
                <div>
                  <p className="font-semibold text-foreground">Langue d'affichage</p>
                  <p className="text-[11px] text-muted-foreground">Français / English</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    lang === 'fr'
                      ? 'bg-brand-blue text-white shadow-2xs'
                      : 'bg-neutral-200/70 text-neutral-700'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-brand-blue text-white shadow-2xs'
                      : 'bg-neutral-200/70 text-neutral-700'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-neutral-50/70 p-3.5">
              <div className="flex items-center gap-2.5">
                <Bell className="h-4 w-4 text-brand-blue" />
                <div>
                  <p className="font-semibold text-foreground">Alertes nouvelles offres</p>
                  <p className="text-[11px] text-muted-foreground">Notifications instantanées</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                  notificationsEnabled
                    ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                    : 'bg-neutral-200/50 text-neutral-500 border-neutral-300'
                }`}
              >
                {notificationsEnabled ? 'Activé' : 'Désactivé'}
              </button>
            </div>

            {/* Confidentialité */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-neutral-50/70 p-3.5">
              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-brand-green" />
                <div>
                  <p className="font-semibold text-foreground">Visibilité du CV & Profil</p>
                  <p className="text-[11px] text-muted-foreground">Accessible aux recruteurs</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProfilePublic(!profilePublic)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                  profilePublic
                    ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30'
                    : 'bg-neutral-200/50 text-neutral-500 border-neutral-300'
                }`}
              >
                {profilePublic ? 'Public' : 'Privé'}
              </button>
            </div>

            {/* Identifiant */}
            <div className="rounded-2xl border border-border bg-neutral-50/70 p-3.5 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-muted-foreground">Identifiant Unique</p>
                <p className="font-mono font-bold text-foreground text-sm mt-0.5">{candidateId}</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Vérifié
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl bg-brand-blue py-3 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
            >
              Enregistrer & Fermer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
