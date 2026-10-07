import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCheck, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { useLanguage } from '../translations';

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: 'job' | 'cert' | 'ai' | 'general';
  desc: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Nouvelles offres d’emploi disponibles',
    time: 'Il y a 10 min',
    read: false,
    type: 'job',
    desc: '15 nouveaux postes ont été publiés dans la région du Centre et du Littoral.',
  },
  {
    id: '2',
    title: 'Certification CARE 2026 ouverte',
    time: 'Il y a 2 heures',
    read: false,
    type: 'cert',
    desc: 'Inscrivez-vous gratuitement à la session de préparation à l’insertion professionnelle.',
  },
  {
    id: '3',
    title: 'Coach IA FNE360 mis à jour',
    time: 'Hier',
    read: true,
    type: 'ai',
    desc: 'Votre assistant virtuel peut maintenant relire et optimiser votre CV en direct.',
  },
];

interface NotificationsModalProps {
  onClose: () => void;
  onClearUnread: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose, onClearUnread }) => {
  const { lang } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onClearUnread();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-blue text-brand-blue">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">
                {lang === 'fr' ? 'Notifications' : 'Notifications'}
              </h3>
              <p className="text-xs text-muted-foreground">
                {notifications.filter((n) => !n.read).length} non lues
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllAsRead}
              title="Tout marquer comme lu"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-blue hover:text-brand-blue transition-colors"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-100 hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-3.5 transition-all border ${
                item.read
                  ? 'border-border/60 bg-neutral-50/50'
                  : 'border-brand-blue/30 bg-surface-blue/40 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white shadow-xs">
                  {item.type === 'job' && <Briefcase className="h-4 w-4 text-brand-blue" />}
                  {item.type === 'cert' && <GraduationCap className="h-4 w-4 text-brand-green" />}
                  {item.type === 'ai' && <Sparkles className="h-4 w-4 text-brand-orange" />}
                  {item.type === 'general' && <Bell className="h-4 w-4 text-brand-purple" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-brand-blue py-2.5 text-xs font-semibold text-white shadow-xs hover:opacity-90 transition-opacity"
          >
            {lang === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
