@AGENTS.md

# ETCS Website — Full Project Context for Claude

This file is read automatically when Claude Code opens this directory.
It captures the complete state, every architectural decision, all quirks
discovered, and deployment status so any Claude session can continue seamlessly.

---

## What this project is

Premium bilingual (EN + Arabic/RTL) corporate website for
**Expert Technical Contracting and Services (ETCS)** — a B2B industrial
contractor in the Kingdom of Saudi Arabia.

**Live:** https://etcs-ksa.com and https://www.etcs-ksa.com
**Backup:** https://etcs-web.rehan-code.workers.dev
**Cloudflare account:** rehan.code@gmail.com
**Worker name:** `etcs-web`
**CF Account ID:** `9e6b4663234bc9949a5b131b6022acdb`
**Zone ID (etcs-ksa.com):** `59c5dd4b60974beadc926d0be3da35a9`

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.6 (App Router, React 19, Turbopack in dev) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 — CSS-first `@theme` tokens in `src/app/globals.css` |
| Animation | `motion` package (Framer Motion 11+) — import from `"motion/react"` |
| i18n | `next-intl` v3 — NO proxy/middleware (see §Critical below) |
| Forms | React Hook Form + Zod |
| Email | Resend — domain `etcs-ksa.com` verified, routes to `info@etcs-ksa.com` |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` |

Deploy: `npm run deploy` (OpenNext build + wrangler deploy, ~30 sec)

---

## CRITICAL architectural decisions — do not change without reading this

### 1. NO proxy.ts / middleware.ts

Next.js 16 renamed `middleware.ts` → `proxy.ts` but made it Node.js-only.
`@opennextjs/cloudflare` does not support Node.js proxy. The file is deleted.

Locale routing works via three mechanisms instead:
- `src/app/page.tsx` → `redirect("/en")` for the bare root `/`
- `next.config.ts` `redirects()` maps `/about`, `/services`, `/contact`, etc. → `/en/...`
- The `[locale]` App Router segment handles everything under a locale prefix

**If you add proxy.ts or middleware.ts, the Cloudflare build will break.**

### 2. Tailwind CSS v4 — CSS-first, no config file for colours

All colour tokens and font variables live in `src/app/globals.css` under `@theme {}`.
Do NOT add colours to `tailwind.config.ts` — it won't work with v4.

Always use **logical utilities** (RTL-safe):
`ps-*` `pe-*` `ms-*` `me-*` `text-start` `text-end` `border-s` `border-e` `rounded-s` `rounded-e`

Never use directional utilities: `pl-` `pr-` `ml-` `mr-` (they break Arabic RTL).
The `rtl:` variant is reserved only for icons that point a direction (arrows, chevrons).

### 3. `motion` not `framer-motion`

Package: `motion` (not `framer-motion`).
Import: `from "motion/react"` — not `from "framer-motion"`.
All hooks, components, and utilities (motion, AnimatePresence, useScroll, useInView, etc.) come from `"motion/react"`.

### 4. Link, useRouter, usePathname — always from `@/i18n/navigation`

Never import `Link` from `"next/link"` in locale-aware pages.
Always use the re-exported wrappers from `src/i18n/navigation.ts`:

```ts
// src/i18n/navigation.ts (must exist)
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

### 5. Server vs client translations

- Server components: `import { getTranslations } from "next-intl/server"` → `const t = await getTranslations("namespace")`
- Client components: `import { useTranslations } from "next-intl"` → `const t = useTranslations("namespace")`
- Never mix them. `useTranslations` in a server component = runtime error.

### 6. generateStaticParams pattern

Every dynamic `[locale]/[slug]` route needs this exact pattern:

```ts
import { routing } from "@/i18n/routing";
export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    items.map(item => ({ locale, slug: item.slug }))
  );
}
```

### 7. Custom 404 needs TWO files

- `src/app/[locale]/not-found.tsx` — the bespoke blueprint-themed UI
- `src/app/[locale]/[...not-found]/page.tsx` — catch-all that calls `notFound()`

