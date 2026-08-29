import type { FooterConfig, SiteConfig } from "@/types/config";

interface FooterProps {
  footer: FooterConfig;
  site: SiteConfig;
}

export default function Footer({ footer, site }: FooterProps) {
  return (
    <footer
      className="text-center px-4 py-8 mt-4"
      style={{
        borderTop: "1px solid rgba(var(--accent-rgb), 0.06)",
      }}
      role="contentinfo"
    >
      <p
        className="text-xs font-mono"
        style={{ color: "var(--text-muted)" }}
      >
        {footer.text}
      </p>
      {footer.showCredit && (
        <p
          className="text-xs mt-1"
          style={{ color: "var(--text-muted)", opacity: 0.5 }}
        >
          Built with Next.js &amp; Tailwind CSS
        </p>
      )}
    </footer>
  );
}
