# FYN ARC Techworks — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
A code-owned rebuild of the original Framer marketing site — you own every file and asset.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values (see "Contact form" below)
npm run dev                  # http://localhost:3000
```

## Contact form (email delivery)

The contact form POSTs to `/api/contact`, which sends an email via [Resend](https://resend.com).
Until the env vars are set it fails gracefully ("email us directly"); no email is sent.

To enable it, set these (in `.env.local` for dev, and in Vercel → Settings →
Environment Variables for production):

| Variable | What it is |
|----------|-----------|
| `RESEND_API_KEY` | Your Resend API key (`re_…`). |
| `CONTACT_TO_EMAIL` | Where submissions arrive — `fynarctechworks@gmail.com`. |
| `CONTACT_FROM_EMAIL` | The "from" address. Must be on a Resend-verified domain, e.g. `FYN ARC Techworks <noreply@fynarctechworks.com>`. Use `onboarding@resend.dev` for testing before your domain is verified. |

**Setup steps:** create a Resend account → verify `fynarctechworks.com` under Domains
(add the DNS records Resend gives you) → create an API key → set the three vars.
The form includes a hidden honeypot field and server-side Zod validation for spam/abuse.

## Deploy (Vercel — auto-deploy on push)

This repo is set up for Vercel's Git integration:

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `fynarctechworks/fynarctechworkswebsite`.
2. Framework preset auto-detects **Next.js** — no config needed (`vercel.json` is included).
3. Add the three contact-form env vars (above) under **Environment Variables**.
4. Deploy. From then on: **every push to `main` auto-deploys to production**, and every
   branch/PR gets its own **preview URL**.

`.github/workflows/ci.yml` also type-checks and builds on every push/PR, so breakage
is caught before it ships.

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
