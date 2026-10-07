/* =============================================================================
 *  CONTENU DU PORTFOLIO (FR + EN)
 *  ---------------------------------------------------------------------------
 *  - `site`        : infos communes aux deux langues (liens, email, photos…)
 *  - `fr` / `en`   : tous les textes, dans la même structure.
 *  Pour modifier un texte, change-le dans `fr` ET dans `en`.
 *  TypeScript t'avertit si une clé manque dans la version anglaise.
 * ========================================================================== */

export type Lang = 'fr' | 'en'

export const site = {
  name: 'Ayman Mazroui',
  firstName: 'Ayman',
  initials: 'AM',
  email: 'aymanmazroui@proton.me',
  url: 'https://aymanmazroui.dev',
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

/* ---- Compétences techniques (identiques dans les deux langues) ------------ */
export const devStack = ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'TypeScript', 'JavaScript', 'Python', 'Lua', 'Docker', 'CI/CD']
export const cyberStack = ['Nmap', 'Burp Suite', 'Gobuster', 'Nikto', 'SQLMap', 'Wireshark', 'Tcpdump', 'Zeek', 'OWASP Top 10', 'MITRE ATT&CK']

/* ---- Types ----------------------------------------------------------------- */
/* tag    : 'build' | 'break' | 'secure' : la couleur d'identité de la carte.
 * visual : l'illustration animée de la carte (voir components/ProjectVisuals.tsx).
 * links  : laisse une chaîne vide si le lien n'existe pas.                      */
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

type IntroLine = { text: string; tone?: 'build' | 'break' }

const projectLinks = {
  portcullis: { demo: '', code: 'https://github.com/yakohhhh/portcullis' },
  latent: { demo: '', code: 'https://github.com/yakohhhh/Latent-DFIR' },
  sofelk: { demo: '', code: '', more: 'https://github.com/philhagen/sof-elk' },
  soar: { demo: '', code: 'https://github.com/yakohhhh/playbook-soar' },
  none: { demo: '', code: '' },
  // TODO : lien de la démo / du dépôt de ta prochaine release
  next: { demo: '', code: '' },
}

const certificationsBase = [
  {
    name: 'Junior Penetration Tester',
    issuer: 'TryHackMe',
    id: 'THM-PJVTY4QWSQ',
    badge: 'PT',
    tone: 'break' as const,
    url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-PJVTY4QWSQ.png',
  },
  {
    name: 'SOC Level 1',
    issuer: 'TryHackMe',
    id: 'THM-TJJAF9UBT6',
    badge: 'SOC',
    tone: 'build' as const,
    url: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-TJJAF9UBT6.png',
  },
]

/* =============================================================================
 *  FRANÇAIS
 * ========================================================================== */
