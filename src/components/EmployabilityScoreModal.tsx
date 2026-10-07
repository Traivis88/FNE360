import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Award,
  CheckCircle2,
  TrendingUp,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../translations';

interface EmployabilityScoreModalProps {
  onClose: () => void;
  onOpenCertifications?: () => void;
  onOpenProfile?: () => void;
  onOpenOffers?: () => void;
}

export const EmployabilityScoreModal: React.FC<EmployabilityScoreModalProps> = ({
  onClose,
  onOpenCertifications,
  onOpenProfile,
  onOpenOffers,
}) => {
  const { lang } = useLanguage();
  const isFr = lang === 'fr';

  const score = 85;

  const criteria = [
    {
      label: isFr ? 'Complétude du profil & CV' : 'Profile & Resume completeness',
      value: 92,
      color: 'bg-brand-blue',
      textColor: 'text-brand-blue',
      icon: FileText,
      hint: isFr ? 'CV complet, photo et expériences renseignées' : 'Complete CV and experience',
    },
    {
      label: isFr ? 'Certifications & Compétences' : 'Certifications & Skills',
      value: 78,
      color: 'bg-brand-orange',
      textColor: 'text-brand-orange',
      icon: GraduationCap,
      hint: isFr ? '2 certifications validées sur 3 recommandées' : '2 of 3 recommended certifications completed',
      action: onOpenCertifications,
      actionText: isFr ? 'Ajouter une certif' : 'Add certification',
    },
    {
      label: isFr ? 'Alignement avec le marché local' : 'Market demand alignment',
      value: 88,
      color: 'bg-brand-green',
      textColor: 'text-brand-green',
      icon: TrendingUp,
      hint: isFr ? 'Forte demande dans votre secteur au Cameroun' : 'High demand in your field in Cameroon',
    },
    {
      label: isFr ? 'Disponibilité & Mobilité' : 'Availability & Mobility',
      value: 82,
      color: 'bg-brand-purple',
      textColor: 'text-brand-purple',
      icon: Briefcase,
      hint: isFr ? 'Immédiatement disponible à Yaoundé et Douala' : 'Immediately available in Yaoundé & Douala',
    },
  ];

  const recommendations = [
    {
      title: isFr ? 'Validez la certification Gestion de projet agile' : 'Complete Agile project management certification',
      gain: '+7 pts',
      onClick: () => {
        onClose();
        onOpenCertifications?.();
      },
    },
    {
      title: isFr ? 'Ajoutez vos recommandations professionnelles' : 'Add professional references',
      gain: '+5 pts',
      onClick: () => {
        onClose();
        onOpenProfile?.();
      },
    },
    {
      title: isFr ? 'Postulez à 3 offres récentes en adéquation' : 'Apply to 3 matching offers',
      gain: '+3 pts',
      onClick: () => {
        onClose();
        onOpenOffers?.();
      },
    },
  ];

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
        className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-neutral-50 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-blue text-brand-blue">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {isFr ? "Score d'employabilité FNE360" : 'FNE360 Employability Score'}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isFr ? 'Évaluation algorithmique de votre profil' : 'Algorithmic profile evaluation'}
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
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Score Gauge */}
          <div className="rounded-2xl bg-gradient-to-br from-surface-blue to-surface-green p-5 border border-brand-blue/20">
            <div className="flex items-center gap-4">
              {/* Radial Circle */}
              <div className="relative flex h-20 w-20 flex-none items-center justify-center rounded-full bg-card shadow-sm border border-brand-blue/30">
                <span className="text-2xl font-black text-brand-blue">{score}%</span>
                <span className="absolute -bottom-1 rounded-full bg-brand-green px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                  {isFr ? 'ÉLEVÉ' : 'HIGH'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground">
                  {isFr ? 'Votre profil est très attractif' : 'Your profile is highly attractive'}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isFr
                    ? 'Vous avez 3x plus de chances d’être contacté par un recruteur certifié FNE.'
                    : 'You are 3x more likely to be contacted by an FNE-certified employer.'}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-blue">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isFr ? 'Top 15% des candidats de votre région' : 'Top 15% candidates in your region'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Criteria */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isFr ? 'Détail des facteurs d’évaluation' : 'Evaluation breakdown'}
            </h4>
            <div className="mt-3 space-y-3">
              {criteria.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-neutral-50/70 p-3.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-4 w-4 ${item.textColor}`} />
                        <span className="font-semibold text-foreground">{item.label}</span>
                      </div>
                      <span className={`font-bold ${item.textColor}`}>{item.value}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{item.hint}</span>
                      {item.action && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            item.action?.();
                          }}
                          className="font-semibold text-brand-blue hover:underline cursor-pointer"
                        >
                          {item.actionText}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations to reach 100% */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-green" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {isFr ? 'Objectif 100% : Actions recommandées' : 'Target 100%: Recommended actions'}
              </h4>
            </div>

            <div className="mt-3 space-y-2">
              {recommendations.map((rec, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={rec.onClick}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border/70 bg-neutral-50/50 p-2.5 text-left hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-blue flex-none" />
                    <span className="text-xs font-medium text-foreground">{rec.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="rounded-md bg-surface-green px-1.5 py-0.5 text-[10px] font-bold text-brand-green">
                      {rec.gain}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-neutral-50 px-5 py-3 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">
            {isFr ? 'Score recalculé après chaque certification' : 'Score updated after each certification'}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-brand-blue px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
          >
            {isFr ? 'Fermer' : 'Close'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
