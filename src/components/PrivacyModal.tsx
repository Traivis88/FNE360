import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Lock, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../translations';

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
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
        <div className="flex items-center justify-between border-b border-border bg-surface-blue/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-xs text-brand-green">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">
                {lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
              </h3>
              <p className="text-xs text-muted-foreground">Protection des données et respect de votre vie privée</p>
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

        <div className="flex-1 space-y-4 overflow-y-auto p-5 text-xs text-muted-foreground leading-relaxed">
          <div className="rounded-2xl bg-surface-green/40 p-4 border border-brand-green/20 text-foreground">
            <h4 className="font-bold text-brand-green text-xs flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Engagement Institutionnel FNE360
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Le Fonds National de l'Emploi s'engage formellement à préserver la sécurité et la confidentialité des données personnelles de chaque usager.
            </p>
          </div>

          <section>
            <h5 className="font-bold text-foreground">1. Collecte et finalité des données</h5>
            <p className="mt-1">
              Les données renseignées (CV, coordonnées, diplômes, parcours) sont exclusivement traitées dans le but de faciliter l'insertion professionnelle, l'accès aux formations certifiantes et la mise en relation avec des employeurs accrédités.
            </p>
          </section>

          <section>
            <h5 className="font-bold text-foreground">2. Non-commercialisation garantie</h5>
            <p className="mt-1">
              Vos informations personnelles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins publicitaires. Seuls les recruteurs partenaires validés par le FNE ont accès aux profils candidats pertinents.
            </p>
          </section>

          <section>
            <h5 className="font-bold text-foreground">3. Sécurité et hébergement</h5>
            <p className="mt-1">
              Les échanges avec nos serveurs et l'Assistant IA FNE360 bénéficient d'un chiffrement moderne HTTPS/TLS. Les sauvegardes sont protégées selon les normes nationales et internationales en vigueur.
            </p>
          </section>

          <section>
            <h5 className="font-bold text-foreground">4. Vos droits d'accès et de rectification</h5>
            <p className="mt-1">
              Conformément à la législation, vous disposez d'un droit permanent d'accès, de modification ou de suppression de vos données en vous adressant directement à un conseiller FNE ou via l'application.
            </p>
          </section>
        </div>

        <div className="border-t border-border p-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-brand-blue py-2.5 text-xs font-semibold text-white shadow-xs hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
