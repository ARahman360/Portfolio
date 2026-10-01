import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { links, profile } from "@/data/portfolio";
import "./globals.css";

/* Fonts are self-hosted by next/font (no layout shift, no external requests) */
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

const siteDescription =
  "Portfolio of Md Abdur Rahman, an Industrial Information Technology student at LAB University of Applied Sciences interested in automation, software development, networking and modern digital technologies.";

const siteTitle = "Md Abdur Rahman | Industrial Information Technology";

export const metadata: Metadata = {
  metadataBase: new URL(links.siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Md Abdur Rahman",
  },
  description: siteDescription,
  keywords: [
    "Md Abdur Rahman",
    "Industrial Information Technology",
    "LAB University of Applied Sciences",
    "portfolio",
    "industrial automation",
    "PLC",
    "software development",
    "networking",
    "cybersecurity",
    "Finland",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: links.siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04070e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-night text-ink">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
