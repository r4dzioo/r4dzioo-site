import rawConfig from "../config.json";
import type { Config } from "../types/config";

function validateConfig(config: unknown): Config {
  if (!config || typeof config !== "object") {
    throw new Error("[config.json] Root must be an object.");
  }

  const c = config as Record<string, unknown>;

  // site
  if (!c.site || typeof c.site !== "object") {
    throw new Error('[config.json] Missing required section: "site"');
  }
  const site = c.site as Record<string, unknown>;
  if (typeof site.name !== "string" || !site.name.trim()) {
    throw new Error('[config.json] site.name must be a non-empty string');
  }

  // seo
  if (!c.seo || typeof c.seo !== "object") {
    throw new Error('[config.json] Missing required section: "seo"');
  }
  const seo = c.seo as Record<string, unknown>;
  if (typeof seo.title !== "string" || !seo.title.trim()) {
    throw new Error('[config.json] seo.title must be a non-empty string');
  }

  // socials
  if (!c.socials || typeof c.socials !== "object") {
    throw new Error('[config.json] Missing required section: "socials"');
  }
  const socials = c.socials as Record<string, unknown>;
  for (const [key, val] of Object.entries(socials)) {
    if (!val || typeof val !== "object") {
      throw new Error(`[config.json] socials.${key} must be an object`);
    }
    const s = val as Record<string, unknown>;
    if (typeof s.enabled !== "boolean") {
      throw new Error(`[config.json] socials.${key}.enabled must be a boolean`);
    }
    if (s.enabled && (typeof s.url !== "string" || !s.url.trim())) {
      throw new Error(`[config.json] socials.${key}.url must be set when enabled`);
    }
  }

  // links
  if (!Array.isArray(c.links)) {
    throw new Error('[config.json] "links" must be an array');
  }

  // minecraft
  if (c.minecraft && typeof c.minecraft === "object") {
    const mc = c.minecraft as Record<string, unknown>;
    if (mc.enabled && typeof mc.address !== "string") {
      throw new Error('[config.json] minecraft.address must be a string when enabled');
    }
  }

  // appearance
  if (!c.appearance || typeof c.appearance !== "object") {
    throw new Error('[config.json] Missing required section: "appearance"');
  }
  const appearance = c.appearance as Record<string, unknown>;
  if (typeof appearance.accentColor !== "string") {
    throw new Error('[config.json] appearance.accentColor must be a string');
  }

  return config as Config;
}

let _config: Config | null = null;

export function getConfig(): Config {
  if (!_config) {
    _config = validateConfig(rawConfig);
  }
  return _config;
}

export function getEnabledSocials(config: Config) {
  return Object.entries(config.socials)
    .filter(([, val]) => val.enabled)
    .map(([key, val]) => ({ key, ...val }));
}

export function getEnabledLinks(config: Config) {
  return config.links.filter((l) => l.enabled);
}
