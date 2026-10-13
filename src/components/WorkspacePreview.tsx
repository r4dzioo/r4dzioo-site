import {
  Backpack,
  Cpu,
  Database,
  Gauge,
  Layers,
  Swords,
  type LucideIcon,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import type { SystemIcon } from '@/config/site'
import { Media } from '@/components/ui/Media'

const icons: Record<SystemIcon, LucideIcon> = {
  swords: Swords,
  backpack: Backpack,
  database: Database,
  layers: Layers,
  cpu: Cpu,
  gauge: Gauge,
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute size-3.5 border-text-primary/35 ${className}`}
    />
  )
}

export function WorkspacePreview() {
  const { workspace } = siteConfig.hero
  const image =
    workspace.image ??
    siteConfig.projects.items.find((project) => project.image)?.image

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-[0_32px_80px_-32px_rgba(0,0,0,0.9)]">
      <div className="flex h-11 items-center justify-between border-b border-border px-4">
        <p className="eyebrow flex items-center gap-2.5 !text-text-primary/80">
          <span aria-hidden className="size-1.5 bg-accent" />
          {workspace.title}
        </p>
        <span className="font-mono text-[11px] tracking-wide text-text-secondary">
          {workspace.tag}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
        <Media
          src={image}
          alt={workspace.imageAlt ?? 'Game preview'}
          eager
        />
        <Corner className="left-3 top-3 border-l border-t" />
        <Corner className="right-3 top-3 border-r border-t" />
        <Corner className="bottom-3 left-3 border-b border-l" />
        <Corner className="bottom-3 right-3 border-b border-r" />
        <span className="absolute left-5 top-5 rounded border border-border bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary backdrop-blur-sm">
          Viewport
        </span>
      </div>

      <ul>
        {workspace.systems.map((system) => {
          const Icon = icons[system.icon]
          return (
            <li
              key={system.name}
              className="flex items-center gap-4 border-t border-border px-4 py-3.5 first:border-t-0"
            >
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-text-secondary"
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold tracking-tight">
                  {system.name}
                </p>
                <p className="truncate font-mono text-[11px] text-text-secondary">
                  {system.detail}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[11px] text-text-secondary">
                <span aria-hidden className="size-1 rounded-full bg-accent" />
                {system.status}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