Without the catch-all, Next.js serves its own generic 404 for unmatched routes.

### 8. Resend contact form

Worker bindings (in `wrangler.jsonc`):
- `RESEND_API_KEY` → encrypted secret (set via `wrangler secret put`, NOT in wrangler.jsonc)
- `CONTACT_TO_EMAIL` → `info@etcs-ksa.com` (Zoho)
- `CONTACT_FROM_EMAIL` → `ETCS Website <noreply@etcs-ksa.com>`

Domain `etcs-ksa.com` is verified on Resend.
The key is restricted to send-only — API calls to `/domains` or `/emails` will 401.
Without `RESEND_API_KEY` set, the route logs to console and returns `{ok:true, mode:"dev"}`.

### 9. ContactForm.tsx state

The `useForm` call has no `defaultValues` (removed by linter — intentional).
The `reset()` call explicitly passes all field keys:
```ts
reset({ name:"", email:"", phone:"", company:"", service:"", subject:"", message:"", website:"" })
```
Do not remove the explicit keys from `reset()`.

### 10. SEO — everything goes through `src/lib/seo.ts`

Every page's metadata is built by `pageMetadata()`. Do **not** hand-roll
`title`/`description`/`alternates` in a page, and do **not** put `alternates`
back on `[locale]/layout.tsx` — a layout-level `alternates.languages` makes
every page advertise the homepage as its alternate (this was the bug fixed in
the SEO pass).

Rules that are easy to break:

- `pageMetadata({ locale, path, title, description })` — `path` is
  **locale-relative** (`""`, `"/about"`, `"/services/fireproofing"`). It emits
  the self-referencing canonical plus the `en` / `ar` / `x-default` cluster.
- Page metadata uses `t("metaTitle")` (SERP title, ≤58 chars so `| ETCS` fits
  under 65). `t("title")` stays the visible H1. They are different strings on
  purpose — don't collapse them.
- `openGraph.images` is set **explicitly** in `pageMetadata()`. A page that
  declares its own `openGraph` replaces the parent's wholesale, so relying on
  the `src/app/opengraph-image.tsx` file convention silently drops `og:image`.
  Service pages pass `ogImagePath` for their per-service card.
- `src/app/sitemap.ts` must stay in sync with `pageMetadata()` — non-reciprocal
  hreflang is discarded by search engines. Both read locales from `routing`.
- `CONTENT_LAST_MODIFIED` in `src/lib/seo.ts` drives sitemap `<lastmod>`. Bump
  it when copy changes; leave it alone for code-only deploys.
- JSON-LD: one `<script>` per page via `<JsonLd data={graph(...)} />`. The
  `Organization` + `WebSite` nodes come from the locale layout; page graphs
  reference them by `@id` (`…/#organization`, `…/#website`). Never duplicate the
  Organization node in a page graph.
- Structured data must not outrun the facts (Rev 01 rule). `sameAs`, `geo` and
  `Certification.issuedBy` are omitted on purpose — see the pending-assets list.
  `jobPostingSchemas()` skips any role without a real `datePosted`.

### 11. Sonner Toaster placement

The `<Toaster>` is rendered once per page in `page.tsx` for pages that use it
(Home, Contact). It is NOT in the root layout. Do not move it to the layout
(causes duplication).

---

## Complete file map (all meaningful files)

