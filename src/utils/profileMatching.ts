import { UserCvData, INITIAL_CV_DATA } from '../types/cv';
import { JobOffer, ContestItem, ProgramItem } from '../data/opportunitiesData';

export const CV_STORAGE_KEY = 'fne360_user_cv_data';

export function getStoredCvData(): UserCvData {
  try {
    const raw = localStorage.getItem(CV_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          ...INITIAL_CV_DATA,
          ...parsed,
        };
      }
    }
  } catch (e) {
    console.error('Error reading stored cvData:', e);
  }
  return INITIAL_CV_DATA;
}

export function saveStoredCvData(data: UserCvData): void {
  try {
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving cvData:', e);
  }
}

// Helper: Normalize strings for fuzzy keyword comparison (accents, punctuation)
export function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Stopwords in French
const STOP_WORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'd', 'l',
  'et', 'ou', 'a', 'au', 'aux', 'en', 'par', 'pour', 'sur', 'dans',
  'avec', 'sans', 'sous', 'vers', 'chez', 'ce', 'cet', 'cette', 'ces',
  'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre',
  'votre', 'leur', 'qui', 'que', 'quoi', 'dont', 'ou', 'quand', 'comment',
  'est', 'sont', 'ete', 'etre', 'avoir', 'plus', 'tres', 'faire', 'tout',
  'tous', 'toute', 'toutes', 'offre', 'offres', 'recrutement', 'avis',
  'cameroun', 'cameroon', 'poste', 'postes', 'cherche', 'urgent', 'at'
]);

export function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized
    .split(' ')
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
}

// Broad Domain Clusters definition covering all sectors in Cameroon
export interface DomainCluster {
  id: string;
  name: string;
  categories: string[];
  keywords: string[];
}

export const DOMAIN_CLUSTERS: Record<string, DomainCluster> = {
  sante: {
    id: 'sante',
    name: 'Santé & Médical',
    categories: ['Santé/Social', 'Santé', 'Social'],
    keywords: [
      'medecin', 'docteur', 'sante', 'medical', 'infirmier', 'infirmiere',
      'soin', 'soins', 'urgence', 'urgences', 'clinique', 'hopital', 'hospitalier',
      'biologie', 'biologiste', 'pharmacie', 'pharmacien', 'fmsb', 'minsante',
      'nutrition', 'nutritionniste', 'epidemiologie', 'epidemiologiste', 'sante publique',
      'fhi360', 'fhi', 'acms', 'croix rouge', 'laboratoire', 'pathologie',
      'consultation', 'sage femme', 'maieuticien', 'e sante', 'pediatrie', 'chirurgien',
      'praticien', 'biomedical', 'oms', 'international medical corps', 'imc',
      'action contre la faim', 'medecins sans frontieres'
    ],
  },
  it: {
    id: 'it',
    name: 'Informatique & Télécoms',
    categories: ['IT/Informatique'],
    keywords: [
      'developpeur', 'developpeuse', 'informatique', 'software', 'logiciel', 'programmeur',
      'react', 'node', 'python', 'java', 'javascript', 'typescript', 'data', 'reseau',
      'systeme', 'cloud', 'devops', 'cybersecurite', 'telecom', 'telecoms', 'telecommunication',
      'digital', 'flutter', 'ingenieur logiciel', 'mobile', 'base de donnees', 'dsi',
      'support informatique', 'technicien informatique'
    ],
  },
  finance: {
    id: 'finance',
    name: 'Finance & Comptabilité',
    categories: ['Finance/Comptabilité', 'Finance/Banque'],
    keywords: [
      'comptable', 'finance', 'banque', 'audit', 'auditeur', 'fiscalite',
      'fiscaliste', 'tresorerie', 'tresorier', 'gestionnaire', 'microfinance',
      'credit', 'caisse', 'caissier', 'analyste financier', 'comptabilite',
      'portefeuille', 'recouvrement', 'afriland', 'cca', 'ecobank', 'bicec',
      'controle de gestion'
    ],
  },
  commercial: {
    id: 'commercial',
    name: 'Commercial & Vente',
    categories: ['Commercial/Vente'],
    keywords: [
      'commercial', 'commerciale', 'vente', 'ventes', 'marketing', 'business',
      'client', 'clientele', 'negociation', 'prospection', 'charge de clientele',
      'developpement commercial', 'boutique', 'magasin', 'vendeur', 'vendeuse',
      'teleconseiller', 'marchandiseur', 'distribution', 'relation client'
    ],
  },
  rh: {
    id: 'rh',
    name: 'Ressources Humaines & Administration',
    categories: ['RH/Administration'],
    keywords: [
      'rh', 'ressources humaines', 'administration', 'recrutement', 'paie',
      'assistant', 'assistante', 'secretaire', 'gestion du personnel',
      'administratif', 'juriste', 'droit', 'conformite', 'secretariat'
    ],
  },
  btp: {
    id: 'btp',
    name: 'BTP & Ingénierie',
    categories: ['BTP/Ingénierie'],
    keywords: [
      'btp', 'genie civil', 'ingenieur', 'chantier', 'travaux', 'architecture',
      'architecte', 'topographe', 'batiment', 'technicien btp', 'mecanique',
      'electrique', 'industriel', 'dessinateur', 'conducteur de travaux'
    ],
  },
  logistique: {
    id: 'logistique',
    name: 'Logistique & Transport',
    categories: ['Logistique/Transport'],
    keywords: [
      'logistique', 'transport', 'approvisionnement', 'supply chain',
      'magasinier', 'gestion des stocks', 'chauffeur', 'livraison', 'transit',
      'douane', 'entrepot', 'expedition', 'achats'
    ],
  },
  humanitaire: {
    id: 'humanitaire',
    name: 'Humanitaire & ONG',
    categories: ['Humanitaire/ONG', 'ONG/Humanitaire'],
    keywords: [
      'humanitaire', 'ong', 'coordinateur de projet', 'aide', 'developpement',
      'terrain', 'refugies', 'action contre la faim', 'croix rouge', 'irc',
      'drc', 'unicef', 'hcr', 'pam', 'solidarites', 'plaidoyer', 'communautaire'
    ],
  },
  education: {
    id: 'education',
    name: 'Éducation & Enseignement',
    categories: ['Éducation'],
    keywords: [
      'enseignant', 'enseignante', 'professeur', 'formateur', 'formatrice',
      'pedagogique', 'ecole', 'universite', 'education', 'formation', 'tuteur',
      'academique', 'cours', 'pedagogie'
    ],
  },
};

