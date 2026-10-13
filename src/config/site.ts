import type { Project, SiteConfig } from './types.ts'

export type * from './types.ts'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS
 *  Add a project by appending ONE object to this array. Every field except
 *  `name` and `description` is optional, and empty fields are hidden.
 *
 *  Put screenshots in /public/projects and reference them as
 *  "/projects/your-image.jpg" (16:10 works best, 1600x1000 recommended).
 *
 *  The entries below are EXAMPLE PLACEHOLDERS. Replace or delete them.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    name: 'Project Mazovia South',
    description:
      'First bigger project I worked on.',
    image: './projects/mazovia-hero.png',
    status: 'WIP',
    technologies: ['Roblox Studio', 'Roblox Map', 'Vechicles Imports'],
    responsibilities: ['Build map, do vechicles imports.'],
    robloxUrl: 'https://www.roblox.com/games/112919346551211/Project-Mazovia-South',
    // showcaseUrl: 'https://www.youtube.com/watch?v=...',
    featured: true,
  },
  {
    name: 'Project: Czech Republic',
    description:
      'My first serious project.',
    status: 'WIP',
    technologies: ['All'],
  },
]

export const siteConfig: SiteConfig = {
  // ── Identity ───────────────────────────────────────────────────────────────
  identity: {
    name: 'r4dzioo', // EDIT ME
    alias: 'radzio00', // EDIT ME: shown in the logo and footer
    title: 'Roblox Game Developer',
    // logoText: 'yourname',
    logoImage: './logo.svg',
    avatar: './avatar.jpg',
  },

  // ── SEO / social sharing ───────────────────────────────────────────────────
  seo: {
    title: 'radzio00 | Roblox Game Developer',
    description:
      'Roblox game developer building engaging experiences through thoughtful gameplay systems, clean Luau code and performance-focused engineering.',
    keywords: [
      'Roblox developer',
      'Roblox Map',
      'Roblox Studio',
      'game developer',
    ],
    // siteUrl: 'https://yourname.dev',
    // ogImage: '/og.png',
    favicon: './favicon.svg',
    locale: 'en_US',
    // twitterHandle: '@yourname',
  },

  // ── Design tokens (injected as CSS variables at build time) ────────────────
  theme: {
    background: '#131212',
    surface: '#131212',
    surfaceHover: '#1b1b1b',
    border: '#2E2E2E',
    textPrimary: '#F2F2F2',
    textSecondary: '#B3B3B3',
    accent: '#FFFFFF',
    accentForeground: '#131212',
    containerWidth: 1200,
    pagePadding: 32,
    sectionSpacing: 120,
    cardRadius: 12,
  },

  // ── Animation preferences ──────────────────────────────────────────────────
  animations: {
    enabled: true,
    revealOnScroll: true,
    tickerDuration: 48,
    preloader: { enabled: true, label: 'Loading portfolio', duration: 0.9 },
    scrollProgress: true,
    grain: false,
  },

  // ── Section order and visibility ───────────────────────────────────────────
  // Reorder the array to reorder the page. Set `enabled: false` to remove a
  // section; nav links and CTAs that point at it disappear automatically.
  sections: [
    { id: 'hero', enabled: true },
    { id: 'ticker', enabled: true },
    { id: 'projects', enabled: true },
    { id: 'about', enabled: true },
    { id: 'experience', enabled: true },
    { id: 'contact', enabled: true },
  ],

  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: {
    enabled: true,
    links: [
      { label: 'About', section: 'about' },
      { label: 'Projects', section: 'projects' },
      { label: 'Services', section: 'about', anchor: 'services' },
      { label: 'Contact', section: 'contact' },
    ],
    cta: { label: "Let's Talk", section: 'contact' },
  },

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Roblox Game Developer',
    // *accent* and _muted_ markers are supported.
    headline: 'I build games. Not just *mechanics.*',
    description:
      'Building engaging Roblox experiences through thoughtful gameplay systems, clean Luau code and performance-focused engineering.',
    primaryCta: { label: 'Explore Projects', href: '#projects' },
    secondaryCta: { label: 'Get in Touch', href: '#contact' },
    availability: {
      enabled: true,
      label: 'Available for new projects',
    },
    workspace: {
      enabled: true,
      title: 'GAME SYSTEMS',
      tag: 'Roblox Studio',
      // image: '/projects/example-one.jpg', // defaults to the first project image
      imageAlt: 'Game preview',
      systems: [
        {
          name: 'Map',
          detail: 'Some buildings on map.',
          status: 'Workspace',
          icon: 'backpack',
        },
        {
          name: 'UI',
          detail: 'New UI.',
          status: 'StarterGUI',
          icon: 'swords',
        },
        {
          name: 'Dealership System',
          detail: 'Cars · Systems',
          status: 'Server',
          icon: 'database',
        },
      ],
    },
  },

  // ── Expertise ticker ───────────────────────────────────────────────────────
  ticker: {
    items: [
      'Gameplay Systems',
      'Roblox Studio',
      'UI Engineering',
      'Optimization',
    ],
  },

  // ── Projects ───────────────────────────────────────────────────────────────
  projects: {
    eyebrow: 'Selected Work',
    heading: "Projects _I've worked on._",
    intro:
      'A curated selection of games and systems, presented as case studies rather than a list of thumbnails.',
    items: projects,
  },

  // ── About + services ───────────────────────────────────────────────────────
  about: {
    eyebrow: 'About',
    heading: 'What I bring _to a project._',
    // EDIT ME: replace with your own introduction.
    paragraphs: [
      'I am a Roblox developer focused on the parts of a game players actually feel: responsive systems, readable code and interfaces that behave.',
      'I work in Luau and Roblox Studio, from the first prototype through to polish, and I care about how a game performs as much as how it plays.',
    ],
    servicesLabel: 'Services',
    services: [
      {
        title: 'Roblox Game Development',
        description:
          'End-to-end development of experiences, from the core loop to a shippable build.',
      },
      {
        title: 'Gameplay & Systems Programming',
        description:
          'Combat, inventories, progression and data persistence built to be extended.',
      },
      {
        title: 'UI Implementation',
        description:
          'Responsive in-game interfaces that work across desktop, console and mobile.',
      },
      {
        title: 'Bug Fixing & Optimization',
        description:
          'Tracking down issues and improving script and memory performance in existing games.',
      },
      {
        title: 'Feature Development',
        description:
          'Adding well-scoped features to a live game without destabilizing what already works.',
      },
    ],
  },

  // ── Experience / technical expertise ───────────────────────────────────────
  // The whole section is hidden when both `skills` and `experience` are empty.
  // `experience` stays empty until you add real entries; example below.
  experience: {
    eyebrow: 'Technical Expertise',
    heading: 'Tools _I work with._',
    skillsLabel: 'Specializations',
    timelineLabel: 'Experience',
    skills: [
      {
        label: 'Workspace',
        items: ['Map', 'Roblox Studio', 'Models'],
      },
      {
        label: 'Systems',
        items: ['Dealership System', 'Sprawdzanie Biletów Job', 'Some other things'],
      },
      {
        label: 'Interface',
        items: ['UI layout', 'Responsive scaling', 'Input handling'],
      },
      {
        label: 'Quality',
        items: ['Profiling', 'Memory use', 'Debugging'],
      },
    ],
    experience: [
      // {
      //   role: 'Gameplay Programmer',
      //   organization: 'Studio or group name',
      //   period: '2024 – Present',
      //   description: 'One or two sentences about what you did.',
      //   highlights: ['Optional bullet', 'Another optional bullet'],
      // },
    ],
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  // A method is only shown when it is configured. Remove a line to hide it.
  contact: {
    eyebrow: 'Have a project in mind?',
    heading: "Let's build something *great.*",
    description:
      'Tell me about the game, the team and where you are stuck. I will reply with how I would approach it.',
    ctaLabel: 'Start a conversation',
    // EDIT ME: messages from the form are delivered to this address.
    email: 'kontakt@r4dzioo.pl',
    form: {
      enabled: true,
      title: 'Send a message',
      emailSubject: 'New message from your portfolio',
      labels: { name: 'Your name', email: 'Your email', message: 'Project details' },
      placeholders: {
        name: 'Jane Doe',
        email: 'jane@studio.com',
        message: 'Tell me about the game, the team and what you need.',
      },
      submitLabel: 'Send message',
      sendingLabel: 'Sending',
      successTitle: 'Message sent.',
      successMessage: 'Thanks for reaching out. I will get back to you by email soon.',
      resetLabel: 'Send another message',
      errorMessage: 'Something went wrong. Please try again or email me directly.',
    },
    discord: { handle: 'r4dzioo' }, // EDIT ME. Add `url` to make it a link.
    roblox: 'https://www.roblox.com/users/2011811404/profile', // EDIT ME: your profile URL
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    enabled: true,
    tagline: 'Built with care',
    socials: [
      // { label: 'YouTube', url: 'https://www.youtube.com/@yourname' },
      // { label: 'X', url: 'https://x.com/yourname' },
    ],
  },
}
