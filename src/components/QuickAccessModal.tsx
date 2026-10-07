import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Radio as RadioIcon,
  GraduationCap,
  TrendingUp,
  Search,
  Play,
  Pause,
  User,
  MapPin,
  Calendar,
  Building,
  Target,
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../translations';

export type QuickAccessType = 'profile' | 'strategy' | 'certifications' | 'opportunities' | 'resources';

interface QuickAccessModalProps {
  type: QuickAccessType;
  onClose: () => void;
  onSelectType: (type: QuickAccessType) => void;
  onOpenAssistant?: () => void;
  onOpenOpportunities?: () => void;
}

export const QuickAccessModal: React.FC<QuickAccessModalProps> = ({
  type,
  onClose,
  onSelectType,
  onOpenAssistant,
  onOpenOpportunities,
}) => {
  const { lang, t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('Tous');

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
        className="flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
      >
        {/* Header Tabs */}
        <div className="border-b border-border bg-neutral-50 px-4 pt-4">
          <div className="flex items-center justify-between pb-3">
            <h3 className="font-bold text-foreground text-base">
              {lang === 'fr' ? 'Accès Rapides FNE360' : 'FNE360 Quick Access'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick tab switcher: Mon profil, Ma stratégie, Certifications, Opportunités */}
          <div className="grid grid-cols-4 gap-1.5 pb-2">
            {/* Mon profil */}
            <button
              type="button"
              onClick={() => onSelectType('profile')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
                type === 'profile'
                  ? 'bg-card text-brand-blue shadow-xs border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="truncate">Mon profil</span>
            </button>

            {/* Ma stratégie (TrendingUp icon preserved) */}
            <button
              type="button"
              onClick={() => onSelectType('strategy')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
                type === 'strategy'
                  ? 'bg-card text-brand-green shadow-xs border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span className="truncate">Ma stratégie</span>
            </button>

            {/* Certifications (before Opportunités, Mortarboard/Graduation icon preserved) */}
            <button
              type="button"
              onClick={() => onSelectType('certifications')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
                type === 'certifications'
                  ? 'bg-card text-brand-orange shadow-xs border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span className="truncate">Certifs</span>
            </button>

            {/* Opportunités (Search icon preserved) */}
            <button
              type="button"
              onClick={() => {
                if (onOpenOpportunities) {
                  onClose();
                  onOpenOpportunities();
                } else {
                  onSelectType('opportunities');
                }
              }}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
                type === 'opportunities'
                  ? 'bg-card text-brand-purple shadow-xs border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="truncate">Emplois</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* TAB: Mon profil */}
          {type === 'profile' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-brand-blue/20 bg-surface-blue/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white text-xl font-bold shadow-md">
                    <User className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-base">Jeune Diplômé</h4>
                    <p className="text-xs text-muted-foreground">Membre FNE360 depuis 2026</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-brand-blue font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Yaoundé, Cameroun</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-brand-blue/15 pt-3 text-center">
                  <div className="rounded-xl bg-white/80 p-2 shadow-2xs">
                    <p className="text-base font-bold text-brand-purple">3</p>
                    <p className="text-[10px] text-muted-foreground">Certifications</p>
                  </div>
                  <div className="rounded-xl bg-white/80 p-2 shadow-2xs">
                    <p className="text-base font-bold text-brand-green">5</p>
                    <p className="text-[10px] text-muted-foreground">Candidatures</p>
                  </div>
                  <div className="rounded-xl bg-white/80 p-2 shadow-2xs">
                    <p className="text-base font-bold text-brand-orange">85%</p>
                    <p className="text-[10px] text-muted-foreground">Complétion CV</p>
                  </div>
                </div>
              </div>

              {/* Insertion profile summary */}
              <div className="rounded-2xl border border-border bg-card p-4 space-y-2.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  État de mon dossier FNE
                </h5>
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-2.5 text-xs">
                  <span className="text-muted-foreground">Numéro identifiant FNE :</span>
                  <span className="font-semibold text-foreground">FNE-CMR-2026-8941</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-2.5 text-xs">
                  <span className="text-muted-foreground">Statut d'inscription :</span>
                  <span className="font-bold text-brand-green flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Actif & Accompagné
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-2.5 text-xs">
                  <span className="text-muted-foreground">Programme principal :</span>
                  <span className="font-semibold text-brand-blue">PED (Emploi Diplômé)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Ma stratégie */}
          {type === 'strategy' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-brand-green/20 bg-surface-green/50 p-4">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-brand-green text-white shadow-xs">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">Ma Stratégie d’Insertion 2026</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Votre feuille de route personnalisée pour décrocher un emploi durable au Cameroun.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Roadmap */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Mon plan d'action par étapes
                </h5>

                {[
                  {
                    step: 'Phase 1',
                    title: 'Bilan de compétences & CV impactant',
                    status: 'Terminé',
                    badgeColor: 'bg-emerald-100 text-emerald-800',
                    desc: 'Diagnostic réalisé avec votre conseiller FNE. CV et profil FNE360 finalisés.',
                  },
                  {
                    step: 'Phase 2',
                    title: 'Certifications professionnelles CARE & Bureautique',
                    status: 'En cours',
                    badgeColor: 'bg-amber-100 text-amber-800',
                    desc: 'Validation des modules clés pour maximiser votre attractivité auprès des recruteurs.',
                  },
                  {
                    step: 'Phase 3',
                    title: 'Matching entreprises partenaires & Candidatures ciblées',
                    status: 'À venir',
                    badgeColor: 'bg-blue-100 text-blue-800',
                    desc: 'Positionnement sur les offres du Programme Emploi Diplômé (PED) et conventions FNE.',
                  },
                  {
                    step: 'Phase 4',
                    title: 'Préparation intensive aux entretiens avec Coach IA',
                    status: 'Prioritaire',
                    badgeColor: 'bg-purple-100 text-purple-800',
                    desc: 'Simulations personnalisées de questions techniques et comportementales.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-green uppercase tracking-wide">
                        {item.step}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <h6 className="mt-1 text-xs font-bold text-foreground">{item.title}</h6>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA Coach IA */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAssistant?.();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green py-3 text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Affiner ma stratégie avec le Coach IA</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* TAB: Certifications */}
          {type === 'certifications' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-brand-orange/20 bg-amber-500/10 p-4">
                <h4 className="font-bold text-brand-orange text-sm">Formations 100% Gratuites & Reconnues</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Financez votre avenir avec les certifications d’aptitude professionnelle du FNE.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    code: 'CARE',
                    title: "Certificat d'Aptitude à la Recherche d'Emploi",
                    hours: '40 heures',
                    desc: "Maîtrisez les codes des recruteurs, la rédaction de CV impactant et les techniques d'entretien.",
                    badge: 'Populaire',
                  },
                  {
                    code: 'DIGITAL',
                    title: 'Bureautique & Compétences Numériques',
                    hours: '60 heures',
                    desc: 'Suite bureautique professionnelle, outils collaboratifs en ligne et sécurité numérique.',
                    badge: 'Indispensable',
                  },
                  {
                    code: 'AGRO',
                    title: "Gestion d'Exploitation Agropastorale",
                    hours: '80 heures',
                    desc: 'Montage de projet, gestion des cultures et élevages, recherche de financements FNE.',
                    badge: 'Programme Rural',
                  },
                  {
                    code: 'MANAGEMENT',
                    title: "Initiation à la Création d'Entreprise",
                    hours: '50 heures',
                    desc: 'Étude de marché, business model canvas, fiscalité et formalisation légale au Cameroun.',
                    badge: 'Entrepreneuriat',
                  },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-brand-orange/15 px-2.5 py-0.5 text-[10px] font-bold text-brand-orange">
                        {c.code}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground">{c.hours}</span>
                    </div>
                    <h5 className="mt-2 text-xs font-bold text-foreground">{c.title}</h5>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                      <span className="text-[11px] font-semibold text-brand-green">100% Prise en charge FNE</span>
                      <button
                        type="button"
                        onClick={() => alert(`Votre demande d'inscription pour ${c.title} a été prise en compte !`)}
                        className="rounded-full bg-brand-orange px-3.5 py-1 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        S'inscrire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Opportunités */}
          {type === 'opportunities' && (
            <div className="space-y-4">
              {/* Full Platform Banner */}
              {onOpenOpportunities && (
                <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-4 text-white shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm">Plateforme Jobel Opportunités</h4>
                    <p className="text-xs text-sky-100 mt-0.5">
                      174 offres d'emploi récentes, concours nationaux et programmes d'employabilité
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenOpportunities();
                    }}
                    className="flex flex-none items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-sky-700 shadow-sm hover:bg-sky-50 transition-colors cursor-pointer"
                  >
                    <span>Ouvrir</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Region filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['Tous', 'Yaoundé (Centre)', 'Douala (Littoral)', 'Bafoussam (Ouest)', 'Garoua (Nord)'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRegion(r)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      selectedRegion === r
                        ? 'bg-brand-purple text-white shadow-2xs'
                        : 'border border-border bg-neutral-50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Jobs list */}
              <div className="space-y-3">
                {[
                  {
                    title: 'Assistant Comptable & Gestionnaire',
                    company: 'Société Agroalimentaire du Centre',
                    location: 'Yaoundé (Centre)',
                    type: 'CDI',
                    salary: 'Selon grille FNE / Convention',
                    fneProgram: 'PED',
                  },
                  {
                    title: 'Développeur Web / Mobile Junior',
                    company: 'Tech Innovation Hub',
                    location: 'Douala (Littoral)',
                    type: 'CDD 12 mois',
                    salary: 'Indemnités de stage + primes',
                    fneProgram: 'PEJ',
                  },
                  {
                    title: "Superviseur d'Exploitation Agricole",
                    company: "Coopérative Maraîchère de l'Ouest",
                    location: 'Bafoussam (Ouest)',
                    type: 'CDI',
                    salary: 'Prise en charge matériel + salaire',
                    fneProgram: 'PADER',
                  },
                  {
                    title: 'Conseiller Clientèle Bilingue',
                    company: 'Groupe Télécoms & Services',
                    location: 'Yaoundé (Centre)',
                    type: 'CDI',
                    salary: 'Fixe + commission',
                    fneProgram: 'PED',
                  },
                ].map((job, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card p-4 shadow-2xs hover:border-brand-purple/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-xs text-foreground">{job.title}</h5>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building className="h-3 w-3" /> {job.company}
                        </p>
                      </div>
                      <span className="rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-purple">
                        {job.type}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-brand-purple" /> {job.location}
                      </span>
                      <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-foreground">
                        Via {job.fneProgram}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                      <span className="text-[11px] text-muted-foreground">{job.salary}</span>
                      <button
                        type="button"
                        onClick={() => alert(`Candidature envoyée pour : ${job.title} !`)}
                        className="rounded-full bg-brand-purple px-3.5 py-1 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        Postuler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Ressources */}
          {type === 'resources' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground text-sm">Centre de Ressources FNE360</h4>
                <p className="text-xs text-muted-foreground">
                  Modèles officiels, guides méthodologiques et outils certifiés gratuits.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Modèle officiel de CV FNE 2026 (Format ATS)',
                    desc: 'Structure certifiée par les recruteurs du FNE et conforme aux normes internationales.',
                    badge: 'Word & PDF',
                  },
                  {
                    title: 'Pack de 10 Lettres de Motivation ciblées',
                    desc: 'Formules percutantes pour jeunes diplômés, stages et candidatures spontanées.',
                    badge: 'Pack Pro',
                  },
                  {
                    title: "Guide d'or : Réussir son Entretien d'Embauche au Cameroun",
                    desc: 'Gestion du stress, posture professionnelle et réponses aux questions clés.',
                    badge: 'Guide Gratuit',
                  },
                  {
                    title: 'Baromètre des Salaires et Métiers Porteurs 2026',
                    desc: 'Grille d\'analyse des rémunérations moyennes par secteur : Tech, BTP, Agro-industrie.',
                    badge: 'Rapport FNE',
                  },
                ].map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-2xs hover:border-brand-blue/30 transition-colors"
                  >
                    <div>
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {res.badge}
                      </span>
                      <h5 className="font-bold text-xs text-foreground mt-1">{res.title}</h5>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{res.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Téléchargement de « ${res.title} » lancé !`)}
                      className="flex flex-none items-center gap-1 rounded-xl bg-brand-blue px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Obtenir</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-neutral-50 p-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
