import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  FileCheck,
  Building,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../translations';

interface ApplicationsModalProps {
  onClose: () => void;
  onExploreOffers?: () => void;
}

export const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
  onClose,
  onExploreOffers,
}) => {
  const { lang } = useLanguage();
  const isFr = lang === 'fr';

  const [activeFilter, setActiveFilter] = useState<'all' | 'in_review' | 'interview' | 'accepted'>('all');

  const applications = [
    {
      id: 'app-1',
      title: isFr ? 'Gestionnaire Logistique Junior' : 'Junior Logistics Manager',
      company: 'SABC Cameroun',
      location: 'Douala, Littoral',
      appliedDate: isFr ? 'Il y a 3 jours' : '3 days ago',
      status: 'interview',
      statusText: isFr ? 'Entretien programmé' : 'Interview scheduled',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      badge: isFr ? '12 Octobre à 10h' : 'October 12 at 10 AM',
    },
    {
      id: 'app-2',
      title: isFr ? 'Chargé de Clientèle PME' : 'SME Client Relationship Officer',
      company: 'Afriland First Bank',
      location: 'Yaoundé, Centre',
      appliedDate: isFr ? 'Il y a 1 semaine' : '1 week ago',
      status: 'in_review',
      statusText: isFr ? "En cours d'examen" : 'Under review',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      badge: isFr ? 'Profil présélectionné' : 'Pre-selected',
    },
    {
      id: 'app-3',
      title: isFr ? 'Technicien Réseaux & Télécoms' : 'Telecom & Network Technician',
      company: 'MTN Cameroon',
      location: 'Bafoussam, Ouest',
      appliedDate: isFr ? 'Il y a 2 semaines' : '2 weeks ago',
      status: 'accepted',
      statusText: isFr ? 'Dossier transmis FNE' : 'Forwarded by FNE',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
      badge: isFr ? 'Offre prioritaire' : 'Priority offer',
    },
  ];

  const filteredApps = activeFilter === 'all'
    ? applications
    : applications.filter((app) => app.status === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-neutral-50 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-blue text-brand-blue">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {isFr ? 'Mes Candidatures' : 'My Applications'}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isFr ? 'Suivi en direct de vos postulations' : 'Live tracking of your applications'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Quick Stats banner */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border bg-neutral-50 p-3 text-center">
              <span className="text-lg font-bold text-brand-blue">3</span>
              <p className="text-[11px] text-muted-foreground">{isFr ? 'Envoyées' : 'Submitted'}</p>
            </div>
            <div className="rounded-xl border border-border bg-neutral-50 p-3 text-center">
              <span className="text-lg font-bold text-brand-green">1</span>
              <p className="text-[11px] text-muted-foreground">{isFr ? 'Entretiens' : 'Interviews'}</p>
            </div>
            <div className="rounded-xl border border-border bg-neutral-50 p-3 text-center">
              <span className="text-lg font-bold text-brand-orange">2</span>
              <p className="text-[11px] text-muted-foreground">{isFr ? 'En cours' : 'In review'}</p>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-xs hover:border-brand-blue/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{app.title}</h3>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 font-medium">
                      <Building className="h-3.5 w-3.5" />
                      {app.company}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${app.statusColor}`}
                  >
                    {app.statusText}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground border-t border-border/50 pt-2.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-green" />
                    {app.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-blue" />
                    {app.appliedDate}
                  </span>
                </div>

                {app.badge && (
                  <div className="mt-2.5 flex items-center justify-between rounded-xl bg-surface-green/40 px-3 py-1.5 text-xs text-brand-green font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {app.badge}
                    </span>
                    <span className="text-[11px] text-muted-foreground">FNE360 Express</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA to explore more */}
          <div className="rounded-2xl border border-dashed border-border bg-neutral-50/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              {isFr
                ? 'Besoin de postuler à de nouvelles opportunités ?'
                : 'Need to apply to new job opportunities?'}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onExploreOffers?.();
              }}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-95 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{isFr ? 'Explorer les offres d’emploi' : 'Explore job offers'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-neutral-50 px-5 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-neutral-200 px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-300 transition-colors cursor-pointer"
          >
            {isFr ? 'Fermer' : 'Close'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
