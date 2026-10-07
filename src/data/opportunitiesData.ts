/**
 * Opportunités, Concours & Programmes d'Employabilité (Cameroun)
 * 174 offres réelles captées depuis CameroonDesks, MinaJobs, Emploi.cm, LoumaJobs, etc.
 * Liens directs spécifiques vers chaque annonce.
 */

export interface JobOffer {
  title: string;
  source: string;
  description: string;
  location: string;
  url: string;
  category: string;
}

export interface ContestItem {
  title: string;
  source: string;
  description?: string;
  url: string;
  label?: string;
  status: 'Ouvert' | 'Clôturé' | string;
  level: string;
  deadline: string;
}

export interface ProgramItem {
  title: string;
  source: string;
  description: string;
  url: string;
  label?: string;
  status?: string;
  level?: string;
  deadline?: string;
}

export const CATEGORIES = [
  'Mes offres ciblées',
  'Toutes les offres',
  'Santé/Social',
  'IT/Informatique',
  'Commercial/Vente',
  'RH/Administration',
  'Finance/Comptabilité',
  'Humanitaire/ONG',
  'BTP/Ingénierie',
  'Logistique/Transport',
  'Stages',
  'Éducation',
  'Autre',
] as const;

export const BANNER_SLIDES = [
  { src: '/mtn-0.png', alt: 'MTN Cameroun Opportunités' },
  { src: '/mtn-1.jpg', alt: 'MTN 237 Boss' },
  { src: '/mtn-2.png', alt: 'Fondation MTN Insertion Jeunes' },
];

