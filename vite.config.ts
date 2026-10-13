import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { siteConfig } from './src/config/site.ts'

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const absolute = (value: string | undefined, siteUrl: string | undefined) => {
  if (!value) return undefined
  if (/^https?:\/\//.test(value)) return value
  return siteUrl ? `${siteUrl.replace(/\/$/, '')}${value}` : value
}

function buildHead() {
  const { seo, theme } = siteConfig
  const ogImage = absolute(seo.ogImage, seo.siteUrl)
  const canonical = seo.siteUrl
  const faviconType = seo.favicon.endsWith('.svg')
    ? 'image/svg+xml'
    : seo.favicon.endsWith('.png')
      ? 'image/png'
      : 'image/x-icon'

  const meta = (attr: 'name' | 'property', key: string, content?: string) =>
    content ? `<meta ${attr}="${key}" content="${escapeAttr(content)}" />` : ''

  return [
    `<title>${escapeAttr(seo.title)}</title>`,
    meta('name', 'description', seo.description),
    meta('name', 'keywords', seo.keywords.join(', ')),
    meta('name', 'author', siteConfig.identity.name),
    meta('name', 'theme-color', theme.background),
    canonical ? `<link rel="canonical" href="${escapeAttr(canonical)}" />` : '',
    `<link rel="icon" type="${faviconType}" href="${escapeAttr(seo.favicon)}" />`,
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', seo.title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:locale', seo.locale),
    meta('property', 'og:url', canonical),
    meta('property', 'og:image', ogImage),
    meta('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary'),
    meta('name', 'twitter:title', seo.title),
    meta('name', 'twitter:description', seo.description),
    meta('name', 'twitter:image', ogImage),
    meta('name', 'twitter:site', seo.twitterHandle),
    `<style>:root{--background:${theme.background};--surface:${theme.surface};--surface-hover:${theme.surfaceHover};--border:${theme.border};--text-primary:${theme.textPrimary};--text-secondary:${theme.textSecondary};--accent:${theme.accent};--accent-foreground:${theme.accentForeground};--container-width:${theme.containerWidth}px;--page-padding-base:${theme.pagePadding}px;--section-spacing-base:${theme.sectionSpacing}px;--card-radius:${theme.cardRadius}px}</style>`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

function siteHeadPlugin(): Plugin {
  return {
    name: 'site-head',
    transformIndexHtml(html) {
      return html.replace('<!--site-head-->', buildHead())
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteHeadPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { host: '0.0.0.0', port: 3000, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 3000, allowedHosts: true },
})
