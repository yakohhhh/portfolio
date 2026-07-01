/* =============================================================================
 *  CONTENU DU PORTFOLIO
 * ========================================================================== */

export const profile = {
  name: 'Ayman Mazroui',
  firstName: 'Ayman',
  initials: 'AM',
  roles: [
    'Développeur DevSecOps',
    'Étudiant à EPITECH',
    'Security Ops Engineer',
    'Junior Penetration Tester',
    'CTF Player',
    'SOC Analyst - Level 1',
  ],
  tagline:
    'Je construis des applications full-stack robustes - et je passe l’autre moitié de mon temps à essayer de les casser.',
  location: 'Strasbourg, France',
  email: 'ayman.mazroui@epitech.eu',
  phone: '+33 6 19 62 57 07',
  school: 'EPITECH Strasbourg',
  availability: 'Ouvert aux opportunités - alternance & stage',
  bio: [
    "Étudiant en 3ᵉ année à EPITECH Strasbourg, je suis développeur full-stack le jour et passionné de cybersécurité à toute heure. J’aime concevoir des produits solides - du backend NestJS aux interfaces React / Ionic - sans jamais perdre de vue la sécurité.",
    "Mon passage au Conseil de l’Europe, au sein de l’équipe Sécurité de l’Information, m’a appris à penser comme un attaquant pour mieux défendre : analyse de vulnérabilités, gestion des risques et conformité. Entre deux projets, je m’entraîne sur des challenges CTF et des labs de pentest.",
  ],
  socials: {
    github: 'https://github.com/yakohhhh',
    linkedin: 'https://www.linkedin.com/in/ayman-mazroui-1b13ab2b6/',
    tryhackme: 'https://tryhackme.com/p/aymanepitech',
  },
  cv: '/CV-Ayman-Mazroui.pdf',
}

export const stats = [
  { value: '2+', label: "ans d'expérience", hint: 'dev & sécurité' },
  { value: '2', label: 'certifications', hint: 'TryHackMe' },
  { value: '4', label: 'langues parlées', hint: 'FR · AR · EN · DE' },
  { value: '2028', label: 'fin EPITECH', hint: 'Expert en IT' },
]

export const languages = [
  { name: 'Français', level: 'Natif', percent: 100 },
  { name: 'Arabe', level: 'Natif', percent: 100 },
  { name: 'Anglais', level: 'Courant', percent: 85 },
  { name: 'Allemand', level: 'Intermédiaire', percent: 55 },
]

/* ---- Compétences techniques ------------------------------------------------ */
export const devStack = [
  'NestJS',
  'React',
  'Ionic',
  'PostgreSQL',
  'JavaScript',
  'TypeScript',
  'Lua',
  'Python',
  'Docker',
  'CI/CD',
]

export const cyberStack = [
  'Nmap',
  'Burp Suite',
  'Gobuster',
  'Nikto',
  'SQLMap',
  'Wireshark',
  'Tcpdump',
  'Zeek',
  'OWASP Top 10',
  'MITRE ATT&CK',
]

export const softSkills = [
  'Architecture logicielle',
  'Qualité logicielle',
  'Sécurité informatique',
  'Résolution de problèmes',
]

export const interests = ['Cybersécurité', 'Challenges CTF', 'Intelligence Artificielle', 'Musculation']

