export interface SiteConfig {
  name: string;
  username: string;
  description: string;
  avatar: string;
  background?: string;
}

export interface AboutConfig {
  title: string;
  badges: string[];
  description: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export interface SocialEntry {
  enabled: boolean;
  name: string;
  url: string;
  username?: string;
  description?: string;
}

export interface SocialsConfig {
  [key: string]: SocialEntry;
}

export interface HeroButton {
  label: string;
  socialKey: string;
}

export interface HeroConfig {
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
}

export interface MinecraftConfig {
  enabled: boolean;
  serverName: string;
  address: string;
  port: number;
  description?: string;
}

export interface LinkEntry {
  title: string;
  description: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface AppearanceConfig {
  theme: "dark" | "light";
  accentColor: string;
  accentColorHex: string;
  showBackground: boolean;
  animations: boolean;
}

export interface FooterConfig {
  text: string;
  showCredit?: boolean;
}

export interface Config {
  site: SiteConfig;
  about: AboutConfig;
  seo: SeoConfig;
  socials: SocialsConfig;
  hero: HeroConfig;
  minecraft: MinecraftConfig;
  links: LinkEntry[];
  appearance: AppearanceConfig;
  footer: FooterConfig;
}
