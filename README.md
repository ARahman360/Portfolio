# Md Abdur Rahman — Portfolio

A premium dark-tech personal portfolio website for **Md Abdur Rahman**, Industrial Information Technology student at **LAB University of Applied Sciences**, Finland.

The site is a single-page portfolio with a hero, about, skills, featured projects, areas of exploration, education, experience and a contact section — plus a sticky navigation bar, scroll-reveal animations and a fully responsive mobile layout.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- Self-hosted Google Fonts (Inter, Space Grotesk, JetBrains Mono) via `next/font`
- No other runtime dependencies — the contact form is client-side only for now

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
  Navbar.tsx        # Sticky nav, scroll-spy, mobile menu
  Hero.tsx          # Hero section
  ProfileVisual.tsx # Portrait / AR monogram visual
  About.tsx  Skills.tsx  Exploring.tsx
  Projects.tsx  ProjectCard.tsx
  Education.tsx  Experience.tsx  Contact.tsx
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
  siteUrl: "https://example.com", // ← your real domain (used for Open Graph tags)
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
public/projects/homefoods.jpg
public/projects/plc-automation.jpg
public/projects/java.jpg
public/projects/python.jpg
```

If a file is missing, the card shows an elegant placeholder with the project title — so the
site always looks finished. Images fade in automatically once the file exists.

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

### 5. Connect the contact form (optional)

The form validates input client-side and shows an honest demo state. To actually receive
messages, sign up at [Formspree](https://formspree.io) (or use Resend), then paste your form
URL into `FORM_ENDPOINT` at the top of `components/Contact.tsx`:

```ts
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
```

That's the only change needed — the submit handler already POSTs to it.

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
