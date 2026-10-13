import { siteConfig } from '@/config/site'
import { Eyebrow, sectionHeadingClass } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'

export function About() {
  const { about, identity } = siteConfig

  return (
    <section
      id="about"
      className="section-y scroll-mt-[var(--nav-height)] border-t border-border"
    >
      <div className="container-x flex flex-col items-start gap-16 text-left">
        <Reveal className="flex w-full max-w-2xl flex-col items-start">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className={`mt-5 ${sectionHeadingClass}`}>
            <RichText text={about.heading} />
          </h2>
          <div className="mt-8 space-y-4">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[36rem] text-[17px] leading-[1.7] text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10 flex w-full items-center justify-start gap-4 border-t border-border pt-6">
            {identity.avatar && (
              <img
                src={identity.avatar}
                alt={identity.name}
                width={56}
                height={56}
                loading="lazy"
                className="size-14 rounded-lg object-cover"
              />
            )}
            <div className="text-left">
              <p className="font-semibold tracking-tight">{identity.name}</p>
              <p className="text-sm text-text-secondary">{identity.title}</p>
            </div>
          </div>
        </Reveal>

        {about.services.length > 0 && (
          <div
            id="services"
            className="w-full max-w-3xl scroll-mt-[calc(var(--nav-height)+16px)]"
          >
            <Reveal>
              <p className="eyebrow border-b border-border pb-4 text-left">
                {about.servicesLabel}
              </p>
            </Reveal>
            <ol>
              {about.services.map((service, index) => (
                <li key={service.title}>
                  <Reveal>
                    <div className="flex flex-col items-start gap-2 border-b border-border py-8">
                      <span className="font-mono text-sm text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl leading-snug tracking-tight">
                        {service.title}
                      </h3>
                      <p className="max-w-xl text-[15px] leading-[1.65] text-text-secondary">
                        {service.description}
                      </p>
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
