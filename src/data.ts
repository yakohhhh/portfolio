/* =============================================================================
 *  CONTENU DU PORTFOLIO
 *  Tout le texte du site est ici : modifie ce fichier pour mettre à jour le
 *  portfolio sans toucher aux composants.
 * ========================================================================== */

export const profile = {
  name: 'Ayman Mazroui',
  firstName: 'Ayman',
  initials: 'AM',
  headline: 'Développeur DevSecOps.',
  subheadline: 'Étudiant en cybersécurité à EPITECH Strasbourg.',
  tagline:
    'Je construis des applications full-stack robustes, et je passe l’autre moitié de mon temps à essayer de les casser.',
  location: 'Strasbourg, France',
  email: 'aymanmazroui@proton.me',
  school: 'EPITECH Strasbourg',
  availability: 'Ouvert aux opportunités : alternance & stage',
  bio: [
    'Étudiant en 4ᵉ année à EPITECH Strasbourg, je suis développeur full-stack le jour et passionné de cybersécurité à toute heure. J’aime concevoir des produits solides, du backend NestJS aux interfaces React / Ionic, sans jamais perdre de vue la sécurité.',
    'Mon passage au Conseil de l’Europe, au sein de l’équipe Sécurité de l’Information, m’a appris à penser comme un attaquant pour mieux défendre : analyse de vulnérabilités, gestion des risques et conformité. Entre deux projets, je m’entraîne sur des challenges CTF et des labs de pentest.',
  ],
  socials: {
    github: 'https://github.com/yakohhhh',
    linkedin: 'https://www.linkedin.com/in/ayman-mazroui-1b13ab2b6/',
    tryhackme: 'https://tryhackme.com/p/aymanepitech',
  },
  cv: '/CV-Ayman-Mazroui.pdf',
  photos: {
    hero: '/images/ayman-hero.webp',
    heroSmall: '/images/ayman-hero-sm.webp',
    heroFallback: '/images/ayman-hero.jpg',
    portrait: '/images/ayman-portrait.webp',
    portraitFallback: '/images/ayman-portrait.jpg',
  },
}

/* ---- Identité ------------------------------------------------------------- */
export const brand = {
  signature: ['Build.', 'Break.', 'Secure.'],
  motto: 'Je construis des applications solides, puis j’essaie de les casser.',
}

/* ---- Intro « keynote » : les phrases qui s'enchaînent au chargement --------
 * tone : 'build' (bleu), 'break' (rouge + glitch) ou rien (blanc).
 * Après la dernière phrase, le monogramme AM s'assemble.                      */
export const introLines: { text: string; tone?: 'build' | 'break' }[] = [
  { text: 'Bonjour.' },
  { text: 'Moi, c’est Ayman.' },
  { text: 'Je construis.', tone: 'build' },
  { text: 'Je casse.', tone: 'break' },
]

/* ---- Manifeste (révélé mot à mot au scroll).
 *      [crochets] = couleur BUILD, *astérisques* = couleur BREAK,
 *      {accolades} = dégradé SECURE. ------------------------------------- */
export const manifesto =
  'Je [conçois des produits] full-stack, du backend NestJS aux interfaces React. Mais un bon produit ne suffit pas : il doit *tenir face à un attaquant.* Alors j’apprends à penser comme lui, {pour mieux défendre.}'

export const stats = [
  { value: 2, suffix: '+', label: "ans d'expérience", hint: 'Dev & sécurité' },
  { value: 3, suffix: '', label: 'projets open source', hint: 'Portcullis · Latent · SOAR' },
  { value: 4, suffix: '', label: 'langues parlées', hint: 'FR · AR · EN · DE' },
  { value: 2028, suffix: '', label: 'diplôme EPITECH', hint: 'Expert en IT' },
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
  'TypeScript',
  'JavaScript',
  'Python',
  'Lua',
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
    role: 'Stagiaire Cybersécurité : automatisation & réponse aux incidents',
    type: 'Stage',
    org: 'Athéo Ingénierie',
    location: 'Strasbourg',
    period: '2025 - Aujourd’hui',
    current: true,
    description:
      'Mission orientée Blue Team / SOC : automatiser la détection et la réponse aux incidents pour gagner en rapidité et en fiabilité.',
    bullets: [
      'Conception de playbooks d’automatisation (SOAR) et d’intégrations d’API de sécurité.',
      'Réponse à incidents : tri, investigation et remédiation.',
      'Modélisation des menaces avec MITRE ATT&CK.',
    ],
    stack: ['SOAR', 'Python', 'SIEM', 'Incident Response', 'MITRE ATT&CK', 'API'],
  },
  {
    role: 'Développeur Full Stack',
    type: 'Temps partiel',
    org: 'Secta - ACT Autosur France',
    location: 'Strasbourg',
    period: 'Oct. 2025 - Aujourd’hui',
    current: true,
    description:
      'Développement d’un écosystème complet pour le contrôle technique automobile : API métier, applications web & mobile et pipeline de déploiement.',
    bullets: [
      'Backend NestJS + PostgreSQL et front React / Ionic (web & mobile).',
      'Mise en place et maintien d’un pipeline CI/CD GitLab.',
      'Conteneurisation Docker et qualité logicielle.',
    ],
    stack: ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'Docker', 'GitLab CI/CD'],
  },
  {
    role: 'Stagiaire Sécurité de l’Information',
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
    degree: 'Expert en Technologie de l’Information & Ingénierie Logicielle',
    school: 'EPITECH Strasbourg',
    location: 'Strasbourg',
    period: '2023 - 2028',
    description: 'Cursus d’ingénierie logicielle par projets (Bac+5), spécialisation développement & sécurité.',
  },
  {
    degree: 'Baccalauréat Général',
    school: 'Institution Sainte-Clotilde',
    location: 'Strasbourg',
    period: '2021 - 2023',
    description: 'Baccalauréat général, spécialités scientifiques.',
  },
]

