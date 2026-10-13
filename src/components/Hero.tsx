import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { AnimatedHeadline } from '@/components/ui/AnimatedHeadline'
import { Reveal } from '@/components/ui/Reveal'
import { WorkspacePreview } from '@/components/WorkspacePreview'
import { resolveHref } from '@/lib/site'

export function Hero() {
  const { hero } = siteConfig
  const primaryHref = resolveHref(hero.primaryCta.href)
  const secondaryHref = resolveHref(hero.secondaryCta.href)
  const showPreview = hero.workspace.enabled

  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_0%,#000_20%,transparent_78%)]"
      />
      <div className="container-x relative flex flex-col items-start gap-16 pb-20 pt-16 text-left sm:pt-20 lg:gap-20 lg:pb-28 lg:pt-28">
        <div className="flex max-w-4xl flex-col items-start">
          <Reveal>
            <p className="eyebrow flex items-center justify-start gap-2.5 text-text-primary/80">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {hero.eyebrow}
            </p>
          </Reveal>

          <h1 className="mt-7 text-[clamp(2.75rem,1.6rem+4.2vw,5rem)] leading-[0.98] tracking-[-0.045em]">
            <AnimatedHeadline text={hero.headline} delay={0.1} />
          </h1>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[36rem] text-[17px] leading-[1.65] text-text-secondary">
              {hero.description}
            </p>
          </Reveal>

          {(primaryHref || secondaryHref) && (
            <Reveal
              delay={0.18}
              className="mt-10 flex flex-wrap items-center justify-start gap-3"
            >
              {primaryHref && (
                <Button href={primaryHref} arrow>
                  {hero.primaryCta.label}
                </Button>
              )}
              {secondaryHref && (
                <Button href={secondaryHref} variant="outline">
                  {hero.secondaryCta.label}
                </Button>
              )}
            </Reveal>
          )}

          {hero.availability.enabled && (
            <Reveal delay={0.24}>
              <p className="mt-9 flex items-center justify-start gap-2.5 text-sm text-text-secondary">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-accent"
                />
                {hero.availability.label}
              </p>
            </Reveal>
          )}
        </div>

        {showPreview && (
          <Reveal delay={0.15} className="w-full max-w-3xl">
            <WorkspacePreview />
          </Reveal>
        )}
      </div>
    </section>
  )
}
