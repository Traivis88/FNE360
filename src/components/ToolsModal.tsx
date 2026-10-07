import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  FileEdit,
  Download,
  Upload,
  Sparkles,
  X,
  CheckCircle2,
  Share2,
  FileDown,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCvEditor: () => void;
  onOpenAiCoach: () => void;
}

export const ToolsModal: React.FC<ToolsModalProps> = ({
  isOpen,
  onClose,
  onOpenCvEditor,
  onOpenAiCoach,
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'letter' | 'import'>('tools');
  const [letterJob, setLetterJob] = useState('Commercial Grands Comptes');
  const [letterCompany, setLetterCompany] = useState('DIOR Paris');
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateLetter = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedLetter(
        `Madame, Monsieur,\n\nActuellement Commercial diplômé fort de plusieurs années d'expérience en développement commercial et gestion de comptes stratégiques, c'est avec un vif enthousiasme que je vous adresse ma candidature pour le poste de ${letterJob} au sein de ${letterCompany}.\n\nReconnu pour mon excellent sens relationnel, ma rigueur et ma capacité à prospecter et fidéliser une clientèle exigeante, je souhaite aujourd'hui mettre mon dynamisme et mon savoir-faire au profit de vos objectifs de croissance.\n\nDans l'attente de vous rencontrer prochainement lors d'un entretien, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.\n\nRaphaël MARTIN\n06 06 06 06 06 • raphael.martin@gmail.com`
      );
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-foreground tracking-tight">
                  Boîte à Outils (Tools)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Génération de lettres, exports et imports assistés
                </p>
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

          {/* Feedback notice */}
          {notice && (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          {/* 4 Cards Grid - Reprise fidèle de l'écran Fast CV Maker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Create CV */}
            <div
              onClick={() => {
                onClose();
                onOpenCvEditor();
              }}
              className="p-4 rounded-2xl bg-[#0084ff] text-white shadow-md hover:opacity-95 transition-all cursor-pointer flex flex-col justify-between h-32 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
                <FileEdit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">Create CV</h3>
                <p className="text-xs text-white/85 mt-0.5">Let's start from scratch</p>
              </div>
            </div>

            {/* 2. Create Letter */}
            <div
              onClick={() => setActiveTab('letter')}
              className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200/80 hover:bg-neutral-200/60 transition-all cursor-pointer flex flex-col justify-between h-32 text-neutral-900 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">Create Letter</h3>
                <p className="text-xs text-neutral-600 mt-0.5">Build Standout Letters with AI</p>
              </div>
            </div>

            {/* 3. Downloads */}
            <div
              onClick={() => {
                handleCopyNotice('Téléchargement du pack CV & Dossier lancé avec succès !');
              }}
              className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200/80 hover:bg-neutral-200/60 transition-all cursor-pointer flex flex-col justify-between h-32 text-neutral-900 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">Downloads</h3>
                <p className="text-xs text-neutral-600 mt-0.5">Open Saved CV & Letter</p>
              </div>
            </div>

            {/* 4. Import Old CV */}
            <div
              onClick={() => setActiveTab('import')}
              className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200/80 hover:bg-neutral-200/60 transition-all cursor-pointer flex flex-col justify-between h-32 text-neutral-900 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">Import Old CV</h3>
                <p className="text-xs text-neutral-600 mt-0.5">Transform Your CV with AI</p>
              </div>
            </div>
          </div>

          {/* Module Lettre de Motivation IA si sélectionné */}
          {activeTab === 'letter' && (
            <div className="rounded-2xl border border-border bg-neutral-50/70 p-4 space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-blue" />
                  <h4 className="text-sm font-bold text-foreground">
                    Générateur de Lettre de Motivation (AI)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('tools')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Fermer
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                    Poste visé
                  </label>
                  <input
                    type="text"
                    value={letterJob}
                    onChange={(e) => setLetterJob(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                    Entreprise ciblée
                  </label>
                  <input
                    type="text"
                    value={letterCompany}
                    onChange={(e) => setLetterCompany(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateLetter}
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isGenerating ? 'Génération en cours...' : 'Rédiger la lettre avec l\'IA'}</span>
              </button>

              {generatedLetter && (
                <div className="space-y-2 pt-2">
                  <textarea
                    rows={6}
                    value={generatedLetter}
                    onChange={(e) => setGeneratedLetter(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card p-3 text-xs text-foreground font-sans leading-relaxed"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyNotice('Lettre téléchargée en format texte !')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-neutral-100"
                    >
                      <FileDown className="h-3 w-3" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Module Import Old CV si sélectionné */}
          {activeTab === 'import' && (
            <div className="rounded-2xl border border-border bg-neutral-50/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-foreground">
                    Importer un ancien CV (PDF ou Word)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('tools')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Fermer
                </button>
              </div>

              <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-6 text-center cursor-pointer hover:border-brand-blue/60 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-xs font-bold text-foreground">
                  Glissez-déposez votre ancien CV ici
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  Formats acceptés : PDF, DOCX, TXT (Max 10 Mo)
                </span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={() => {
                    handleCopyNotice('CV importé et analysé par l\'IA avec succès !');
                    setTimeout(() => {
                      onClose();
                      onOpenCvEditor();
                    }, 1200);
                  }}
                />
              </label>
            </div>
          )}

          {/* Quick CTA to AI Coach */}
          <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-blue/40 p-3.5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-brand-blue" />
              <div>
                <p className="text-xs font-bold text-foreground">Besoin d'un accompagnement personnalisé ?</p>
                <p className="text-[11px] text-muted-foreground">Consultez votre AI Coach de carrière</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAiCoach();
              }}
              className="rounded-xl bg-brand-blue px-3.5 py-1.5 text-xs font-bold text-white hover:opacity-95 transition-opacity cursor-pointer"
            >
              Lancer l'AI Coach
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
