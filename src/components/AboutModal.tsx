import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../translations';

interface AboutModalProps {
  onClose: () => void;
}

const QUESTIONS = [
  {
    q: "1. Qu'est-ce que le FNE ?",
    a: "Le Fonds National de l'Emploi (FNE) est un établissement public créé par l'État camerounais pour promouvoir l'emploi, former les demandeurs d'emploi et appuyer la création d'entreprises.",
  },
  {
    q: "2. Qui peut bénéficier des services du FNE ?",
    a: "Tout citoyen camerounais en recherche d'emploi, jeune diplômé, porteur de projet d'entreprise, ainsi que toutes les entreprises installées au Cameroun à la recherche de compétences.",
  },
  {
    q: "3. Les services du FNE sont-ils payants ?",
    a: "Non ! Tous les services d'accueil, d'orientation, de formation certifiante, de mise en relation et d'accompagnement sont rigoureusement 100% GRATUITS.",
  },
  {
    q: "4. Comment s'inscrire auprès du FNE ?",
    a: "L'inscription peut se faire en ligne sur la plateforme FNE360 ou directement au guichet d'une des agences régionales FNE avec une pièce d'identité et un CV.",
  },
  {
    q: "5. Quels sont les principaux programmes d'insertion ?",
    a: "Le FNE pilote des programmes spécialisés : le PED (Programme Emploi Diplômé), le PREJ (Programme Rural d'Emploi Jeune), le PADER (Appui au développement des emplois ruraux) et l'USEP (Emplois urbains).",
  },
  {
    q: "6. Qu'est-ce que la solution FNE360 ?",
    a: "FNE360 est la plateforme digitale nouvelle génération du FNE intégrant un Assistant IA disponible 24h/24, des modules de certification CARE, une radio dédiée à l'emploi et un matching intelligent d'opportunités.",
  },
  {
    q: "7. Comment entrer en contact avec un conseiller ?",
    a: "Via l'application FNE360, par téléphone au numéro vert ou en vous rendant dans l'agence FNE de votre ville (Yaoundé, Douala, Bafoussam, Garoua, Bamenda, Bertoua, Maroua, Ngaoundéré, Ebolowa, Buea).",
  },
];

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const { lang } = useLanguage();

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
        <div className="flex items-center justify-between border-b border-border bg-surface-green/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-xs text-brand-green">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">À propos du FNE</h3>
              <p className="text-xs text-brand-green font-semibold">Le FNE en 7 questions clés</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-neutral-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {QUESTIONS.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-neutral-50/70 p-3.5">
              <h4 className="flex items-start gap-2 text-xs font-bold text-foreground">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-green" />
                <span>{item.q}</span>
              </h4>
              <p className="mt-1.5 pl-5 text-xs text-muted-foreground leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-brand-green py-2.5 text-xs font-semibold text-white shadow-xs hover:opacity-90 transition-opacity"
          >
            Compris
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