const fr = {
  meta: {
    title: 'Ayman Mazroui · Développeur DevSecOps & Cybersécurité',
    description:
      "Portfolio d'Ayman Mazroui, développeur DevSecOps et étudiant en cybersécurité à EPITECH Strasbourg. NestJS, React, pentest, CTF & sécurité offensive.",
  },

  profile: {
    ...site,
    headline: 'Développeur DevSecOps.',
    subheadline: 'Étudiant en cybersécurité à EPITECH Strasbourg.',
    tagline:
      'Je construis des applications full-stack robustes, et je passe l’autre moitié de mon temps à essayer de les casser.',
    location: 'Strasbourg, France',
    school: 'EPITECH Strasbourg',
    availability: 'Ouvert aux opportunités : alternance & stage',
    bio: [
      'Étudiant en 4ᵉ année à EPITECH Strasbourg, je suis développeur full-stack le jour et passionné de cybersécurité à toute heure. J’aime concevoir des produits solides, du backend NestJS aux interfaces React / Ionic, sans jamais perdre de vue la sécurité.',
      'Mon passage au Conseil de l’Europe, au sein de l’équipe Sécurité de l’Information, m’a appris à penser comme un attaquant pour mieux défendre : analyse de vulnérabilités, gestion des risques et conformité. Entre deux projets, je m’entraîne sur des challenges CTF et des labs de pentest.',
    ],
  },

  brand: {
    signature: ['Build.', 'Break.', 'Secure.'],
    motto: 'Je construis des applications solides, puis j’essaie de les casser.',
  },

  /* Intro « keynote » : tone 'build' = bleu, 'break' = rouge + glitch. */
  introLines: [
    { text: 'Bonjour.' },
    { text: 'Moi, c’est Ayman.' },
    { text: 'Je construis.', tone: 'build' },
    { text: 'Je casse.', tone: 'break' },
  ] as IntroLine[],

  /* Manifeste : [crochets] = BUILD, *astérisques* = BREAK, {accolades} = SECURE */
  manifesto:
    'Je [conçois des produits] full-stack, du backend NestJS aux interfaces React. Mais un bon produit ne suffit pas : il doit *tenir face à un attaquant.* Alors j’apprends à penser comme lui, {pour mieux défendre.}',

  stats: [
    { value: 2, suffix: '+', label: "ans d'expérience", hint: 'Dev & sécurité' },
    { value: 3, suffix: '', label: 'projets open source', hint: 'Portcullis · Latent · SOAR' },
    { value: 4, suffix: '', label: 'langues parlées', hint: 'FR · AR · EN · DE' },
    { value: 2028, suffix: '', label: 'diplôme EPITECH', hint: 'Expert en IT' },
  ],

  languages: [
    { name: 'Français', level: 'Natif', percent: 100 },
    { name: 'Arabe', level: 'Natif', percent: 100 },
    { name: 'Anglais', level: 'Courant', percent: 85 },
    { name: 'Allemand', level: 'Intermédiaire', percent: 55 },
  ],

  softSkills: ['Architecture logicielle', 'Qualité logicielle', 'Sécurité informatique', 'Résolution de problèmes'],

  interests: ['Cybersécurité', 'Challenges CTF', 'Intelligence Artificielle', 'Musculation'],

  experiences: [
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
      bullets: [] as string[],
      stack: [] as string[],
    },
  ],

  education: [
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
  ],

  projects: [
    {
      title: 'Portcullis.',
      kicker: 'Open source · Python',
      description:
        'Auditeur de sécurité pour infrastructures auto-hébergées. Il analyse vos fichiers docker-compose, détermine ce que chaque service expose vraiment (interne, LAN ou Internet), applique 12 règles anti-erreurs et rend un rapport noté de A à F. 100 % local.',
      tags: ['Python', 'Docker Compose', 'Traefik · Caddy · nginx', 'GitHub Action', 'Trivy'],
      tag: 'break',
      status: 'open-source',
      visual: 'terminal',
      links: projectLinks.portcullis,
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
      links: projectLinks.latent,
    },
    {
      title: 'Investigation avec SOF-ELK.',
      kicker: 'Athéo Ingénierie · Forensique',
      description:
        'Mise en place et exploitation de SOF-ELK, la plateforme d’analyse forensique de SANS bâtie sur la stack Elastic : ingestion de journaux et de flux NetFlow, puis investigation à travers des tableaux de bord Kibana.',
      tags: ['SOF-ELK', 'Elasticsearch', 'Logstash', 'Kibana', 'NetFlow'],
      tag: 'secure',
      status: 'pro',
      visual: 'dashboard',
      links: projectLinks.sofelk,
    },
    {
      title: 'Playbooks SOAR.',
      kicker: 'Automatisation SOC · Cortex XSOAR',
      description:
        '17 playbooks Cortex XSOAR versionnés en YAML : triage de phishing, blocage d’IP, réponse malware, MFA fatigue, voyage impossible… Chacun est documenté et validé contre le schéma officiel.',
      tags: ['Cortex XSOAR', 'SOAR', 'YAML', 'Python', 'Incident Response'],
      tag: 'secure',
      status: 'open-source',
      visual: 'flow',
      links: projectLinks.soar,
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
      links: projectLinks.none,
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
      links: projectLinks.none,
    },
    {
      title: 'Prochaine release.',
      kicker: 'Bientôt · Démo publique',
      description: 'Un nouveau projet arrive très bientôt, et vous pourrez le tester directement depuis ce portfolio.',
      tags: ['Release publique', 'Démo testable'],
      tag: 'build',
      status: 'soon',
      visual: 'orb',
      links: projectLinks.next,
    },
  ] as Project[],

  certifications: certificationsBase.map((c) => ({ ...c, date: 'Janv. 2024' })),

  navLinks: [
    { id: 'a-propos', label: 'À propos' },
    { id: 'projets', label: 'Projets' },
    { id: 'competences', label: 'Compétences' },
    { id: 'parcours', label: 'Parcours' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ],

  /* Textes d'interface */
  ui: {
    intro: { skip: 'Passer' },
    nav: {
      cv: 'Télécharger le CV',
      home: 'Retour en haut de page',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      language: 'Langue',
    },
    hero: {
      aria: 'Présentation',
      label: 'Build · Break · Secure',
      labelYear: ' · Portfolio 2026',
      contact: 'Me contacter',
      cv: 'Télécharger le CV',
      photoAlt: 'Ayman Mazroui, micro en main, sur scène devant un écran géant',
      line1: ['Je ', 'construis', ' des applications solides.'],
      line2: ['Puis j’essaie de les ', 'casser.'],
    },
    manifesto: { aria: 'Manifeste', label: 'Ma philosophie' },
    about: {
      eyebrow: 'À propos',
      title: ['Un développeur qui pense comme un ', 'attaquant.'],
      portraitAlt: "Portrait d'Ayman Mazroui",
      schoolYear: 'EPITECH, 4ᵉ année',
      languages: 'Langues',
      interests: 'Centres d’intérêt',
      available: 'Disponible.',
      availableText: 'Alternance & stage, dès maintenant.',
      availableCta: 'Discutons-en',
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Ce que je construis',
      subtitle: 'Outils open source, missions en entreprise et une place réservée pour ma prochaine release.',
      demo: 'Tester la démo',
      code: 'Voir le code',
      more: 'En savoir plus',
      status: {
        'open-source': 'Open source',
        wip: 'En développement',
        pro: 'Projet professionnel',
        soon: 'Démo en préparation',
      },
      moreTitle: 'Plus de code sur GitHub.',
      moreText: 'Expérimentations, outils et projets EPITECH.',
      moreCta: 'Voir mon profil',
      visuals: {
        latentSource: 'disk.E01 · espace non alloué',
        latentCount: '1 284 enregistrements',
        latentRows: [
          'Ouverture de session RDP',
          'powershell.exe -enc JABz…',
          'Service installé : svc_upd',
          'Compte créé : backup$',
          'Journal d’audit effacé',
        ],
        soar: [
          'Alerte : email suspect',
          'Extraction des IOC (URL, IP, hash)',
          'Enrichissement réputation',
          'Verdict : malveillant ?',
          'Oui : bloquer l’IP, purger l’email',
          'Non : clôture faux positif',
          'Notification & escalade',
        ],
        soon: 'Bientôt disponible',
      },
    },
    skills: {
      eyebrow: 'Compétences',
      title: ['Deux disciplines.', 'Un même niveau d’exigence.'],
      buildWord: 'Construire.',
      buildTitle: 'Développement full-stack',
      buildText:
        'Des API NestJS aux interfaces React et Ionic : des applications fiables, testées et déployées en continu.',
      breakWord: 'Casser.',
      breakTitle: 'Cybersécurité offensive & défensive',
      breakText:
        'Tests d’intrusion, analyse réseau et réponse à incidents : trouver la faille avant qu’un autre ne la trouve.',
      softTitle: 'Savoir-faire',
    },
    experience: {
      eyebrow: 'Parcours',
      title: ['De l’atelier', 'au Conseil de l’Europe.'],
      subtitle:
        'Quatre expériences, une même ligne directrice : construire des choses utiles, et les rendre sûres.',
      experience: 'Expérience',
      education: 'Formation',
      current: 'En cours',
    },
    certifications: {
      eyebrow: 'Certifications',
      title: ['Validé.', ' Pas seulement appris.'],
      subtitle: 'Des parcours pratiques sur TryHackMe, côté offensif comme défensif.',
      profile: 'Voir mon profil TryHackMe',
    },
    contact: {
      eyebrow: 'Contact',
      title: ['Parlons de votre', 'prochain projet.'],
      subtitle: 'Alternance, stage ou collaboration : écrivez-moi, je réponds rapidement.',
      copy: 'Copier',
      copied: 'Copié',
      copyAria: "Copier l'adresse email",
      formTitle: 'Ou laissez-moi un message.',
      formText: 'Votre messagerie s’ouvrira avec le message pré-rempli.',
      name: 'Nom',
      email: 'Email',
      message: 'Bonjour Ayman,',
      send: 'Envoyer le message',
      subject: 'Contact portfolio',
      newMessage: 'Nouveau message',
    },
    footer: {
      madeIn: 'Conçu et développé à Strasbourg',
      top: 'Revenir en haut',
      linksAria: 'Liens de pied de page',
    },
  },
}

