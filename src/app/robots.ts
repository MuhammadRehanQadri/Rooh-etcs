import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

/**
 * Crawl policy.
 *
 * - `/api/` is server-only; crawling it wastes budget and returns nothing useful.
 * - `/logo-options.html` is an internal design-review page sitting in `public/`.
 *   It is thin, unbranded and should never rank — blocked here and additionally
 *   served with `X-Robots-Tag: noindex` (see next.config.ts headers()).
 * - Answer engines (GPTBot, ClaudeBot, PerplexityBot, …) are left allowed on
 *   purpose: for a B2B contractor, being cited in AI answers is upside. Flip
 *   any of them to a disallow rule if the client objects.
 */
export default function robots(): MetadataRoute.Robots {
  // `/_next/` is deliberately NOT blocked — Google must fetch the JS and CSS
  // bundles to render the page the way a user sees it.
  const disallow = ["/api/", "/logo-options.html"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Explicit entries keep the two engines that matter most in KSA from
      // inheriting any future tightening of the wildcard rule by accident.
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
