import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/config/site'
import { Media } from '@/components/ui/Media'
import { cn } from '@/lib/site'

interface ProjectCardProps {
  project: Project
  index: number
}

const linkClass =
  'inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-text-primary transition-colors hover:text-accent'

export function ProjectCard({ project, index }: ProjectCardProps) {
  const featured = Boolean(project.featured)
  const hasLinks = Boolean(project.robloxUrl || project.showcaseUrl)

  return (
    <article
      className={cn(
        'group grid h-full overflow-hidden rounded-card border border-border bg-surface transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-text-secondary/60 hover:bg-surface-hover hover:shadow-[0_24px_60px_-30px_rgba(255,255,255,0.18)] motion-reduce:transform-none',
        featured && 'lg:grid-cols-[1.25fr_1fr]',
      )}
    >
      <div
        className={cn(
          'relative aspect-[16/10] overflow-hidden border-b border-border bg-background',
          featured && 'lg:border-b-0 lg:border-r',
        )}
      >
        <Media
          src={project.image}
          alt={project.imageAlt ?? `${project.name} screenshot`}
          index={index}
          zoomOnHover
        />
        {project.status && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-border bg-background/85 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-primary backdrop-blur-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {project.status}
          </span>
        )}
      </div>

      <div
        className={cn(
          'flex flex-col items-center p-6 text-center sm:p-7',
          featured && 'lg:justify-center lg:p-10',
        )}
      >
        <h3
          className={cn(
            'text-2xl leading-tight tracking-tight',
            featured && 'lg:text-3xl',
          )}
        >
          {project.name}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-text-secondary">
          {project.description}
        </p>

        {project.responsibilities && project.responsibilities.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.responsibilities.map((item) => (
              <li
                key={item}
                className="text-sm leading-relaxed text-text-primary/85"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <ul
            className="mt-6 flex flex-wrap justify-center gap-2"
            aria-label={`${project.name} technologies`}
          >
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-text-secondary"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {hasLinks && (
          <div className="mt-6 flex w-full flex-wrap justify-center gap-x-6 gap-y-2 border-t border-border pt-5">
            {project.robloxUrl && (
              <a
                href={project.robloxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Play on Roblox
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            )}
            {project.showcaseUrl && (
              <a
                href={project.showcaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Watch showcase
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
