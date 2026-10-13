import type { CSSProperties } from 'react'
import { siteConfig } from '@/config/site'

export function Ticker() {
  const { items } = siteConfig.ticker
  const { enabled, tickerDuration } = siteConfig.animations

  return (
    <section
      id="ticker"
      aria-label="Areas of expertise"
      data-static={!enabled}
      className="ticker overflow-hidden border-y border-border [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      style={{ '--ticker-duration': `${tickerDuration}s` } as CSSProperties}
    >
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="ticker-copy flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="eyebrow whitespace-nowrap px-8 py-5 text-[12px] !text-text-secondary">
                  {item}
                </span>
                <span aria-hidden className="size-1 rounded-full bg-accent/80" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
