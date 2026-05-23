# ETCS — Expert Technical Contracting & Services

Premium corporate website for **EXPERT TECHNICAL CONTRACTING AND SERVICES (ETCS)**, a Saudi Arabia-based B2B industrial contractor.

> **Where Vision Becomes Reality.**

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, next-intl, and Resend. Fully bilingual (English / Arabic with RTL), SEO-optimised, and deployed to Cloudflare Workers via `@opennextjs/cloudflare`.

**Live:** <https://etcs-ksa.com> · backup <https://etcs-web.rehan-code.workers.dev>

---

## What's inside

**11 page templates** (each in `/en` and `/ar`):
- Home (asymmetric hero · capability marquee · about preview · service grid · process band · project showcase · client marquee · vision/mission · vendor approvals · contact CTA)
- About — editorial / manifesto layout with numbered sections, leadership grid, HSE metrics, Vision 2030 callout, reading progress bar, section-dots navigator
- Services index + 14 dynamic service detail pages
- 3 deep-dive case-study pages (`/projects/[slug]`) with metrics strip, narrative, scope sidebar, client quote, image gallery, and next-project navigation
- Ongoing projects (tabs + filters)
- Completed projects (tabs + filters)
- Clients (tabbed groups + marquee)
- Vendor approvals
- Careers
- Contact (Zod-validated form → Resend → `info@etcs-ksa.com`)
- Bespoke 404 with industrial blueprint aesthetic

**Animation patterns** (all degrade to opacity-only under `prefers-reduced-motion`):
- Hero word-by-word reveal (`TextSplit`)
- Ken-Burns 4-photo slideshow with cross-fade (`HeroSlideshow`)
- Scroll-triggered staggered card reveals (`Reveal`, `StaggerGroup`, `StaggerItem`)
- Count-up stats (`CountUp`)
- Client logo marquee — dual rows, opposite directions (`Marquee`)
- Editorial capability marquee — keyword strip between sections
- Slow-rotating gear watermark (`GearWatermark`)
- Cursor-following gold spotlight on dark sections (`CursorSpotlight`)
- Magnetic gold CTA buttons (`Magnetic`)
- Reading-progress bar (`ReadingProgress`)
- Sticky section-dots navigator (`SectionDots`)

**Contact form**: React Hook Form + Zod + Resend with honeypot, in-memory rate-limit (5/min/IP), and error surfacing.

**SEO**: per-route `generateMetadata`, dynamic OG image generation at `/opengraph-image` (default) and `/services/[slug]/opengraph-image` (per-service), bilingual sitemap, robots.txt, alternate-locale links.

---

## Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 16 (App Router, React 19)        |
| Language       | TypeScript (strict)                      |
| Styling        | Tailwind CSS v4 (CSS-first `@theme`)     |
| Animation      | `motion` (Framer Motion 11+)             |
| i18n           | `next-intl` v3 (without proxy — path-routed) |
| Forms          | React Hook Form + Zod                    |
| Email          | Resend (`etcs-ksa.com` verified)         |
| Icons          | Lucide + inline brand SVGs               |
| Fonts          | Sora (display) · Inter (body) · IBM Plex Sans Arabic |
| Hosting        | Cloudflare Workers + Assets via `@opennextjs/cloudflare` |

---

## Getting started

```bash
cd website
npm install
cp .env.local.example .env.local   # add RESEND_API_KEY (optional in dev)
npm run dev                        # http://localhost:3000 → /en
```

### Build & deploy

```bash
npm run build              # next build (no Workers bundle)
npm run preview            # OpenNext build + local Workers preview
npm run deploy             # OpenNext build + wrangler deploy (production)
```

The production deploy:
- Bundles a ~10 MB Worker (2.4 MB gzipped) + static assets
- Custom-domain-routed at `etcs-ksa.com` and `www.etcs-ksa.com`
- Generates 59 statically pre-rendered pages across both locales

---

## Environment & secrets

`.env.local.example` lists the variables. In production these are split:

