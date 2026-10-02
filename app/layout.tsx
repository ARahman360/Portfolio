import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import DockNav from "@/components/DockNav";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { links, profile } from "@/data/portfolio";
import "./globals.css";

/* Fonts are self-hosted by next/font (no layout shift, no external requests).
   The Lightswind template is built entirely on Geist; JetBrains Mono is kept
   for the small technical labels (kickers, meta rows, tags). */
const geist = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const geistDisplay = Geist({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

/* Applies the saved theme before paint so there is no flash of the wrong theme.
   Default is light; the toggle stores "dark" | "light" in localStorage. */
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen bg-bg text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html:
              'setTimeout(function(){if(!document.querySelector(".reveal.is-visible"))document.documentElement.classList.add("reveal-all");},2500);',
          }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {children}
        <Footer />
        <DockNav />
      </body>
    </html>
  );
}
