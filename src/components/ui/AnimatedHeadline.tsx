import { motion } from 'motion/react'
import { siteConfig } from '@/config/site'
import { useReady } from '@/lib/ready'

interface AnimatedHeadlineProps {
  text: string
  delay?: number
}

/** Reveals a headline word by word. Supports *accent* and _muted_ markers. */
export function AnimatedHeadline({ text, delay = 0 }: AnimatedHeadlineProps) {
  const ready = useReady()
  const animated = siteConfig.animations.enabled
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g).filter(Boolean)
  let wordIndex = 0

  return (
    <>
      {parts.map((part, partIndex) => {
        const isAccent = part.length > 2 && part.startsWith('*') && part.endsWith('*')
        const isMuted = part.length > 2 && part.startsWith('_') && part.endsWith('_')
        const content = isAccent || isMuted ? part.slice(1, -1) : part
        const className = isAccent ? 'text-accent' : isMuted ? 'text-text-secondary' : undefined
        const words = content.split(/\s+/).filter(Boolean)
        const leading = /^\s/.test(content)

        return (
          <span key={partIndex} className={className}>
            {leading && ' '}
            {words.map((word, i) => {
              const order = wordIndex++
              return (
                <span key={`${word}-${i}`}>
                  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
                    <motion.span
                      className="inline-block"
                      initial={animated ? { y: '115%', rotate: 4 } : false}
                      animate={animated ? (ready ? { y: 0, rotate: 0 } : { y: '115%', rotate: 4 }) : undefined}
                      transition={{
                        duration: 0.9,
                        delay: delay + order * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>{' '}
                </span>
              )
            })}
          </span>
        )
      })}
    </>
  )
}
