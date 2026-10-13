import { siteConfig } from '@/config/site'
import type { SectionId } from '@/config/site'

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export interface ContactMethod {
  key: 'email' | 'discord' | 'roblox'
  label: string
  value: string
  href?: string
  /** Text copied to the clipboard when there is no link. */
  copy?: string
}

export function getContactMethods(): ContactMethod[] {
  const { email, discord, roblox } = siteConfig.contact
  const methods: ContactMethod[] = []

  if (discord?.handle) {
    methods.push({
      key: 'discord',
      label: 'Discord',
      value: discord.handle,
      href: discord.url,
      copy: discord.url ? undefined : discord.handle,
    })
  }
  if (email) {
    methods.push({
      key: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    })
  }
  if (roblox) {
    methods.push({
      key: 'roblox',
      label: 'Roblox',
      value: roblox.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: roblox,
    })
  }
  return methods
}

export function getPrimaryContactHref(): string | undefined {
  const { email, discord, roblox } = siteConfig.contact
  if (email) return `mailto:${email}`
  if (discord?.url) return discord.url
  return roblox || undefined
}

const contentChecks: Record<SectionId, () => boolean> = {
  hero: () => true,
  ticker: () => siteConfig.ticker.items.length > 0,
  projects: () => siteConfig.projects.items.length > 0,
  about: () =>
    siteConfig.about.paragraphs.length > 0 ||
    siteConfig.about.services.length > 0,
  experience: () =>
    siteConfig.experience.skills.length > 0 ||
    siteConfig.experience.experience.length > 0,
  contact: () => getContactMethods().length > 0,
}

/** A section renders only when it is enabled AND has something to show. */
export function isSectionVisible(id: SectionId): boolean {
  const toggle = siteConfig.sections.find((section) => section.id === id)
  return Boolean(toggle?.enabled) && contentChecks[id]()
}

/** Returns null when an in-page link points at a hidden section. */
export function resolveHref(href: string): string | null {
  if (!href.startsWith('#')) return href
  const id = href.slice(1) as SectionId
  const isKnownSection = siteConfig.sections.some((section) => section.id === id)
  return isKnownSection && !isSectionVisible(id) ? null : href
}

export const isExternal = (href: string) => /^https?:\/\//.test(href)
