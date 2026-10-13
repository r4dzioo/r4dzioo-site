import { siteConfig } from '@/config/site'
import { Eyebrow, sectionHeadingClass } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'

export function Experience() {
  const { experience } = siteConfig

  return (
    <section
      id="experience"
      className="section-y scroll-mt-[var(--nav-height)] border-t border-border"
    >
      <div className="container-x text-left">
        <Reveal className="flex flex-col items-start">
          <Eyebrow>{experience.eyebrow}</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${sectionHeadingClass}`}>
            <RichText text={experience.heading} />
          </h2>
        </Reveal>

        {experience.skills.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <p className="eyebrow border-b border-border pb-4 text-left">
                {experience.skillsLabel}
              </p>
            </Reveal>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
              {experience.skills.map((group) => (
                <Reveal
                  key={group.label}
                  className="border-b border-border px-4 py-7"
                >
                  <dt className="font-semibold tracking-tight">{group.label}</dt>
                  <dd className="mt-4 flex flex-wrap justify-start gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[12px] text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        )}

        {experience.experience.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <p className="eyebrow border-b border-border pb-4 text-left">
                {experience.timelineLabel}
              </p>
            </Reveal>
            <ol>
              {experience.experience.map((entry) => (
                <li key={`${entry.role}-${entry.period}`}>
                  <Reveal>
                    <div className="flex max-w-3xl flex-col items-start gap-3 border-b border-border py-8">
                      <p className="font-mono text-sm text-text-secondary">
                        {entry.period}
                      </p>
                      <div>
                        <h3 className="text-xl leading-snug tracking-tight">
                          {entry.role}
                          {entry.organization && (
                            <span className="text-text-secondary">
                              {' '}
                              · {entry.organization}
                            </span>
                          )}
                        </h3>
                        {entry.description && (
                          <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-text-secondary">
                            {entry.description}
                          </p>
                        )}
                        {entry.highlights && entry.highlights.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {entry.highlights.map((highlight) => (
                              <li
                                key={highlight}
                                className="text-sm leading-relaxed text-text-primary/85"
                              >
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  )
}
