import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  GraduationCap,
  Briefcase,
  Layers,
  Users,
  Heart,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
  Save,
  Camera,
  Upload,
  Image as ImageIcon,
  Calendar,
  RotateCcw,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  UserCvData,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ReferenceItem,
} from '../types/cv';

interface CvWizardFormProps {
  initialData: UserCvData;
  onSave: (data: UserCvData) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 1, title: 'Informations personnelles', subtitle: 'Identité & Contact', icon: User },
  { id: 2, title: 'Formations', subtitle: 'Diplômes & Certifications', icon: GraduationCap },
  { id: 3, title: 'Expériences professionnelles', subtitle: 'Postes & Réalisations', icon: Briefcase },
  { id: 4, title: 'Compétences & Langues', subtitle: 'Savoir-faire & Niveaux', icon: Layers },
  { id: 5, title: 'Références', subtitle: 'Tuteurs & Mentors', icon: Users },
  { id: 6, title: 'Hobbies & Loisirs', subtitle: 'Centres d\'intérêt', icon: Heart },
];

// Helper: parse any French/ISO date to YYYY-MM-DD for the HTML5 native calendar
function parseToIso(dateStr: string): string {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  const ddmmyyyy = dateStr.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
  if (ddmmyyyy) {
    const day = ddmmyyyy[1].padStart(2, '0');
    const month = ddmmyyyy[2].padStart(2, '0');
    const year = ddmmyyyy[3];
    return `${year}-${month}-${day}`;
  }

  const frenchMatch = dateStr.match(/(\d{1,2})\s+([a-zA-Z\u00C0-\u017F]+)\s+(\d{4})/i);
  if (frenchMatch) {
    const day = frenchMatch[1].padStart(2, '0');
    const months: Record<string, string> = {
      janvier: '01', fevrier: '02', février: '02', mars: '03', avril: '04',
      mai: '05', juin: '06', juillet: '07', aout: '08', août: '08',
      septembre: '09', octobre: '10', novembre: '11', decembre: '12', décembre: '12'
    };
    const month = months[frenchMatch[2].toLowerCase()] || '03';
    const year = frenchMatch[3];
    return `${year}-${month}-${day}`;
  }

  const yearMatch = dateStr.match(/\b(19\d{2}|20\d{2})\b/);
  if (yearMatch) {
    return `${yearMatch[1]}-03-12`;
  }
  return '';
}

// Helper: format ISO date (YYYY-MM-DD) to friendly French CV format with age
function formatBirthDate(isoStr: string): string {
  if (!isoStr) return '';
  const parts = isoStr.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return isoStr;
  }
  const [y, m, d] = parts;
  const today = new Date();
  let age = today.getFullYear() - y;
  const monthDiff = today.getMonth() - (m - 1);
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d)) {
    age--;
  }

  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const monthName = months[m - 1] || 'mars';

  if (age >= 15 && age <= 100) {
    return `${age} ans (né le ${d} ${monthName} ${y})`;
  }
  return `Né le ${d} ${monthName} ${y}`;
}

