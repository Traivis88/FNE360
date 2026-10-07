export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  company: string;
  phone: string;
  email?: string;
}

export interface UserCvData {
  // Page 1: Informations personnelles
  fullName: string;
  jobTitle: string;
  tagline?: string;
  photoUrl: string;
  address: string;
  email: string;
  phone: string;
  birthDate: string;
  driverLicense: string;
  aboutMe: string;

  // Page 2: Formations
  educations: EducationItem[];

  // Page 3: Expériences professionnelles
  experiences: ExperienceItem[];

  // Page 4: Compétences et langues
  skills: string[];
  languages: LanguageItem[];

  // Page 5: Références
  references: ReferenceItem[];

  // Page 6: Hobbies & Loisirs
  hobbies: string[];

  // Formations & certifications complémentaires
  certifications?: string[];
}

export const INITIAL_CV_DATA: UserCvData = {
  fullName: 'SAME DIKONGUE GEORGES',
  jobTitle: 'MÉDECIN',
  tagline: 'Au service de la santé, pour un meilleur avenir',
  photoUrl: '/assets/doctor_same_dikongue.jpg',
  address: 'Douala, Cameroun',
  email: 'same.dikongue@gmail.com',
  phone: '+237 6 78 12 34 56',
  birthDate: '32 ans (né le 12 mars 1993)',
  driverLicense: 'Permis B',
  aboutMe:
    "Médecin diplômé et expérimenté, avec plus de 10 ans d'expérience hospitalière dans la prise en charge globale des patients. Passionné par la qualité des soins, la prévention et l'amélioration continue des pratiques médicales.",

  educations: [
    {
      id: 'edu-1',
      degree: 'Doctorat en Médecine',
      school: 'Faculté de Médecine et des Sciences Biomédicales (FMSB) – Yaoundé',
      startDate: '2010',
      endDate: '2016',
      description: 'Formation médicale approfondie et internat en milieu hospitalier universitaire',
    },
    {
      id: 'edu-2',
      degree: 'Baccalauréat D (Sciences de la vie et de la terre)',
      school: 'Lycée Dakar',
      startDate: '2007',
      endDate: '',
      description: 'Série scientifique avec mention',
    },
  ],

  experiences: [
    {
      id: 'exp-1',
      role: 'Médecin Généraliste',
      company: 'Hôpital de Kribi',
      startDate: '2016',
      endDate: '2022',
      description:
        '• Prise en charge des patients en consultation et en hospitalisation\n• Gestion des urgences et des situations critiques\n• Suivi des pathologies chroniques (diabète, hypertension, etc.)\n• Collaboration avec les équipes paramédicales et les autres spécialistes\n• Participation aux campagnes de santé publique et de prévention',
    },
    {
      id: 'exp-2',
      role: 'Médecin Généraliste',
      company: 'Hôpital Laquintinie – Douala',
      startDate: '2022',
      endDate: '2026',
      description:
        '• Prise en charge des patients en médecine générale et spécialisée\n• Gestion des urgences et soins critiques\n• Suivi des patients hospitalisés et coordination des soins\n• Encadrement et appui aux équipes médicales et paramédicales\n• Contribution à l\'amélioration de la qualité des soins et à la satisfaction des patients',
    },
  ],

  skills: [
    'Diagnostic et prise en charge clinique',
    'Gestion des urgences médicales',
    'Suivi et surveillance des patients',
    'Prescriptions et interprétation des examens',
    'Prise en charge des pathologies courantes et spécifiques',
    'Prévention et éducation sanitaire',
    'Travail en équipe pluridisciplinaire',
    'Communication avec les patients et familles',
    'Organisation et gestion d\'un service médical',
  ],

  languages: [
    { id: 'lang-1', name: 'Français', level: 'Excellent' },
    { id: 'lang-2', name: 'Anglais', level: 'Bon' },
    { id: 'lang-3', name: 'Lingala', level: 'Notions' },
  ],

  references: [],

  hobbies: [
    'Santé & médecine',
    'Lecture',
    'Sport',
    'Voyages',
  ],

  certifications: [
    'Formation continue en médecine d\'urgence',
    'Atelier de prise en charge des pathologies chroniques (diabète, HTA)',
    'Gestion des infections nosocomiales',
    'Certificat de réanimation de base (ATLS)',
    'Participation à plusieurs séminaires et congrès médicaux',
  ],
};