```
website/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          ← <html lang dir>, Sora+Inter+IBMPlex fonts, Header, Footer, WhatsAppFab
│   │   │   ├── page.tsx            ← Home: Hero+CapabilityMarquee+About+ServiceGrid+ProcessBand+ProjectShowcase+Clients+VisionMission+Vendors+ContactCta
│   │   │   ├── about/page.tsx      ← Manifesto, numbered sections (01 Origin, 02 Leadership), HSE numbers, Vision 2030, ReadingProgress, SectionDots
│   │   │   ├── services/
│   │   │   │   ├── page.tsx        ← 4 categories, each with service cards
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx            ← Sticky scope sidebar, sectors, related services
│   │   │   │       └── opengraph-image.tsx ← Per-service OG card (edge runtime)
│   │   │   ├── projects/
│   │   │   │   ├── [slug]/page.tsx  ← Case study: hero, meta, metrics strip, narrative, sticky scope, client quote, gallery, NextChapter
│   │   │   │   ├── ongoing/page.tsx
│   │   │   │   └── completed/page.tsx
│   │   │   ├── clients/page.tsx
│   │   │   ├── vendor-approvals/page.tsx
│   │   │   ├── careers/page.tsx
│   │   │   ├── contact/page.tsx    ← Two-column: ContactForm | info card + embedded map
│   │   │   ├── [...not-found]/page.tsx  ← Catch-all: calls notFound()
│   │   │   └── not-found.tsx       ← Blueprint 404: grid bg, large "404", "This route isn't on the blueprint", Drawing No. ETCS-404-A
│   │   ├── page.tsx                ← redirect("/en")
│   │   ├── api/contact/route.ts    ← POST: Zod validate → honeypot check → rate-limit → Resend.send()
│   │   ├── sitemap.ts              ← Both locales, all services + case studies
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx     ← Default site OG (edge)
│   │   └── globals.css             ← Tailwind v4 @theme: navy/gold/bone tokens + font vars
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          ← Sticky transparent→opaque (scroll > 60px), spring underline indicator, whitespace-nowrap nav links
│   │   │   ├── Footer.tsx          ← 4-col: brand | company nav | services nav | contact+socials
│   │   │   ├── WhatsAppFab.tsx     ← Fixed bottom-end, pulsing ring, wa.me link with prefilled text
│   │   │   ├── LocaleSwitcher.tsx  ← Toggles EN↔AR, preserves current path
│   │   │   ├── MobileMenu.tsx      ← Sheet drawer with full nav + locale switcher + CTA
│   │   │   ├── Logo.tsx            ← SVG gear monogram (placeholder for real vector logo)
│   │   │   └── SocialIcons.tsx     ← Inline SVG: LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon
│   │   ├── sections/
│   │   │   ├── Hero.tsx            ← Asymmetric 7/5 grid, TextSplit headline, stats strip, CursorSpotlight, Magnetic CTA, HeroSlideshow
│   │   │   ├── HeroSlideshow.tsx   ← 4-photo Ken-Burns cross-fade, 5.5s interval, slide indicators, photo credit
│   │   │   ├── CapabilityMarquee.tsx ← Gold ✦ separated keyword scroll (Coating · Insulation · ...)
│   │   │   ├── AboutPreview.tsx    ← 5/7 grid, sticky photo with Vision2030 callout card
│   │   │   ├── ServiceCategoryGrid.tsx ← 4 dark/light cards with icon, description, hover gradient
│   │   │   ├── ProcessBand.tsx     ← 5-step Discover→Handover, numbered tokens, gold connector line (desktop)
│   │   │   ├── ProjectShowcase.tsx ← Featured projects grid (links to /projects/[slug] if featured:true)
│   │   │   ├── ProjectsBoard.tsx   ← Tabs (ongoing/completed) + filter chips + AnimatePresence grid
│   │   │   ├── ClientMarquee.tsx   ← Dual-row marquee, opposite directions
│   │   │   ├── ClientsBoard.tsx    ← Tabs by sector (All / Government / Industrial / Private / Commercial)
│   │   │   ├── VisionMission.tsx   ← Two dark cards (Vision + Mission) with CursorSpotlight when not embedded
│   │   │   ├── ValuesRibbon.tsx    ← 10 values in 5-col grid with gold numbering
│   │   │   ├── VendorApprovals.tsx ← Operators + certifications grid
│   │   │   ├── ContactCta.tsx      ← Full-bleed dark: CursorSpotlight + GearWatermark + Magnetic CTA
│   │   │   ├── NextChapter.tsx     ← Full-bleed image link: contextual "next page" nav with Magnetic CTA
│   │   │   ├── PageHero.tsx        ← Reusable dark hero for inner pages
│   │   │   └── SectionHeading.tsx  ← eyebrow + h2 + description with Reveal animations
│   │   ├── motion/
│   │   │   ├── Reveal.tsx          ← whileInView fade+rise (also StaggerGroup + StaggerItem)
│   │   │   ├── TextSplit.tsx       ← Word-by-word staggered animate
│   │   │   ├── CountUp.tsx         ← useInView-gated animate() counter
│   │   │   ├── Marquee.tsx         ← Infinite x-scroll, pauseOnHover, RTL-direction-aware
│   │   │   ├── GearWatermark.tsx   ← SVG gear, 60s linear rotation (useReducedMotion safe)
│   │   │   ├── CursorSpotlight.tsx ← Spring-following gold radial, attaches to parentElement
│   │   │   ├── MagneticButton.tsx  ← Exports `Magnetic` — wraps any element, pulls toward cursor within 80px
│   │   │   ├── ReadingProgress.tsx ← Fixed top gold scaleX bar driven by useScroll
│   │   │   └── SectionDots.tsx     ← Sticky end-side dots, IntersectionObserver, click-to-jump
│   │   ├── forms/
│   │   │   └── ContactForm.tsx     ← RHF+Zod, honeypot (hidden "website" field), fetch /api/contact, Sonner toasts
│   │   └── ui/
│   │       ├── button.tsx          ← Variants: primary(gold) secondary(navy) outline outlineDark ghost link
│   │       ├── input.tsx           ← Input + Textarea (both exported)
│   │       ├── label.tsx           ← Radix Label
│   │       ├── select.tsx          ← Native select with ChevronDown icon
│   │       ├── badge.tsx           ← Variants: default gold dark outline eyebrow
│   │       ├── card.tsx            ← Card CardHeader CardTitle CardDescription CardContent
│   │       ├── sheet.tsx           ← Radix Dialog as side drawer (MobileMenu uses this)
│   │       ├── tabs.tsx            ← Radix Tabs — pill style
│   │       └── accordion.tsx       ← Radix Accordion
│   ├── content/
│   │   ├── services.ts             ← 14 services: slug, category, title, shortDescription, description, scope[], sectors[], heroImage
│   │   ├── projects.ts             ← Projects with optional featured+narrative+metrics+scopeDetail+gallery+quote for case studies; exports: projects, ongoingProjects, completedProjects, featuredProjects, caseStudies, getProject(), getNextProject()
│   │   ├── clients.ts              ← Client list grouped by ClientGroup: government|industrial|private|commercial
│   │   ├── values.ts               ← 10 core values with key, title, description
│   │   ├── stats.ts                ← 4 hero stats (value keys reference en.json stats.* translations)
│   │   ├── careers.ts              ← Open roles with slug, title, location, department, type, description
│   │   ├── vendor-approvals.ts     ← Vendors typed: operator|certification|partner
│   │   └── leadership.ts           ← 4 leaders: name, title, bio, initials, accent colour (portrait placeholders)
│   ├── i18n/
│   │   ├── routing.ts              ← locales:["en","ar"], defaultLocale:"en", localePrefix:"always"
│   │   ├── navigation.ts           ← createNavigation(routing) re-exports Link, redirect, usePathname, useRouter
│   │   └── request.ts              ← getRequestConfig: loads messages/{locale}.json
│   └── lib/
│       ├── utils.ts                ← cn(), SITE constants (name, phone, email, url, whatsapp, social), whatsappLink()
│       └── rate-limit.ts           ← In-memory Map-based rate limiter (5 req/min/IP)
├── messages/
│   ├── en.json                     ← All UI strings (nav, hero, stats, sections, pages, forms)
│   └── ar.json                     ← Full translation for UI strings; long-form body copy is EN fallback
├── public/
│   ├── images/
│   │   ├── hero/          hero-01.jpg hero-02.jpg hero-03.jpg hero-04.jpg
│   │   ├── services/      coating/ insulation/ piping/ fireproofing/ waste/ civil/ renovation/ om/ ei/ mechanical/ peb/ solar/ manpower/ rental/ supply/ (each has 01.jpg)
│   │   ├── projects/
│   │   │   ├── ongoing/   coating-tank-01.jpg insulation-plant-01.jpg peb-warehouse-01.jpg solar-rooftop-01.jpg
│   │   │   └── completed/ fireproofing-pipeline-01.jpg manpower-shutdown-01.jpg villa-finishing-01.jpg ei-substation-01.jpg tank-fabrication-01.jpg om-utility-01.jpg
│   │   └── logo/          logo-3d.jpg (raster placeholder — replace with SVG)
│   └── documents/
│       └── etcs-company-profile.pdf
├── open-next.config.ts             ← defineCloudflareConfig({})
├── wrangler.jsonc                  ← name:"etcs-web", main:".open-next/worker.js", nodejs_compat, custom_domain routes, vars
├── next.config.ts                  ← withNextIntl + image formats + locale redirects + turbopack root
├── components.json                 ← shadcn config: new-york style, Tailwind v4 canary
├── .env.local.example              ← RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
└── README.md                       ← Full documentation
```

