import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  User,
  Briefcase,
  FolderKanban,
  Award,
  Download,
  MapPin,
  CheckCircle2,
  Save,
  Check,
  FileText,
  Settings,
  X,
  Bell,
  Shield,
  Mail,
  Phone,
  GraduationCap,
  Globe,
  FileDown,
  Edit3,
  Printer,
} from 'lucide-react';
import { useLanguage } from '../translations';
import { UserCvData, INITIAL_CV_DATA } from '../types/cv';
import { getStoredCvData, saveStoredCvData } from '../utils/profileMatching';
import { CvPreviewDocument } from './CvPreviewDocument';
import { CvWizardForm } from './CvWizardForm';

export type ProfileSection =
  | 'overview'
  | 'edit'
  | 'documents'
  | 'resources'
  | 'services';

interface ProfilePageProps {
  onBack: () => void;
  onOpenAssistant?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onBack,
  onOpenAssistant,
}) => {
  const { t } = useLanguage();
  const [selectedSection, setSelectedSection] = useState<ProfileSection>('overview');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // 6-step CV Collected Data
  const [cvData, setCvData] = useState<UserCvData>(() => getStoredCvData());

  // Candidate Data (Editable)
  const initialCv = getStoredCvData();
  const [profile, setProfile] = useState({
    fullName: initialCv.fullName || 'Dr. Same Dikongue Georges',
    title: initialCv.jobTitle || 'Médecin Généraliste',
    email: initialCv.email || 'same.dikongue@gmail.com',
    phone: initialCv.phone || '+237 6 78 12 34 56',
    location: initialCv.address || 'Douala, Cameroun',
    education: initialCv.educations[0]?.degree || 'Doctorat en Médecine (FMSB Yaoundé)',
    experienceYears: '10 ans d\'expérience',
    fneId: 'FNE-CMR-2026-8941',
    bio: initialCv.aboutMe || "Médecin diplômé et expérimenté, avec plus de 10 ans d'expérience hospitalière dans la prise en charge globale des patients. Passionné par la qualité des soins, la prévention et l'amélioration continue des pratiques médicales.",
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Documents FNE360
  const DOCUMENTS = [
    {
      id: 'DOC-2026-001',
      title: 'Attestation d\'Inscription Nationale FNE360',
      category: 'Document Officiel',
      date: '05 Janvier 2026',
      size: '240 Ko',
      file: 'Attestation_Inscription_FNE360.pdf',
    },
    {
      id: 'DOC-2026-081',
      title: 'Récépissé de Candidature — MTN Cameroun',
      category: 'Récépissé de Dépôt',
      date: '01 Octobre 2026',
      size: '185 Ko',
      file: 'Recepisse_Candidature_MTN.pdf',
    },
    {
      id: 'DOC-2026-064',
      title: 'Récépissé de Candidature — Camtel Télécoms',
      category: 'Récépissé de Dépôt',
      date: '28 Septembre 2026',
      size: '190 Ko',
      file: 'Recepisse_Candidature_Camtel.pdf',
    },
    {
      id: 'DOC-2026-042',
      title: 'Récépissé de Candidature — Eneo Cameroun',
      category: 'Récépissé de Dépôt',
      date: '20 Septembre 2026',
      size: '180 Ko',
      file: 'Recepisse_Candidature_Eneo.pdf',
    },
    {
      id: 'DOC-2026-115',
      title: 'Fiche Récapitulative du Bilan de Compétences',
      category: 'Orientation & Carrière',
      date: '15 Août 2026',
      size: '310 Ko',
      file: 'Bilan_Competences_Samuel_Ndjock.pdf',
    },
  ];

  // Resources
  const RESOURCES = [
    {
      id: 'r1',
      title: 'Modèle officiel de CV FNE 2026 (Format ATS)',
      desc: 'Structure certifiée par les recruteurs du FNE et conforme aux normes internationales.',
      badge: 'Word & PDF',
    },
    {
      id: 'r2',
      title: 'Pack de 10 Lettres de Motivation ciblées',
      desc: 'Formules percutantes pour jeunes diplômés, stages et candidatures spontanées.',
      badge: 'Pack Pro',
    },
    {
      id: 'r3',
      title: 'Guide d\'or : Réussir son Entretien d\'Embauche au Cameroun',
      desc: 'Gestion du stress, posture professionnelle et réponses aux questions clés.',
      badge: 'Guide Gratuit',
    },
    {
      id: 'r4',
      title: 'Baromètre des Salaires et Métiers Porteurs 2026',
      desc: 'Grille d\'analyse des rémunérations moyennes par secteur : Tech, BTP, Agro-industrie.',
      badge: 'Rapport FNE',
    },
  ];

  // Certificats
  const CERTIFICATES = [
    {
      id: 'cert-1',
      title: 'Certificat en Développement Web & Applications Modernes',
      issuer: 'Fonds National de l\'Emploi (FNE) & MINEFOP',
      issueDate: 'Septembre 2026',
      badge: 'Certifié',
      grade: 'Mention Très Bien',
      credentialId: 'FNE-CERT-2026-0982',
    },
    {
      id: 'cert-2',
      title: 'Certification Compétences Numériques & Outils IA',
      issuer: 'Programme National d\'Insertion FNE360',
      issueDate: 'Août 2026',
      badge: 'Certifié',
      grade: 'Score 95/100',
      credentialId: 'FNE-IA-2026-4410',
    },
    {
      id: 'cert-3',
      title: 'Attestation de Préparation à l\'Emploi & Soft Skills',
      issuer: 'Centre d\'Orientation Professionnelle (CIOP)',
      issueDate: 'Juillet 2026',
      badge: 'Validé',
      grade: 'Compétence Confirmée',
      credentialId: 'CIOP-SS-2026-1175',
    },
    {
      id: 'cert-4',
      title: 'Gestion de Projet Agile & Méthodes Collaboratives',
      issuer: 'FNE Entreprises & Partenaires',
      issueDate: 'Juin 2026',
      badge: 'Certifié',
      grade: 'Mention Bien',
      credentialId: 'FNE-AGILE-2026-2309',
    },
  ];

  const handleSaveCvData = (updated: UserCvData) => {
    setCvData(updated);
    saveStoredCvData(updated);
    setProfile((prev) => ({
      ...prev,
      fullName: updated.fullName,
      title: updated.jobTitle,
      email: updated.email,
      phone: updated.phone,
      location: updated.address,
      bio: updated.aboutMe,
      education: updated.educations[0]?.degree || prev.education,
    }));
    setDownloadNotice('Données enregistrées et aperçu du CV mis à jour avec succès !');
    setTimeout(() => setDownloadNotice(null), 3500);
    setSelectedSection('overview');
  };

  const triggerDownload = (fileName: string) => {
    setDownloadNotice(`Téléchargement de « ${fileName} » lancé avec succès !`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  // 4 Menu Cards (Agrandies de 15%)
  const MENU_CARDS = [
    {
      id: 'edit' as ProfileSection,
      title: 'Modifier mon profil',
      icon: User,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100/70 text-purple-600 group-hover:bg-purple-200/80',
    },
    {
      id: 'documents' as ProfileSection,
      title: 'Mes Documents',
      icon: Briefcase,
      iconColor: 'text-brand-orange',
      bgColor: 'bg-orange-100/70 text-brand-orange group-hover:bg-orange-200/80',
    },
    {
      id: 'resources' as ProfileSection,
      title: 'Mes ressources',
      icon: FolderKanban,
      iconColor: 'text-brand-green',
      bgColor: 'bg-emerald-100/70 text-brand-green group-hover:bg-emerald-200/80',
    },
    {
      id: 'services' as ProfileSection,
      title: 'Mes certificats',
      icon: Award,
      iconColor: 'text-brand-blue',
      bgColor: 'bg-blue-100/70 text-brand-blue group-hover:bg-blue-200/80',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-12 font-sans antialiased text-foreground">
      {/* Main Page Container: Pleine largeur en mode édition pour lisibilité maximale */}
      <div
        className={`mx-auto w-full pt-6 transition-all ${
          selectedSection === 'edit'
            ? 'max-w-7xl px-4 sm:px-6 lg:px-8'
            : 'max-w-5xl px-2 sm:px-4'
        }`}
      >
        {/* Notification Toast */}
        {downloadNotice && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-none" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Dynamic Content */}
        <main className="space-y-6">
          {/* VUE 1 : PROFIL ET MENU DE CARTES */}
          {selectedSection === 'overview' && (
            <div className="space-y-5">
              {/* En haut page profil : Retour accueil à gauche et Paramètres à droite */}
              <div className="flex items-center justify-between no-print">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-2xs hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour à l'accueil</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  aria-label="Paramètres"
                  title="Paramètres"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-neutral-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <Settings className="h-4 w-4 text-foreground" />
                </button>
              </div>

              {/* CARTES DE NAVIGATION (AU-DESSUS DU CV) — AGRANDIES DE 15% */}
              <section className="pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4.5">
                  {MENU_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <motion.button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedSection(card.id)}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/80 bg-card p-4.5 sm:p-5.5 py-5 sm:py-6 min-h-[118px] sm:min-h-[136px] shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all text-center cursor-pointer group"
                      >
                        <div className={`h-12 w-12 sm:h-13 sm:w-13 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-2xs ${card.bgColor}`}>
                          <Icon className={`h-6.5 w-6.5 sm:h-7 sm:w-7 stroke-[2.2] ${card.iconColor}`} />
                        </div>
                        <span className="text-sm sm:text-[15px] font-extrabold text-foreground group-hover:text-brand-blue transition-colors leading-tight">
                          {card.title}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {/* CV PROTOTYPE SUR FORMAT A4 (EXACTEMENT CONFORME À L'IMAGE) */}
              <section className="mt-4">
                <CvPreviewDocument
                  data={cvData}
                  onDownload={() => triggerDownload(`CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`)}
                />
              </section>

              {/* Lien retour accueil au bas du profil */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-neutral-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour à l'accueil</span>
                </button>
              </div>
            </div>
          )}

          {/* VUE 2 : FORMULAIRE DE COLLECTE (PLEINE LARGEUR) */}
          {selectedSection === 'edit' && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                    Modifier mon profil
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
                    Renseignez vos informations complètes pour mettre à jour votre CV.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-blue hover:bg-neutral-100 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voir l'aperçu du CV</span>
                </button>
              </div>

              <CvWizardForm
                initialData={cvData}
                onSave={handleSaveCvData}
                onCancel={() => setSelectedSection('overview')}
              />
            </div>
          )}

          {/* VUE 3 : MES DOCUMENTS (À LA PLACE DE MES CANDIDATURES) */}
          {selectedSection === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Mes Documents FNE360 ({DOCUMENTS.length})
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Consultez et téléchargez vos pièces officielles, récépissés et attestations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Retour au profil</span>
                </button>
              </div>

              <div className="space-y-3">
                {DOCUMENTS.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-3xl border border-border bg-card p-5 transition-all hover:border-brand-orange/30 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                            {doc.category}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {doc.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mt-1">{doc.title}</h3>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          Réf : {doc.id} • {doc.size}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => triggerDownload(doc.file)}
                      className="flex items-center justify-center gap-1.5 rounded-2xl bg-neutral-100 px-4 py-2 text-xs font-bold text-foreground hover:bg-brand-orange hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="rounded-full bg-neutral-100 border border-border px-5 py-2 text-xs font-bold text-foreground hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  ← Revenir à mon profil
                </button>
              </div>
            </div>
          )}

          {/* VUE 4 : MES RESSOURCES */}
          {selectedSection === 'resources' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Mes Ressources FNE360</h2>
                  <p className="text-xs text-muted-foreground">
                    Modèles de CV, guides méthodologiques et outils certifiés gratuits.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Retour au profil</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {RESOURCES.map((res) => (
                  <div
                    key={res.id}
                    className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5 hover:border-brand-green/30 transition-all shadow-2xs"
                  >
                    <div>
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {res.badge}
                      </span>
                      <h3 className="text-sm font-bold text-foreground mt-2">{res.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{res.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerDownload(`${res.title}.pdf`)}
                      className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-neutral-100 py-2.5 text-xs font-bold text-foreground hover:bg-brand-green hover:text-white transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Obtenir la ressource</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="rounded-full bg-neutral-100 border border-border px-5 py-2 text-xs font-bold text-foreground hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  ← Revenir à mon profil
                </button>
              </div>
            </div>
          )}

          {/* VUE 5 : MES CERTIFICATS */}
          {selectedSection === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Mes Certificats FNE360</h2>
                  <p className="text-xs text-muted-foreground">
                    Certifications professionnelles et attestations homologuées par le FNE et ses partenaires.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Retour au profil</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CERTIFICATES.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5 space-y-3 shadow-2xs hover:border-brand-blue/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-blue border border-brand-blue/20">
                          {cert.badge}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {cert.issueDate}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground leading-snug mt-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                      <div className="mt-2 text-[11px] text-brand-green font-medium">
                        {cert.grade} • ID : {cert.credentialId}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => triggerDownload(`${cert.title}.pdf`)}
                      className="flex items-center justify-center gap-1.5 rounded-2xl bg-neutral-100 py-2.5 text-xs font-bold text-foreground hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Télécharger l'attestation (PDF)</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedSection('overview')}
                  className="rounded-full bg-neutral-100 border border-border px-5 py-2 text-xs font-bold text-foreground hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  ← Revenir à mon profil
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Page Footer */}
        <footer className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm font-semibold text-foreground">© 2026 Samexim Digital</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('home.footer.rights')}</p>
        </footer>
      </div>

      {/* Modal Paramètres */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-100 text-foreground">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">Paramètres du compte</h3>
                    <p className="text-xs text-muted-foreground">Préférences et confidentialité FNE360</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {/* Notifications */}
                <div className="flex items-center justify-between rounded-2xl border border-border bg-neutral-50 p-3.5">
                  <div className="flex items-center gap-2.5">
                    <Bell className="h-4 w-4 text-brand-blue" />
                    <div>
                      <p className="font-semibold text-foreground">Alertes nouvelles offres</p>
                      <p className="text-[11px] text-muted-foreground">Notifications par SMS & Email</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-brand-green border border-emerald-500/20">
                    Activé
                  </span>
                </div>

                {/* Confidentialité */}
                <div className="flex items-center justify-between rounded-2xl border border-border bg-neutral-50 p-3.5">
                  <div className="flex items-center gap-2.5">
                    <Shield className="h-4 w-4 text-brand-green" />
                    <div>
                      <p className="font-semibold text-foreground">Visibilité du profil FNE</p>
                      <p className="text-[11px] text-muted-foreground">Visible par les recruteurs agréés</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-bold text-brand-blue border border-brand-blue/20">
                    Public
                  </span>
                </div>

                {/* Identifiant */}
                <div className="rounded-2xl border border-border bg-neutral-50 p-3.5">
                  <p className="text-[11px] text-muted-foreground">Identifiant Unique Candidat</p>
                  <p className="font-mono font-bold text-foreground text-sm mt-0.5">{profile.fneId}</p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full rounded-2xl bg-brand-blue py-2.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Fermer les paramètres
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