/* ---- Expériences ----------------------------------------------------------- */
export const experiences = [
  {
    role: 'Stagiaire Cybersécurité - Automatisation & réponse aux incidents',
    type: 'Stage',
    org: 'Athéo Ingénierie',
    location: 'Strasbourg',
    period: '2025 - Aujourd’hui',
    current: true,
    description:
      'Mission orientée Blue Team / SOC : automatiser la détection et la réponse aux incidents pour gagner en rapidité et en fiabilité.',
    bullets: [
      'Conception de playbooks d’automatisation (SOAR) et d’intégrations d’API de sécurité.',
      'Réponse à incidents : tri, investigation et remédiation.',
      'Modélisation des menaces avec MITRE ATT&CK.',
    ],
    stack: ['SOAR', 'Python', 'SIEM', 'Incident Response', 'MITRE ATT&CK', 'API'],
  },
  {
    role: 'Développeur Full Stack',
    type: 'Part-time',
    org: 'Secta - ACT Autosur France',
    location: 'Strasbourg',
    period: 'Oct. 2025 - Aujourd’hui',
    current: true,
    description:
      'Développement d’un écosystème complet pour le contrôle technique automobile : API métier, applications web & mobile et pipeline de déploiement.',
    bullets: [
      'Backend NestJS + PostgreSQL et front React / Ionic (web & mobile).',
      'Mise en place et maintien d’un pipeline CI/CD GitLab.',
      'Conteneurisation Docker et qualité logicielle.',
    ],
    stack: ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'Docker', 'GitLab CI/CD'],
  },
  {
    role: 'Stagiaire - Sécurité de l’Information',
    type: 'Stage',
    org: 'Conseil de l’Europe',
    location: 'Strasbourg',
    period: 'Août - Déc. 2024',
    current: false,
    description:
      'Collaboration avec des experts en cybersécurité et gestion des risques informatiques au sein d’une organisation internationale.',
    bullets: [
      'Analyse de vulnérabilités et étude des protocoles de sécurité.',
      'Protection des données et conformité réglementaire.',
      'Participation à des projets de sécurisation d’infrastructure.',
    ],
    stack: ['Vulnerability Analysis', 'Risk Management', 'Compliance', 'Infrastructure'],
  },
  {
    role: 'Stagiaire Contrôle Technique',
    type: 'Stage',
    org: 'ACT Autosur',
    location: 'Strasbourg',
    period: '2023 - 2024',
    current: false,
    description:
      'Première immersion dans l’univers du contrôle technique automobile, à l’origine de ma collaboration actuelle avec Secta.',
    bullets: [],
    stack: [],
  },
]

/* ---- Formation ------------------------------------------------------------- */
export const education = [
  {
    degree: 'Expert en Technologie de l’Information & Ingénierie Logiciel',
    school: 'EPITECH Strasbourg',
    location: 'Strasbourg',
    period: '2023 - 2028',
    description: 'Cursus d’ingénierie logicielle par projets (Bac+5), spécialisation développement & sécurité.',
  },
  {
    degree: 'Baccalauréat Général',
    school: 'Institution Saint-Clotilde',
    location: 'Strasbourg',
    period: '2021 - 2023',
    description: 'Baccalauréat général, spécialités scientifiques.',
  },
]

/* ---- Projets --------------------------------------------------------------- */
/* projects[0] est mis en avant : c'est l'emplacement de ta future release.    */
export const projects = [
  {
    title: 'Projet à venir - release testable',
    description:
      'Une release publique arrive bientôt : tu pourras la tester directement depuis le portfolio. Cet emplacement est réservé pour le projet que tu vas partager.',
    tags: ['Bientôt', 'Démo publique'],
    status: 'soon' as const,
    featured: true,
    links: {
      demo: '', // TODO: lien de la démo / release à tester
      code: '', // TODO: lien du dépôt GitHub
    },
  },
  {
    title: 'Écosystème Contrôle Technique',
    description:
      'Plateforme complète (API + web + mobile) pour la gestion du contrôle technique automobile, développée chez Secta - ACT Autosur France.',
    tags: ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'Docker'],
    status: 'pro' as const,
    featured: false,
    links: { demo: '', code: '' },
  },
  {
    title: 'Sécurisation d’infrastructure',
    description:
      'Mission au Conseil de l’Europe : analyse de vulnérabilités, durcissement et conformité dans un environnement international à fort enjeu.',
    tags: ['Pentest', 'Risk Mgmt', 'Compliance'],
    status: 'pro' as const,
    featured: false,
    links: { demo: '', code: '' },
  },
]

/* ---- Certifications -------------------------------------------------------- */
export const certifications = [
  {
    name: 'Junior Penetration Tester',
    issuer: 'TryHackMe',
    date: 'Janv. 2024',
    id: 'THM-PJVTY4QWSQ',
    badge: 'PT',
    url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-PJVTY4QWSQ.png',
  },
  {
    name: 'SOC Level 1',
    issuer: 'TryHackMe',
    date: 'Janv. 2024',
    id: 'THM-TJJAF9UBT6',
    badge: 'SOC',
    url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-TJJAF9UBT6.png',
  },
]

/* ---- Navigation ------------------------------------------------------------ */
export const navLinks = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'projets', label: 'Projets' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