export interface MatchEvaluation<T> {
  item: T;
  score: number; // 0 to 100
  isTargeted: boolean;
  reasons: string[];
  matchedBadge: string;
}

/**
 * Identify all candidate domains broadly based on their profile data:
 * jobTitle, skills, educations, experiences, and aboutMe.
 */
export function identifyUserDomains(profile: UserCvData): {
  primaryDomainKey: string;
  detectedDomainKeys: string[];
  primaryCluster: DomainCluster | null;
} {
  const profileText = normalizeText(
    `${profile.jobTitle || ''} ${profile.aboutMe || ''} ${(profile.skills || []).join(' ')} ${
      profile.educations?.map((e) => `${e.degree || ''} ${e.school || ''} ${e.description || ''}`).join(' ') || ''
    } ${
      profile.experiences?.map((e) => `${e.role || ''} ${e.company || ''} ${e.description || ''}`).join(' ') || ''
    }`
  );

  const titleNorm = normalizeText(profile.jobTitle || '');
  const domainScores: Record<string, number> = {};

  for (const [key, cluster] of Object.entries(DOMAIN_CLUSTERS)) {
    let score = 0;

    for (const kw of cluster.keywords) {
      if (titleNorm.includes(kw)) {
        score += 50; // Priority given to desired title
      } else if (profileText.includes(kw)) {
        score += 10;
      }
    }

    domainScores[key] = score;
  }

  const maxScore = Math.max(...Object.values(domainScores), 0);
  const detectedKeys = Object.entries(domainScores)
    .filter(([_, score]) => score >= Math.max(30, maxScore * 0.5))
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key);

  const primaryKey = detectedKeys.length > 0 ? detectedKeys[0] : 'sante';
  const finalKeys = detectedKeys.length > 0 ? detectedKeys : ['sante'];

  return {
    primaryDomainKey: primaryKey,
    detectedDomainKeys: finalKeys,
    primaryCluster: DOMAIN_CLUSTERS[primaryKey] || null,
  };
}

export const identifyUserDomain = identifyUserDomains;

