export type SectionId =
  | 'hero'
  | 'ticker'
  | 'projects'
  | 'about'
  | 'experience'
  | 'contact'

export interface SectionToggle {
  id: SectionId
  enabled: boolean
}

export interface ThemeConfig {
  background: string
  surface: string
  surfaceHover: string
  border: string
  textPrimary: string
  textSecondary: string
  accent: string
  /** Text colour used on top of accent-filled buttons. */
  accentForeground: string
  /** All sizes in px. */
  containerWidth: number
  pagePadding: number
  sectionSpacing: number
  cardRadius: number
}

export interface SeoConfig {
  title: string
  description: string
  keywords: string[]
  /** Public URL of the deployed site, e.g. https://example.dev (no trailing slash). */
  siteUrl?: string
  /** Path inside /public or an absolute URL, 1200x630 recommended. */
  ogImage?: string
  /** Path inside /public or an absolute URL. */
  favicon: string
  locale: string
  twitterHandle?: string
}

export interface AnimationConfig {
  /** Master switch. When false, nothing animates. */
  enabled: boolean
  /** Fade/slide sections in as they enter the viewport. */
  revealOnScroll: boolean
  /** Seconds for one full loop of the expertise ticker. */
  tickerDuration: number
  /** Full-screen loading intro with a counter and a curtain reveal. */
  preloader: { enabled: boolean; label: string; duration: number }
  /** Thin progress bar fixed to the top of the page. */
  scrollProgress: boolean
  /** Subtle film grain over the whole page. */
  grain: boolean
}

export interface IdentityConfig {
  name: string
  alias: string
  title: string
  /** Text shown in the nav logo. Defaults to the alias. */
  logoText?: string
  /** Path inside /public. When omitted, a letter mark is drawn instead. */
  logoImage?: string
  /** Path inside /public. */
  avatar?: string
}

export interface NavLink {
  label: string
  section: SectionId
  /** Optional element id inside the section. Defaults to the section id. */
  anchor?: string
}

export interface NavConfig {
  enabled: boolean
  links: NavLink[]
  cta: { label: string; section: SectionId }
}

export interface CtaLink {
  label: string
  /** "#section-id" to scroll, or a full URL. */
  href: string
}

export interface AvailabilityConfig {
  enabled: boolean
  label: string
}

export type SystemIcon =
  | 'swords'
  | 'backpack'
  | 'database'
  | 'layers'
  | 'cpu'
  | 'gauge'

export interface WorkspaceSystem {
  name: string
  detail: string
  status: string
  icon: SystemIcon
}

export interface WorkspaceConfig {
  enabled: boolean
  title: string
  tag: string
  /** Optional image for the preview area. Falls back to the first project image. */
  image?: string
  imageAlt?: string
  systems: WorkspaceSystem[]
}

export interface HeroConfig {
  eyebrow: string
  /** Use *asterisks* for the accent colour and _underscores_ for muted text. */
  headline: string
  description: string
  primaryCta: CtaLink
  secondaryCta: CtaLink
  availability: AvailabilityConfig
  workspace: WorkspaceConfig
}

export interface TickerConfig {
  items: string[]
}

export interface Project {
  name: string
  description: string
  /** Path inside /public (e.g. /projects/my-game.jpg) or an absolute URL. */
  image?: string
  imageAlt?: string
  responsibilities?: string[]
  technologies?: string[]
  /** Short label shown on the image, e.g. "Live", "In development". */
  status?: string
  robloxUrl?: string
  showcaseUrl?: string
  featured?: boolean
}

export interface ProjectsSectionConfig {
  eyebrow: string
  heading: string
  intro: string
  items: Project[]
}

export interface Service {
  title: string
  description: string
}

export interface AboutSectionConfig {
  eyebrow: string
  heading: string
  paragraphs: string[]
  servicesLabel: string
  services: Service[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface ExperienceEntry {
  role: string
  organization?: string
  period: string
  description?: string
  highlights?: string[]
}

export interface ExperienceSectionConfig {
  eyebrow: string
  heading: string
  skillsLabel: string
  timelineLabel: string
  skills: SkillGroup[]
  experience: ExperienceEntry[]
}

export interface DiscordContact {
  handle: string
  /** Optional invite/profile URL. Without it, the handle is copied on click. */
  url?: string
}

export interface ContactFormConfig {
  enabled: boolean
  title: string
  /** Subject line of the email you receive. */
  emailSubject: string
  labels: { name: string; email: string; message: string }
  placeholders: { name: string; email: string; message: string }
  submitLabel: string
  sendingLabel: string
  successTitle: string
  successMessage: string
  resetLabel: string
  errorMessage: string
}

export interface ContactSectionConfig {
  eyebrow: string
  heading: string
  description: string
  ctaLabel: string
  /** The address that receives messages sent through the form. */
  email?: string
  form: ContactFormConfig
  discord?: DiscordContact
  roblox?: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface FooterConfig {
  enabled: boolean
  tagline: string
  /** Extra links shown in the footer in addition to your contact links. */
  socials: SocialLink[]
}

export interface SiteConfig {
  identity: IdentityConfig
  seo: SeoConfig
  theme: ThemeConfig
  animations: AnimationConfig
  /** Order of this array is the order on the page. */
  sections: SectionToggle[]
  nav: NavConfig
  hero: HeroConfig
  ticker: TickerConfig
  projects: ProjectsSectionConfig
  about: AboutSectionConfig
  experience: ExperienceSectionConfig
  contact: ContactSectionConfig
  footer: FooterConfig
}