export type Content = typeof fr

/* =============================================================================
 *  ENGLISH
 * ========================================================================== */
const en: Content = {
  meta: {
    title: 'Ayman Mazroui · DevSecOps Developer & Cybersecurity',
    description:
      'Portfolio of Ayman Mazroui, DevSecOps developer and cybersecurity student at EPITECH Strasbourg. NestJS, React, pentesting, CTF & offensive security.',
  },

  profile: {
    ...site,
    headline: 'DevSecOps Developer.',
    subheadline: 'Cybersecurity student at EPITECH Strasbourg.',
    tagline: 'I build robust full-stack applications, and I spend the other half of my time trying to break them.',
    location: 'Strasbourg, France',
    school: 'EPITECH Strasbourg',
    availability: 'Open to opportunities: apprenticeship & internship',
    bio: [
      'A 4th-year student at EPITECH Strasbourg, I’m a full-stack developer by day and a cybersecurity enthusiast around the clock. I love building solid products, from NestJS backends to React / Ionic interfaces, without ever losing sight of security.',
      'My time at the Council of Europe, within the Information Security team, taught me to think like an attacker in order to defend better: vulnerability analysis, risk management and compliance. Between projects, I train on CTF challenges and pentest labs.',
    ],
  },

  brand: {
    signature: ['Build.', 'Break.', 'Secure.'],
    motto: 'I build solid applications, then I try to break them.',
  },

  introLines: [
    { text: 'Hello.' },
    { text: 'I’m Ayman.' },
    { text: 'I build.', tone: 'build' },
    { text: 'I break.', tone: 'break' },
  ],

  manifesto:
    'I [design products] end to end, from NestJS backends to React interfaces. But a good product isn’t enough: it has to *hold up against an attacker.* So I learn to think like one, {to defend better.}',

  stats: [
    { value: 2, suffix: '+', label: 'years of experience', hint: 'Dev & security' },
    { value: 3, suffix: '', label: 'open source projects', hint: 'Portcullis · Latent · SOAR' },
    { value: 4, suffix: '', label: 'languages spoken', hint: 'FR · AR · EN · DE' },
    { value: 2028, suffix: '', label: 'EPITECH degree', hint: 'IT Expert (MSc level)' },
  ],

  languages: [
    { name: 'French', level: 'Native', percent: 100 },
    { name: 'Arabic', level: 'Native', percent: 100 },
    { name: 'English', level: 'Fluent', percent: 85 },
    { name: 'German', level: 'Intermediate', percent: 55 },
  ],

  softSkills: ['Software architecture', 'Software quality', 'Information security', 'Problem solving'],

  interests: ['Cybersecurity', 'CTF challenges', 'Artificial Intelligence', 'Weight training'],

  experiences: [
    {
      role: 'Cybersecurity Intern: automation & incident response',
      type: 'Internship',
      org: 'Athéo Ingénierie',
      location: 'Strasbourg',
      period: '2025 - Present',
      current: true,
      description:
        'Blue Team / SOC mission: automating detection and incident response to make them faster and more reliable.',
      bullets: [
        'Designing automation playbooks (SOAR) and security API integrations.',
        'Incident response: triage, investigation and remediation.',
        'Threat modeling with MITRE ATT&CK.',
      ],
      stack: ['SOAR', 'Python', 'SIEM', 'Incident Response', 'MITRE ATT&CK', 'API'],
    },
    {
      role: 'Full Stack Developer',
      type: 'Part-time',
      org: 'Secta - ACT Autosur France',
      location: 'Strasbourg',
      period: 'Oct. 2025 - Present',
      current: true,
      description:
        'Building a complete ecosystem for vehicle roadworthiness testing: business API, web & mobile apps and deployment pipeline.',
      bullets: [
        'NestJS + PostgreSQL backend and React / Ionic frontend (web & mobile).',
        'Setting up and maintaining a GitLab CI/CD pipeline.',
        'Docker containerization and software quality.',
      ],
      stack: ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'Docker', 'GitLab CI/CD'],
    },
    {
      role: 'Information Security Intern',
      type: 'Internship',
      org: 'Council of Europe',
      location: 'Strasbourg',
      period: 'Aug. - Dec. 2024',
      current: false,
      description:
        'Worked alongside cybersecurity and IT risk management experts within an international organisation.',
      bullets: [
        'Vulnerability analysis and study of security protocols.',
        'Data protection and regulatory compliance.',
        'Contributed to infrastructure hardening projects.',
      ],
      stack: ['Vulnerability Analysis', 'Risk Management', 'Compliance', 'Infrastructure'],
    },
    {
      role: 'Vehicle Inspection Intern',
      type: 'Internship',
      org: 'ACT Autosur',
      location: 'Strasbourg',
      period: '2023 - 2024',
      current: false,
      description:
        'First hands-on experience in vehicle roadworthiness testing, which led to my current collaboration with Secta.',
      bullets: [],
      stack: [],
    },
  ],

  education: [
    {
      degree: 'IT Expert & Software Engineering (MSc level)',
      school: 'EPITECH Strasbourg',
      location: 'Strasbourg',
      period: '2023 - 2028',
      description: 'Project-based software engineering program (5 years), focused on development & security.',
    },
    {
      degree: 'French Baccalauréat (high school diploma)',
      school: 'Institution Sainte-Clotilde',
      location: 'Strasbourg',
      period: '2021 - 2023',
      description: 'General baccalauréat, science track.',
    },
  ],

  projects: [
    {
      title: 'Portcullis.',
      kicker: 'Open source · Python',
      description:
        'Security auditor for self-hosted infrastructures. It analyses your docker-compose files, works out what each service really exposes (internal, LAN or Internet), runs 12 foot-gun checks and produces a report graded A to F. 100% local.',
      tags: ['Python', 'Docker Compose', 'Traefik · Caddy · nginx', 'GitHub Action', 'Trivy'],
      tag: 'break',
      status: 'open-source',
      visual: 'terminal',
      links: projectLinks.portcullis,
    },
    {
      title: 'Latent.',
      kicker: 'Open source · Rust · In development',
      description:
        'DFIR tool that rebuilds the event logs an attacker wiped. It carves records out of unallocated space, memory or corrupted files, and produces a timeline where every event carries a confidence level.',
      tags: ['Rust', 'DFIR', 'EVTX', 'MITRE T1070', 'Timeline'],
      tag: 'secure',
      status: 'wip',
      visual: 'timeline',
      links: projectLinks.latent,
    },
    {
      title: 'Investigating with SOF-ELK.',
      kicker: 'Athéo Ingénierie · Forensics',
      description:
        'Deployed and used SOF-ELK, the SANS forensic analysis platform built on the Elastic stack: ingesting logs and NetFlow data, then investigating through Kibana dashboards.',
      tags: ['SOF-ELK', 'Elasticsearch', 'Logstash', 'Kibana', 'NetFlow'],
      tag: 'secure',
      status: 'pro',
      visual: 'dashboard',
      links: projectLinks.sofelk,
    },
    {
      title: 'SOAR Playbooks.',
      kicker: 'SOC automation · Cortex XSOAR',
      description:
        '17 Cortex XSOAR playbooks versioned as YAML: phishing triage, IP blocking, malware response, MFA fatigue, impossible travel… Each one is documented and validated against the official schema.',
      tags: ['Cortex XSOAR', 'SOAR', 'YAML', 'Python', 'Incident Response'],
      tag: 'secure',
      status: 'open-source',
      visual: 'flow',
      links: projectLinks.soar,
    },
    {
      title: 'Vehicle Inspection Platform.',
      kicker: 'Secta · ACT Autosur France',
      description:
        'A complete platform, API, web and mobile, to manage vehicle roadworthiness testing. From the database schema to the deployment pipeline.',
      tags: ['NestJS', 'React', 'Ionic', 'PostgreSQL', 'Docker'],
      tag: 'build',
      status: 'pro',
      visual: 'devices',
      links: projectLinks.none,
    },
    {
      title: 'Infrastructure hardening.',
      kicker: 'Council of Europe',
      description: 'Vulnerability analysis, hardening and compliance in a high-stakes international environment.',
      tags: ['Vulnerability Analysis', 'Risk Management', 'Compliance'],
      tag: 'break',
      status: 'pro',
      visual: 'shield',
      links: projectLinks.none,
    },
    {
      title: 'Next release.',
      kicker: 'Coming soon · Public demo',
      description: 'A new project is on its way, and you’ll be able to try it right here from this portfolio.',
      tags: ['Public release', 'Live demo'],
      tag: 'build',
      status: 'soon',
      visual: 'orb',
      links: projectLinks.next,
    },
  ],

  certifications: certificationsBase.map((c) => ({ ...c, date: 'Jan. 2024' })),

  navLinks: [
    { id: 'a-propos', label: 'About' },
    { id: 'projets', label: 'Projects' },
    { id: 'competences', label: 'Skills' },
    { id: 'parcours', label: 'Journey' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ],

  ui: {
    intro: { skip: 'Skip' },
    nav: {
      cv: 'Download CV',
      home: 'Back to top',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Language',
    },
    hero: {
      aria: 'Introduction',
      label: 'Build · Break · Secure',
      labelYear: ' · Portfolio 2026',
      contact: 'Get in touch',
      cv: 'Download CV (FR)',
      photoAlt: 'Ayman Mazroui on stage, holding a microphone in front of a giant screen',
      line1: ['I ', 'build', ' solid applications.'],
      line2: ['Then I try to ', 'break them.'],
    },
    manifesto: { aria: 'Manifesto', label: 'My philosophy' },
    about: {
      eyebrow: 'About',
      title: ['A developer who thinks like an ', 'attacker.'],
      portraitAlt: 'Portrait of Ayman Mazroui',
      schoolYear: 'EPITECH, 4th year',
      languages: 'Languages',
      interests: 'Interests',
      available: 'Available.',
      availableText: 'Apprenticeship & internship, starting now.',
      availableCta: 'Let’s talk',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'What I build',
      subtitle: 'Open source tools, real-world missions and a spot saved for my next release.',
      demo: 'Try the demo',
      code: 'View code',
      more: 'Learn more',
      status: {
        'open-source': 'Open source',
        wip: 'In development',
        pro: 'Professional project',
        soon: 'Demo in the works',
      },
      moreTitle: 'More code on GitHub.',
      moreText: 'Experiments, tools and EPITECH projects.',
      moreCta: 'See my profile',
      visuals: {
        latentSource: 'disk.E01 · unallocated space',
        latentCount: '1,284 records',
        latentRows: [
          'RDP logon',
          'powershell.exe -enc JABz…',
          'Service installed: svc_upd',
          'Account created: backup$',
          'Audit log cleared',
        ],
        soar: [
          'Alert: suspicious email',
          'Extract IOCs (URL, IP, hash)',
          'Reputation enrichment',
          'Verdict: malicious?',
          'Yes: block IP, purge email',
          'No: close as false positive',
          'Notify & escalate',
        ],
        soon: 'Coming soon',
      },
    },
    skills: {
      eyebrow: 'Skills',
      title: ['Two disciplines.', 'One standard.'],
      buildWord: 'Build.',
      buildTitle: 'Full-stack development',
      buildText: 'From NestJS APIs to React and Ionic interfaces: reliable apps, tested and continuously deployed.',
      breakWord: 'Break.',
      breakTitle: 'Offensive & defensive security',
      breakText: 'Penetration testing, network analysis and incident response: finding the flaw before someone else does.',
      softTitle: 'Know-how',
    },
    experience: {
      eyebrow: 'Journey',
      title: ['From the workshop', 'to the Council of Europe.'],
      subtitle: 'Four experiences, one common thread: building useful things, and making them secure.',
      experience: 'Experience',
      education: 'Education',
      current: 'Current',
    },
    certifications: {
      eyebrow: 'Certifications',
      title: ['Proven.', ' Not just learned.'],
      subtitle: 'Hands-on TryHackMe paths, on both the offensive and defensive side.',
      profile: 'See my TryHackMe profile',
    },
    contact: {
      eyebrow: 'Contact',
      title: ['Let’s talk about your', 'next project.'],
      subtitle: 'Apprenticeship, internship or collaboration: drop me a line, I reply quickly.',
      copy: 'Copy',
      copied: 'Copied',
      copyAria: 'Copy email address',
      formTitle: 'Or leave me a message.',
      formText: 'Your mail app will open with the message pre-filled.',
      name: 'Name',
      email: 'Email',
      message: 'Hi Ayman,',
      send: 'Send message',
      subject: 'Portfolio contact',
      newMessage: 'New message',
    },
    footer: {
      madeIn: 'Designed and built in Strasbourg',
      top: 'Back to top',
      linksAria: 'Footer links',
    },
  },
}

export const content: Record<Lang, Content> = { fr, en }
