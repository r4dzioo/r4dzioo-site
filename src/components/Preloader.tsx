import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'

const ease = [0.76, 0, 0.24, 1] as const

export function Preloader({ onDone }: { onDone: () => void }) {
  const { preloader } = siteConfig.animations
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)
  const name = siteConfig.identity.alias

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'

    let timeout: number
    const controls = animate(0, 100, {
      duration: reduced ? 0.3 : preloader.duration,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (value) => setCount(Math.round(value)),
      onComplete: () => {
        timeout = window.setTimeout(() => {
          root.style.overflow = ''
          setVisible(false)
          onDone()
        }, 60)
      },
    })

    return () => {
      controls.stop()
      window.clearTimeout(timeout)
      root.style.overflow = ''
    }
  }, [preloader.duration, reduced, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label={preloader.label}
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-background px-[var(--page-padding)] py-8 text-text-primary"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-start justify-between">
            <span className="eyebrow text-text-primary">{name}</span>
            <span className="eyebrow">{preloader.label}</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <motion.p
              className="font-mono text-[clamp(5.5rem,22vw,16rem)] font-semibold leading-[0.8] tracking-[-0.06em] tabular-nums"
              exit={{ y: '-30%', opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              {String(count).padStart(3, '0')}
            </motion.p>
            <p className="eyebrow hidden pb-2 sm:block">
              {siteConfig.identity.title}
            </p>
          </div>

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[3px] bg-border"
          >
            <div
              className="h-full origin-left bg-accent"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