export const JOBS_174: JobOffer[] = [
  {
    "title": "Recrutement ONG International Rescue Committee",
    "source": "CameroonDesks",
    "description": "Recrutement ONG International Rescue Committee – publié le 07/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-international-rescue-committe-octobre-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Médecin Généraliste / Coordonnateur Médical ONG ACMS",
    "source": "CameroonDesks",
    "description": "Recrutement Médecin Généraliste / Santé Publique pour projets santé communautaire ACMS – publié le 07/10/2026",
    "location": "Douala / Yaoundé",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-acms-cameroun-octobre-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "Responsable de Projet Santé & Nutrition (Médecin / Nutritionniste)",
    "source": "CameroonDesks",
    "description": "Recrutement Action Contre la Faim Cameroun : Médecin Spécialiste Santé et Nutrition – publié le 06/10/2026",
    "location": "Douala & Régions",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-action-contre-la-faim-septembre-postes-ouverts-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "Recrutement WWF Cameroun septembre 2026 : stages et emplois",
    "source": "CameroonDesks",
    "description": "Recrutement WWF Cameroun septembre 2026 : stages et emplois – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-wwf-cameroun-septembre-2026-stages-emplois-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Recrutement ONG Danish Refugee Council (DRC",
    "source": "CameroonDesks",
    "description": "Recrutement ONG Danish Refugee Council (DRC – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-danish-refugee-council-drc-septembre-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Médecin Conseil & Épidémiologiste de Projet FHI 360",
    "source": "MinaJobs",
    "description": "05 Appels d'offres et postes santé ouverts : Médecin Conseil et suivi médical FHI 360 – publié le 06/10/2026",
    "location": "Yaoundé / Douala",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44173/05-appels-doffres-ouverts-urgent-at-fhi360-family-health-international-ong-cameroon",
    "category": "Santé/Social"
  },
  {
    "title": "Recrutement Belife Insurance Cameroun : Conseillers Financiers",
    "source": "CameroonDesks",
    "description": "Recrutement Belife Insurance Cameroun : Conseillers Financiers – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-belife-insurance-cameroun-conseillers-financiers-job.html",
    "category": "Finance/Banque"
  },
  {
    "title": "Offre de Stage ICCNET / Matrix Telecoms : Stagiaire Réseaux et Télécom",
    "source": "CameroonDesks",
    "description": "Offre de Stage ICCNET / Matrix Telecoms : Stagiaire Réseaux et Télécom – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/offre-de-stage-iccnet-matrix-telecoms-.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Médecin Praticien de Santé / Soins Hospitaliers EcoSantéPro",
    "source": "MinaJobs",
    "description": "Recrutement Médecins et Stagiaires médicaux dans le domaine de la santé EcoSantéPro – publié le 06/10/2026",
    "location": "Douala, Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/43925/avis-de-recrutement-05-stagiaires-academiques-et-professionnels-dans-le-domaine-de-la-sante-at-ecosantepro-cameroun",
    "category": "Santé/Social"
  },
  {
    "title": "Médecin du Travail & Santé en Entreprise GIZ Cameroun",
    "source": "MinaJobs",
    "description": "Recrutement international GIZ Coopération Allemande : Médecin de santé au travail et prévention – publié le 06/10/2026",
    "location": "Yaoundé / Douala",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/3200/avis-de-recrutement-04-postes-a-pourvoir-ong-internationale-at-giz-gesellschaft-fur-internationale-zusammenarbe-cooperation-allemande",
    "category": "Santé/Social"
  },
  {
    "title": "Coordonnateur de Projet Santé Communautaire EPIC WOPA",
    "source": "MinaJobs",
    "description": "Avis de recrutement 03 postes santé communautaire et nutrition projet EPIC – publié le 06/10/2026",
    "location": "Douala / Bafoussam",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/45057/avis-de-recrutement-03-postes-a-pourvoir-projet-epic-cameroun-at-wopa-women%e2%80%99s-promotion-and-assistance-association",
    "category": "Santé/Social"
  },
  {
    "title": "Recrutement SPAR CAMEROUN septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement SPAR CAMEROUN septembre 2026 : plusieurs profils – publié le 05/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-spar-cameroun-septembre.html",
    "category": "Autre"
  },
  {
    "title": "Recrutement SOSUCAM septembre 2026 : postes ouverts & Candidatures spontanées",
    "source": "CameroonDesks",
    "description": "Recrutement SOSUCAM septembre 2026 : postes ouverts & Candidatures spontanées – publié le 05/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-sosucam-septembre-2026-postes-candidatures-spontanees-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Recrutement ONG ACTION CONTRE LA FAIM septembre 2026 : plusieurs postes ouverts",
    "source": "CameroonDesks",
    "description": "Recrutement ONG ACTION CONTRE LA FAIM septembre 2026 : plusieurs postes ouverts – publié le 05/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-action-contre-la-faim-septembre-postes-ouverts-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Recrutement La Régionale BANK septembre 2026 : 6 Communicateurs",
    "source": "CameroonDesks",
    "description": "Recrutement La Régionale BANK septembre 2026 : 6 Communicateurs – publié le 05/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-la-regionale-bank-septembre-communicateurs-job.html",
    "category": "Finance/Banque"
  },
  {
    "title": "Recrutement AFG Bank Cameroun septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement AFG Bank Cameroun septembre 2026 – publié le 05/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-afg-bank-cameroun-septembre-job.html",
    "category": "Finance/Banque"
  },
  {
    "title": "Recrutement ONG International Medical Corps (IMC) : Médecin Superviseur des Urgences & Santé Primaire",
    "source": "CameroonDesks",
    "description": "Recrutement urgent Médecin superviseur clinique et prise en charge des urgences sanitaires au Cameroun – publié le 06/10/2026",
    "location": "Garoua / Extrême-Nord",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-international-medical-corps-imc-postes-ouverts-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "Recrutement ONG ACTION CONTRE LA FAIM : Responsable Programme Santé & Nutrition",
    "source": "CameroonDesks",
    "description": "Gestion et supervision des programmes de santé maternelle et nutrition infantile au Cameroun – publié le 05/10/2026",
    "location": "Maroua / Yaoundé",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-action-contre-la-faim-septembre-postes-ouverts-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "Centre Hospitalier & Médical La Cathédrale : Pharmacien(ne) d'Officine & Gestionnaire Médicaments",
    "source": "MinaJobs",
    "description": "Recrutement Pharmacien(ne) diplômé(e) pour coordination pharmaceutique et approvisionnement clinique – publié le 05/10/2026",
    "location": "Douala",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44173/05-appels-doffres-ouverts-urgent-at-fhi360-family-health-international-ong-cameroon",
    "category": "Santé/Social"
  },
  {
    "title": "Clinique Médico-Chirurgicale de Yaoundé : Infirmier(ère) Diplômé(e) d'État / Soins Généraux & Urgences",
    "source": "CameroonDesks",
    "description": "Poste d'infirmier(ère) pour unité de soins continus et assistance médicale polyvalente – publié le 04/10/2026",
    "location": "Yaoundé",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-acms-cameroun-octobre-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "Croix-Rouge Camerounaise : Coordonnateur Santé Communautaire & Prévention Épidémique",
    "source": "CameroonDesks",
    "description": "Coordination des équipes mobiles de santé, campagnes de vaccination et sensibilisation sanitaire – publié le 03/10/2026",
    "location": "Bertoua / Est Cameroun",
    "url": "https://www.cameroondesks.com/2024/12/recrutement-ong-cameroun-2025-profil-recherches-et-offres-disponibles-sty.html",
    "category": "Santé/Social"
  },
  {
    "title": "Recrutement Africa Golden Bank septembre 2026 : Responsable de la Sécurité des SI (RSSI)",
    "source": "CameroonDesks",
    "description": "Recrutement Africa Golden Bank septembre 2026 : Responsable de la Sécurité des SI (RSSI) – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-africa-golden-bank-responsable-securite-si-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Offre de Stage PROPARCO (Groupe AFD) septembre 2026",
    "source": "CameroonDesks",
    "description": "Offre de Stage PROPARCO (Groupe AFD) septembre 2026 – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/offre-de-stage-proparco-groupe-afd-septembre-sta.html",
    "category": "Stage"
  },
  {
    "title": "Le Haut-Commissariat britannique à Yaoundé recrute 3 stagiaires bilingues",
    "source": "CameroonDesks",
    "description": "Le Haut-Commissariat britannique à Yaoundé recrute 3 stagiaires bilingues – publié le 02/10/2026",
    "location": "Yaoundé",
    "url": "https://www.cameroondesks.com/2026/10/le-haut-commissariat-britannique-recrute-stagiaires-bilingues-sta.html",
    "category": "Stage"
  },
  {
    "title": "Laboratoire d'Analyses Médicales & Recherche : Biologiste Médical / Technicien de Santé",
    "source": "MinaJobs",
    "description": "Supervision des analyses biomédicales, hématologie, sérologie et contrôle qualité biologique – publié le 03/10/2026",
    "location": "Bafoussam",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/45057/avis-de-recrutement-03-postes-a-pourvoir-projet-epic-cameroun-at-wopa-women%e2%80%99s-promotion-and-assistance-association",
    "category": "Santé/Social"
  },
  {
    "title": "Projet Santé Maternelle & Infantile ACMS : Sage-Femme / Maïeuticien Clinicien",
    "source": "CameroonDesks",
    "description": "Recrutement sage-femme / praticien santé pour suivi périnatal et santé reproductive – publié le 02/10/2026",
    "location": "Ngaoundéré / Nord Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-acms-cameroun-octobre-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "Organisation Mondiale de la Santé (OMS) / MINSANTE : Consultant Médical en Surveillance Épidémiologique",
    "source": "CameroonDesks",
    "description": "Consultance technique médicale pour l'évaluation des risques sanitaires et appui aux districts de santé – publié le 01/10/2026",
    "location": "Cameroun (National)",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-de-83-chercheurs-minresi-minfopra-semptembre-job.html",
    "category": "Santé/Social"
  },
  {
    "title": "COMMERCIALE TERRAIN & GESTION",
    "source": "MinaJobs",
    "description": "COMMERCIALE TERRAIN & GESTION – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/45039/avis-de-recrutement-commerciale-terrain-gestion-portefeuille-at-wanesi-gaz-sarl",
    "category": "Commercial/Vente"
  },
  {
    "title": "Recrutement ONG WCS Cameroun Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement ONG WCS Cameroun Septembre 2026 : plusieurs profils – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-ong-wcs-cameroun-septembre-postes-ouverts-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Recrutement Cadyst Septembre 2026 : postes ouverts",
    "source": "CameroonDesks",
    "description": "Recrutement Cadyst Septembre 2026 : postes ouverts – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/07/recrutement-cadyst-agents-production.html",
    "category": "Autre"
  },
  {
    "title": "Offre d'emploi freelance: 02 CV Writers / Rédacteurs de CV & 01 Community Manager",
    "source": "CameroonDesks",
    "description": "Offre d'emploi freelance: 02 CV Writers / Rédacteurs de CV & 01 Community Manager – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-freelance-community-manager-job.html",
    "category": "Autre"
  },
  {
    "title": "NASLA - Recrutement des stagiaires de la 5ème cohorte de formation des agents de la Police Municipale",
    "source": "CameroonDesks",
    "description": "NASLA - Recrutement des stagiaires de la 5ème cohorte de formation des agents de la Police Municipale – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/nasla-recrutement-des-stagiaires-5cohorte-formation-agent-police-municipale-sta.html",
    "category": "Stage"
  },
  {
    "title": "MTN Cameroon recrute : Médecin du Travail - septembre 2026",
    "source": "CameroonDesks",
    "description": "MTN Cameroon recrute : Médecin du Travail - septembre 2026 – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/mtn-cameroon-recrute-medecin-du-travail-job.html",
    "category": "Santé"
  },
  {
    "title": "KM International recherche un(e) Sous-Gérant (BEPC min)",
    "source": "JobInCamer",
    "description": "KM International recherche un(e) Sous-Gérant (BEPC min) – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.jobincamer.com/job/km-international-recherche-une-sous-gerant-bepc-min",
    "category": "Autre"
  },
  {
    "title": "Offre d'Emploi chez LE PELERIN S.A. Septembre 2026 : Caissier / Caissière",
    "source": "CameroonDesks",
    "description": "Offre d'Emploi chez LE PELERIN S.A. Septembre 2026 : Caissier / Caissière – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/offre-demploi-chez-le-pelerin-sa-caissier-job.html",
    "category": "Autre"
  },
  {
    "title": "Offre d'Emploi Hysacam Septembre 2026 : Secrétaire Comptable",
    "source": "CameroonDesks",
    "description": "Offre d'Emploi Hysacam Septembre 2026 : Secrétaire Comptable – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/offre-demploi-hysacam-septembre-2026-secretaire-comptable-job.html",
    "category": "Finance/Banque"
  },
  {
    "title": "NSIA Vie Assurances recrute des Conseillers Commerciaux (H/F) dans plusieurs villes du Cameroun",
    "source": "CameroonDesks",
    "description": "NSIA Vie Assurances recrute des Conseillers Commerciaux (H/F) dans plusieurs villes du Cameroun – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/nsia-vie-assurances-recrute-des-conseillers-commerciaux-plusieurs-villes-jo.html",
    "category": "Finance/Banque"
  },
  {
    "title": "MINEFOP C2D : Appel à candidatures pour la formation des jeunes en Agriculture durable",
    "source": "CameroonDesks",
    "description": "MINEFOP C2D : Appel à candidatures pour la formation des jeunes en Agriculture durable – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/minefop-c2d-appel-candidatures-pour-la-formation-jeunes-agriculture-job.html",
    "category": "Autre"
  },
  {
    "title": "Recrutement 130 personnels au Conseil Régional de l'Est Cameroun septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement 130 personnels au Conseil Régional de l'Est Cameroun septembre 2026 – publié le 29/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-130-personnels-au-conseil-regional-est-cameroun-septembre-job.html",
    "category": "Autre"
  },
  {
    "title": "Offre d'Emploi chez ICRAFON (cfao group) septembre 2026",
    "source": "CameroonDesks",
    "description": "Offre d'Emploi chez ICRAFON (cfao group) septembre 2026 – publié le 28/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/offre-demploi-chez-icrafon-cfao-group-septembre-job.html",
    "category": "Autre"
  },
  {
    "title": "Offre d'Emploi chez GRAPHICS SYSTEM : Technicien de Froid et Climatisation (H/F)",
    "source": "CameroonDesks",
    "description": "Offre d'Emploi chez GRAPHICS SYSTEM : Technicien de Froid et Climatisation (H/F) – publié le 28/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/offre-demploi-chez-graphics-system-technicien-froid-climatisation-job.html",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "02 OPÉRATEUR DE PRÉPARATION DES LOTS (H/F) at BEETLE HERITAGE HOLDING Cameroun",
    "source": "MinaJobs",
    "description": "02 OPÉRATEUR DE PRÉPARATION DES LOTS (H/F) at BEETLE HERITAGE HOLDING Cameroun – publié le 28/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44824/avis-de-recrutement-02-operateur-de-preparation-des-lots-hf-at-beetle-heritage-holding-cameroun",
    "category": "Autre"
  },
  {
    "title": "01 CHARGÉ(E) D'ÉTUDES, 01 RESPONSABLE MARKETING, 01 CHARGÉ(E) DE LA COMMUNICATION at MATRIX TELECOMS - Opérateur de Télécommunication",
    "source": "MinaJobs",
    "description": "01 CHARGÉ(E) D'ÉTUDES, 01 RESPONSABLE MARKETING, 01 CHARGÉ(E) DE LA COMMUNICATION at MATRIX TELECOMS - Opérateur de Télécommunication – publié le 28/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44815/avis-de-recrutement-01-chargee-detudes-01-responsable-marketing-01-chargee-de-la-communication-at-matrix-telecoms-operateur-de-telecommunication",
    "category": "Commercial/Vente"
  },
  {
    "title": "Recrutement KM International Septembre 2026 : + 80 postes à pourvoir",
    "source": "CameroonDesks",
    "description": "Recrutement KM International Septembre 2026 : + 80 postes à pourvoir – publié le 25/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-km-international-septembre-manutentionnaires-job.html",
    "category": "Autre"
  },
  {
    "title": "Agent d'Entretien - Douala",
    "source": "Emploi.cm",
    "description": "Agent d'Entretien - Douala – publié le 25/09/2026",
    "location": "Douala",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/agent-entretien-douala-1214748",
    "category": "Autre"
  },
  {
    "title": "RESPONSABLE ASSURANCE QUALITÉ MARGARINE (H/F) at BEETLE HERITAGE HOLDING Cameroun",
    "source": "MinaJobs",
    "description": "RESPONSABLE ASSURANCE QUALITÉ MARGARINE (H/F) at BEETLE HERITAGE HOLDING Cameroun – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44821/avis-de-recrutement-responsable-assurance-qualite-margarine-hf-at-beetle-heritage-holding-cameroun",
    "category": "Finance/Banque"
  },
  {
    "title": "02 OPÉRATEUR D’ÉTIQUETAGE ET DE CAPSULAGE (H/F) at BEETLE HERITAGE HOLDING Cameroun",
    "source": "MinaJobs",
    "description": "02 OPÉRATEUR D’ÉTIQUETAGE ET DE CAPSULAGE (H/F) at BEETLE HERITAGE HOLDING Cameroun – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44819/avis-de-recrutement-02-operateur-d%e2%80%99etiquetage-et-de-capsulage-hf-at-beetle-heritage-holding-cameroun",
    "category": "Autre"
  },
  {
    "title": "Centre Médical & Clinique Polyvalente : Médecin Généraliste / Urgentiste",
    "source": "MinaJobs",
    "description": "Prise en charge des urgences médico-chirurgicales et consultations de médecine générale – publié le 23/09/2026",
    "location": "Douala / Littoral",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44818/avis-de-recrutement-02-operateur-de-remplissage-experimente-hf-at-beetle-heritage-holding-cameroun",
    "category": "Santé/Social"
  },
  {
    "title": "Recrutement Université des Montagnes 2026-2027 : Enseignants Vacataires",
    "source": "CameroonDesks",
    "description": "Recrutement Université des Montagnes 2026-2027 : Enseignants Vacataires – publié le 21/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-universite-des-montagnes-2026-2027-enseignants-vacataires-job.html",
    "category": "Éducation"
  },
  {
    "title": "Recrutement SCB Cameroun 2026 : appel à Candidature Spontanée",
    "source": "CameroonDesks",
    "description": "Recrutement SCB Cameroun 2026 : appel à Candidature Spontanée – publié le 21/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-scb-cameroun-2026-candidature-spontanee-job.html",
    "category": "Autre"
  },
  {
    "title": "Stagiaire en Vidéosurveillance, Contrôle D'Accès, Intrusion, Incendie - Yaoundé - Yaoundé - Yaoundé",
    "source": "Emploi.cm",
    "description": "Stagiaire en Vidéosurveillance, Contrôle D'Accès, Intrusion, Incendie - Yaoundé - Yaoundé - Yaoundé – publié le 21/09/2026",
    "location": "Yaoundé",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/stagiaire-videosurveillance-controle-acces-intrusion-incendie-yaounde-1001167",
    "category": "Stage"
  },
  {
    "title": "Stage Technicien en Electricité - Yaoundé - Yaoundé - Yaoundé",
    "source": "Emploi.cm",
    "description": "Stage Technicien en Electricité - Yaoundé - Yaoundé - Yaoundé – publié le 21/09/2026",
    "location": "Yaoundé",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/stage-technicien-electricite-yaounde-1168518",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "TECHNICIEN(NE) Froid et Climatisation (H/F) at GRAPHICS SYSTEM S.A. Cameroun",
    "source": "MinaJobs",
    "description": "TECHNICIEN(NE) Froid et Climatisation (H/F) at GRAPHICS SYSTEM S.A. Cameroun – publié le 21/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44763/avis-de-recrutement-technicienne-froid-et-climatisation-hf-at-graphics-system-sa-cameroun",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "Commercial H/F - Douala",
    "source": "Emploi.cm",
    "description": "Commercial H/F - Douala – publié le 20/09/2026",
    "location": "Douala",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/commercial-hf-douala-662912",
    "category": "Commercial/Vente"
  },
  {
    "title": "Avis de recrutement des Financiers avec expertise en comptabilité, analyse des données, finance, audit et contrôle, gestion de projets...etc at NYAMORO GROUP S.A",
    "source": "MinaJobs",
    "description": "Avis de recrutement des Financiers avec expertise en comptabilité, analyse des données, finance, audit et contrôle, gestion de projets...etc at NYAMORO GROUP S.A – publié le 20/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44745/avis-de-recrutement-des-financiers-avec-expertise-en-comptabilite-analyse-des-donnees-finance-audit-et-controle-gestion-de-projetsetc-at-nyamoro-group-sa",
    "category": "IT/Informatique"
  },
  {
    "title": "Avis de recrutement des COMMERCIAUX at NYAMORO GROUP S.A",
    "source": "MinaJobs",
    "description": "Avis de recrutement des COMMERCIAUX at NYAMORO GROUP S.A – publié le 20/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44744/avis-de-recrutement-des-commerciaux-at-nyamoro-group-sa",
    "category": "Commercial/Vente"
  },
  {
    "title": "TECHNICIEN FROID CLIMATISATION at FNE - Fonds National de l'Emploi, Cameroun",
    "source": "MinaJobs",
    "description": "TECHNICIEN FROID CLIMATISATION at FNE - Fonds National de l'Emploi, Cameroun – publié le 20/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44740/avis-de-recrutement-technicien-froid-climatisation-at-fne-fonds-national-de-lemploi-cameroun",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "05 FEMMES DE CHAMBRES // MAIDS at FNE - Fonds National de l'Emploi, Cameroun",
    "source": "MinaJobs",
    "description": "05 FEMMES DE CHAMBRES // MAIDS at FNE - Fonds National de l'Emploi, Cameroun – publié le 20/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44729",
    "category": "Autre"
  },
  {
    "title": "Recrutement VINCI African Builders Program Septembre 2026 : Ingénieur QHSE",
    "source": "CameroonDesks",
    "description": "Recrutement VINCI African Builders Program Septembre 2026 : Ingénieur QHSE – publié le 18/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/ecrutement-vinci-african-builders-program-septembre-ingenieur-qhse-job.html",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "Recrutement ACD Cameroun septembre 2026 : 510 Enquêteurs",
    "source": "CameroonDesks",
    "description": "Recrutement ACD Cameroun septembre 2026 : 510 Enquêteurs – publié le 18/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-acd-cameroun-septembre-2026-510-enqueteurs-job.html",
    "category": "Autre"
  },
  {
    "title": "STAGIAIRE EN ACCOMPAGNEMENT & ÉVÉNEMENTIEL at HOOZON S.A.R.L. Cameroun",
    "source": "MinaJobs",
    "description": "STAGIAIRE EN ACCOMPAGNEMENT & ÉVÉNEMENTIEL at HOOZON S.A.R.L. Cameroun – publié le 16/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44552/avis-de-recrutement-stagiaire-en-accompagnement-evenementiel-at-hoozon-sarl-cameroun",
    "category": "Stage"
  },
  {
    "title": "Cyber Security Lead at BOISSONS du Cameroun (Groupe SABC)",
    "source": "MinaJobs",
    "description": "Cyber Security Lead at BOISSONS du Cameroun (Groupe SABC) – publié le 16/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44640",
    "category": "IT/Informatique"
  },
  {
    "title": "10 COORDINATEURS RÉGIONAUX H/F at JVF Cameroun - Jeunes Volontaires de la Francophon",
    "source": "MinaJobs",
    "description": "10 COORDINATEURS RÉGIONAUX H/F at JVF Cameroun - Jeunes Volontaires de la Francophon – publié le 16/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44637/avis-de-recrutement-10-coordinateurs-regionaux-hf-at-jvf-cameroun-jeunes-volontaires-de-la-francophon",
    "category": "Autre"
  },
  {
    "title": "Recrutement ESMATA Yaoundé septembre 2026 : Enseignants (Plusieurs disciplines)",
    "source": "CameroonDesks",
    "description": "Recrutement ESMATA Yaoundé septembre 2026 : Enseignants (Plusieurs disciplines) – publié le 15/09/2026",
    "location": "Yaoundé",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-esmata-yaounde-septembre-enseignants-job.html",
    "category": "Éducation"
  },
  {
    "title": "Ingénieur Chargé de Développement at LMT GROUP AXESS S.A",
    "source": "MinaJobs",
    "description": "Ingénieur Chargé de Développement at LMT GROUP AXESS S.A – publié le 15/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44539",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "03 Postes Ouverts at SOFITOUL S.A. - SOCIETE FINANCIERE DE TOURISME ET DE LOISIRS, Cameroun",
    "source": "MinaJobs",
    "description": "03 Postes Ouverts at SOFITOUL S.A. - SOCIETE FINANCIERE DE TOURISME ET DE LOISIRS, Cameroun – publié le 15/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44547",
    "category": "Finance/Banque"
  },
  {
    "title": "Responsable des Ressources Humaines - Yaoundé",
    "source": "Emploi.cm",
    "description": "Responsable des Ressources Humaines - Yaoundé – publié le 14/09/2026",
    "location": "Yaoundé",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/responsable-ressources-humaines-yaounde-1209629",
    "category": "Autre"
  },
  {
    "title": "13 Postes à pourvoir - URGENT at UNICEF Fonds des Nations Unies pour L'Enfance, Cameroun",
    "source": "MinaJobs",
    "description": "13 Postes à pourvoir - URGENT at UNICEF Fonds des Nations Unies pour L'Enfance, Cameroun – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/3275/avis-de-recrutement-08-postes-a-pourvoir-urgent-at-unicef-fonds-des-nations-unies-pour-lenfance-cameroun",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Conseiller(ère) de Développement Rural at NITIDÆ Cameroun",
    "source": "MinaJobs",
    "description": "Conseiller(ère) de Développement Rural at NITIDÆ Cameroun – publié le 13/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44571",
    "category": "Commercial/Vente"
  },
  {
    "title": "03 Nouveaux Postes Ouverts at NITIDÆ Cameroun",
    "source": "MinaJobs",
    "description": "03 Nouveaux Postes Ouverts at NITIDÆ Cameroun – publié le 13/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44573/avis-de-recrutement-03-nouveaux-postes-ouverts-at-nitid%c3%a6-cameroun",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Recrutement de 83 Chercheurs au Cameroun - MINRESI / MINFOPRA Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement de 83 Chercheurs au Cameroun - MINRESI / MINFOPRA Septembre 2026 – publié le 10/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-de-83-chercheurs-minresi-minfopra-semptembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Avis de recrutement des AGENTS de TRÉSORERIE ET FINANCE at AFRILAND First Bank CAMEROUN",
    "source": "MinaJobs",
    "description": "Avis de recrutement des AGENTS de TRÉSORERIE ET FINANCE at AFRILAND First Bank CAMEROUN – publié le 09/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44066/avis-de-recrutement-des-agents-de-tresorerie-et-finance-at-afriland-first-bank-cameroun",
    "category": "Finance/Banque"
  },
  {
    "title": "INGÉNIEUR TRAVAUX NEUFS at BOISSONS du Cameroun (Groupe SABC)",
    "source": "MinaJobs",
    "description": "INGÉNIEUR TRAVAUX NEUFS at BOISSONS du Cameroun (Groupe SABC) – publié le 09/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44479",
    "category": "BTP/Ingénierie"
  },
  {
    "title": "83 CHERCHEURS AU TITRE DE L'EXERCICE BUDGÉTAIRE 2026 - ARRÊTÉ CONJOINT MINFOPRA/MINRESI at MINRESI Ministère de la Recherche Scientifique et de l'Innovation du Cameroun",
    "source": "MinaJobs",
    "description": "83 CHERCHEURS AU TITRE DE L'EXERCICE BUDGÉTAIRE 2026 - ARRÊTÉ CONJOINT MINFOPRA/MINRESI at MINRESI Ministère de la Recherche Scientifique et de l'Innovation du Cameroun – publié le 09/09/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44488/avis-de-recrutement-83-chercheurs-au-titre-de-lexercice-budgetaire-2026-arrete-conjoint-minfopraminresi-at-minresi-ministere-de-la-recherche-scientifique-et-de-linnovation-du-cameroun",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Maersk Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement Maersk Septembre 2026 – publié le 08/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-maersk-septembre-2026-job.html",
    "category": "Logistique/Transport"
  },
  {
    "title": "Recrutement NHPC Septembre 2026 : Stages Communautaires",
    "source": "CameroonDesks",
    "description": "Recrutement NHPC Septembre 2026 : Stages Communautaires – publié le 07/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-nhpc-septembre-2026-stages-communautaires-sta.html",
    "category": "Stage"
  },
  {
    "title": "Coordonnateur de l'Antenne - Douala",
    "source": "Emploi.cm",
    "description": "Coordonnateur de l'Antenne - Douala – publié le 06/09/2026",
    "location": "Douala",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/coordonnateur-antenne-douala-1205927",
    "category": "Autre"
  },
  {
    "title": "Formation Rémunérée à L'international - Douala",
    "source": "Emploi.cm",
    "description": "Formation Rémunérée à L'international - Douala – publié le 04/09/2026",
    "location": "Douala",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/formation-remuneree-international-douala-1204675",
    "category": "Autre"
  },
  {
    "title": "Assistant Project Manager - Yaoundé and Koutaba",
    "source": "Emploi.cm",
    "description": "Assistant Project Manager - Yaoundé and Koutaba – publié le 04/09/2026",
    "location": "Yaoundé",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/assistant-project-manager-yaounde-koutaba-1233102",
    "category": "Autre"
  },
  {
    "title": "Recrutement VNU UNICEF Cameroun Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement VNU UNICEF Cameroun Septembre 2026 – publié le 03/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-vnu-unicef-cameroun-plusiuers-profils-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "OPPORTUNITÉS DE CARRIÈRE À SAISIR CHEZ CAMRAIL : Septembre 2026 !",
    "source": "CameroonDesks",
    "description": "OPPORTUNITÉS DE CARRIÈRE À SAISIR CHEZ CAMRAIL : Septembre 2026 ! – publié le 03/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/opportunite-de-carriere-saisir-chez-camrail-job.html",
    "category": "Logistique/Transport"
  },
  {
    "title": "Recrutement SOS Villages d'Enfants Août 2026",
    "source": "CameroonDesks",
    "description": "Recrutement SOS Villages d'Enfants Août 2026 – publié le 26/08/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/recrutement-sos-villages-denfants-aout-coordinateur-action-humanitaire-job.html",
    "category": "ONG/Humanitaire"
  },
  {
    "title": "Bilingual Customer Advisor / Business Developer - Yaoundé / Douala / Bafoussam - Bafoussam Bertoua Douala Ebolowa Garoua Maroua Ngaoundéré Yaoundé",
    "source": "Emploi.cm",
    "description": "Bilingual Customer Advisor / Business Developer - Yaoundé / Douala / Bafoussam - Bafoussam Bertoua Douala Ebolowa Garoua Maroua Ngaoundéré Yaoundé – publié le 26/08/2026",
    "location": "Douala",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/bilingual-customer-advisor-business-developer-922024",
    "category": "Autre"
  },
  {
    "title": "Recrutement Enseignants Université Saint Jean-Paul II 2026-2027",
    "source": "CameroonDesks",
    "description": "Recrutement Enseignants Université Saint Jean-Paul II 2026-2027 – publié le 25/08/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/recrutement-enseignants-universite-saint-jean-paul-job.html",
    "category": "Éducation"
  },
  {
    "title": "GESTIONNAIRE DE CAS, projet EpiC",
    "source": "MinaJobs",
    "description": "GESTIONNAIRE DE CAS, projet EpiC – publié le 19/08/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/44091/avis-de-recrutement-gestionnaire-de-cas-projet-epic-at-renata-reseau-national-des-associations-des-tantines-cameroun",
    "category": "Autre"
  },
  {
    "title": "Recrutement IUGET Août 2026 : Plus de 200 Postes Vacants (Enseignants & Personnel)",
    "source": "CameroonDesks",
    "description": "Recrutement IUGET Août 2026 : Plus de 200 Postes Vacants (Enseignants & Personnel) – publié le 06/08/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/recrutement-iuget-aout-2026-plus-de-200-postes-vacants-enseignants-personnel.html",
    "category": "Éducation"
  },
  {
    "title": "Réceptionniste - Douala",
    "source": "Emploi.cm",
    "description": "Réceptionniste - Douala – publié le 01/08/2026",
    "location": "Douala",
    "url": "https://www.emploi.cm/offre-emploi-cameroun/receptionniste-douala-1188857",
    "category": "Autre"
  },
  {
    "title": "Recrutement MINESUP/OMDES-CCAA juillet 2026 : 03 Stages Académiques et Professionnels",
    "source": "CameroonDesks",
    "description": "Recrutement MINESUP/OMDES-CCAA juillet 2026 : 03 Stages Académiques et Professionnels – publié le 23/07/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/07/recrutement-minesupomdes-ccaa-stages-juillet.html",
    "category": "Stage"
  },
  {
    "title": "Campus Diaspora Recrute à Yaoundé : 3 offres d'emploi disponibles (CDD, Temps Plein)",
    "source": "CameroonDesks",
    "description": "Campus Diaspora Recrute à Yaoundé : 3 offres d'emploi disponibles (CDD, Temps Plein) – publié le 17/07/2026",
    "location": "Yaoundé",
    "url": "https://www.cameroondesks.com/2026/07/recrutement-campus-diaspora-yaounde.html",
    "category": "Autre"
  },
  {
    "title": "Recrutement INUBIL jullet 2026 : Enseignants Vacataires",
    "source": "CameroonDesks",
    "description": "Recrutement INUBIL jullet 2026 : Enseignants Vacataires – publié le 13/07/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/07/ecrutement-inubil-jullet-2026-enseignant-vacataire.html",
    "category": "Éducation"
  },
  {
    "title": "Avis de recrutement des PRESCRIPTEURS - NSIA Tontines - Tout le territoire national at NSIA ASSURANCE VIE Cameroun",
    "source": "MinaJobs",
    "description": "Avis de recrutement des PRESCRIPTEURS - NSIA Tontines - Tout le territoire national at NSIA ASSURANCE VIE Cameroun – publié le 29/06/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/42998",
    "category": "Finance/Banque"
  },
  {
    "title": "Recrutement de 56 Stagiaires Professionnels (MINEPAT / Banque Mondiale)",
    "source": "CameroonDesks",
    "description": "Recrutement de 56 Stagiaires Professionnels (MINEPAT / Banque Mondiale) – publié le 23/06/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/06/recrutement-de-56-stagiaires-pro-minepat-banque-mondiale.html",
    "category": "Finance/Banque"
  },
  {
    "title": "Médecin Conseil H/F at APAVE International Consulting - Cameroun",
    "source": "MinaJobs",
    "description": "Médecin Conseil H/F at APAVE International Consulting - Cameroun – publié le 23/06/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/42845",
    "category": "Santé"
  },
  {
    "title": "BOURSE DE L'EMPLOI 2026 at FNE - MinaJobs Cameroun",
    "source": "MinaJobs",
    "description": "BOURSE DE L'EMPLOI 2026 at FNE - MinaJobs Cameroun – publié le 19/06/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/42667/avis-de-recrutement-743-postes-disponibles-bourse-de-lemploi-2026-at-fne-fonds-national-de-lemploi-cameroun",
    "category": "Autre"
  },
  {
    "title": "Stage de Vacances CUD 2026 : Recrutement de 1 000 Jeunes",
    "source": "CameroonDesks",
    "description": "Stage de Vacances CUD 2026 : Recrutement de 1 000 Jeunes – publié le 17/06/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/06/stage-de-vacances-cud-2026-recrutement-1000-jeunes.html",
    "category": "Stage"
  },
  {
    "title": "Recrutement ASCNPD juin 2026 : Appel à Candidatures pour 82 Volontaires au Cameroun",
    "source": "CameroonDesks",
    "description": "Recrutement ASCNPD juin 2026 : Appel à Candidatures pour 82 Volontaires au Cameroun – publié le 17/06/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/06/recrutement-ascnpd-2026-offres-82-volontaires.html",
    "category": "Autre"
  },
  {
    "title": "Test de sélection IETP 2026 : 100 postes d'Instituteurs de l'Enseignement Technique ouverts au Code du Travail",
    "source": "CameroonDesks",
    "description": "Test de sélection IETP 2026 : 100 postes d'Instituteurs de l'Enseignement Technique ouverts au Code du Travail – publié le 07/06/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/06/test-de-selection-ietp-2026-100-postes-instituteurs-enseignement-technique.html",
    "category": "Éducation"
  },
  {
    "title": "Avis de recrutement des HÔTESSES – FOIRE PROMOTE 2026 at SNK FOUNDATION Cameroon",
    "source": "MinaJobs",
    "description": "Avis de recrutement des HÔTESSES – FOIRE PROMOTE 2026 at SNK FOUNDATION Cameroon – publié le 30/05/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/42266",
    "category": "Autre"
  },
  {
    "title": "Chargé(e) de la Communication at E-SANTÉ CAMEROUN",
    "source": "MinaJobs",
    "description": "Chargé(e) de la Communication at E-SANTÉ CAMEROUN – publié le 19/05/2026",
    "location": "Cameroun",
    "url": "https://cameroun.minajobs.net/emplois-stage-recrutement/42140/avis-de-recrutement-chargee-de-la-communication-at-e-sante-cameroun",
    "category": "Santé"
  },
  {
    "title": "INGENIEUR DE SUIVI H/F at CFAO CONSUMER Cameroun",
    "source": "MinaJobs",
    "description": "INGENIEUR DE SUIVI H/F at CFAO CONSUMER Cameroun – publié le 16/05/2026",
    "location": "Cameroun",
    "url": "https://cm2024.minajobs.net/emplois-stage-recrutement/42054",
    "category": "Autre"
  },
  {
    "title": "Recrutement ONG ACMS Cameroun Octobre",
    "source": "CameroonDesks",
    "description": "Recrutement ONG ACMS Cameroun Octobre – publié le 07/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-acms-cameroun-octobre-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement SGMC/Cadyst Group octobre 2026 : plusieurs postes ouverts",
    "source": "CameroonDesks",
    "description": "Recrutement SGMC/Cadyst Group octobre 2026 : plusieurs postes ouverts – publié le 07/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-sgmccadyst-group-septembre-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ONG Cameroun Octobre 2026 : Profils Recherchés et Offres Disponibles",
    "source": "CameroonDesks",
    "description": "Recrutement ONG Cameroun Octobre 2026 : Profils Recherchés et Offres Disponibles – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2024/12/recrutement-ong-cameroun-2025-profil-recherches-et-offres-disponibles-sty.html",
    "category": "Stages"
  },
  {
    "title": "Offre d'emploi Wafacash Central Africa : Chargé(e) de Clientèle",
    "source": "CameroonDesks",
    "description": "Offre d'emploi Wafacash Central Africa : Chargé(e) de Clientèle – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/offre-demploi-wafacash-central-africa-charge-clientele-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ONG CONCORDIS septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement ONG CONCORDIS septembre 2026 – publié le 06/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-concordis-septembre-2026-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement U.S. Embassy Yaounde septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement U.S. Embassy Yaounde septembre 2026 : plusieurs profils – publié le 05/10/2026",
    "location": "Yaoundé",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-us-embassy-yaounde-septembre-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Offres d'emploi à Orange Cameroun septembre 2026",
    "source": "CameroonDesks",
    "description": "Offres d'emploi à Orange Cameroun septembre 2026  – publié le 05/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/offres-demploi-orange-cameroun-septembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Stages rémunérés et professionnels au Cameroun Septembre 2026 : toutes les offres disponibles",
    "source": "CameroonDesks",
    "description": "Stages rémunérés et professionnels au Cameroun Septembre 2026 : toutes les offres disponibles – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/06/stages-remuneres-et-professionnels-au-cameroun-2026-offres-disponibles-nel.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement CAMPOST septembre 2026 : + 24 Postes Ouverts",
    "source": "CameroonDesks",
    "description": "Recrutement CAMPOST septembre 2026 : + 24 Postes Ouverts – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-campost-2026-septembre-24-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ONG GIZ Cameroun septembre 2026 : stages & emplois",
    "source": "CameroonDesks",
    "description": "Recrutement ONG GIZ Cameroun septembre 2026 : stages & emplois – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/offres-de-stage-giz-cameroun-septembre.html",
    "category": "Stages"
  },
  {
    "title": "Programme de Stage INTERPOL 2027 à Lyon : 6 Mois Rémunérés pour Jeunes Diplômés",
    "source": "CameroonDesks",
    "description": "Programme de Stage INTERPOL 2027 à Lyon : 6 Mois Rémunérés pour Jeunes Diplômés – publié le 02/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/programme-de-stage-interpol-lyon-jeunes-diplomes-sta.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement d'un comptable professionnel à Douala",
    "source": "CameroonDesks",
    "description": "Recrutement d'un comptable professionnel à Douala – publié le 01/10/2026",
    "location": "Douala",
    "url": "https://www.cameroondesks.com/2026/10/comptable-professionnel-douala-jo.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement NFC Bank septembre 2026 : Auditeur Informatique (H/F)",
    "source": "CameroonDesks",
    "description": "Recrutement NFC Bank septembre 2026 : Auditeur Informatique (H/F) – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-nfc-bank-auditeur-informatique-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ONG International Medical Corps (IMC) septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement ONG International Medical Corps (IMC) septembre 2026 – publié le 01/10/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/10/recrutement-ong-international-medical-corps-imc-postes-ouverts-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement INUBIL Douala : Enseignants Vacataires 2026-2027",
    "source": "CameroonDesks",
    "description": "Recrutement INUBIL Douala : Enseignants Vacataires 2026-2027 – publié le 01/10/2026",
    "location": "Douala",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-inubil-douala-enseignants-vacataires-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutements MASSIF au Fonds national de l’emploi (FNE) septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutements MASSIF au Fonds national de l’emploi (FNE) septembre 2026 – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutements-massif-au-fonds-national-fne-septembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement d'un commercial livreur à Douala",
    "source": "CameroonDesks",
    "description": "Recrutement d'un commercial livreur à Douala  – publié le 30/09/2026",
    "location": "Douala",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-dun-commercial-livreur-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Programme de stages rémunéré de la Banque africaine de développement (BAD) 2027",
    "source": "CameroonDesks",
    "description": "Programme de stages rémunéré de la Banque africaine de développement (BAD) 2027  – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/programme-de-stages-remunere-de-la-banque-africaine-de-developpement-sta.html",
    "category": "Stages"
  },
  {
    "title": "Offre d'Emploi chez Vision Finance S.A. septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Offre d'Emploi chez Vision Finance S.A. septembre 2026 : plusieurs profils – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/offre-demploi-chez-vision-finance-sa-assistante-direction-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "BOCOM Petroleum recrute : 05 postes ouverts (CDI/CDD) Septembre 2026",
    "source": "CameroonDesks",
    "description": "BOCOM Petroleum recrute : 05 postes ouverts (CDI/CDD) Septembre 2026 – publié le 30/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/bocom-petroleum-recrute-05-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ONG Good Neighbors Cameroun Septembre 2026 : Bénévoles",
    "source": "CameroonDesks",
    "description": "Recrutement ONG Good Neighbors Cameroun Septembre 2026 : Bénévoles – publié le 29/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/ecrutement-ong-good-neighbors-cameroun-benevoles-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement TANTY (NTFOODS) Septembre 2026 : 8 offres ouvertes",
    "source": "CameroonDesks",
    "description": "Recrutement TANTY (NTFOODS) Septembre 2026 : 8 offres ouvertes – publié le 29/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-tanty-ntfoods-septembre-promotrices-vente-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement UBA Cameroun septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement UBA Cameroun septembre 2026 – publié le 29/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-uba-cameroun-septembre-2026-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Résultats du recrutement spécial de 40 auditeurs de la 9eme promotion de l’IEF-PR, 2026/2027",
    "source": "CameroonDesks",
    "description": "Résultats du recrutement spécial de 40 auditeurs de la 9eme promotion de l’IEF-PR, 2026/2027 – publié le 29/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2023/11/blog-post.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Avis de recrutement : 10 Commerciaux dynamique",
    "source": "CameroonDesks",
    "description": "Avis de recrutement : 10 Commerciaux dynamique – publié le 29/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/jobs-commerciaux-yaounde.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement chez Africa Global Logistics Cameroun Septembre 2026 : postes ouverts",
    "source": "CameroonDesks",
    "description": "Recrutement chez Africa Global Logistics Cameroun Septembre 2026 : postes ouverts – publié le 28/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-chez-africa-global-logistics-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement SGS Cameroun Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement SGS Cameroun Septembre 2026 : plusieurs profils – publié le 28/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-sgs-cameroun-septembre-2026-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Liste des Emplois Niveau BEPC - Probatoire - Baccalauréat dispoblible en 2026",
    "source": "CameroonDesks",
    "description": "Liste des Emplois Niveau BEPC - Probatoire - Baccalauréat dispoblible en 2026 – publié le 25/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/03/liste-des-emplois-niveau-bepc-probatoire-baccalaureat-dispoblible-en-2026-mic.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement Cadyst Group : Mécanicien Industriel Panzani Cameroun Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement Cadyst Group : Mécanicien Industriel Panzani Cameroun Septembre 2026 – publié le 25/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-cadyst-group-mecanicien-panzani-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement SCE Cameroun Septembre 2026 : Apporteurs d'Affaires sur Tout le Territoire National",
    "source": "CameroonDesks",
    "description": "Recrutement SCE Cameroun Septembre 2026 : Apporteurs d'Affaires sur Tout le Territoire National – publié le 25/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-sce-cameroun-apporteurs-daffaires-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Matrix Telecoms Septembre 2026 - plusieurs postes à pourvoir",
    "source": "CameroonDesks",
    "description": "Recrutement Matrix Telecoms Septembre 2026 - plusieurs postes à pourvoir – publié le 25/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-assistant-des-systemes-matrix-telecoms-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Offre d'emploi : Chauffeur-Coursier",
    "source": "CameroonDesks",
    "description": "Offre d'emploi : Chauffeur-Coursier – publié le 24/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2024/04/offre-de-stage-assistant-formation.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Activa Vie Cameroun Septembre 2026 : Conseillers Clientèle (Plusieurs Villes)",
    "source": "CameroonDesks",
    "description": "Recrutement Activa Vie Cameroun Septembre 2026 : Conseillers Clientèle (Plusieurs Villes) – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-activa-vie-cameroun-conseillers-clientele-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Offres de stage à l'UNICEF Cameroun Septembre 2026 : plusieurs postes",
    "source": "CameroonDesks",
    "description": "Offres de stage à l'UNICEF Cameroun Septembre 2026 : plusieurs postes – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/recrutement-lunicef-cameroun-aout-2026-job.html",
    "category": "Stages"
  },
  {
    "title": "Concours de recrutement CAMRAIL",
    "source": "CameroonDesks",
    "description": "Concours de recrutement CAMRAIL – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/concours-de-recrutement-camrail-con.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement AFG Assurances Cameroun septembre 2026 : Commerciaux Mandataires (H/F)",
    "source": "CameroonDesks",
    "description": "Recrutement AFG Assurances Cameroun septembre 2026 : Commerciaux Mandataires (H/F) – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-afg-assurances-cameroun-commerciaux-mandataires-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Stage UNITAR 2026 en Finance et Budget à Genève : Opportunité à l'ONU",
    "source": "CameroonDesks",
    "description": "Stage UNITAR 2026 en Finance et Budget à Genève : Opportunité à l'ONU – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/stage-unitar-en-finance-et-budget-a-lonu-geneve-sta.html",
    "category": "Stages"
  },
  {
    "title": "Stage en Médias et Communication au PNUD 2026 : Opportunité à Domicile",
    "source": "CameroonDesks",
    "description": "Stage en Médias et Communication au PNUD 2026 : Opportunité à Domicile – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/stage-en-medias-et-communication-au-pnud-domicile-sta.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement UCB Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement UCB Septembre 2026 : plusieurs profils – publié le 23/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-ucb-septembre-2026-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Blessing Petroleum S.A : appel à candidature spontanée",
    "source": "CameroonDesks",
    "description": "Recrutement Blessing Petroleum S.A : appel à candidature spontanée – publié le 22/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-blessing-petroleum-sa-appel-candidatures-spontanees-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Foretia Foundation septembre 2026 : Directeur Financier",
    "source": "CameroonDesks",
    "description": "Recrutement Foretia Foundation septembre 2026 : Directeur Financier – publié le 21/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-foretia-foundation-directeur-financier-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ISICO Septembre 2026 : Enseignants et Formateurs (DQP, CQP & BTS)",
    "source": "CameroonDesks",
    "description": "Recrutement ISICO Septembre 2026 : Enseignants et Formateurs (DQP, CQP & BTS) – publié le 21/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-isico-septembre-2026-enseignants-formateurs-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ORIS FINANCE septembre 2026 : Agents Polyvalents (Caissière & Brand Ambassador)",
    "source": "CameroonDesks",
    "description": "Recrutement ORIS FINANCE septembre 2026 : Agents Polyvalents (Caissière & Brand Ambassador) – publié le 21/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-oris-finance-septembre-2026-agents-polyvalents-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement Goethe-Institut Cameroun septembre 2026 : Assistant(e)s administratif(ve)s",
    "source": "CameroonDesks",
    "description": "Recrutement Goethe-Institut Cameroun septembre 2026 : Assistant(e)s administratif(ve)s – publié le 18/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-goethe-institut-cameroun-septembre-assistante-administrative-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Ecobank Cameroun Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement Ecobank Cameroun Septembre 2026 : plusieurs profils – publié le 18/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-ecobank-cameroun-septembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement OK PLAST Septembre 2026 : Technicien QHSE",
    "source": "CameroonDesks",
    "description": "Recrutement OK PLAST Septembre 2026 : Technicien QHSE – publié le 18/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-ok-plast-septembre-2026-technicien-qhse-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Programme ATE / PADESCE : Recrutement de 646 Apprentis Camerounais (Date limite prorogée)",
    "source": "CameroonDesks",
    "description": "Programme ATE / PADESCE : Recrutement de 646 Apprentis Camerounais (Date limite prorogée) – publié le 17/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/08/recrutement-padesce-septembre-2026-646-places-apprentisage-entreprise-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement à Boissons du Cameroun septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement à Boissons du Cameroun septembre 2026 : plusieurs profils – publié le 17/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-boissons-du-cameroun-septembre-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement UNOPS Cameroun Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement UNOPS Cameroun Septembre 2026 : plusieurs profils – publié le 17/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-unops-cameroun-septembre.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Conseil Régional de l’Ouest 2026 : 74 postes à pourvoir",
    "source": "CameroonDesks",
    "description": "Recrutement Conseil Régional de l’Ouest 2026 : 74 postes à pourvoir – publié le 16/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-conseil-regional-de-louest-74-postes-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ENSET d'Ebolowa 2026-2027 : Enseignants Vacataires",
    "source": "CameroonDesks",
    "description": "Recrutement ENSET d'Ebolowa 2026-2027 : Enseignants Vacataires – publié le 16/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-enset-debolowa-2026-2027-enseignants-vacataires-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ONG FHI 360 Cameroun septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement ONG FHI 360 Cameroun septembre 2026 : plusieurs profils – publié le 16/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-ong-fhi-360-cameroun-septembre-comptable.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Bnews1 Septembre 2026 : Plusieurs Postes",
    "source": "CameroonDesks",
    "description": "Recrutement Bnews1 Septembre 2026 : Plusieurs Postes – publié le 15/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-bnews1-septembre-2026-plusieurs-postes-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Africa Golden Bank S.A septembre 2026 : stages & emplois",
    "source": "CameroonDesks",
    "description": "Recrutement Africa Golden Bank S.A septembre 2026 : stages & emplois – publié le 15/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-africa-golden-bank-sa-septembre-stages-emplois-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement ONG Médecins Sans Frontières Cameroun Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement ONG Médecins Sans Frontières Cameroun Septembre 2026 – publié le 15/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-ong-medecins-sans-frontieres-septembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Advans Cameroun Septembre 2026 : Gestionnaire administration RH & paie",
    "source": "CameroonDesks",
    "description": "Recrutement Advans Cameroun Septembre 2026 : Gestionnaire administration RH & paie – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-advans-cameroun-septembre-superviseur-securite-si-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutements Blessing Petroleum Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutements Blessing Petroleum Septembre 2026 : plusieurs profils – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutements-blessing-petroleum-semptembre-offres-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Boulangerie Saker : Technico-Commerciaux de Surfaces de Ventes",
    "source": "CameroonDesks",
    "description": "Recrutement Boulangerie Saker : Technico-Commerciaux de Surfaces de Ventes – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-boulangerie-saker-technico-commerciaux-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Sahel Agro Septembre 2026 : Responsable de la Sécurité et Logistique",
    "source": "CameroonDesks",
    "description": "Recrutement Sahel Agro Septembre 2026 : Responsable de la Sécurité et Logistique – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-sahel-agro-septembre-2026.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement NOVIA Industries Septembre 2026 : Caristes",
    "source": "CameroonDesks",
    "description": "Recrutement NOVIA Industries Septembre 2026 : Caristes – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-novia-industries-septembre-operateur-traitement-eaux-usees-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement SanlamAllianz Cameroun Septembre 2026 : 6 Stagiaires Professionnels",
    "source": "CameroonDesks",
    "description": "Recrutement SanlamAllianz Cameroun Septembre 2026 : 6 Stagiaires Professionnels – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-sanlamallianz-cameroun-septembre-stages-pro-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement ACTIVA Assurances Septembre 2026 : Responsable Production Commerciale Non Vie",
    "source": "CameroonDesks",
    "description": "Recrutement ACTIVA Assurances Septembre 2026 : Responsable Production Commerciale Non Vie – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-activa-assurances-septembre-responsable-production-commerciale-non-vie-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement UNICEF Cameroun Septembre 2026 : stages & emplois",
    "source": "CameroonDesks",
    "description": "Recrutement UNICEF Cameroun Septembre 2026 : stages & emplois – publié le 14/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-unicef-cameroun-septembre-adjoint-administratif-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement JD Cosmetics septembre 2026 : Commerciaux / Commerciales",
    "source": "CameroonDesks",
    "description": "Recrutement JD Cosmetics septembre 2026 : Commerciaux / Commerciales – publié le 11/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-jd-cosmetics-septembre-commerciaux-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement ACMS Cameroun septembre 2026 : Consultant RH (H/F)",
    "source": "CameroonDesks",
    "description": "Recrutement ACMS Cameroun septembre 2026 : Consultant RH (H/F) – publié le 11/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-acms-cameroun-2026-septembre-consultant-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement AFD (Agence Française de Développement) septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement AFD (Agence Française de Développement) septembre 2026 – publié le 10/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-afd-agence-francaise-de-developpement-semptembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Vision Finance S.A Septembre 2026 : plusieurs profils",
    "source": "CameroonDesks",
    "description": "Recrutement Vision Finance S.A Septembre 2026 : plusieurs profils – publié le 10/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-vision-finance-sa-septembre-postes-ouverts-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Centre Pasteur du Cameroun Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement Centre Pasteur du Cameroun Septembre 2026 – publié le 10/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-centre-pasteur-du-cameroun-septembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement PROMETAL Septembre 2026 : Water Treatment Plant Assistant Foreman",
    "source": "CameroonDesks",
    "description": "Recrutement PROMETAL Septembre  2026 : Water Treatment Plant Assistant Foreman – publié le 10/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-prometal-septembre-water-treatment-plant-assistant-foreman-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement FALOCAM Septembre 2026 : Assistant(e) Comptable",
    "source": "CameroonDesks",
    "description": "Recrutement FALOCAM Septembre 2026 : Assistant(e) Comptable – publié le 09/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-falocam-septembre-2026-assistante-comptable-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Haut-Commissariat du Canada au Cameroun Septembre 2026",
    "source": "CameroonDesks",
    "description": "Recrutement Haut-Commissariat du Canada au Cameroun Septembre 2026 – publié le 09/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/ecrutement-haut-commissariat-du-canada-cameroun-septembre-job.html",
    "category": "IT/Informatique"
  },
  {
    "title": "Recrutement Communauté Urbaine de Bafoussam Septembre 2026 : 06 Enquêteurs",
    "source": "CameroonDesks",
    "description": "Recrutement Communauté Urbaine de Bafoussam Septembre 2026 : 06 Enquêteurs – publié le 09/09/2026",
    "location": "Bafoussam",
    "url": "https://www.cameroondesks.com/2026/09/recrutement-communaute-urbaine-de-bafoussam-septembre-enqueteurs-job.html",
    "category": "Stages"
  },
  {
    "title": "Stage Ingénieur Travaux Razel-Bec Cameroun Septembre 2026",
    "source": "CameroonDesks",
    "description": "Stage Ingénieur Travaux Razel-Bec Cameroun Septembre 2026 – publié le 08/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2026/09/stage-ingenieur-travaux-razel-bec-septembre-job.html",
    "category": "Stages"
  },
  {
    "title": "Recrutement à la multinationale TotalEnergies - Urgent",
    "source": "CameroonDesks",
    "description": "Recrutement à la multinationale TotalEnergies - Urgent – publié le 08/09/2026",
    "location": "Cameroun",
    "url": "https://www.cameroondesks.com/2024/09/offre-demploi-responsable-juridique-totalenergies.html",
    "category": "Stages"
  }
];

