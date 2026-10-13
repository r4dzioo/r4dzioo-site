import { siteConfig } from '@/config/site'
import { getContactMethods, isExternal } from '@/lib/site'

export function Footer() {
  const { footer, identity } = siteConfig
  const links = [
    ...getContactMethods()
      .filter((method) => method.href)
      .map((method) => ({ label: method.label, url: method.href as string })),
    ...footer.socials,
  ]

  return (
    <footer className="border-t border-border">
      <div className="container-x flex flex-col items-start gap-5 py-10 text-left">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()}{' '}
          <span className="text-text-primary">{identity.name}</span>
        </p>

        {links.length > 0 && (
          <ul className="flex flex-wrap justify-start gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={`${link.label}-${link.url}`}>
                <a
                  href={link.url}
                  {...(isExternal(link.url)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="flex items-center gap-2 font-mono text-[12px] text-text-secondary">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {footer.tagline}
        </p>
      </div>
    </footer>
  )
}