/* ---- Projets ---------------------------------------------------------------
 * tag    : 'build' | 'break' | 'secure' : la couleur d'identité de la carte.
 * visual : l'illustration animée de la carte (voir components/Projects.tsx).
 * links  : laisse une chaîne vide si le lien n'existe pas.                   */
export type Project = {
  title: string
  kicker: string
  description: string
  tags: string[]
  tag: 'build' | 'break' | 'secure'
  status: 'open-source' | 'wip' | 'pro' | 'soon'
  visual: 'terminal' | 'timeline' | 'dashboard' | 'flow' | 'devices' | 'shield' | 'orb'
  links: { demo: string; code: string; more?: string }
}

export const projects: Project[] = [
  {
    title: 'Portcullis.',
    kicker: 'Open source · Python',
    description:
      'Auditeur de sécurité pour infrastructures auto-hébergées. Il analyse vos fichiers docker-compose, détermine ce que chaque service expose vraiment (interne, LAN ou Internet), applique 12 règles anti-erreurs et rend un rapport noté de A à F. 100 % local.',
    tags: ['Python', 'Docker Compose', 'Traefik · Caddy · nginx', 'GitHub Action', 'Trivy'],
    tag: 'break',
    status: 'open-source',
    visual: 'terminal',
    links: { demo: '', code: 'https://github.com/yakohhhh/portcullis' },
  },
  {
    title: 'Latent.',
    kicker: 'Open source · Rust · En développement',
    description:
      'Outil DFIR qui reconstruit les journaux qu’un attaquant a effacés. Il extrait les enregistrements depuis l’espace non alloué, la mémoire ou des fichiers corrompus, et produit une timeline où chaque événement porte un niveau de confiance.',
    tags: ['Rust', 'DFIR', 'EVTX', 'MITRE T1070', 'Timeline'],
    tag: 'secure',
    status: 'wip',
    visual: 'timeline',
    links: { demo: '', code: 'https://github.com/yakohhhh/Latent-DFIR' },
  },
  {
    title: 'Investigation avec SOF-ELK.',
    kicker: 'Athéo Ingénierie · Forensique',
    description:
      'Mise en place et exploitation de SOF-ELK, la plateforme d’analyse forensique de SANS bâtie sur la stack Elastic : ingestion de journaux et de flux NetFlow, puis investigation à travers des tableaux de bord Kibana.',
    tags: ['SOF-ELK', 'Elasticsearch', 'Logstash', 'Kibana', 'NetFlow'],
    tag: 'secure',
    status: 'pro',
    visual: 'dashboard',
    links: { demo: '', code: '', more: 'https://github.com/philhagen/sof-elk' },
  },
  {
    title: 'Playbooks SOAR.',
    kicker: 'Automatisation SOC · Cortex XSOAR',
    description:
      '17 playbooks Cortex XSOAR versionnés en YAML : triage de phishing, blocage d’IP, réponse malware, MFA fatigue, voyage impossible… Chacun est documenté et validé contre le schéma officiel.',
    tags: ['Cortex XSOAR', 'SOAR', 'YAML', 'Python', 'Incident Response'],
    tag: 'secure',
    status: 'open-source',
    visual: 'flow',
    links: { demo: '', code: 'https://github.com/yakohhhh/playbook-soar' },
  },
  {
    title: 'Écosystème Contrôle Technique.',
    kicker: 'Secta · ACT Autosur France',
    description:
      'Plateforme complète, API, web et mobile, pour la gestion du contrôle technique automobile. Du schéma de base de données au pipeline de déploiement.',
    tags: ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'Docker'],
    tag: 'build',
    status: 'pro',
    visual: 'devices',
    links: { demo: '', code: '' },
  },
  {
    title: 'Sécurisation d’infrastructure.',
    kicker: 'Conseil de l’Europe',
    description:
      'Analyse de vulnérabilités, durcissement et conformité dans un environnement international à fort enjeu.',
    tags: ['Vulnerability Analysis', 'Risk Management', 'Compliance'],
    tag: 'break',
    status: 'pro',
    visual: 'shield',
    links: { demo: '', code: '' },
  },
  {
    title: 'Prochaine release.',
    kicker: 'Bientôt · Démo publique',
    description:
      'Un nouveau projet arrive très bientôt, et vous pourrez le tester directement depuis ce portfolio.',
    tags: ['Release publique', 'Démo testable'],
    tag: 'build',
    status: 'soon',
    visual: 'orb',
    links: {
      demo: '', // TODO : lien de la démo / release à tester
      code: '', // TODO : lien du dépôt GitHub
    },
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
    tone: 'break' as const,
    url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-PJVTY4QWSQ.png',
  },
  {
    name: 'SOC Level 1',
    issuer: 'TryHackMe',
    date: 'Janv. 2024',
    id: 'THM-TJJAF9UBT6',
    badge: 'SOC',
    tone: 'build' as const,
    url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-TJJAF9UBT6.png',
  },
]

/* ---- Navigation ------------------------------------------------------------ */
export const navLinks = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
