import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import { site, services } from "@/config/site";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  keywords: ["software sob medida", "SaaS", "inteligência artificial", "automações", "bots", "WhatsApp", "aplicativos", "dashboards", "APIs", "consultoria"],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
    images: [site.ogImage],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name, description: s.desc },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