---

## Brand tokens (in `src/app/globals.css` @theme)

```css
--color-navy-950: #03070F
--color-navy-900: #0F2645   /* primary dark — header, footer, dark sections */
--color-navy-800: #0A1A2F   /* deepest navy */
--color-navy-700: #1B3A66   /* hover */
--color-gold-600: #B5871F
--color-gold-500: #D4A537   /* primary accent — CTAs, eyebrows, stats */
--color-gold-400: #E6B954   /* hover gold */
--color-bone-50:  #FAFAF8   /* light section bg */
--color-bone-200: #E5E5DF
--color-bone-600: #4A4A43   /* muted body copy */
--color-bone-900: #111110
--font-display: var(--font-sora)    /* loaded via next/font/google Sora */
--font-body:    var(--font-inter)   /* loaded via next/font/google Inter */
--font-arabic:  var(--font-arabic)  /* loaded via next/font/google IBM_Plex_Sans_Arabic */
```

---

## DNS state — what's on etcs-ksa.com Cloudflare zone

| Type | Name | Value | Action |
|------|------|-------|--------|
| Workers Custom Domain | etcs-ksa.com | etcs-web | Auto-managed — DO NOT touch |
| Workers Custom Domain | www.etcs-ksa.com | etcs-web | Auto-managed — DO NOT touch |
| MX | etcs-ksa.com | mx.zoho.com, mx2, mx3 | Zoho email — DO NOT DELETE |
| TXT | etcs-ksa.com | v=spf1 include:zohomail.com ~all | SPF — DO NOT DELETE |
| TXT | _dmarc.etcs-ksa.com | v=DMARC1; p=none; … | DMARC — DO NOT DELETE |
| TXT | zoho._domainkey | v=DKIM1; k=rsa; … | DKIM — DO NOT DELETE |
| TXT | etcs-ksa.com | zoho-verification=… | Zoho — DO NOT DELETE |