| Variable               | Where it lives             | Description                                                         |
| ---------------------- | -------------------------- | ------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Workers **secret** (encrypted) | Send-only restricted Resend key. Set with `wrangler secret put`.    |
| `CONTACT_TO_EMAIL`     | `wrangler.jsonc` → `vars`  | Where inquiries land (default `info@etcs-ksa.com`).                 |
| `CONTACT_FROM_EMAIL`   | `wrangler.jsonc` → `vars`  | Sender. Must be a Resend-verified domain in production.             |

Without `RESEND_API_KEY` the API route accepts the submission and logs the payload to the server console — useful for local dev without an account.

```bash
echo "re_NEW_KEY" | npx wrangler secret put RESEND_API_KEY
```

---

## Editing content

All copy lives in two places:

- **`messages/en.json` / `messages/ar.json`** — UI strings (nav, CTAs, headings, form labels). Edit and the page re-renders.
- **`src/content/*.ts`** — typed data modules:
  - `services.ts` — 14 services
  - `projects.ts` — case studies (set `featured: true` to enable the deep-dive page)
  - `clients.ts` — client logos grouped by sector
  - `values.ts` — 10 core values
  - `stats.ts` — hero stat counters
  - `careers.ts` — open roles
  - `vendor-approvals.ts` — operators + certifications
  - `leadership.ts` — About-page leadership grid

Add a service → append to `services.ts`. Add a case study → set `featured: true` in `projects.ts`. The new routes auto-generate and the sitemap picks them up.

---

## Folder map

```
website/
├─ public/
│  ├─ images/
│  │  ├─ hero/                hero-01.jpg … hero-04.jpg
│  │  ├─ services/            one image per service
│  │  ├─ projects/{ongoing,completed}/
│  │  └─ logo/                interim raster (replace with SVG when available)
│  └─ documents/etcs-company-profile.pdf
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx        html lang/dir, fonts, Header, Footer, WhatsAppFab
│  │  │  ├─ page.tsx          Home
│  │  │  ├─ about/page.tsx    Editorial / manifesto About
│  │  │  ├─ services/page.tsx · services/[slug]/page.tsx · services/[slug]/opengraph-image.tsx
│  │  │  ├─ projects/ongoing|completed/page.tsx · projects/[slug]/page.tsx  (case studies)
│  │  │  ├─ clients|vendor-approvals|careers|contact/page.tsx
│  │  │  ├─ [...not-found]/page.tsx     catch-all → notFound()
│  │  │  └─ not-found.tsx               bespoke 404
│  │  ├─ page.tsx              root → redirect("/en")
│  │  ├─ api/contact/route.ts  Resend handler with Zod + honeypot + rate-limit
│  │  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│  │  └─ globals.css           Tailwind v4 @theme tokens
│  ├─ components/
│  │  ├─ layout/      Header · Footer · WhatsAppFab · LocaleSwitcher · MobileMenu · Logo · SocialIcons
│  │  ├─ sections/    Hero · HeroSlideshow · CapabilityMarquee · AboutPreview · ServiceCategoryGrid
│  │  │              · ProcessBand · ProjectShowcase · ProjectsBoard · ClientMarquee · ClientsBoard
│  │  │              · VisionMission · ValuesRibbon · VendorApprovals · ContactCta · NextChapter
│  │  │              · SectionHeading · PageHero
│  │  ├─ motion/      Reveal · TextSplit · CountUp · Marquee · GearWatermark
│  │  │              · CursorSpotlight · MagneticButton · ReadingProgress · SectionDots
│  │  ├─ forms/       ContactForm
│  │  └─ ui/          Button · Input · Label · Select · Badge · Card · Tabs · Sheet · Accordion
│  ├─ content/        services · projects · clients · values · stats · careers · vendor-approvals · leadership
│  ├─ i18n/           routing · navigation · request
│  └─ lib/            utils · rate-limit
├─ messages/          en.json · ar.json
├─ open-next.config.ts
├─ wrangler.jsonc     Cloudflare Worker config (name, routes, vars, observability)
└─ next.config.ts     next-intl plugin + image formats + locale-prefix redirects
```

---

## Brand tokens

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens.

