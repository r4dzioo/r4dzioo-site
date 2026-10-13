import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { siteConfig } from '@/config/site'
import { useReady } from '@/lib/ready'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { enabled, revealOnScroll } = siteConfig.animations
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const ready = useReady()

  if (!enabled || !revealOnScroll) {
    return <div className={className}>{children}</div>
  }

  const show = inView && ready

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={
        show
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 28, filter: 'blur(6px)' }
      }
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