export const CONCOURS_DATA: ContestItem[] = [
  {
    "title": "Calendrier concours d'entrée dans les Établissements des Universités d'État et Écoles sous tutelle académique du MINESUP – Année 2025-2026",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/wp-content/uploads/2025/04/calendrier-concours-dans-les-etablissements-des-Universites-dEtat-2025-2026.pdf",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Tous niveaux",
    "deadline": "Date limite : Voir calendrier"
  },
  {
    "title": "Concours ENS & ENSET 2025-2026 – 32 arrêtés (~2500 places)",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/index.php/2026/01/13/concours-dentree-dans-les-ens-et-enset-au-titre-de-lannee-academique-2025-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Tous niveaux",
    "deadline": "Date limite : 27/02/2026"
  },
  {
    "title": "ENSET Ebolowa – 1er & 2nd cycle 2025-2026",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/wp-content/uploads/2026/01/Concours-ENSET-Ebolowa-2026_1er-et-2nd-cycle.pdf",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat / BTS",
    "deadline": "Date limite : 27/02/2026"
  },
  {
    "title": "Concours ENS Yaoundé – Professeurs d'enseignement secondaire",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/ens-yaounde-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Licence / Master",
    "deadline": "Date limite : 30/06/2026"
  },
  {
    "title": "Concours ENS Bambili – Filières scientifiques et littéraires",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/ens-bambili-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat / Licence",
    "deadline": "Date limite : 15/06/2026"
  },
  {
    "title": "Concours ENS Bertoua – Auditeurs libres 2026",
    "source": "InfosConcours",
    "description": "",
    "url": "https://infosconcourseducation.com/concours-ens-bertoua-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat",
    "deadline": "Date limite : 20/06/2026"
  },
  {
    "title": "Concours ENSET Douala – Filières techniques industrielles",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/enset-douala-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat technique / BTS",
    "deadline": "Date limite : 25/06/2026"
  },
  {
    "title": "Concours ENSET Ebolowa – Auditeurs libres 2026",
    "source": "InfosConcours",
    "description": "",
    "url": "https://infosconcourseducation.com/concours-enset-ebolowa-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat / BTS",
    "deadline": "Date limite : 22/06/2026"
  },
  {
    "title": "Concours IFORD Yaoundé – Démographie et statistiques",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/iford-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Licence / Maîtrise",
    "deadline": "Date limite : 30/05/2026"
  },
  {
    "title": "Concours ENAM – Administration et Magistrature",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/enam-2026",
    "label": "Accéder au concours",
    "status": "À venir",
    "level": "Licence / Master",
    "deadline": "Date limite : 15/07/2026"
  },
  {
    "title": "Concours ESSTIC – Journalisme et Communication",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/esstic-2026",
    "label": "Accéder au concours",
    "status": "À venir",
    "level": "Baccalauréat / Licence",
    "deadline": "Date limite : 10/07/2026"
  },
  {
    "title": "Concours FMSB – Faculté de Médecine et Sciences Biomédicales",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/fmsb-2026",
    "label": "Accéder au concours",
    "status": "À venir",
    "level": "Baccalauréat C/D",
    "deadline": "Date limite : 01/08/2026"
  },
  {
    "title": "Concours ESSEC Douala – Sciences économiques et commerciales",
    "source": "MINESUP",
    "description": "",
    "url": "https://www.minesup.gov.cm/concours/essec-douala-2026",
    "label": "Accéder au concours",
    "status": "À venir",
    "level": "Baccalauréat / BTS",
    "deadline": "Date limite : 20/07/2026"
  },
  {
    "title": "Concours IDE – Infirmiers Diplômés d'État 2026",
    "source": "MINSANTE",
    "description": "",
    "url": "https://www.minsante.cm/concours/ide-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat C/D/E",
    "deadline": "Date limite : 30/04/2026"
  },
  {
    "title": "Concours TMS – Techniciens Médico-Sanitaires 2026",
    "source": "MINSANTE",
    "description": "",
    "url": "https://www.minsante.cm/concours/tms-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "BEPC / Probatoire",
    "deadline": "Date limite : 30/04/2026"
  },
  {
    "title": "Concours Sages-Femmes / Maïeuticiens 2026",
    "source": "MINSANTE",
    "description": "",
    "url": "https://www.minsante.cm/concours/sages-femmes-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat D",
    "deadline": "Date limite : 15/05/2026"
  },
  {
    "title": "Concours Laborantins d'Analyses Médicales 2026",
    "source": "MINSANTE",
    "description": "",
    "url": "https://www.minsante.cm/concours/laborantins-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Baccalauréat C/D",
    "deadline": "Date limite : 15/05/2026"
  },
  {
    "title": "Recrutement spécial 920 personnels soignants dans la Fonction Publique",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/index.php/fr/publications/2354-arretes-portant-ouverture-des-concours-directs-pour-le-recrutement-special-de-920-personnels-soignants-dans-la-fonction-publique",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Médecins / Pharmaciens / Sages-femmes / Techniciens biomédicaux",
    "deadline": "Date limite : 06/03/2026"
  },
  {
    "title": "Arrêté 630 Médecins / Pharmaciens / Dentistes / AS communautaires 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/images/2026/DDRHE/630_MEDECINS_PHARMACIENS_DENTISTES_AS_COMMUNAUTAIRES_2026_Fr.pdf",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Médecins / Pharmaciens / Dentistes",
    "deadline": "Date limite : 06/03/2026"
  },
  {
    "title": "Arrêté 90 Techniciens Biomédicaux 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/images/2026/DDRHE/90_TECHNIQUES_BIOMEDICAUX_2026_Fr.pdf",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Techniciens biomédicaux",
    "deadline": "Date limite : 06/03/2026"
  },
  {
    "title": "160 Volontaires de Missions MINJEC 2026",
    "source": "MINJEC",
    "description": "",
    "url": "https://infosconcourseducation.com/selection-de-160-volontaires-de-missions-au-minjec-2026/",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Jeunes camerounais",
    "deadline": "Date limite : À confirmer"
  },
  {
    "title": "Concours Police – Élèves Gardiens de la Paix 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/concours/police-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "BEPC",
    "deadline": "Date limite : 28/03/2026"
  },
  {
    "title": "Concours Greffiers – Adjoints de Greffe 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/concours/greffiers-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "BEPC / Probatoire",
    "deadline": "Date limite : 15/04/2026"
  },
  {
    "title": "Concours Douanes – Agents des Douanes 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/concours/douanes-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "BEPC",
    "deadline": "Date limite : 30/04/2026"
  },
  {
    "title": "Concours Trésor Public – Agents du Trésor 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/concours/tresor-2026",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "BEPC / Baccalauréat",
    "deadline": "Date limite : 15/05/2026"
  },
  {
    "title": "Examen d'Aptitude au Stage d'Avocat – Session 2026",
    "source": "Barreau du Cameroun",
    "description": "",
    "url": "https://infosconcourseducation.com/examen-daptitude-au-stage-davocat-session-2026/",
    "label": "Accéder au concours",
    "status": "À venir",
    "level": "Licence en Droit",
    "deadline": "Date limite : À confirmer"
  },
  {
    "title": "Sélection 100 jeunes – Formations professionnelles en Italie 2026",
    "source": "Programme bilatéral Cameroun-Italie",
    "description": "",
    "url": "https://infosconcourseducation.com/selection-de-100-jeunes-camerounais-formations-professionnelles-italie-2026/",
    "label": "Accéder au concours",
    "status": "Ouvert",
    "level": "Jeunes camerounais",
    "deadline": "Date limite : À confirmer"
  },
  {
    "title": "Concours Administration Pénitentiaire 2026",
    "source": "MINFOPRA",
    "description": "",
    "url": "https://www.minfopra.gov.cm/concours/penitentiaire-2026",
    "label": "Accéder au concours",
    "status": "À venir",
    "level": "BEPC",
    "deadline": "Date limite : 30/05/2026"
  },
  {
    "title": "Bourses du Gouvernement Chinois (CSC) 2026",
    "source": "CSC China",
    "description": "",
    "url": "https://www.campuschina.org/scholarships",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Licence / Master / Doctorat",
    "deadline": "Date limite : 31/03/2026"
  },
  {
    "title": "Bourse Fulbright USA – Étudiants camerounais 2026",
    "source": "Ambassade USA",
    "description": "",
    "url": "https://cm.usembassy.gov/education-culture/fulbright-program/",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Master / Doctorat",
    "deadline": "Date limite : 15/04/2026"
  },
  {
    "title": "Bourse Panafricaine de l'Union Africaine 2026",
    "source": "Union Africaine",
    "description": "",
    "url": "https://pau-au.africa/scholarships",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Master / Doctorat",
    "deadline": "Date limite : 30/06/2026"
  },
  {
    "title": "Bourses Türkiye (Turquie) 2026 – Toutes disciplines",
    "source": "Türkiye Bursları",
    "description": "",
    "url": "https://www.turkiyeburslari.gov.tr/",
    "label": "Accéder à la bourse",
    "status": "Clôturé",
    "level": "Licence / Master / Doctorat",
    "deadline": "Date limite : 20/02/2026"
  },
  {
    "title": "Bourses MINEFOP – 87 spécialités de formation professionnelle",
    "source": "MINEFOP",
    "description": "",
    "url": "https://www.minefop.gov.cm/bourses-2026",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "BEPC / Baccalauréat / BTS",
    "deadline": "Date limite : 30/04/2026"
  },
  {
    "title": "Bourses France – Campus France Cameroun 2026",
    "source": "Campus France",
    "description": "",
    "url": "https://www.cameroun.campusfrance.org/bourses",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Licence / Master / Doctorat",
    "deadline": "Date limite : 31/03/2026"
  },
  {
    "title": "Bourse KOICA – Programme Corée du Sud 2026",
    "source": "KOICA",
    "description": "",
    "url": "https://www.koica.go.kr/sites/koica_en/index.do",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Master",
    "deadline": "Date limite : 15/03/2026"
  },
  {
    "title": "Bourses d'Excellence de la Confédération Suisse 2026",
    "source": "Confédération Suisse",
    "description": "",
    "url": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants.html",
    "label": "Accéder à la bourse",
    "status": "Clôturé",
    "level": "Master / Doctorat / Post-doc",
    "deadline": "Date limite : 30/11/2025"
  },
  {
    "title": "Bourses AMCI – Royaume du Maroc 2026",
    "source": "AMCI Maroc",
    "description": "",
    "url": "https://www.amci.ma/bourses-etrangeres",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Licence / Master / Doctorat",
    "deadline": "Date limite : 30/04/2026"
  },
  {
    "title": "Bourse du Gouvernement Brésilien 2026 – Enseignement maritime",
    "source": "Gouvernement Brésilien",
    "description": "",
    "url": "https://infosconcourseducation.com/bourse-detude-du-gouvernement-bresilien-2026/",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Formation professionnelle / Maritime",
    "deadline": "Date limite : À confirmer"
  },
  {
    "title": "Bourses Doctorat & Master – Université de Malte 2026",
    "source": "Université de Malte",
    "description": "",
    "url": "https://infosconcourseducation.com/bourses-de-doctoratmaster-universite-de-malte-2026/",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Master / Doctorat",
    "deadline": "Date limite : À confirmer"
  },
  {
    "title": "Brunei Darussalam Government Scholarship 2026-2027",
    "source": "Gouvernement Brunei",
    "description": "",
    "url": "https://infosconcourseducation.com/brunei-darussalam-government-scholarship-2026-2027/",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Licence / Master / Doctorat",
    "deadline": "Date limite : À confirmer"
  },
  {
    "title": "VLIR-UOS ICP Master Belgique 2026-2027",
    "source": "VLIR-UOS Belgique",
    "description": "",
    "url": "https://www.vliruos.be/en/scholarships",
    "label": "Accéder à la bourse",
    "status": "Ouvert",
    "level": "Master",
    "deadline": "Date limite : mars–mai 2026 selon programme"
  }
];

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    "title": "Programme 145 – Insertion socio-économique des jeunes",
    "source": "MINJEC",
    "description": "Insertion via formation, auto-emploi, centres jeunes CMPJ/MYEC, appui PTS-Jeunes.",
    "url": "https://minjec.gov.cm/site/programme-145-insertion-socio-economique-des-jeunes/",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Jeunes 15-35 ans",
    "deadline": "Permanent"
  },
  {
    "title": "Youth Connekt / Challenge Jeune / Initiatives transversales",
    "source": "MINJEC & PNUD",
    "description": "Concours et accompagnement des projets jeunes, réseau d opportunités, collaboration MINJEC-MINESUP.",
    "url": "https://minjec.gov.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Étudiants & Porteurs de projets",
    "deadline": "Permanent"
  },
  {
    "title": "JEME – Un Jeune, Un Métier, Un Emploi",
    "source": "MINEFOP",
    "description": "Formation certifiante, chantiers-écoles, alternance, appui à la création d emploi.",
    "url": "https://www.emploijeune.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Jeunes déscolarisés & Diplômés",
    "deadline": "Sessions trimestrielles"
  },
  {
    "title": "PED – Programme Emploi Diplômé",
    "source": "FNE",
    "description": "Stage pré-emploi avec cofinancement FNE–entreprise pour faciliter la première insertion des jeunes diplômés.",
    "url": "https://fnecm.org",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Bac +2 à Bac +5",
    "deadline": "Permanent"
  },
  {
    "title": "PREJ – Programme Retraite Emploi Jeunes",
    "source": "FNE",
    "description": "Insertion des jeunes diplômés en remplacement progressif des personnels d entreprise partant à la retraite.",
    "url": "https://fnecm.org",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Jeunes diplômés",
    "deadline": "Permanent"
  },
  {
    "title": "USEP – Urban Special Employment Program",
    "source": "FNE",
    "description": "Travaux HIMO pour emploi temporaire et qualification pratique des jeunes en zones urbaines.",
    "url": "https://fnecm.org",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Tous niveaux",
    "deadline": "Campagnes régulières"
  },
  {
    "title": "MICROPAR / CIIEJ / PRAIDES",
    "source": "FNE",
    "description": "Accompagnement micro-entrepreneurs, information professionnelle, pépinières et incubation de startups.",
    "url": "https://fnecm.org",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Micro-entrepreneurs",
    "deadline": "Permanent"
  },
  {
    "title": "GETEC – Génie & Talent de l Étudiant Camerounais",
    "source": "MINESUP",
    "description": "Concours national pour projets étudiants d excellence et valorisation des startups universitaires.",
    "url": "https://www.minesup.gov.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Étudiants Cameroun",
    "deadline": "Annuel"
  },
  {
    "title": "Statut Étudiant-Entrepreneur (SNEE)",
    "source": "MINESUP",
    "description": "Statut spécial favorisant incubation universitaire, aménagement d études et formalisation d entreprises.",
    "url": "https://www.minesup.gov.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Universités d État",
    "deadline": "Permanent"
  },
  {
    "title": "Work-Study / Alternance universitaire",
    "source": "MINESUP",
    "description": "Partenariats universités-entreprises pour l alternance académique et le renforcement des compétences.",
    "url": "https://www.minesup.gov.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Licence / Master Pro",
    "deadline": "Annuel"
  },
  {
    "title": "PEA-Jeunes – Entrepreneuriat Agropastoral",
    "source": "MINADER & MINEPIA",
    "description": "Promotion de l entrepreneuriat agropastoral des jeunes, appui technique, dotations et crédits d investissement.",
    "url": "https://pea-jeunes.org",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Jeunes agriculteurs & éleveurs",
    "deadline": "Appels à projets"
  },
  {
    "title": "Incubateurs et Appui aux PME",
    "source": "MINPMEESA",
    "description": "Dispositif national d incubation, formalisation d entreprises, accès au crédit et renforcement de capacités.",
    "url": "https://www.minpmeesa.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "PME & Porteurs de projets",
    "deadline": "Permanent"
  },
  {
    "title": "Youth Internet Governance Forum / Digital Days",
    "source": "MINPOSTEL",
    "description": "Formations certifiantes aux métiers du numérique, cybersécurité, hackathons et intelligence artificielle.",
    "url": "https://www.minpostel.gov.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Passionnés de Tech",
    "deadline": "Sessions annuelles"
  },
  {
    "title": "Programmes Jeunes Métiers des Mines et Industrie",
    "source": "MINMIDT",
    "description": "Formations pratiques aux filières d extraction, transformation locale et appui aux artisans industriels.",
    "url": "https://www.minmidt.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "CAP / Bac / BTS",
    "deadline": "Permanent"
  },
  {
    "title": "PFS-AIE – Projet Filets Sociaux & Inclusion Économique",
    "source": "MINEPAT",
    "description": "Inclusion économique des jeunes vulnérables, transferts monétaires productifs et concours de plans d affaires.",
    "url": "https://www.pfs-aie.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Jeunes en situation de précarité",
    "deadline": "Phases régionales"
  },
  {
    "title": "Stages Cliniques & Recrutements Médicaux",
    "source": "MINSANTE",
    "description": "Affectations, stages cliniques supervisés et recrutements directs pour professionnels et jeunes diplômés santé.",
    "url": "https://www.minsante.cm",
    "label": "En savoir plus",
    "status": "Actif",
    "level": "Diplômés Santé & Paramédical",
    "deadline": "Permanent"
  }
];