Old Cloudflare Pages project `etcs-ksa` and its CNAME records pointing to
`etcs-ksa.pages.dev` have been **permanently deleted**.

---

## Deployment commands

```bash
npm run dev               # local dev at localhost:3000
npm run build             # next build only (no CF bundle)
npm run preview           # OpenNext build + local Miniflare preview
npm run deploy            # OpenNext build + wrangler deploy (production)
npm run cf-typegen        # regenerate cloudflare-env.d.ts

# Set / update the Resend secret (no redeploy needed — secrets are live immediately)
echo "re_YOUR_KEY" | npx wrangler secret put RESEND_API_KEY

# Wrangler auth (if on new machine)
npx wrangler login        # opens browser OAuth for rehan.code@gmail.com
```

---

## Content placeholders — what the client still needs to provide

| Location | Placeholder | Replace with |
|---|---|---|
| `src/content/stats.ts` | 120 / 15 / 60 / 450 | Real projects / years / clients / workforce |
| `src/content/leadership.ts` | 4 template names + monogram portraits | Real names, titles, bios, portrait photos |
| `src/content/projects.ts` (each featured project) | metrics[] values | Real surface area, workforce, safety hours, etc. |
| `src/content/projects.ts` (each featured project) | quote.body / author / role | Real client testimonials |
| `src/app/[locale]/about/page.tsx` | 2.1M / 0 / 98% / 99.7% | Last-12-months HSE+quality actuals |
| `src/app/[locale]/about/page.tsx` | 34% / 12 / 6 / 0 | Vision 2030 real figures |
| `src/components/layout/Logo.tsx` | SVG gear monogram | Official logo as SVG |
| `public/images/logo/logo-3d.jpg` | Raster placeholder | Vector logo export |
| `messages/ar.json` | English fallback body copy | Professional Arabic translation |
| `src/components/sections/HeroSlideshow.tsx` | Fabricated captions | Real project captions/locations |
| `src/lib/seo.ts` → `organizationSchema()` | `geo` omitted | Exact office lat/lng (unlocks local-pack eligibility) |
| `src/lib/seo.ts` → `organizationSchema()` | `sameAs` omitted | Live social profile + Google Business Profile URLs |
| `src/lib/seo.ts` → `certifications()` | `issuedBy` omitted | Name of the ISO certification body |
| `public/logo-options.html` | Internal design-review page in `public/` | Delete it (currently only robots-blocked + `X-Robots-Tag: noindex`) |

