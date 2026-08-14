import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";
import { CONTENT_LAST_MODIFIED, localeUrl } from "@/lib/seo";

/**
 * Every URL appears once per locale, and each entry carries the full hreflang
 * cluster (both locales + x-default) so the sitemap agrees with the
 * `<link rel="alternate">` tags rendered by `pageMetadata()`. Search engines
 * discard hreflang that isn't reciprocal, so these two must not drift.
 */

type Route = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

const staticRoutes: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.7, changeFrequency: "monthly" },
  { path: "/vendor-approvals", priority: 0.7, changeFrequency: "monthly" },
  { path: "/clients", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "weekly" },
];

function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localeUrl(l, path);
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const allRoutes: Route[] = [
    ...staticRoutes,
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];

  for (const locale of routing.locales) {
    for (const route of allRoutes) {
      entries.push({
        url: localeUrl(locale, route.path),
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: languagesFor(route.path) },
      });
    }
  }

  return entries;
}
