# FYN ARC Techworks — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
A code-owned rebuild of the original Framer marketing site — you own every file and asset.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build for production

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx          Root layout — fonts, SEO metadata, JSON-LD, Navbar + Footer
  page.tsx            Homepage (composes the section components)
  about/page.tsx      About — mission, values, founder, team, roadmap
  feature/page.tsx    Services + Products (Inspect Pro, GymDesk)
  blogs/page.tsx      Blog listing (8 posts)
  contact/page.tsx    Contact info + working form
  globals.css         Design tokens + component classes (btn-primary, card, eyebrow…)
components/
  Navbar.tsx          Sticky nav with animated mobile menu
  Footer.tsx          Dark footer
  ContactForm.tsx     Client-side form (success-state UX, no backend yet)
  motion/             Reveal, Stagger, CountUp — the animation primitives
  sections/           Homepage sections (Hero, Pitch, WhyChooseUs, Process, …)
lib/
  content.ts          ALL copy + data (single source of truth)
  fonts.ts            Geist / Alexandria / Instrument Sans / Outfit
public/
  blog/               8 blog images (downloaded from the original site)
  og/og-image.png     Open Graph image
  favicon.png
tailwind.config.ts    Design system: colors, type scale, radii
```

## Design system (extracted from the original)

| Token | Value |
|-------|-------|
| Primary blue | `#0099FF` |
| Dark navy (ink) | `#252e3d` |
| Light section bg (mist) | `#f7f7f7` |
| Fonts | Geist (body), Alexandria (display), Instrument Sans, Outfit |
| Card radius | 10px |

## What changed vs. the original Framer site (intentional fixes)

- **Contact email/phone corrected** — the original linked to a leftover template
  address (`hello@nexilotech.ai`) and a dummy US number (`+1 555…`). Now uses
  `info@fynarctechworks.com` and `+91 9849861318`.
- **Per-page SEO** — unique titles per route (the original repeated one title on
  every page), plus JSON-LD Organization schema.
- **Images are local** — served from `public/`, not hotlinked from Framer's CDN.
- **Testimonial fixed** — the "Maaya Kumaran" quote referenced "Compound's platform"
  (template leftover); rewritten to credit FYN ARC.

## Notes / next steps

- The contact form currently shows a client-side success state only — wire it to an
  email service (Resend, Formspree) or an API route for real submissions.
- Blog "Read more" links point to `/blogs/<slug>` — detail pages aren't built yet.
- Some blog images are the original stock/placeholder art and don't match every
  title; swap in real featured images when available.
- No pricing page — worth adding for an agency site.
