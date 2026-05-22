import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";

const BASE = "https://etcs-ksa.com";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/projects/ongoing",
  "/projects/completed",
  "/clients",
  "/vendor-approvals",
  "/careers",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}${route}`])
          ),
        },
      });
    }
    for (const s of services) {
      entries.push({
        url: `${BASE}/${locale}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
