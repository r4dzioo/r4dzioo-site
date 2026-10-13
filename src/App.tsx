import { MotionConfig } from 'motion/react'
import { useCallback, useState, type ComponentType } from 'react'
import { siteConfig } from '@/config/site'
import type { SectionId } from '@/config/site'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Preloader } from '@/components/Preloader'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ReadyContext } from '@/lib/ready'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Ticker } from '@/components/Ticker'
import { isSectionVisible } from '@/lib/site'

const sectionComponents: Record<SectionId, ComponentType> = {
  hero: Hero,
  ticker: Ticker,
  projects: Projects,
  about: About,
  experience: Experience,
  contact: Contact,
}

export default function App() {
  const { animations } = siteConfig
  const showPreloader = animations.enabled && animations.preloader.enabled
  const [ready, setReady] = useState(!showPreloader)
  const onPreloaderDone = useCallback(() => setReady(true), [])
  const visibleSections = siteConfig.sections.filter((section) =>
    isSectionVisible(section.id),
  )

  return (
    <MotionConfig reducedMotion="user">
      <ReadyContext.Provider value={ready}>
        {showPreloader && <Preloader onDone={onPreloaderDone} />}
        {animations.enabled && animations.scrollProgress && <ScrollProgress />}
          {animations.grain && <div aria-hidden className="grain" />}
      <div id="top">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-foreground"
        >
          Skip to content
        </a>
        {siteConfig.nav.enabled && <Navbar />}
        <main id="main">
          {visibleSections.map(({ id }) => {
            const Section = sectionComponents[id]
            return <Section key={id} />
          })}
        </main>
        {siteConfig.footer.enabled && <Footer />}
      </div>
      </ReadyContext.Provider>
    </MotionConfig>
  )
}