Client hand-over checklist document:
`/Users/mrq/Downloads/Roohulamin/ETCS-Website-Content-Handover-Checklist.docx`

---

## Security note

The Resend API key currently in use was shared in chat during setup (see
session history if the value is needed). It is stored encrypted as a
Cloudflare secret — never commit the raw value to this file or anywhere else
in the repo. The key should be rotated: revoke at
https://resend.com/api-keys, create a new send-only key, then run
`echo "re_NEW" | npx wrangler secret put RESEND_API_KEY`.

---

## Known issues & gotchas

1. **`useTranslations` in async server components** — must use `getTranslations` (async) not `useTranslations` (hook).
2. **`next/image` fill** — every `Image` with `fill` prop must have a `sizes` attribute.
3. **`SectionDots`** — `id` props on section elements must match the `sections` array `id` values exactly.
4. **`CursorSpotlight`** — must be inside a `relative isolate overflow-hidden` section to work correctly.
5. **`wrangler.jsonc`** — uses JSONC (comments allowed). Don't convert to plain JSON.
6. **`runtime = "edge"` on `proxy.ts`** — this was tried and caused a build error in Next.js 16 (proxy doesn't accept runtime config). The file is deleted. Do not re-add.
7. **`ShadingType.SOLID` in docx tables** → always use `ShadingType.CLEAR` to avoid black cell backgrounds in Word.
8. **OpenNext build is slow first time** (~60s) — subsequent deploys only upload changed assets and are much faster (~25s).
9. **Tailwind v4 + shadcn** — using `shadcn@canary` init. If re-initing shadcn, use `npx shadcn@canary init` not `npx shadcn-ui init`.
10. **`next-intl` `hasLocale`** — import from `"next-intl"`, not `"next-intl/routing"`.

---

## Outstanding / optional future work

- [ ] Replace all placeholder content with real client data (see checklist doc)
- [ ] Replace leadership monogram portraits with real photographs
- [ ] Replace SVG monogram logo with official vector logo
- [ ] Professional Arabic translation of long-form body copy (services descriptions, About narrative)
- [ ] Rotate Resend API key (old key was shared in chat)
- [ ] Optional: hero video loop (6-sec MP4 in `HeroSlideshow.tsx`)
- [ ] Optional: interactive KSA project-sites map (pulsing dots)
- [ ] Optional: press/news section
- [ ] Optional: Sanity or Payload CMS if client needs weekly self-editing
