import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/utils";
import { services } from "@/content/services";
import { vendorApprovals } from "@/content/vendor-approvals";

/**
 * Single source of truth for every SEO signal the site emits.
 *
 * Nothing here invents facts: every value is derived from `SITE`
 * (src/lib/utils.ts) or from the typed content modules. Fields we have no
 * real data for (geo coordinates, social profiles, founding date, headcount)
 * are deliberately omitted rather than guessed — see CLAUDE.md Rev 01.
 */

export const BASE_URL = SITE.url;

/**
 * Date the site's content was last substantively revised, used for sitemap
 * `<lastmod>`.
 *
 * Deliberately a constant rather than `new Date()`: build time would stamp
 * every URL as "changed" on every deploy, and Google discounts a `lastmod`
 * it can see is inaccurate. **Bump this when page copy or services change** —
 * not for code-only deploys.
 */
export const CONTENT_LAST_MODIFIED = "2026-08-14";

/** OpenGraph locale codes keyed by our routing locales. */
const OG_LOCALE: Record<string, string> = { en: "en_US", ar: "ar_SA" };

/** BCP-47 codes used for hreflang. Region-qualified so KSA/Gulf targeting is explicit. */
const HREFLANG: Record<string, string> = { en: "en", ar: "ar" };

/** Absolute, locale-prefixed URL. `path` must start with "/" or be "". */
export function localeUrl(locale: string, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `${BASE_URL}/${locale}${clean}`;
}

/**
 * canonical + full hreflang cluster (including x-default) for one page.
 * Every locale variant of a page must return the same cluster — that
 * reciprocity is what makes hreflang valid.
 */
export function alternatesFor(locale: string, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[HREFLANG[l] ?? l] = localeUrl(l, path);
  }
  languages["x-default"] = localeUrl(routing.defaultLocale, path);

  return { canonical: localeUrl(locale, path), languages };
}

/**
 * Trims a description to a length that survives intact in a SERP snippet,
 * cutting on a word boundary rather than mid-word.
 */
export function clampDescription(text: string, max = 158): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\-–—]$/, "")}…`;
}

type PageSeo = {
  locale: string;
  /** Locale-relative path, e.g. "" for home, "/about", "/services/fireproofing" */
  path?: string;
  /** Page title WITHOUT the "| ETCS" suffix (the layout template adds it). */
  title: string;
  description: string;
  /** Keyword hints for this page (optional — a weak signal, but harmless). */
  keywords?: string[];
  /** Set for utility routes that must stay out of the index. */
  noIndex?: boolean;
  /** Use the title verbatim (no "| ETCS" template) — home page only. */
  absoluteTitle?: boolean;
  /**
   * Route-relative path of a route-specific generated card, e.g.
   * "/en/services/fireproofing/opengraph-image". Defaults to the sitewide card.
   */
  ogImagePath?: string;
  /** Alt text for the social card. */
  ogImageAlt?: string;
};

/** The sitewide generated social card (src/app/opengraph-image.tsx). */
const DEFAULT_OG_IMAGE = "/opengraph-image";
const DEFAULT_OG_ALT = "ETCS — Where Vision Becomes Reality";

/** Ready-made image descriptor for the sitewide card. */
export const OG_IMAGE = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: DEFAULT_OG_ALT,
} as const;

/**
 * Builds a complete, correct Metadata object for a page:
 * canonical, reciprocal hreflang, OpenGraph and Twitter.
 *
 * `openGraph.images` is set explicitly rather than relying on the
 * `opengraph-image` file convention: a page that declares its own `openGraph`
 * object replaces the parent's wholesale, so an inherited card from
 * `src/app/opengraph-image.tsx` silently disappears (which is exactly what was
 * happening on every page except the service details).
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  noIndex,
  absoluteTitle,
  ogImagePath,
  ogImageAlt,
}: PageSeo): Metadata {
  const url = localeUrl(locale, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.shortName}`;
  const alternateLocales = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l] ?? l);
  const image = {
    url: ogImagePath ?? DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: ogImageAlt ?? DEFAULT_OG_ALT,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      url,
      siteName: SITE.shortName,
      title: fullTitle,
      description,
      locale: OG_LOCALE[locale] ?? locale,
      alternateLocale: alternateLocales,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/* ───────────────────────── structured data ───────────────────────── */

const ORG_ID = `${BASE_URL}/#organization`;
const SITE_ID = `${BASE_URL}/#website`;
const LOGO_ID = `${BASE_URL}/#logo`;

/** PostalAddress decomposed from the single address string in SITE. */
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Omar Bin Abdul Aziz Street, Dana District",
  postOfficeBoxNumber: "35514",
  addressLocality: "Al Jubail",
  addressRegion: "Eastern Province",
  addressCountry: "SA",
} as const;

/** Sat–Thu 07:00–18:00, Friday closed — matches SITE.workingHours. */
const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "07:00",
    closes: "18:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Friday"],
    opens: "00:00",
    closes: "00:00",
  },
];

/** Only ISO certificates that are actually held (status "approved"). */
function certifications() {
  return vendorApprovals
    .filter((v) => v.type === "certification" && v.status === "approved" && v.certNo)
    .map((v) => ({
      "@type": "Certification",
      name: v.name.split("—")[0].trim(),
      identifier: v.certNo,
      about: v.detail,
      certificationStatus: "CertificationActive",
      // `issuedBy` omitted on purpose — the certification body's name has not
      // been supplied. Add it here once the client provides the certificates.
      ...(v.validToISO ? { expires: v.validToISO } : {}),
    }));
}

