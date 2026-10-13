import { useState } from 'react'
import { cn } from '@/lib/site'

interface MediaProps {
  src?: string
  alt: string
  /** Zero-based position, used for the numeral on the fallback. */
  index?: number
  eager?: boolean
  zoomOnHover?: boolean
}

export function Media({ src, alt, index, eager, zoomOnHover }: MediaProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return <MediaFallback index={index} />

  return (
    <img
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={cn(
        'mono-media h-full w-full object-cover',
        zoomOnHover &&
          'group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none',
      )}
    />
  )
}

function MediaFallback({ index }: { index?: number }) {
  return (
    <div aria-hidden className="relative h-full w-full bg-surface">
      <div className="bg-grid absolute inset-0 [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_72%)]" />
      {index === undefined ? (
        <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border">
          <span className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-border" />
          <span className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-border" />
        </div>
      ) : (
        <span className="absolute bottom-4 left-5 font-mono text-6xl font-medium leading-none tracking-tighter text-text-primary/10">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
    </div>
  )
}
