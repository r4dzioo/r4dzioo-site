import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn, isExternal } from '@/lib/site'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  className?: string
}

const variants = {
  primary:
    'bg-accent text-accent-foreground hover:bg-text-primary/85 active:scale-[0.97]',
  outline:
    'border border-border text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-background active:scale-[0.97]',
}

const sizes = {
  sm: 'h-9 gap-2 px-4 text-sm',
  md: 'h-12 gap-2.5 px-6 text-[15px]',
  lg: 'h-14 gap-3 px-8 text-base',
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
}: ButtonProps) {
  const external = isExternal(href)
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold [text-shadow:none] tracking-tight transition-[background-color,border-color,filter] duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
        />
      )}
    </a>
  )
}