/**
 * The Organization / GeneralContractor entity. Emitted once per page from the
 * locale layout and referenced by @id everywhere else.
 */
export function organizationSchema(locale: string) {
  return {
    "@type": ["Organization", "GeneralContractor"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: [SITE.shortName, "Expert Technical Contracting and Services"],
    url: BASE_URL,
    slogan: SITE.tagline,
    description:
      "Expert Technical Contracting & Services (ETCS) delivers industrial coating, insulation, refractory, fireproofing, piping and fabrication, civil construction, electrical and instrumentation, solar, inspection, manpower and equipment supply across the Kingdom of Saudi Arabia.",
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${BASE_URL}/images/logo/logo-3d.jpg`,
      contentUrl: `${BASE_URL}/images/logo/logo-3d.jpg`,
      caption: SITE.name,
    },
    image: { "@id": LOGO_ID },
    email: SITE.emails.info,
    telephone: SITE.phone,
    address: postalAddress,
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "AdministrativeArea", name: "Eastern Province" },
    ],
    knowsLanguage: ["en", "ar"],
    openingHoursSpecification: openingHours,
    hasCertification: certifications(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phone,
        email: SITE.emails.info,
        areaServed: "SA",
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.emails.sales,
        areaServed: "SA",
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "human resources",
        email: SITE.careersEmail,
        areaServed: "SA",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technical contracting & industrial services",
      inLanguage: locale,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.shortDescription,
          url: localeUrl(locale, `/services/${s.slug}`),
        },
      })),
    },
    // `sameAs` intentionally omitted: no live social profiles yet (Rev 01).
    // `geo` intentionally omitted: exact office coordinates not supplied.
  };
}

/** The WebSite entity — enables sitelinks-style understanding and language scoping. */
export function websiteSchema(locale: string, name: string, description: string) {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: BASE_URL,
    name,
    description,
    inLanguage: locale === "ar" ? "ar-SA" : "en",
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList. `path` values are locale-relative ("" = home). */
export function breadcrumbSchema(locale: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${localeUrl(locale, crumbs[crumbs.length - 1]?.path ?? "")}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: localeUrl(locale, c.path),
    })),
  };
}

/** WebPage node tying a page to the org, the site and its breadcrumb. */
export function webPageSchema({
  locale,
  path = "",
  name,
  description,
  type = "WebPage",
  hasBreadcrumb = false,
}: {
  locale: string;
  path?: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  hasBreadcrumb?: boolean;
}) {
  const url = localeUrl(locale, path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === "ar" ? "ar-SA" : "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

/** Service entity for a single service detail page. */
export function serviceSchema(
  locale: string,
  s: (typeof services)[number],
  categoryLabel: string
) {
  const url = localeUrl(locale, `/services/${s.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.title,
    description: s.description,
    url,
    serviceType: categoryLabel,
    category: categoryLabel,
    image: `${BASE_URL}${s.heroImage}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    audience: s.sectors.map((sector) => ({
      "@type": "BusinessAudience",
      name: sector,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} — scope of work`,
      itemListElement: s.scope.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/** Generic ItemList — used for the services index and the work gallery. */
export function itemListSchema(
  locale: string,
  path: string,
  name: string,
  items: { name: string; path: string; description?: string; image?: string }[]
) {
  return {
    "@type": "ItemList",
    "@id": `${localeUrl(locale, path)}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: localeUrl(locale, it.path),
      ...(it.description ? { description: it.description } : {}),
      ...(it.image ? { image: `${BASE_URL}${it.image}` } : {}),
    })),
  };
}

/**
 * JobPosting nodes for the careers page.
 *
 * Only roles carrying a real `datePosted` are emitted — Google requires that
 * property, and inventing one would misrepresent how long a role has been open.
 */
export function jobPostingSchemas(
  locale: string,
  roles: {
    slug: string;
    title: string;
    location: string;
    department: string;
    type: string;
    description: string;
    datePosted?: string;
    validThrough?: string;
  }[]
) {
  return roles
    .filter((r) => Boolean(r.datePosted))
    .map((r) => ({
      "@type": "JobPosting",
      "@id": `${localeUrl(locale, "/careers")}#${r.slug}`,
      title: r.title,
      description: r.description,
      datePosted: r.datePosted,
      ...(r.validThrough ? { validThrough: r.validThrough } : {}),
      employmentType:
        r.type === "Full-time" ? "FULL_TIME" : r.type === "Contract" ? "CONTRACTOR" : "TEMPORARY",
      industry: r.department,
      hiringOrganization: { "@id": ORG_ID },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: r.location,
          addressCountry: "SA",
        },
      },
      applicantLocationRequirements: { "@type": "Country", name: "Saudi Arabia" },
      directApply: true,
    }));
}

export function faqSchema(
  locale: string,
  path: string,
  qa: { q: string; a: string }[]
) {
  return {
    "@type": "FAQPage",
    "@id": `${localeUrl(locale, path)}#faq`,
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Wraps nodes in a single @graph document — one <script> per page. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