export const CvWizardForm: React.FC<CvWizardFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserCvData>(initialData);

  // Photo upload refs & state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Birthdate state (for HTML5 simple calendar)
  const [isoBirthDate, setIsoBirthDate] = useState<string>(() => parseToIso(initialData.birthDate));

  // Certifications state for Step 2
  const [newCert, setNewCert] = useState('');

  // New item inputs
  const [newSkill, setNewSkill] = useState('');
  const [newHobby, setNewHobby] = useState('');

  // Handle direct updates
  const handleChange = (field: keyof UserCvData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Image Upload Handler (Galerie / Fichiers / Caméra)
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPhotoError('L\'image dépasse 10 Mo. Veuillez choisir une photo plus légère.');
      return;
    }

    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        handleChange('photoUrl', result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetPhoto = () => {
    handleChange('photoUrl', '/assets/doctor_same_dikongue.jpg');
    setPhotoError(null);
  };

  // BirthDate Calendar handler
  const handleBirthDateCalendar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIsoBirthDate(val);
    if (val) {
      const formatted = formatBirthDate(val);
      handleChange('birthDate', formatted);
    } else {
      handleChange('birthDate', '');
    }
  };

  // Certifications Helpers for Step 2
  const addCertification = (certText?: string) => {
    const text = (certText || newCert).trim();
    if (!text) return;
    const currentCerts = formData.certifications || [];
    if (!currentCerts.includes(text)) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), text],
      }));
    }
    if (!certText) setNewCert('');
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  };

  // Education Helpers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setFormData((prev) => ({ ...prev, educations: [...prev.educations, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof EducationItem, val: string) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.filter((item) => item.id !== id),
    }));
  };

  // Experience Helpers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setFormData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, val: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  // Skills Helpers
  const addSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkill.trim()) return;
    if (!formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Languages Helpers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      name: '',
      level: 'Courant',
    };
    setFormData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, val: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  // References Helpers
  const addReference = () => {
    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: '',
      role: '',
      company: '',
      phone: '',
      email: '',
    };
    setFormData((prev) => ({ ...prev, references: [...prev.references, newRef] }));
  };

  const updateReference = (id: string, field: keyof ReferenceItem, val: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  const removeReference = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((r) => r.id !== id),
    }));
  };

  // Hobbies Helpers
  const addHobby = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newHobby.trim()) return;
    if (!formData.hobbies.includes(newHobby.trim())) {
      setFormData((prev) => ({ ...prev, hobbies: [...prev.hobbies, newHobby.trim()] }));
    }
    setNewHobby('');
  };

  const removeHobby = (hobbyToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobbyToRemove),
    }));
  };

  return (
    <div className="w-full space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* BANDEAU SUPÉRIEUR ET STEPPER DE PROGRESSION (PLEINE LARGEUR)  */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-brand-blue/10 px-3.5 py-1 text-xs sm:text-sm font-bold text-brand-blue mb-2">
              Étape {currentStep} sur 6 • {STEPS[currentStep - 1].title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Renseignez vos informations ci-dessous avec des polices lisibles et confortables.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSave(formData)}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-5 py-3 text-sm sm:text-base font-extrabold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Save className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Enregistrer le CV</span>
            </button>
          </div>
        </div>

        {/* Stepper à 6 étapes (Grandes pastilles interactives) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-brand-blue bg-brand-blue/10 text-brand-blue font-extrabold shadow-sm ring-2 ring-brand-blue/20'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 font-bold'
                    : 'border-border/80 bg-neutral-50/70 text-muted-foreground hover:bg-neutral-100 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                      isCurrent
                        ? 'bg-brand-blue text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold truncate max-w-full leading-snug">
                  {step.title.split(' ')[0]}
                </span>
                <span className="text-[11px] text-muted-foreground hidden lg:block truncate max-w-full">
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CORPS DU FORMULAIRE DE COLLECTE (PLEINE LARGEUR ET LISIBLE)   */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* PAGE 1 : INFORMATIONS PERSONNELLES                        */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-border pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                  1. Identité, Métier & Coordonnées de contact
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Ces informations s'affichent sur la colonne de gauche et l'en-tête de votre CV officiel.
                </p>
              </div>

              {/* SÉLECTEUR DE PHOTO DEPUIS L'APPAREIL */}
              <div className="rounded-3xl border border-brand-blue/20 bg-linear-to-r from-blue-50/60 via-neutral-50 to-white p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                  {/* Cadre d'aperçu de la photo */}
                  <div className="relative shrink-0">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-brand-blue/40 shadow-md bg-neutral-100 flex items-center justify-center">
                      {formData.photoUrl ? (
                        <img
                          src={formData.photoUrl}
                          alt={formData.fullName || 'Photo de profil'}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <span className="absolute -bottom-2 -right-1 rounded-full bg-brand-blue px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Photo CV
                    </span>
                  </div>

                  {/* Boutons d'action : Appareil / Galerie / Caméra */}
                  <div className="flex-1 space-y-2.5 text-center sm:text-left">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-foreground">
                        Ajouter une photo à partir de l'appareil
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Choisissez une photo depuis votre téléphone, tablette ou ordinateur, ou prenez directement une photo.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                      {/* Bouton Fichier / Galerie */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-2xs hover:bg-brand-blue/90 transition-colors cursor-pointer"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Choisir depuis l'appareil</span>
                      </button>

                      {/* Bouton Prendre une photo */}
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-xl border border-brand-blue/30 bg-card px-3.5 py-2 text-xs sm:text-sm font-bold text-brand-blue hover:bg-brand-blue/5 transition-colors cursor-pointer"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Prendre une photo</span>
                      </button>

                      {/* Bouton Réinitialiser */}
                      <button
                        type="button"
                        onClick={handleResetPhoto}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-neutral-100 transition-colors cursor-pointer"
                        title="Réinitialiser avec la photo officielle par défaut"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Photo par défaut</span>
                      </button>
                    </div>

                    {photoError && (
                      <p className="text-xs font-semibold text-red-600 animate-fadeIn">
                        {photoError}
                      </p>
                    )}

                    {/* Champs fichiers masqués */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFile}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleImageFile}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Ex: SAME DIKONGUE GEORGES"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Intitulé du métier / Titre recherché *
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleChange('jobTitle', e.target.value)}
                    placeholder="Ex: MÉDECIN GÉNÉRALISTE"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Email de contact *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Ex: same.dikongue@gmail.com"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Numéro de Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Ex: +237 6 78 12 34 56"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Ex: Douala, Cameroun"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Ville et pays de résidence indiqués sur l'en-tête du CV.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm sm:text-base font-bold text-foreground">
                      Date de naissance *
                    </label>
                    {formData.birthDate && (
                      <span className="text-[11px] font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full truncate max-w-[200px]" title={formData.birthDate}>
                        {formData.birthDate}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      value={isoBirthDate}
                      onChange={handleBirthDateCalendar}
                      max={new Date().toISOString().split('T')[0]}
                      min="1940-01-01"
                      className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Calendrier simple : choisissez votre date, l'âge est calculé automatiquement sur le CV.
                  </p>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Permis de conduire
                  </label>
                  <input
                    type="text"
                    value={formData.driverLicense}
                    onChange={(e) => handleChange('driverLicense', e.target.value)}
                    placeholder="Ex: Permis B"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                    Slogan ou devise professionnelle (Optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    placeholder="Ex: Au service de la santé, pour un meilleur avenir"
                    className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-foreground mb-2">
                  Profil professionnel (Section « PROFIL » du CV)
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutMe}
                  onChange={(e) => handleChange('aboutMe', e.target.value)}
                  placeholder="Présentez votre profil, vos points forts, votre formation et vos ambitions professionnelles..."
                  className="w-full rounded-2xl border border-border bg-neutral-50/60 px-4 py-3.5 text-sm sm:text-base font-medium text-foreground leading-relaxed focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20 focus:outline-hidden"
                />
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* PAGE 2 : FORMATIONS (SUIT LE MODÈLE DU CV OFFICIEL)       */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              {/* EN-TÊTE DE L'ÉTAPE 2 */}
              <div className="border-b border-border pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                  2. Parcours Académique & Formations Complémentaires
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Conforme au modèle officiel du CV : diplômes universitaires/scolaires et certifications complémentaires.
                </p>
              </div>

              {/* SOUS-SECTION A : DIPLÔMES ET FORMATIONS PRINCIPALES (SECTION FORMATION DU CV) */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#0e2a5c]">
                        Formations & Diplômes d'État ({formData.educations.length})
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Affiché dans la section « FORMATION » avec la timeline officielle.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#0e2a5c] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#0e2a5c]/90 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter un diplôme</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.educations.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="p-5 sm:p-6 rounded-3xl border border-border bg-neutral-50/70 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-border/80 pb-3">
                        <span className="text-sm font-mono font-bold text-[#025a9e]">
                          Diplôme #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="text-muted-foreground hover:text-red-500 p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-neutral-100"
                          title="Supprimer cette formation"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-1.5">
                            Intitulé du Diplôme / Titre *
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Ex: Doctorat en Médecine"
                            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-foreground mb-1.5">
                            Faculté / Établissement / Université / Lycée *
                          </label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="Ex: Faculté de Médecine et des Sciences Biomédicales (FMSB) – Yaoundé"
                            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-foreground mb-1.5">
                            Année de début (ou Année unique)
                          </label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            placeholder="Ex: 2010 ou 2007"
                            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-foreground mb-1.5">
                            Année de fin / diplôme (Laisser vide si année unique)
                          </label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            placeholder="Ex: 2016"
                            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Précisions / Spécialisation / Mention (Optionnel)
                        </label>
                        <input
                          type="text"
                          value={edu.description || ''}
                          onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                          placeholder="Ex: Formation médicale approfondie et internat en milieu hospitalier universitaire"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>
                    </div>
                  ))}

                  {formData.educations.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-border rounded-3xl">
                      <p className="text-sm text-muted-foreground mb-3 font-medium">
                        Aucun diplôme renseigné pour le moment.
                      </p>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#0e2a5c] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Ajouter un diplôme</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SOUS-SECTION B : FORMATIONS ET CERTIFICATIONS COMPLÉMENTAIRES (SECTION MODÈLE DU CV) */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#0e2a5c]">
                        Formations & Certifications Complémentaires ({(formData.certifications || []).length})
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Affiché dans la section « FORMATIONS ET CERTIFICATIONS COMPLÉMENTAIRES » du CV sous forme de liste officielle.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formulaire d'ajout rapide */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCertification();
                      }
                    }}
                    placeholder="Ex: Certification en Réanimation Cardiopulmonaire (RCP) ou Atelier de formation continue..."
                    className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => addCertification()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter</span>
                  </button>
                </div>

                {/* Suggestions du modèle officiel */}
                <div className="rounded-2xl bg-blue-50/50 border border-blue-200/60 p-3.5 space-y-2">
                  <span className="text-xs font-bold text-[#0e2a5c] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
                    Suggestions rapides du modèle médical officiel (cliquez pour ajouter) :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Formation continue en médecine d'urgence",
                      "Atelier de prise en charge des pathologies chroniques (diabète, HTA)",
                      "Gestion des infections nosocomiales",
                      "Certificat de réanimation de base (ATLS)",
                      "Participation à plusieurs séminaires et congrès médicaux",
                    ].map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => addCertification(sug)}
                        className="rounded-full bg-white border border-blue-200 px-3 py-1 text-xs font-medium text-[#0e2a5c] hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors cursor-pointer shadow-2xs"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Liste des certifications enregistrées */}
                <div className="space-y-2 pt-2">
                  {(formData.certifications || []).map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl border border-border bg-white shadow-2xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-[#025a9e] font-bold text-base leading-none mt-0.5">•</span>
                        <span className="text-xs sm:text-sm font-medium text-foreground">
                          {cert}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCertification(idx)}
                        className="text-muted-foreground hover:text-red-500 p-1 transition-colors cursor-pointer rounded-lg hover:bg-neutral-100 shrink-0"
                        title="Supprimer cette certification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {(formData.certifications || []).length === 0 && (
                    <p className="text-xs text-muted-foreground italic py-2 text-center">
                      Aucune formation complémentaire ajoutée. Utilisez le champ ci-dessus ou les suggestions pour en ajouter.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* PAGE 3 : EXPÉRIENCES PROFESSIONNELLES                     */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                    3. Expériences Professionnelles ({formData.experiences.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Postes occupés, entreprises, missions et résultats obtenus.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-4 py-2.5 text-sm font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Ajouter une expérience</span>
                </button>
              </div>

              <div className="space-y-5">
                {formData.experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-5 sm:p-6 rounded-3xl border border-border bg-neutral-50/70 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border/80 pb-3">
                      <span className="text-sm font-mono font-bold text-brand-blue">
                        Expérience #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-muted-foreground hover:text-red-500 p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-neutral-100"
                        title="Supprimer cette expérience"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Intitulé du poste
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          placeholder="Ex: Développeur Frontend"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Entreprise / Organisation
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Ex: CAMEROUN TECH SOLUTIONS"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Date de début
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          placeholder="Ex: 2024 ou sept. 2024"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Date de fin
                        </label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="Ex: Présent ou 2026"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1.5">
                        Missions, réalisations et tâches effectuées
                      </label>
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="• Conception et développement d'interfaces réactives&#10;• Optimisation des performances et temps de chargement&#10;• Collaboration en méthode agile Scrum"
                        className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm sm:text-base font-medium text-foreground leading-relaxed focus:border-brand-blue focus:outline-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* PAGE 4 : COMPÉTENCES & LANGUES                            */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              {/* Compétences */}
              <div className="space-y-4">
                <div className="border-b border-border pb-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                    4.A Compétences Techniques & Savoir-faire ({formData.skills.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez vos technologies, logiciels et atouts opérationnels.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
                    placeholder="Ex: React.js, Tailwind CSS, Gestion de crise, SEO..."
                    className="flex-1 rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="rounded-2xl bg-brand-blue px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xs cursor-pointer hover:opacity-95"
                  >
                    Ajouter compétence
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-2 text-sm sm:text-base font-semibold text-foreground border border-border/80"
                    >
                      <span>• {skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-muted-foreground hover:text-red-500 cursor-pointer font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                      4.B Langues Pratiquées ({formData.languages.length})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Niveau de maîtrise (Bilingue, Courant, Professionnel, Débutant).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="inline-flex items-center gap-2 rounded-2xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white hover:opacity-95 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter une langue</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 rounded-2xl border border-border bg-neutral-50/70"
                    >
                      <input
                        type="text"
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                        placeholder="Langue (ex: Français, Anglais, Espagnol)"
                        className="flex-1 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                      />
                      <input
                        type="text"
                        value={lang.level}
                        onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                        placeholder="Niveau (ex: Bilingue, Courant, Débutant)"
                        className="w-full sm:w-56 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang.id)}
                        className="text-muted-foreground hover:text-red-500 cursor-pointer p-2 self-end sm:self-auto"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* PAGE 5 : RÉFÉRENCES                                       */}
          {/* ======================================================== */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                    5. Références Professionnelles ({formData.references.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Contacts de tuteurs, anciens employeurs ou mentors certifiants.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addReference}
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-purple px-4 py-2.5 text-sm font-bold text-white hover:opacity-95 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Ajouter une référence</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.references.map((ref, idx) => (
                  <div
                    key={ref.id}
                    className="p-5 sm:p-6 rounded-3xl border border-border bg-neutral-50/70 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border/80 pb-3">
                      <span className="text-sm font-mono font-bold text-brand-purple">
                        Référent #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeReference(ref.id)}
                        className="text-muted-foreground hover:text-red-500 cursor-pointer p-1.5"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Nom & Prénom du référent
                        </label>
                        <input
                          type="text"
                          value={ref.name}
                          onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                          placeholder="Ex: Dr. Jean-Paul Mbarga"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Poste & Entreprise
                        </label>
                        <input
                          type="text"
                          value={ref.role}
                          onChange={(e) => updateReference(ref.id, 'role', e.target.value)}
                          placeholder="Ex: Directeur Informatique — Camtel Télécoms"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={ref.phone}
                          onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                          placeholder="Ex: +237 677 20 45 10"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1.5">
                          Email (Optionnel)
                        </label>
                        <input
                          type="email"
                          value={ref.email || ''}
                          onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                          placeholder="Ex: jp.mbarga@camtel.cm"
                          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* PAGE 6 : HOBBIES & LOISIRS                                */}
          {/* ======================================================== */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-border pb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                  6. Loisirs & Centres d'Intérêt ({formData.hobbies.length})
                </h3>
                <p className="text-sm text-muted-foreground">
                  Passions, sports, engagements associatifs valorisants.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHobby(e)}
                  placeholder="Ex: Natation, Tennis en compétition, Lecture et théâtre..."
                  className="flex-1 rounded-2xl border border-border bg-neutral-50/60 px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-foreground focus:border-brand-blue focus:bg-card focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={addHobby}
                  className="rounded-2xl bg-brand-green px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xs cursor-pointer hover:opacity-95"
                >
                  Ajouter loisir
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {formData.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="inline-flex items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-2 text-sm sm:text-base font-semibold text-foreground border border-border/80"
                  >
                    <span>• {hobby}</span>
                    <button
                      type="button"
                      onClick={() => removeHobby(hobby)}
                      className="text-muted-foreground hover:text-red-500 cursor-pointer font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BARRE DE NAVIGATION INFÉRIEURE (BOUTONS LISIBLES ET LARGES)   */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm sm:text-base font-bold text-foreground hover:bg-neutral-100 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Étape précédente</span>
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-border px-5 py-3.5 text-sm sm:text-base font-semibold text-muted-foreground hover:bg-neutral-100 transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            Fermer sans enregistrer
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer w-full sm:w-auto"
            >
              <span>Étape suivante</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSave(formData)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-green px-8 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer w-full sm:w-auto"
            >
              <Check className="h-5 w-5" />
              <span>Valider & Enregistrer le CV</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
