# ETCS — Expert Technical Contracting & Services

Premium corporate website for **EXPERT TECHNICAL CONTRACTING AND SERVICES (ETCS)**, a Saudi Arabia-based B2B industrial contractor.

> **Where Vision Becomes Reality.**

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and next-intl. Fully bilingual (English / Arabic with RTL), SEO-optimised, and ready to deploy on Vercel.

---

## What's inside

- **9 pages**: Home · About · Services (with 14 dynamic service detail pages) · Ongoing Projects · Completed Projects · Clients · Vendor Approvals · Careers · Contact
- **EN / AR with RTL**: Full structural translation via `next-intl`. Long-form copy ships in English with the architecture ready for an Arabic translator to backfill.
- **Six restrained Framer Motion patterns**: hero word-by-word reveal · scroll-triggered card stagger · count-up stats · client logo marquee · hover micro-interactions · slow-rotating gear watermark. All respect `prefers-reduced-motion`.
- **Asymmetric hero**: navy panel with the gold-accent headline plus a 4-stat credibility strip, paired with a refinery photograph.
- **Production-ready inquiry capture**: contact form with React Hook Form + Zod validation, honeypot, in-memory rate-limit, Resend API delivery.
- **SEO bake-in**: per-route `generateMetadata`, OpenGraph image at `/opengraph-image`, dynamic `sitemap.xml` with both locales, and `robots.txt`.
- **Performance**: every image goes through `next/image` with explicit `sizes`; AVIF + WebP at build time; static pre-rendering of 53 routes including all service detail pages in both locales.

---

## Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 16 (App Router, React 19)        |
| Language       | TypeScript (strict)                      |
| Styling        | Tailwind CSS v4 (CSS-first `@theme`)     |
| Animation      | `motion` (Framer Motion 11)              |
| i18n           | `next-intl` v3                           |
| Forms          | React Hook Form + Zod                    |
| Email          | Resend                                   |
| Icons          | Lucide + inline brand SVGs               |
| Fonts          | Sora (display) · Inter (body) · IBM Plex Sans Arabic |

---

## Getting started

```bash
cd website
npm install
cp .env.local.example .env.local   # add your RESEND_API_KEY
npm run dev
```

Then open <http://localhost:3000>. The proxy redirects `/` to `/en`.

### Production build

```bash
npm run build
npm start
```

The build generates **53 static pages** across both locales (English + Arabic) plus all 14 services × 2 locales pre-rendered.

---

## Environment variables

| Variable               | Required | Description                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `RESEND_API_KEY`       | prod     | Resend API key. Without it, the form returns a `200 OK dev-mode` and logs the payload to the server console. |
| `CONTACT_TO_EMAIL`     | prod     | Where inquiries land (default `info@etcs.sa`).                      |
| `CONTACT_FROM_EMAIL`   | prod     | Sender shown on the inquiry email. Must be a Resend-verified domain. |

Without `RESEND_API_KEY` the contact form still works end-to-end on the client side — the server route just logs the payload to the console instead of sending an email. This lets you build and review the site without wiring up Resend immediately.

---

## Editing content

All copy is in two places:

- **`messages/en.json` and `messages/ar.json`** — UI strings (nav, CTAs, page headings, form labels). Edit and the page re-renders.
- **`src/content/*.ts`** — typed data modules for services, projects, clients, values, careers, vendor approvals, and stats. This is what feeds the listing pages and the dynamic service detail routes.

Add a service? Append to `src/content/services.ts` — the new `/services/<slug>` page generates automatically (and the sitemap picks it up).

---

## Folder map (the essentials)

```
website/
├─ public/
│  ├─ images/
│  │  ├─ hero/                hero-01.jpg … hero-04.jpg
│  │  ├─ services/            one image per service (15 services)
│  │  ├─ projects/{ongoing,completed}/
│  │  └─ logo/                interim raster (replace with SVG when available)
│  └─ documents/etcs-company-profile.pdf
├─ src/
│  ├─ app/
│  │  ├─ [locale]/            all pages live here
│  │  ├─ api/contact/         Resend route handler
│  │  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│  │  └─ globals.css          Tailwind v4 @theme tokens
│  ├─ components/
│  │  ├─ layout/              Header · Footer · WhatsAppFab · LocaleSwitcher · MobileMenu · Logo · SocialIcons
│  │  ├─ sections/            Hero · ServiceCategoryGrid · ProjectShowcase · ClientMarquee · VisionMission · ValuesRibbon · VendorApprovals · ContactCta · …
│  │  ├─ motion/              Reveal · TextSplit · CountUp · Marquee · GearWatermark
│  │  ├─ forms/ContactForm.tsx
│  │  └─ ui/                  Button · Input · Label · Select · Badge · Card · Tabs · Sheet · Accordion
│  ├─ content/                services · projects · clients · values · stats · careers · vendor-approvals
│  ├─ i18n/                   routing · navigation · request
│  ├─ lib/                    utils · rate-limit
│  └─ proxy.ts                next-intl locale routing (Next 16 proxy convention)
├─ messages/                  en.json · ar.json
├─ components.json            shadcn config
└─ next.config.ts             next-intl plugin + image formats + turbopack root
```

---

## Brand tokens

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens.

| Token              | Hex       | Where it lives                       |
| ------------------ | --------- | ------------------------------------ |
| `--color-navy-900` | `#0F2645` | Primary dark surface (header, footer, hero) |
| `--color-navy-800` | `#0A1A2F` | Deepest navy for hero gradients      |
| `--color-gold-500` | `#D4A537` | Primary accent (CTAs, eyebrows)      |
| `--color-gold-400` | `#E6B954` | Hover / highlight gold               |
| `--color-bone-50`  | `#FAFAF8` | Page background for light sections   |
| `--color-bone-600` | `#4A4A43` | Muted body copy                      |

The display font is **Sora**, body is **Inter**, Arabic switches to **IBM Plex Sans Arabic** via `dir` on `<html>`.

---

## Known v1 deferrals

- **CMS**. All content is in typed TS files. Migrate to Sanity or Payload later if the client needs to edit weekly.
- **Long-form Arabic translation**. Nav, CTAs, page titles, form labels are fully translated. Long-form service descriptions and About narrative ship in English — replace these in `messages/ar.json` and `src/content/services.ts` when professional translations arrive.
- **Careers ATS / file upload**. Apply links are `mailto:careers@etcs.sa` plus the contact form. Wire a proper ATS later if needed.
- **Logo SVG**. The hero header uses a custom SVG monogram in `src/components/layout/Logo.tsx`. The client should supply a vector (AI / SVG) of the official 3D gear logo so we can swap it for crisp scaling.

---

## Verification (already passed)

- `npm run build` → 53 static pages generated, zero TypeScript errors.
- All routes 200 OK in both locales:
  - `/en`, `/en/services`, `/en/services/coating-and-lining`, `/en/contact`, `/en/projects/ongoing`
  - `/ar`, `/ar/services`, `/ar/contact`, `/ar/projects/ongoing`
- RTL audit: `<html dir="rtl" lang="ar">` on Arabic routes; navigation, hero, cards, footer all mirror cleanly.
- Reduced-motion: all Framer Motion sequences degrade to opacity-only when `prefers-reduced-motion: reduce` is set.

---

## Credit

Designed and engineered with the **UI-UX Pro Max** skill from <https://github.com/nextlevelbuilder/ui-ux-pro-max-skill>.