| Token              | Hex       | Where it lives                       |
| ------------------ | --------- | ------------------------------------ |
| `--color-navy-900` | `#0F2645` | Primary dark surface                 |
| `--color-navy-800` | `#0A1A2F` | Deepest navy (hero gradients)        |
| `--color-navy-700` | `#1B3A66` | Hover states                         |
| `--color-gold-500` | `#D4A537` | Primary accent (CTAs, eyebrows)      |
| `--color-gold-400` | `#E6B954` | Hover / highlight gold               |
| `--color-bone-50`  | `#FAFAF8` | Page background for light sections   |
| `--color-bone-600` | `#4A4A43` | Muted body copy                      |

Display: **Sora**. Body: **Inter**. Arabic: **IBM Plex Sans Arabic** (auto-switched via `dir`).

Use Tailwind **logical utilities everywhere** (`ps-*`, `pe-*`, `text-start`, `border-s`) — never `pl-/pr-`. The `rtl:` variant is reserved for direction-pointing icons that need to flip.

---

## Cloudflare deployment

**Worker**: `etcs-web`
**Routes**: `etcs-ksa.com` + `www.etcs-ksa.com` (custom_domain bindings)
**Bindings**: `ASSETS` (static files), `RESEND_API_KEY` (secret), `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL` (vars)

Architecture: `@opennextjs/cloudflare` bundles the Next.js server into a Worker, with static assets served by Workers Assets. SSR + dynamic routes run on the Worker; pre-rendered pages are served from the asset bucket. `next/image` works via the OpenNext image-optimisation worker.

**Reasons for the architecture:**
- The `proxy.ts` (formerly `middleware.ts`) is **removed** — Next.js 16 made it Node.js-only and OpenNext doesn't support that yet. Locale routing is handled by:
  - A root `app/page.tsx` that `redirect("/en")` for `/`
  - `next.config.ts` `redirects()` that maps bare top-level paths (`/about`, `/services`, etc.) to `/en/...`
  - The `[locale]` segment for everything else
- A `[locale]/[...not-found]/page.tsx` catch-all routes unmatched URLs through the bespoke `[locale]/not-found.tsx`

To redeploy:
```bash
npm run deploy
```

---

## Verification

- `npm run build` → 59 static pages, zero TypeScript errors
- All routes 200 in both locales: `/`, `/en`, `/en/about`, `/en/services`, `/en/services/[slug]`, `/en/projects/ongoing`, `/en/projects/[slug]`, `/en/contact`, plus the AR mirror
- `<html dir="rtl" lang="ar">` on Arabic routes; navigation, hero, cards, forms all mirror cleanly
- 404: unmatched routes serve the bespoke `not-found.tsx` (blueprint-themed)
- Reading-progress + section-dots active on `/about`
- Contact form: Zod-validated, Resend delivers to `info@etcs-ksa.com`, honeypot rejects spam, 429 on burst
- Per-page OG images render at `/{locale}/opengraph-image` and `/{locale}/services/[slug]/opengraph-image`

---

## Known v1 deferrals (intentional)

- **CMS** — all content in typed TS files; migrate to Sanity/Payload only if the client edits weekly
- **Long-form Arabic translation** — nav, CTAs, page titles, form labels fully translated; long-form service descriptions and About narrative ship in English (clearly marked) until a professional translator delivers
- **Careers ATS / file upload** — apply links are `mailto:careers@etcs.sa` + the contact form
- **Leadership portraits** — placeholder monogram tiles (`Portrait pending`) until photographs arrive
- **Project numbers** — the random metrics in case studies are realistic placeholders; replace with real data when available
- **Live video hero** — currently 4-image Ken-Burns slideshow; can swap a 6-second MP4 in `HeroSlideshow.tsx` when a clip is delivered
- **Logo SVG** — header uses a custom geometric monogram in `Logo.tsx`. Replace with the official 3D gear logo (SVG) when the vector arrives

---

## Credit

Designed and engineered with the **UI-UX Pro Max** skill from <https://github.com/nextlevelbuilder/ui-ux-pro-max-skill>.
