import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** Unprefixed paths that must land on the default locale. */
const localePaths = [
  "/about",
  "/services",
  "/services/:slug",
  "/projects",
  "/clients",
  "/vendor-approvals",
  "/careers",
  "/contact",
];

/**
 * Routes that existed before the Rev 01 content rework and are now gone.
 * They were live long enough to be crawled, so they get a 308 to the page
 * that replaced them rather than a 404.
 */
const retiredPaths = [
  { from: "/:locale(en|ar)/projects/ongoing", to: "/:locale/projects" },
  { from: "/:locale(en|ar)/projects/completed", to: "/:locale/projects" },
  { from: "/:locale(en|ar)/projects/:slug", to: "/:locale/projects" },
  { from: "/projects/ongoing", to: "/en/projects" },
  { from: "/projects/completed", to: "/en/projects" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    // Widths actually requested by the layout's `sizes` attributes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Canonical URLs are emitted without trailing slashes; keep the router in
  // agreement so /about/ and /about never both resolve.
  trailingSlash: false,
  turbopack: {
    root: path.resolve(),
  },
  async redirects() {
    return [
      // Locale normalisation — permanent (308) so link equity consolidates on
      // the /en/... URL instead of being held at the redirecting URL.
      ...localePaths.map((source) => ({
        source,
        destination: `/en${source}`,
        permanent: true,
      })),
      ...retiredPaths.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        // Internal design-review artefact in public/ — keep it out of the index
        // even if someone links to it directly (robots.txt alone can't do that).
        source: "/logo-options.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
