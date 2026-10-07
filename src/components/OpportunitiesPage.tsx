import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Heart,
  Search,
  ExternalLink,
  MapPin,
  Clock,
  Building,
  ArrowLeft,
  ChevronDown,
  Globe,
  X,
  Target,
  CheckCircle2,
} from 'lucide-react';
import {
  JobOffer,
  ContestItem,
  ProgramItem,
  JOBS_174,
  CONCOURS_DATA,
  PROGRAMS_DATA,
  BANNER_SLIDES,
  CATEGORIES,
} from '../data/opportunitiesData';
import { useLanguage } from '../translations';
import { UserCvData, INITIAL_CV_DATA } from '../types/cv';
import {
  getStoredCvData,
  evaluateJobMatch,
  getTargetedJobs,
  evaluateContestMatch,
  evaluateProgramMatch,
  MatchEvaluation,
} from '../utils/profileMatching';

export type OpportunityView = 'jobs' | 'contests' | 'programs' | 'favorites';

interface OpportunitiesPageProps {
  onBack: () => void;
  onOpenProfile?: () => void;
  initialView?: OpportunityView;
}

interface SavedItem {
  id: string;
  kind: 'jobs' | 'contests' | 'programs';
  title: string;
  source: string;
  url: string;
  description?: string;
  location?: string;
  status?: string;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  onBack,
  onOpenProfile,
  initialView = 'jobs',
}) => {
  const { lang, setLang } = useLanguage();
  const [currentView, setCurrentView] = useState<OpportunityView>(initialView);

  // Par défaut : "Mes offres ciblées" (filtrage automatique selon le profil)
  const [selectedCategory, setSelectedCategory] = useState<string>('Mes offres ciblées');
  const [selectedContestStatus, setSelectedContestStatus] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Profile data (rechargé depuis le stockage pour refléter les saisies du formulaire)
  const [cvData, setCvData] = useState<UserCvData>(() => getStoredCvData());

  useEffect(() => {
    // Synchronisation en temps réel si le profil est modifié
    const refreshProfile = () => {
      setCvData(getStoredCvData());
    };
    window.addEventListener('storage', refreshProfile);
    return () => window.removeEventListener('storage', refreshProfile);
  }, []);

  // Favorites state persisted in localStorage
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const stored = localStorage.getItem('fne360_saved_opportunities');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fne360_saved_opportunities', JSON.stringify(savedItems));
    } catch (e) {
      console.error(e);
    }
  }, [savedItems]);

  const toggleSave = (item: SavedItem) => {
    setSavedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isSaved = (id: string) => savedItems.some((i) => i.id === id);

  // Auto-sliding banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Évaluations de correspondance pour tous les emplois
  const jobEvaluations = useMemo(() => {
    const map = new Map<string, MatchEvaluation<JobOffer>>();
    JOBS_174.forEach((j) => {
      map.set(j.url, evaluateJobMatch(j, cvData));
    });
    return map;
  }, [cvData]);

  // Liste des emplois ciblés automatiquement
  const targetedJobsList = useMemo(() => {
    return getTargetedJobs(JOBS_174, cvData);
  }, [cvData]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    let list: JobOffer[] = [];

    if (selectedCategory === 'Mes offres ciblées') {
      list = targetedJobsList.map((t) => t.item);
    } else if (selectedCategory === 'Toutes les offres') {
      list = JOBS_174;
    } else if (selectedCategory === 'Stages') {
      list = JOBS_174.filter((job) => job.category.toLowerCase().includes('stage'));
    } else if (selectedCategory === 'Finance/Comptabilité') {
      list = JOBS_174.filter(
        (job) => job.category.includes('Finance') || job.category.includes('Banque')
      );
    } else if (selectedCategory === 'Humanitaire/ONG') {
      list = JOBS_174.filter(
        (job) => job.category.includes('Humanitaire') || job.category.includes('ONG')
      );
    } else if (selectedCategory === 'Santé/Social') {
      list = JOBS_174.filter(
        (job) => job.category.includes('Santé') || job.category.includes('Social')
      );
    } else {
      list = JOBS_174.filter((job) =>
        job.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.source.toLowerCase().includes(q)
    );
  }, [selectedCategory, searchQuery, targetedJobsList]);

  // Filtered Concours
  const filteredConcours = useMemo(() => {
    return CONCOURS_DATA.filter((contest) => {
      const matchesStatus =
        selectedContestStatus === 'Tous' ||
        contest.status?.toLowerCase() === selectedContestStatus.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        contest.title.toLowerCase().includes(q) ||
        contest.source.toLowerCase().includes(q) ||
        contest.level.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [selectedContestStatus, searchQuery]);

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter((prog) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        prog.title.toLowerCase().includes(q) ||
        prog.source.toLowerCase().includes(q) ||
        prog.description.toLowerCase().includes(q) ||
        (prog.level && prog.level.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  const navItems = [
    { id: 'jobs' as OpportunityView, label: lang === 'fr' ? 'Emplois' : 'Jobs', count: JOBS_174.length, icon: Briefcase },
    { id: 'contests' as OpportunityView, label: lang === 'fr' ? 'Concours' : 'Contests', count: CONCOURS_DATA.length, icon: GraduationCap },
    { id: 'programs' as OpportunityView, label: lang === 'fr' ? 'Programmes' : 'Programs', count: PROGRAMS_DATA.length, icon: Sparkles },
    { id: 'favorites' as OpportunityView, label: lang === 'fr' ? 'Favoris' : 'Saved', count: savedItems.length, icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#0f172a] font-sans selection:bg-sky-500/20 selection:text-sky-900 pb-16">
      {/* FIXED TOP HEADER (Exact styling of retail-pixel-redo.lovable.app - sans bouton partage) */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
          {/* Back button */}
          <div>
            <button
              type="button"
              onClick={onBack}
              aria-label="Retour à l'accueil"
              className="flex h-9 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Accueil</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(item.id);
                    setSearchQuery('');
                  }}
                  className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                  <span>{item.label}</span>
                  {item.id === 'favorites' && item.count > 0 && (
                    <span
                      className={`ml-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                        isActive ? 'bg-white text-sky-700' : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher (FR / EN uniquement) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              aria-label="Changer de langue"
              className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-sky-600" />
              <span>{lang === 'fr' ? 'FR' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-[1400px] px-4 pt-24 sm:px-6">
        {/* BANNER CAROUSEL (Identique à retail-pixel-redo.lovable.app) */}
        {currentView !== 'favorites' && (
          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs aspect-[10/3.45]">
            {BANNER_SLIDES.map((slide, idx) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-102 pointer-events-none'
                }`}
              />
            ))}

            {/* Clickable Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
              {BANNER_SLIDES.map((slide, idx) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* TOOLBAR: Count & Filters */}
        {currentView !== 'favorites' && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Count & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm font-semibold text-neutral-600">
                {currentView === 'jobs' && (
                  <>
                    <span className="font-bold text-sky-700 text-base">{filteredJobs.length}</span>{' '}
                    {selectedCategory === 'Mes offres ciblées'
                      ? 'offres ciblées pour votre profil'
                      : "offres d'emploi disponibles"}
                  </>
                )}
                {currentView === 'contests' && (
                  <>
                    <span className="font-bold text-sky-700 text-base">{filteredConcours.length}</span>{' '}
                    concours et bourses disponibles
                  </>
                )}
                {currentView === 'programs' && (
                  <>
                    <span className="font-bold text-sky-700 text-base">{filteredPrograms.length}</span>{' '}
                    programmes d'employabilité
                  </>
                )}
              </p>

              {/* Search Bar Input */}
              <div className="relative min-w-[240px] sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    currentView === 'jobs'
                      ? 'Rechercher poste, ville, ONG...'
                      : currentView === 'contests'
                      ? 'Rechercher concours, école...'
                      : 'Rechercher programme...'
                  }
                  className="w-full rounded-xl border border-neutral-200 bg-white py-2 pl-9 pr-8 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Select Dropdown Filters */}
            <div className="flex items-center gap-2">
              {currentView === 'jobs' && (
                <div className="relative w-full sm:w-80">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full appearance-none rounded-xl border py-2.5 pl-9 pr-10 text-xs font-bold shadow-xs focus:outline-none focus:ring-2 cursor-pointer transition-colors ${
                      selectedCategory === 'Mes offres ciblées'
                        ? 'border-sky-500 bg-sky-50/70 text-sky-900 focus:ring-sky-500/20'
                        : 'border-neutral-200 bg-white text-neutral-800 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'Mes offres ciblées'
                          ? '🎯 Mes offres ciblées (Profil automatique)'
                          : cat}
                      </option>
                    ))}
                  </select>
                  <Target className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-600" />
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                </div>
              )}

              {currentView === 'contests' && (
                <div className="relative w-full sm:w-48">
                  <select
                    value={selectedContestStatus}
                    onChange={(e) => setSelectedContestStatus(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-3.5 pr-10 text-xs font-semibold text-neutral-800 shadow-xs focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                  >
                    <option value="Tous">Tous les statuts</option>
                    <option value="Ouvert">Statut : Ouverts</option>
                    <option value="Clôturé">Statut : Clôturés</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 1: EMPLOIS (174 OFFRES RÉCENTES AVEC LIENS DIRECTS) */}
        {/* ======================================================== */}
        {currentView === 'jobs' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, idx) => {
                const cardId = `job-${idx}-${job.title.substring(0, 15)}`;
                const saved = isSaved(cardId);
                const evaluation = jobEvaluations.get(job.url);
                const isTargetedMatch = evaluation?.isTargeted || selectedCategory === 'Mes offres ciblées';

                return (
                  <article
                    key={cardId}
                    className={`flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                      isTargetedMatch
                        ? 'border-sky-300 bg-gradient-to-b from-sky-50/20 via-white to-white shadow-xs hover:shadow-md ring-1 ring-sky-200/50'
                        : 'border-neutral-200 bg-white shadow-xs hover:shadow-md'
                    }`}
                  >
                    {/* Card Head */}
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="flex-1 font-bold text-foreground text-base leading-snug line-clamp-2">
                          {job.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            toggleSave({
                              id: cardId,
                              kind: 'jobs',
                              title: job.title,
                              source: job.source,
                              url: job.url,
                              description: job.description,
                              location: job.location,
                            })
                          }
                          aria-label="Enregistrer l'offre"
                          aria-pressed={saved}
                          className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg transition-colors cursor-pointer ${
                            saved
                              ? 'bg-rose-50 text-rose-600'
                              : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${saved ? 'fill-rose-600 text-rose-600' : ''}`} />
                        </button>
                      </div>

                      {/* Source, Category & Match Badge */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
                          {job.source}
                        </span>
                        <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
                          {job.category}
                        </span>

                        {evaluation?.isTargeted && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            <span>{evaluation.matchedBadge}</span>
                          </span>
                        )}
                      </div>

                      {/* Critères de correspondance */}
                      {evaluation?.reasons && evaluation.reasons.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {evaluation.reasons.slice(0, 3).map((reason, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[10px] font-medium text-sky-800 bg-sky-50/90 px-2 py-0.5 rounded-full"
                            >
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mt-3 text-xs leading-relaxed text-neutral-600 line-clamp-3">
                        {job.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-5 border-t border-neutral-100 pt-4">
                      <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{job.location}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400">Lien Direct & Vérifié</span>
                      </div>

                      {/* Direct Link Button */}
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-sky-50 py-2.5 text-xs font-bold text-sky-700 hover:bg-sky-600 hover:text-white transition-all cursor-pointer group"
                      >
                        <span>Voir l'offre</span>
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Empty state */}
            {filteredJobs.length === 0 && (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 mb-3">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-neutral-800">Aucune offre trouvée</h4>
                <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
                  {searchQuery
                    ? `Aucun résultat pour « ${searchQuery} ». Essayez d'élargir votre recherche.`
                    : 'Aucune offre ne correspond à ce filtre pour le moment.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Toutes les offres');
                    setSearchQuery('');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-sky-700 cursor-pointer"
                >
                  Voir toutes les offres (174)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: CONCOURS & BOURSES (FONCTION PUBLIQUE & GRANDES ÉCOLES) */}
        {/* ======================================================== */}
        {currentView === 'contests' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConcours.map((contest, idx) => {
              const cardId = `contest-${idx}-${contest.title.substring(0, 15)}`;
              const saved = isSaved(cardId);
              const isOpen = contest.status === 'Ouvert';
              const contestMatch = evaluateContestMatch(contest, cvData);

              return (
                <article
                  key={cardId}
                  className={`flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                    contestMatch.isTargeted
                      ? 'border-sky-300 bg-gradient-to-b from-sky-50/20 via-white to-white shadow-xs hover:shadow-md'
                      : 'border-neutral-200 bg-white shadow-xs hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="flex-1 font-bold text-foreground text-base leading-snug line-clamp-2">
                        {contest.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            isOpen
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                          }`}
                        >
                          {contest.status}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            toggleSave({
                              id: cardId,
                              kind: 'contests',
                              title: contest.title,
                              source: contest.source,
                              url: contest.url,
                              status: contest.status,
                            })
                          }
                          aria-label="Enregistrer le concours"
                          aria-pressed={saved}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                            saved
                              ? 'bg-rose-50 text-rose-600'
                              : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${saved ? 'fill-rose-600 text-rose-600' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {contestMatch.isTargeted && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-700 border border-sky-200">
                          <CheckCircle2 className="h-3 w-3 text-sky-600" />
                          <span>Adapté à votre niveau : {contestMatch.reasons[0] || 'Recommandé'}</span>
                        </span>
                      </div>
                    )}

                    <div className="mt-4 space-y-2 border-t border-neutral-100 pt-3 text-xs text-neutral-600">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-sky-600 flex-none" />
                        <span className="font-medium text-neutral-800">{contest.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600 flex-none" />
                        <span>{contest.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-neutral-400 flex-none" />
                        <span className="font-semibold text-neutral-700">{contest.source}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={contest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-sky-50 py-2.5 text-xs font-bold text-sky-700 hover:bg-sky-600 hover:text-white transition-all cursor-pointer group"
                    >
                      <span>{contest.label || 'Accéder au concours'}</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: PROGRAMMES D'EMPLOYABILITÉ NATIONAUX             */}
        {/* ======================================================== */}
        {currentView === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog, idx) => {
              const cardId = `program-${idx}-${prog.title.substring(0, 15)}`;
              const saved = isSaved(cardId);
              const progMatch = evaluateProgramMatch(prog, cvData);

              return (
                <article
                  key={cardId}
                  className={`flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                    progMatch.isTargeted
                      ? 'border-sky-300 bg-gradient-to-b from-sky-50/20 via-white to-white shadow-xs hover:shadow-md'
                      : 'border-neutral-200 bg-white shadow-xs hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
                        <Building className="h-3.5 w-3.5" />
                        <span>{prog.source}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          toggleSave({
                            id: cardId,
                            kind: 'programs',
                            title: prog.title,
                            source: prog.source,
                            url: prog.url,
                            description: prog.description,
                          })
                        }
                        aria-label="Enregistrer le programme"
                        aria-pressed={saved}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                          saved
                            ? 'bg-rose-50 text-rose-600'
                            : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${saved ? 'fill-rose-600 text-rose-600' : ''}`} />
                      </button>
                    </div>

                    <h3 className="mt-2 font-bold text-foreground text-base leading-snug">
                      {prog.title}
                    </h3>

                    {progMatch.isTargeted && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Programme adapté à votre profil</span>
                        </span>
                      </div>
                    )}

                    <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                      {prog.description}
                    </p>

                    {prog.level && (
                      <div className="mt-3 inline-block rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                        Public cible : {prog.level}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <a
                      href={prog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-sky-50 py-2.5 text-xs font-bold text-sky-700 hover:bg-sky-600 hover:text-white transition-all cursor-pointer group"
                    >
                      <span>{prog.label || 'Découvrir le programme'}</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: MES FAVORIS                                      */}
        {/* ======================================================== */}
        {currentView === 'favorites' && (
          <section className="py-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">Mes favoris</h1>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {savedItems.length} élément{savedItems.length === 1 ? '' : 's'} enregistré
                  {savedItems.length === 1 ? '' : 's'}
                </p>
              </div>

              {savedItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSavedItems([])}
                  className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  Tout supprimer
                </button>
              )}
            </div>

            {savedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-200 bg-white py-16 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-foreground">Aucun favori pour le moment</h3>
                <p className="mt-1 max-w-sm text-xs text-neutral-500">
                  Touchez l'icône <Heart className="inline h-3.5 w-3.5 text-rose-500 fill-rose-500" /> sur une offre, un concours ou un programme pour l'enregistrer et y accéder plus tard.
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentView('jobs')}
                  className="mt-5 rounded-full bg-sky-600 px-5 py-2 text-xs font-bold text-white hover:bg-sky-700 transition-colors cursor-pointer"
                >
                  Explorer les 174 offres d'emploi
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="flex-1 font-bold text-foreground text-base leading-snug">
                          {item.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => toggleSave(item)}
                          title="Supprimer des favoris"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          <Heart className="h-4 w-4 fill-rose-600" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
                          {item.source}
                        </span>
                        <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700 capitalize">
                          {item.kind === 'jobs' ? 'Offre' : item.kind === 'contests' ? 'Concours' : 'Programme'}
                        </span>
                      </div>

                      {item.description && (
                        <p className="mt-3 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 border-t border-neutral-100 pt-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-sky-50 py-2.5 text-xs font-bold text-sky-700 hover:bg-sky-600 hover:text-white transition-all cursor-pointer group"
                      >
                        <span>Ouvrir l'annonce</span>
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};
