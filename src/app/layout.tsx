import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Onest, Tektur } from "next/font/google";
import { common, site } from "@/content/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-onest",
});

// Accent tech font for highlighted words in headings
const tektur = Tektur({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
  variable: "--font-tektur",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "магазин смартфонів",
    "купити смартфон",
    "аксесуари для телефону",
    "смартфон у розстрочку",
    "Mobile Zona",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#f1f0ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" className={`${onest.variable} ${tektur.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body id="top">
        <a href="#main" className="skip-link">
          {common.skipLink}
        </a>
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
