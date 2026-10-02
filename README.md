# Md Abdur Rahman — Portfolio

A modern, template-inspired personal portfolio website for **Md Abdur Rahman**, Industrial Information Technology student at **LAB University of Applied Sciences**, Finland.

The design follows the [Lightswind portfolio01](https://lightswind.com/templates/portfolio01) look: a floating glass pill navigation, a giant gradient hero name, a tiltable glass profile card, opposing tech-marquee rows, a big-number stats band and a rounded glass footer — on a light theme with a **light/dark toggle** (light is the default, the choice is persisted in `localStorage`).

Sections: hero, skills marquee, stats, about, skills, areas of exploration, featured projects, education, experience and a contact section — plus scroll-reveal animations and a fully responsive mobile layout. A glowing custom cursor is enabled automatically on fine-pointer devices (and disabled for `prefers-reduced-motion`).

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- Self-hosted Google Fonts (Geist, JetBrains Mono) via `next/font`
- [@formspree/react](https://github.com/formspree/formspree-js/tree/master/packages/formspree-react) — contact form delivery via Formspree

## Getting started

```bash
# 1. Install dependencies
bun install        # or: npm install

# 2. Start the dev server
bun run dev        # or: npm run dev
# → http://localhost:3000
```

Other useful scripts:

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run typecheck` | TypeScript check |
| `bun run lint` | ESLint check |

## Project structure

```
app/
  layout.tsx        # Fonts, SEO metadata, navbar + footer
  page.tsx          # Composes all sections
  globals.css       # Design tokens (colors, fonts) and component classes
  icon.svg          # AR. favicon
components/
  Navbar.tsx        # Floating glass pill nav, scroll-spy, mobile menu
  DockNav.tsx       # Floating icon dock with hover tooltips (desktop)
  ThemeToggle.tsx   # Light/dark switch (persisted)
  Hero.tsx          # Hero section
  ProfileVisual.tsx # Tiltable lanyard ID badge (portrait / AR monogram)
  TechMarquee.tsx   # Opposing skill-pill marquee rows
  StatsBand.tsx     # Big-number stats (derived from the data files)
  CursorFollower.tsx# Glowing cursor dot (fine pointers only)
  About.tsx  Skills.tsx  Exploring.tsx
  Projects.tsx  ProjectCard.tsx
  Education.tsx
  Experience.tsx    # "Career Journey" timeline with glowing rail
  Contact.tsx
  Footer.tsx  SectionHeading.tsx  Reveal.tsx
  SocialLinks.tsx  BrandIcons.tsx
data/
  portfolio.ts      # ← ALL personal links and profile text
  projects.ts       # ← ALL project entries
  skills.ts         # Skill categories
public/
  projects/         # Put project images here
  Md_Abdur_Rahman_CV.pdf   # Put your CV here
  profile.jpg               # Optional portrait (hero)
```

---

## How to customize

### 1. Add your CV

Place your CV at exactly this path:

```
public/Md_Abdur_Rahman_CV.pdf
```

Every **Download CV** button already points to `/Md_Abdur_Rahman_CV.pdf`.
Until the file exists, clicking it will show a 404 — as soon as you add it, the buttons work.

### 2. Change GitHub / LinkedIn / email / site URL

All personal links live in **`data/portfolio.ts`**:

```ts
export const links = {
  github: "https://github.com/ARahman360",
  linkedin: "PLACEHOLDER",      // ← replace with your real LinkedIn URL
  email: "PLACEHOLDER",         // ← replace with your real email address
  cv: "/Md_Abdur_Rahman_CV.pdf",
  siteUrl: "https://mdabdurrahman.vercel.app", // ← real domain (used for Open Graph tags)
};
```

Rules:

- While a value is `"PLACEHOLDER"`, the site **disables/hides** that link — nothing is invented.
- As soon as you replace it, the icon lights up in the **navbar** and **footer**, and the
  **contact section** automatically shows the Email / LinkedIn rows.
- Also update the name/university text in the `profile` object of the same file if anything changes.

### 3. Add project images

Drop images into `public/projects/` using these names (already referenced in `data/projects.ts`):

```
public/projects/homefoods.png
public/projects/halali.png
public/projects/portfolio.png
```

Each entry in `data/projects.ts` also has an `imageAlt` describing what the screenshot shows —
update it when you replace an image.

If a file is missing, the card shows a polished placeholder with the project icon and title, so
the site always looks finished and never shows a broken image. Images fade in automatically once
the file exists.

### 4. Add or edit projects

Edit **`data/projects.ts`**:

```ts
{
  id: "my-new-project",
  title: "My New Project",
  subtitle: "Short one-line subtitle",
  description: "What the project is and what it does.",
  details: "Optional longer paragraph (shown on the featured card).",
  technologies: ["React", "TypeScript"],
  image: "/projects/my-new-project.jpg",
  github: "https://github.com/ARahman360/my-repo", // optional
  live: "https://my-project.vercel.app",           // optional
  featured: true,   // optional — one project becomes the large hero card
}
```

- Leave `github` / `live` **out** until you have a real URL — the buttons render as
  clearly disabled instead of linking nowhere.
- The first project marked `featured: true` (or the first entry) is shown as the big card.

### 5. Contact form (Formspree)

The contact form is connected to Formspree through `@formspree/react`:

- Form id `xnpnyevl` → endpoint `https://formspree.io/f/xnpnyevl`, configured at the top of
  `components/Contact.tsx` (`FORMSPREE_FORM_ID` / `FORM_ENDPOINT`).
- Input is validated client-side first; any errors Formspree returns are shown inline through
  `<ValidationError>` in the same styled slots.
- Messages are delivered to the email address registered on your Formspree account (Formspree
  uses the `email` field as the reply-to address).
- To use a different form, create one at [formspree.io](https://formspree.io) and change
  `FORMSPREE_FORM_ID` — the endpoint is derived from it.

> **Note:** a brand-new Formspree form is *inactive* until you click the confirmation link in
> the email Formspree sends you. Until confirmed, submissions return an error (the form shows
> it inline).

---

## Deploy on Vercel

The project is a standard Next.js app, so deployment is one click:

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository.
3. Vercel detects Next.js automatically — no extra configuration needed.
4. Click **Deploy**.

Remember to set `links.siteUrl` in `data/portfolio.ts` to your real domain (or your
`*.vercel.app` URL) so social/OG metadata points at the right place.

## Accessibility & SEO notes

- Semantic sections with a proper `h1 → h2 → h3` hierarchy, skip link, visible focus states
  and keyboard-friendly navigation.
- `prefers-reduced-motion` is respected: animations and smooth scrolling are disabled for
  users who ask for it.
- Page title, description and Open Graph/Twitter metadata are configured in `app/layout.tsx`.
