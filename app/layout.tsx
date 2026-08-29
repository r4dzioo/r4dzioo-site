import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getConfig } from "@/lib/config";

const config = getConfig();
const { seo, site, appearance } = config;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: seo.url ? new URL(seo.url) : undefined,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: site.name,
    images: seo.image
      ? [
          {
            url: seo.image,
            width: 1200,
            height: 630,
            alt: seo.title,
          },
        ]
      : [],
    type: "website",
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: seo.image ? [seo.image] : [],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: appearance.accentColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --accent: ${appearance.accentColor};
                --accent-rgb: ${appearance.accentColorHex};
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
