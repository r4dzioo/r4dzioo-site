import { ArrowUpRight, Check, Copy, Gamepad2, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import { ContactForm } from '@/components/ContactForm'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import {
  getContactMethods,
  getPrimaryContactHref,
  isExternal,
  type ContactMethod,
} from '@/lib/site'

const icons = {
  email: Mail,
  discord: MessageCircle,
  roblox: Gamepad2,
}

const rowClass =
  'group flex w-full items-center gap-4 border-b border-border py-5 text-left transition-colors hover:bg-surface-hover/60 sm:px-2'

function MethodRow({ method }: { method: ContactMethod }) {
  const [copied, setCopied] = useState(false)
  const Icon = icons[method.key]

  const content = (
    <>
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-lg border border-border text-text-secondary"
      >
        <Icon className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow block">{method.label}</span>
        <span className="mt-0.5 block truncate text-lg font-medium tracking-tight">
          {method.value}
        </span>
      </span>
    </>
  )

  if (method.href) {
    const external = isExternal(method.href)
    return (
      <a
        href={method.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={rowClass}
      >
        {content}
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-text-secondary transition-colors group-hover:text-accent"
        />
      </a>
    )
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(method.copy ?? method.value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={rowClass}
      aria-label={`Copy ${method.label} handle ${method.value}`}
    >
      {content}
      <span
        aria-live="polite"
        className="flex shrink-0 items-center gap-2 text-sm text-text-secondary transition-colors group-hover:text-accent"
      >
        {copied ? (
          <>
            Copied <Check aria-hidden className="size-4" />
          </>
        ) : (
          <>
            Copy <Copy aria-hidden className="size-4" />
          </>
        )}
      </span>
    </button>
  )
}

export function Contact() {
  const { contact } = siteConfig
  const methods = getContactMethods()
  const primaryHref = getPrimaryContactHref()
  const hasForm = contact.form.enabled && Boolean(contact.email)

  return (
    <section
      id="contact"
      className="section-y scroll-mt-[var(--nav-height)] border-t border-border"
    >
      <div className="container-x flex flex-col items-start gap-12 text-left">
        <Reveal className="flex w-full max-w-2xl flex-col items-start">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.5rem,1.4rem+4vw,4.25rem)] leading-[1]">
            <RichText text={contact.heading} />
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-text-secondary">
            {contact.description}
          </p>
          {!hasForm && primaryHref && (
            <div className="mt-9">
              <Button href={primaryHref} size="lg" arrow>
                {contact.ctaLabel}
              </Button>
            </div>
          )}
        </Reveal>

        {hasForm && (
          <Reveal delay={0.1} className="w-full max-w-2xl">
            <ContactForm />
          </Reveal>
        )}

        <Reveal delay={0.15} className="w-full max-w-2xl border-t border-border">
          {methods.map((method) => (
            <MethodRow key={method.key} method={method} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
