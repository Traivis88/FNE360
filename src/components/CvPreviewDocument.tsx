import React, { useRef, useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  User as UserIcon,
  Briefcase,
  GraduationCap,
  Settings,
  MessageSquare,
  ShieldCheck,
  Activity,
  Stethoscope,
  BookOpen,
  Dumbbell,
  Plane,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  RotateCcw,
  Users,
} from 'lucide-react';
import { UserCvData } from '../types/cv';

interface CvPreviewDocumentProps {
  data: UserCvData;
  onDownload?: () => void;
}

export const CvPreviewDocument: React.FC<CvPreviewDocumentProps> = ({
  data,
  onDownload,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic zoom: bounded between 64% and 200%
  const [zoomPercent, setZoomPercent] = useState<number>(100);

  // Exact true A4 page dimensions at 96 DPI
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  // Auto-fit initial scale on mount for small screens (bounded 64% - 200%)
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 16;
      if (containerWidth < A4_WIDTH) {
        const computed = Math.round((containerWidth / A4_WIDTH) * 100);
        setZoomPercent(Math.max(64, Math.min(200, computed)));
      }
    }
  }, []);

  const handleZoomIn = () => {
    setZoomPercent((prev) => Math.min(200, prev + 10));
  };

  const handleZoomOut = () => {
    setZoomPercent((prev) => Math.max(64, prev - 10));
  };

  const handleZoomReset = () => {
    setZoomPercent(100);
  };

  const handleFitScreen = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 16;
      const computed = Math.round((containerWidth / A4_WIDTH) * 100);
      setZoomPercent(Math.max(64, Math.min(200, computed)));
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      window.print();
    }
  };

  // Helper for language proficiency bar percentage
  const getLanguagePercent = (level: string) => {
    const lower = level.toLowerCase();
    if (lower.includes('excellent') || lower.includes('maternelle') || lower.includes('bilingue')) {
      return '95%';
    }
    if (lower.includes('bon') || lower.includes('courant') || lower.includes('avancé')) {
      return '68%';
    }
    if (lower.includes('intermédiaire') || lower.includes('moyen')) {
      return '50%';
    }
    return '32%';
  };

  // Split name for two-tone typography
  const rawName = data.fullName || 'SAME DIKONGUE GEORGES';
  const nameParts = rawName.split(' ');
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : rawName;
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  // Data items
  const allExperiences = data.experiences || [];
  const allEducations = data.educations || [];
  const allCertifications = data.certifications || [];
  const allSkills = data.skills || [];
  const allLanguages = data.languages || [];
  const allReferences = data.references || [];
  const allHobbies = data.hobbies || [];

  // Le modèle standard tient 100% sur la Page 1 (2 expériences, 2 formations, 5 certifications, 9 compétences, 3 langues, 4 centres d'intérêt)
  // La Page 2 est strictement optionnelle, générée uniquement si l'utilisateur introduit plus d'informations que le modèle standard :
  const needsTwoPages =
    allExperiences.length > 2 ||
    allEducations.length > 2 ||
    allCertifications.length > 5 ||
    allSkills.length > 9 ||
    allReferences.length > 0;

  // Multi-page navigation state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = needsTwoPages ? 2 : 1;

  // Répartition des éléments entre Page 1 et Page 2 :
  // Page 1 contient tous les éléments du modèle standard
  const page1Experiences = allExperiences.slice(0, 2);
  const page2Experiences = allExperiences.slice(2);

  const page1Educations = allEducations.slice(0, 2);
  const page2Educations = allEducations.slice(2);

  const page1Skills = allSkills.slice(0, 9);
  const page2Skills = allSkills.slice(9);

  const page1Certifications = allCertifications.slice(0, 5);
  const page2Certifications = allCertifications.slice(5);

  const renderBulletLines = (text: string) => {
    if (!text) return null;
    const lines = text
      .split(/\n|•|\. (?=[A-ZÀ-Ÿ])/)
      .map((l) => l.trim().replace(/^[•\-\*·]\s*/, ''))
      .filter((l) => l.length > 0);

    if (lines.length === 0) return null;

    return (
      <ul className="space-y-1 text-[11px] text-[#334155] leading-snug pt-0.5">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <span className="text-[#025a9e]">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    );
  };

  const scale = zoomPercent / 100;

  return (
    <div className="w-full flex flex-col items-center select-text">
      {/* ------------------------------------------------------------- */}
      {/* BARRE DE CONTRÔLE : ZOOM DYNAMIQUE (64% À 200%) & PAGINATION  */}
      {/* ------------------------------------------------------------- */}
      <div className="no-print w-full max-w-[794px] mb-3 flex flex-wrap items-center justify-between gap-2.5 bg-card/90 backdrop-blur-xs p-2.5 px-4 rounded-2xl border border-border shadow-2xs">
        {/* Contrôles de zoom dynamique 64% - 200% */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-foreground">Zoom :</span>

          {/* Bouton Moins (-) actif */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomPercent <= 64}
            title="Dézoomer (-10%)"
            className={`flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card font-black text-sm transition-all ${
              zoomPercent <= 64
                ? 'opacity-40 cursor-not-allowed text-muted-foreground'
                : 'hover:bg-neutral-100 active:scale-95 text-foreground cursor-pointer shadow-2xs'
            }`}
          >
            –
          </button>

          {/* Affichage du pourcentage */}
          <span className="w-12 text-center text-xs font-mono font-bold text-foreground">
            {zoomPercent}%
          </span>

          {/* Bouton Plus (+) actif */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomPercent >= 200}
            title="Zoomer (+10%)"
            className={`flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card font-black text-sm transition-all ${
              zoomPercent >= 200
                ? 'opacity-40 cursor-not-allowed text-muted-foreground'
                : 'hover:bg-neutral-100 active:scale-95 text-foreground cursor-pointer shadow-2xs'
            }`}
          >
            +
          </button>

          {/* Slider dynamique */}
          <input
            type="range"
            min="64"
            max="200"
            step="5"
            value={zoomPercent}
            onChange={(e) => setZoomPercent(Number(e.target.value))}
            className="w-20 sm:w-28 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0e2a5c]"
          />

          {/* Raccourci 100% */}
          <button
            type="button"
            onClick={handleZoomReset}
            className={`rounded-lg px-2 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
              zoomPercent === 100
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-card text-neutral-700 border-border hover:bg-neutral-100'
            }`}
          >
            100%
          </button>

          {/* Raccourci Ajuster */}
          <button
            type="button"
            onClick={handleFitScreen}
            className="rounded-lg px-2 py-1 text-[11px] font-semibold text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Ajuster
          </button>
        </div>

        {/* Navigation multi-pages si 2ème page générée */}
        {needsTwoPages && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                currentPage === 1
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 cursor-pointer'
              }`}
            >
              <span>Page 1</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
              className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                currentPage === 2
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 cursor-pointer'
              }`}
            >
              <span>Page 2</span>
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTENEUR SCALÉ : PRÉSERVE STRICTEMENT LE FORMAT A4           */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={containerRef}
        className="w-full flex justify-center overflow-x-auto overflow-y-hidden py-1"
        style={{
          minHeight: `${A4_HEIGHT * scale + 15}px`,
          height: `${A4_HEIGHT * scale + 15}px`,
        }}
      >
        {/* =========================================================== */}
        {/* FEUILLE PAGE 1 (OU PAGE UNIQUE) FORMAT A4 STRICT            */}
        {/* =========================================================== */}
        {currentPage === 1 && (
          <div
            id="cv-document-sheet"
            style={{
              width: `${A4_WIDTH}px`,
              minWidth: `${A4_WIDTH}px`,
              maxWidth: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              minHeight: `${A4_HEIGHT}px`,
              maxHeight: `${A4_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
            className="relative bg-white text-neutral-800 shadow-[0_16px_50px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.06)] border border-neutral-300/80 rounded-none overflow-hidden font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:transform-none flex flex-col justify-between"
          >
            {/* BOUTON TÉLÉCHARGER INTÉGRÉ DANS L'APERÇU */}
            <div className="no-print absolute top-3.5 right-3.5 z-30">
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Télécharger le CV"
                title="Télécharger le CV"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e2a5c] hover:bg-[#155dfc] text-white shadow-md hover:scale-108 active:scale-95 transition-all cursor-pointer group"
              >
                <Download className="h-4.5 w-4.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

            <div>
              {/* EN-TÊTE A4 : PHOTO EN ARCHE + NOM/MÉTIER + COORDONNÉES */}
              <header className="relative w-full px-8 pt-7 pb-5 flex items-start justify-between">
                {/* Forme douce en arrière-plan derrière la photo */}
                <div
                  className="absolute -top-8 -left-8 w-60 h-60 bg-[#eaf2fb] pointer-events-none z-0"
                  style={{
                    borderBottomRightRadius: '110px',
                  }}
                />

                {/* Photo en arche */}
                <div
                  className="relative z-10 w-[148px] h-[148px] shrink-0 overflow-hidden bg-white border border-neutral-200/60 shadow-xs"
                  style={{
                    borderRadius: '34px',
                  }}
                >
                  <img
                    src={data.photoUrl || '/assets/doctor_same_dikongue.jpg'}
                    alt={data.fullName}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/doctor_same_dikongue.jpg';
                    }}
                  />
                </div>

                {/* Bloc central */}
                <div className="relative z-10 flex-1 pl-7 pr-4 flex flex-col justify-center pt-2">
                  <h1 className="text-[27px] font-black text-[#0e2a5c] tracking-wide uppercase leading-none">
                    {firstName}
                  </h1>
                  {lastName && (
                    <h2 className="text-[27px] font-light text-[#0e2a5c] tracking-[0.16em] uppercase leading-tight -mt-0.5">
                      {lastName}
                    </h2>
                  )}

                  {/* Ligne bleue */}
                  <div className="h-[3px] w-[185px] bg-[#155dfc] my-2.5 rounded-full" />

                  {/* Métier espacé */}
                  <p className="text-[13px] font-bold tracking-[0.38em] text-[#025a9e] uppercase">
                    {data.jobTitle || 'M É D E C I N'}
                  </p>

                  {/* Devise en italique */}
                  <p className="text-[11.5px] italic text-[#64748b] font-normal mt-1 leading-snug">
                    {data.tagline || 'Au service de la santé, pour un meilleur avenir'}
                  </p>
                </div>

                {/* Bloc droit coordonnées */}
                <div className="relative z-10 w-[230px] shrink-0 flex flex-col justify-center space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[12px] font-medium text-[#1e293b]">
                      {data.phone || '+237 6 78 12 34 56'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[12px] font-medium text-[#1e293b]">
                      {data.email || 'same.dikongue@gmail.com'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[12px] font-medium text-[#1e293b]">
                      {data.address || 'Douala, Cameroun'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[12px] font-medium text-[#1e293b]">
                      {data.birthDate || '32 ans (né le 12 mars 1993)'}
                    </span>
                  </div>
                </div>
              </header>

              {/* CORPS A4 EN 2 COLONNES FIGÉES */}
              <div className="w-full px-8 pt-3 pb-4 flex items-start gap-9">
                {/* COLONNE GAUCHE (~255px) */}
                <aside className="w-[255px] shrink-0 space-y-6">
                  {/* PROFIL */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <UserIcon className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        PROFIL
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <p className="text-[11px] leading-[1.55] text-[#334155] text-justify pt-0.5">
                      {data.aboutMe ||
                        "Médecin diplômé et expérimenté, avec plus de 10 ans d'expérience hospitalière dans la prise en charge globale des patients. Passionné par la qualité des soins, la prévention et l'amélioration continue des pratiques médicales."}
                    </p>
                  </section>

                  {/* COMPÉTENCES CLÉS */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Settings className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        COMPÉTENCES CLÉS
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <ul className="space-y-1.5 pt-0.5 text-[11px] text-[#334155] leading-snug">
                      {page1Skills.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#025a9e] text-sm font-bold leading-none shrink-0 mt-0.5">•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* LANGUES */}
                  <section className="space-y-2.5">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        LANGUES
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <div className="space-y-3 pt-0.5">
                      {allLanguages.map((lang) => (
                        <div key={lang.id} className="space-y-1">
                          <div className="flex items-center justify-between text-[11.5px]">
                            <span className="font-bold text-[#0e2a5c]">{lang.name}</span>
                            <span className="text-[#64748b] text-[11px] font-medium">{lang.level}</span>
                          </div>
                          <div className="h-[7px] w-full rounded-full bg-[#dbeafe] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#0e2a5c]"
                              style={{ width: getLanguagePercent(lang.level) }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </aside>

                {/* COLONNE DROITE */}
                <main className="flex-1 space-y-6">
                  {/* FORMATION */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <GraduationCap className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        FORMATION
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <div className="relative pl-4 border-l border-[#93c5fd] ml-3.5 space-y-3 pt-1">
                      {page1Educations.map((edu) => (
                        <div key={edu.id} className="relative space-y-0.5">
                          <div className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-[#025a9e]" />
                          <div className="flex items-baseline justify-between">
                            <h4 className="text-[12.5px] font-bold text-[#0e2a5c]">
                              {edu.degree}
                            </h4>
                            <span className="text-[12px] font-bold text-[#0e2a5c]">
                              {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#475569] leading-tight">
                            {edu.school}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* EXPÉRIENCE PROFESSIONNELLE */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Briefcase className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        EXPÉRIENCE PROFESSIONNELLE
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <div className="relative pl-4 border-l border-[#93c5fd] ml-3.5 space-y-4 pt-1">
                      {page1Experiences.map((exp) => (
                        <div key={exp.id} className="relative space-y-1">
                          <div className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-[#025a9e]" />
                          <div className="flex items-baseline justify-between">
                            <h4 className="text-[12.5px] font-bold text-[#0e2a5c]">
                              {exp.role}
                            </h4>
                            <span className="text-[12px] font-bold text-[#0e2a5c]">
                              {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-[#475569] leading-tight">
                            <strong className="text-[#1e293b]">{exp.company}</strong>
                          </p>
                          {renderBulletLines(exp.description)}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* FORMATIONS ET CERTIFICATIONS COMPLÉMENTAIRES */}
                  {page1Certifications.length > 0 && (
                    <section className="space-y-2">
                      <div className="flex items-center gap-2 pb-0.5">
                        <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                          FORMATIONS ET CERTIFICATIONS COMPLÉMENTAIRES
                        </h3>
                        <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                      </div>

                      <ul className="space-y-1.5 pt-0.5 text-[11px] text-[#334155] leading-snug">
                        {page1Certifications.map((cert, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#025a9e] text-sm font-bold leading-none shrink-0 mt-0.5">•</span>
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* CENTRES D'INTÉRÊT (TOUJOURS PRÉSENTS SUR LA PAGE 1) */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Activity className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        CENTRES D'INTÉRÊT
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <div className="w-full bg-[#f0f4f9] rounded-2xl p-3 border border-[#e2e8f0] grid grid-cols-4 divide-x divide-[#cbd5e1] text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <Stethoscope className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight">
                          Santé &<br />médecine
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <BookOpen className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight pt-1">
                          Lecture
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <Dumbbell className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight pt-1">
                          Sport
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <Plane className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight pt-1">
                          Voyages
                        </span>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </div>

            {/* Pied de page A4 si multi-page */}
            {needsTwoPages && (
              <footer className="w-full border-t border-neutral-100 px-8 py-2.5 flex items-center justify-between text-[11px] text-[#64748b]">
                <span>Curriculum Vitae — {data.fullName || 'Same Dikongue Georges'}</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className="font-bold text-[#0e2a5c] hover:underline cursor-pointer"
                >
                  Page suivante (2/2) →
                </button>
              </footer>
            )}
          </div>
        )}

        {/* =========================================================== */}
        {/* FEUILLE PAGE 2 (GÉNÉRÉE AUTOMATIQUEMENT SUR LE MÊME MODÈLE) */}
        {/* =========================================================== */}
        {currentPage === 2 && needsTwoPages && (
          <div
            id="cv-document-sheet-page-2"
            style={{
              width: `${A4_WIDTH}px`,
              minWidth: `${A4_WIDTH}px`,
              maxWidth: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              minHeight: `${A4_HEIGHT}px`,
              maxHeight: `${A4_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
            className="relative bg-white text-neutral-800 shadow-[0_16px_50px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.06)] border border-neutral-300/80 rounded-none overflow-hidden font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:transform-none flex flex-col justify-between"
          >
            {/* BOUTON TÉLÉCHARGER PAGE 2 */}
            <div className="no-print absolute top-3.5 right-3.5 z-30">
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Télécharger le CV"
                title="Télécharger le CV"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e2a5c] hover:bg-[#155dfc] text-white shadow-md hover:scale-108 active:scale-95 transition-all cursor-pointer group"
              >
                <Download className="h-4.5 w-4.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

            <div>
              {/* EN-TÊTE PAGE 2 HOMOGÈNE AU MÊME DESIGN */}
              <header className="relative w-full px-8 pt-7 pb-5 flex items-start justify-between border-b border-neutral-100">
                <div
                  className="absolute -top-8 -left-8 w-60 h-60 bg-[#eaf2fb] pointer-events-none z-0"
                  style={{
                    borderBottomRightRadius: '110px',
                  }}
                />

                <div
                  className="relative z-10 w-[90px] h-[90px] shrink-0 overflow-hidden bg-white border border-neutral-200/60 shadow-xs"
                  style={{
                    borderRadius: '24px',
                  }}
                >
                  <img
                    src={data.photoUrl || '/assets/doctor_same_dikongue.jpg'}
                    alt={data.fullName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="relative z-10 flex-1 pl-6 pr-4 flex flex-col justify-center pt-1">
                  <h2 className="text-[22px] font-black text-[#0e2a5c] tracking-wide uppercase leading-none">
                    {data.fullName || 'SAME DIKONGUE GEORGES'}
                  </h2>
                  <div className="h-[2.5px] w-[140px] bg-[#155dfc] my-1.5 rounded-full" />
                  <p className="text-[12px] font-bold tracking-[0.3em] text-[#025a9e] uppercase">
                    {data.jobTitle || 'M É D E C I N'} — Suite (Page 2)
                  </p>
                </div>

                <div className="relative z-10 w-[230px] shrink-0 text-right pt-2 text-[11px] text-[#475569] space-y-1">
                  <p className="font-semibold text-[#0e2a5c]">{data.phone || '+237 6 78 12 34 56'}</p>
                  <p>{data.email || 'same.dikongue@gmail.com'}</p>
                  <p>{data.address || 'Douala, Cameroun'}</p>
                </div>
              </header>

              {/* CORPS PAGE 2 */}
              <div className="w-full px-8 pt-4 pb-4 flex items-start gap-9">
                {/* COLONNE GAUCHE PAGE 2 */}
                <aside className="w-[255px] shrink-0 space-y-6">
                  {/* COMPÉTENCES ADDITIONNELLES SI PLUS DE 9 */}
                  {page2Skills.length > 0 && (
                    <section className="space-y-2">
                      <div className="flex items-center gap-2 pb-0.5">
                        <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Settings className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                          COMPÉTENCES ADDITIONNELLES
                        </h3>
                        <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                      </div>

                      <ul className="space-y-1.5 pt-0.5 text-[11px] text-[#334155] leading-snug">
                        {page2Skills.map((skill, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#025a9e] text-sm font-bold leading-none shrink-0 mt-0.5">•</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* RÉFÉRENCES PROFESSIONNELLES */}
                  {allReferences.length > 0 && (
                    <section className="space-y-2">
                      <div className="flex items-center gap-2 pb-0.5">
                        <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Users className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                          RÉFÉRENCES
                        </h3>
                        <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                      </div>

                      <div className="space-y-2.5 pt-0.5 text-[11px] text-[#334155]">
                        {allReferences.map((ref) => (
                          <div key={ref.id} className="space-y-0.5">
                            <span className="font-bold text-[#0e2a5c] block">• {ref.name}</span>
                            <span className="text-[#475569] block pl-2">{ref.role} — {ref.company}</span>
                            <span className="text-[#64748b] block pl-2 font-mono text-[10.5px]">{ref.phone}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* ATTESTATION OFFICIELLE */}
                  <section className="rounded-2xl border border-neutral-200 bg-[#f8fafc] p-3 space-y-1">
                    <span className="text-[11px] font-bold text-[#0e2a5c] block uppercase tracking-wide">
                      Document Officiel Certifié
                    </span>
                    <p className="text-[10.5px] text-[#475569] leading-relaxed">
                      Informations certifiées conformes aux qualifications et diplômes enregistrés.
                    </p>
                  </section>
                </aside>

                {/* COLONNE DROITE PAGE 2 */}
                <main className="flex-1 space-y-6">
                  {/* EXPÉRIENCES COMPLÉMENTAIRES */}
                  {page2Experiences.length > 0 && (
                    <section className="space-y-2">
                      <div className="flex items-center gap-2 pb-0.5">
                        <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Briefcase className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                          EXPÉRIENCE PROFESSIONNELLE (SUITE)
                        </h3>
                        <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                      </div>

                      <div className="relative pl-4 border-l border-[#93c5fd] ml-3.5 space-y-4 pt-1">
                        {page2Experiences.map((exp) => (
                          <div key={exp.id} className="relative space-y-1">
                            <div className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-[#025a9e]" />
                            <div className="flex items-baseline justify-between">
                              <h4 className="text-[12.5px] font-bold text-[#0e2a5c]">
                                {exp.role}
                              </h4>
                              <span className="text-[12px] font-bold text-[#0e2a5c]">
                                {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                              </span>
                            </div>
                            <p className="text-[11.5px] text-[#475569] leading-tight">
                              <strong className="text-[#1e293b]">{exp.company}</strong>
                            </p>
                            {renderBulletLines(exp.description)}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* FORMATIONS COMPLÉMENTAIRES */}
                  {page2Educations.length > 0 && (
                    <section className="space-y-2">
                      <div className="flex items-center gap-2 pb-0.5">
                        <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <GraduationCap className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                          FORMATIONS (SUITE)
                        </h3>
                        <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                      </div>

                      <div className="relative pl-4 border-l border-[#93c5fd] ml-3.5 space-y-3 pt-1">
                        {page2Educations.map((edu) => (
                          <div key={edu.id} className="relative space-y-0.5">
                            <div className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-[#025a9e]" />
                            <div className="flex items-baseline justify-between">
                              <h4 className="text-[12.5px] font-bold text-[#0e2a5c]">
                                {edu.degree}
                              </h4>
                              <span className="text-[12px] font-bold text-[#0e2a5c]">
                                {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#475569] leading-tight">
                              {edu.school}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* FORMATIONS ET CERTIFICATIONS COMPLÉMENTAIRES */}
                  {allCertifications.length > 0 && (
                    <section className="space-y-2">
                      <div className="flex items-center gap-2 pb-0.5">
                        <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </div>
                        <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                          FORMATIONS ET CERTIFICATIONS COMPLÉMENTAIRES
                        </h3>
                        <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                      </div>

                      <ul className="space-y-1.5 pt-0.5 text-[11px] text-[#334155] leading-snug">
                        {allCertifications.map((cert, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#025a9e] text-sm font-bold leading-none shrink-0 mt-0.5">•</span>
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* CENTRES D'INTÉRÊT SUR PAGE 2 */}
                  <section className="space-y-2">
                    <div className="flex items-center gap-2 pb-0.5">
                      <div className="h-[27px] w-[27px] rounded-full bg-[#0e2a5c] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Activity className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="text-[12.5px] font-black tracking-wider text-[#0e2a5c] uppercase">
                        CENTRES D'INTÉRÊT
                      </h3>
                      <div className="h-[1px] bg-[#93c5fd] flex-1 ml-1" />
                    </div>

                    <div className="w-full bg-[#f0f4f9] rounded-2xl p-3 border border-[#e2e8f0] grid grid-cols-4 divide-x divide-[#cbd5e1] text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <Stethoscope className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight">
                          Santé &<br />médecine
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <BookOpen className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight pt-1">
                          Lecture
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <Dumbbell className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight pt-1">
                          Sport
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-1">
                        <Plane className="h-5 w-5 text-[#0e2a5c] stroke-[1.8]" />
                        <span className="text-[11px] font-medium text-[#1e293b] leading-tight pt-1">
                          Voyages
                        </span>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </div>

            {/* Pied de page A4 Page 2 */}
            <footer className="w-full border-t border-neutral-100 px-8 py-2.5 flex items-center justify-between text-[11px] text-[#64748b]">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="font-bold text-[#0e2a5c] hover:underline cursor-pointer"
              >
                ← Revenir à la page 1 (1/2)
              </button>
              <span>Curriculum Vitae — {data.fullName || 'Same Dikongue Georges'} (Page 2/2)</span>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};
