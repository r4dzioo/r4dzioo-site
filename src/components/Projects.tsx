import { siteConfig } from '@/config/site'
import { Eyebrow, sectionHeadingClass } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { ProjectCard } from '@/components/ProjectCard'

export function Projects() {
  const { projects } = siteConfig

  return (
    <section id="projects" className="section-y scroll-mt-[var(--nav-height)]">
      <div className="container-x">
        <Reveal className="flex max-w-3xl flex-col items-start text-left">
          <Eyebrow>{projects.eyebrow}</Eyebrow>
          <h2 className={`mt-5 ${sectionHeadingClass}`}>
            <RichText text={projects.heading} />
          </h2>
          {projects.intro && (
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-text-secondary">
              {projects.intro}
            </p>
          )}
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {projects.items.map((project, index) => (
            <li
              key={project.name}
              className={project.featured ? 'md:col-span-2' : undefined}
            >
              <Reveal delay={(index % 2) * 0.06} className="h-full">
                <ProjectCard project={project} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
