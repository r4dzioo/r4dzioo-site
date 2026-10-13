import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { isSectionVisible } from '@/lib/site'

function Logo() {
  const { identity } = siteConfig
  const text = identity.logoText ?? identity.alias

  return (
    <a
      href="#top"
      className="inline-flex items-center gap-2.5 rounded-md text-[17px] font-bold tracking-tight"
      aria-label={`${identity.name}, back to top`}
    >
      {identity.logoImage ? (
        <img
          src={identity.logoImage}
          alt=""
          width={28}
          height={28}
          className="size-7 rounded-md object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-md bg-accent font-mono text-sm font-bold text-accent-foreground"
        >
          {text.charAt(0).toUpperCase()}
        </span>
      )}
      {text}
    </a>
  )
}

export function Navbar() {
  const { nav } = siteConfig
  const [open, setOpen] = useState(false)

  const links = nav.links.filter((link) => isSectionVisible(link.section))
  const showCta = isSectionVisible(nav.cta.section)
  const hasMenu = links.length > 0 || showCta

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const media = window.matchMedia('(min-width: 768px)')
    const onChange = () => media.matches && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-x relative flex h-[var(--nav-height)] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />

        {links.length > 0 && (
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.anchor ?? link.section}`}
                    className="link-underline text-[15px] text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {showCta && (
          <div className="hidden justify-self-end md:block">
            <Button href={`#${nav.cta.section}`} size="sm">
              {nav.cta.label}
            </Button>
          </div>
        )}

        {hasMenu && (
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-border text-text-primary transition-colors hover:bg-surface-hover md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        )}
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
        >
          <div className="container-x pb-6 pt-2">
            <ul>
              {links.map((link) => (
                <li key={link.label} className="border-b border-border">
                  <a
                    href={`#${link.anchor ?? link.section}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-lg font-medium tracking-tight"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {showCta && (
              <div className="mt-5" onClick={() => setOpen(false)}>
                <Button
                  href={`#${nav.cta.section}`}
                  className="w-full"
                  size="md"
                >
                  {nav.cta.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