/**
 * Check if a job belongs broadly to a domain cluster.
 * IMPORTANT: City is NOT a criterion - all offers span the entirety of Cameroon!
 */
export function isJobInDomain(job: JobOffer, cluster: DomainCluster): boolean {
  // 1. Direct category match
  for (const cat of cluster.categories) {
    if (job.category === cat || job.category.includes(cat)) {
      return true;
    }
  }

  // 2. Keyword match in job title
  const jobTitleNorm = normalizeText(job.title);
  for (const kw of cluster.keywords) {
    if (kw.length >= 4 && jobTitleNorm.includes(kw)) {
      return true;
    }
  }

  // 3. Keyword match in description with strong domain relevance
  const jobDescNorm = normalizeText(job.description || '');
  if (cluster.id === 'sante') {
    if (
      jobDescNorm.includes('sante') ||
      jobDescNorm.includes('medical') ||
      jobDescNorm.includes('soins') ||
      jobDescNorm.includes('clinique') ||
      jobDescNorm.includes('hopital')
    ) {
      for (const kw of cluster.keywords) {
        if (kw.length >= 5 && jobDescNorm.includes(kw)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Matches a single JobOffer against user's profile and returns a score + reasons.
 * Broad domain matching:
 * - City is NOT a criterion (all Cameroon offers are included equally)
 * - Domain is broad: for medical profile, ALL health/medical offers appear
 * - Transferable and multi-disciplinary roles in the domain are rewarded
 */
export function evaluateJobMatch(job: JobOffer, profile: UserCvData): MatchEvaluation<JobOffer> {
  const { primaryCluster, detectedDomainKeys } = identifyUserDomains(profile);

  const jobTitleNorm = normalizeText(job.title);
  const profileTitleNorm = normalizeText(profile.jobTitle || '');

  let score = 0;
  const reasons: string[] = [];
  let isInCandidateDomain = false;
  let matchingClusterName = '';

  // 1. Broad domain matching across candidate's detected domains
  for (const dKey of detectedDomainKeys) {
    const cluster = DOMAIN_CLUSTERS[dKey];
    if (cluster && isJobInDomain(job, cluster)) {
      isInCandidateDomain = true;
      matchingClusterName = cluster.name;
      break;
    }
  }

  if (isInCandidateDomain) {
    score += 55;
    reasons.push(`Domaine ${matchingClusterName}`);
  }

  // 2. Exact or partial title match with candidate desired job title
  const titleKeywords = extractKeywords(profile.jobTitle || '');
  let titleMatchesCount = 0;
  for (const kw of titleKeywords) {
    if (jobTitleNorm.includes(kw)) {
      titleMatchesCount++;
    }
  }

  if (titleMatchesCount > 0) {
    const titleBoost = Math.min(35, titleMatchesCount * 25);
    score += titleBoost;
    reasons.push(`Métier spécifique (${profile.jobTitle})`);
  }

  // 3. Candidate Skills match across job text
  const jobFullText = `${jobTitleNorm} ${normalizeText(job.description || '')}`;
  const profileSkills = (profile.skills || []).map((s) => normalizeText(s));
  let matchedSkillsCount = 0;
  for (const skill of profileSkills) {
    const skillWords = extractKeywords(skill);
    for (const w of skillWords) {
      if (w.length >= 4 && jobFullText.includes(w)) {
        matchedSkillsCount++;
        break;
      }
    }
  }
  if (matchedSkillsCount > 0) {
    const skillBoost = Math.min(15, matchedSkillsCount * 5);
    score += skillBoost;
    reasons.push(`${matchedSkillsCount} compétence(s) en synergie`);
  }

  // 4. Candidate Education match
  const educations = profile.educations || [];
  for (const edu of educations) {
    const degreeWords = extractKeywords(edu.degree || '');
    let matchedEdu = false;
    for (const w of degreeWords) {
      if (w.length >= 4 && jobFullText.includes(w)) {
        matchedEdu = true;
        break;
      }
    }
    if (matchedEdu) {
      score += 10;
      reasons.push(`Diplôme (${edu.degree.split('(')[0].trim()})`);
      break;
    }
  }

  // Broad filtering rule:
  // If the job belongs to the candidate's broad domain, it IS ALWAYS TARGETED!
  const isTargeted = isInCandidateDomain || (score >= 40 && titleMatchesCount > 0);

  // Score calibration (between 82% and 98% for targeted domain jobs)
  let finalScore = 40;
  if (isTargeted) {
    if (titleMatchesCount > 0) {
      finalScore = Math.min(98, 92 + Math.min(6, titleMatchesCount * 3));
    } else {
      finalScore = Math.min(92, Math.max(85, score + 15));
    }
  }

  // Match badge
  let badge = `${finalScore}% Match`;
  if (finalScore >= 93) {
    badge = `🎯 ${finalScore}% Match • Métier ciblé`;
  } else if (finalScore >= 85) {
    badge = `🎯 ${finalScore}% Match • Domaine ${matchingClusterName || 'recommandé'}`;
  } else if (finalScore >= 75) {
    badge = `🎯 ${finalScore}% Recommandé`;
  }

  return {
    item: job,
    score: finalScore,
    isTargeted,
    reasons,
    matchedBadge: badge,
  };
}

/**
 * Filter and sort jobs specifically for the candidate profile.
 * - All Cameroon offers are considered (no city exclusion or preference).
 * - Broad matching: all domain-related offers appear.
 */
export function getTargetedJobs(jobs: JobOffer[], profile: UserCvData): MatchEvaluation<JobOffer>[] {
  const evaluated = jobs.map((j) => evaluateJobMatch(j, profile));

  // Targeted list: filter candidates that meet broad domain criteria, sort descending by score
  const targeted = evaluated.filter((e) => e.isTargeted);

  // Fallback: If no strict domain items match, return top score candidates
  if (targeted.length === 0) {
    const sortedAll = [...evaluated].sort((a, b) => b.score - a.score);
    return sortedAll.slice(0, 15);
  }

  return targeted.sort((a, b) => b.score - a.score);
}

/**
 * Evaluate and filter Concours based on profile
 */
export function evaluateContestMatch(contest: ContestItem, profile: UserCvData): MatchEvaluation<ContestItem> {
  const { primaryCluster } = identifyUserDomains(profile);
  const contestText = normalizeText(`${contest.title} ${contest.source} ${contest.level || ''} ${contest.description || ''}`);

  let score = 55;
  const reasons: string[] = [];

  if (primaryCluster) {
    for (const kw of primaryCluster.keywords) {
      if (contestText.includes(kw)) {
        score += 25;
        reasons.push(`Domaine ${primaryCluster.name}`);
        break;
      }
    }
  }

  // Doctor/Health specific: MINSANTE, FMSB, Médecine
  if (
    profile.jobTitle?.toLowerCase().includes('medecin') ||
    profile.educations?.some((e) => e.degree.toLowerCase().includes('medecin'))
  ) {
    if (
      contestText.includes('minsante') ||
      contestText.includes('fmsb') ||
      contestText.includes('medecin') ||
      contestText.includes('sante')
    ) {
      score += 35;
      reasons.push('Filière médicale FMSB / MINSANTE');
    }
  }

  const isTargeted = score >= 65 || reasons.length > 0;
  const finalScore = Math.min(98, score);

  return {
    item: contest,
    score: finalScore,
    isTargeted,
    reasons,
    matchedBadge: `🎯 ${finalScore}% Recommandé`,
  };
}

/**
 * Evaluate and filter Employability Programs based on profile
 */
export function evaluateProgramMatch(program: ProgramItem, profile: UserCvData): MatchEvaluation<ProgramItem> {
  const { primaryCluster } = identifyUserDomains(profile);
  const progText = normalizeText(`${program.title} ${program.source} ${program.description || ''}`);

  let score = 60;
  const reasons: string[] = [];

  if (primaryCluster) {
    for (const kw of primaryCluster.keywords) {
      if (progText.includes(kw)) {
        score += 25;
        reasons.push(`Cible ${primaryCluster.name}`);
        break;
      }
    }
  }

  if (
    progText.includes('fne') ||
    progText.includes('insertion') ||
    progText.includes('professionnel') ||
    progText.includes('sante') ||
    progText.includes('diplome')
  ) {
    score += 20;
    reasons.push('Programme FNE360 / Insertion');
  }

  const isTargeted = score >= 70 || reasons.length > 0;
  const finalScore = Math.min(98, score);

  return {
    item: program,
    score: finalScore,
    isTargeted,
    reasons,
    matchedBadge: `🎯 ${finalScore}% Recommandé`,
  };
}
