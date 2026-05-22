import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(),
  },
  async redirects() {
    return [
      { source: "/about", destination: "/en/about", permanent: false },
      { source: "/services", destination: "/en/services", permanent: false },
      { source: "/services/:slug", destination: "/en/services/:slug", permanent: false },
      { source: "/projects", destination: "/en/projects/ongoing", permanent: false },
      { source: "/projects/:rest*", destination: "/en/projects/:rest*", permanent: false },
      { source: "/clients", destination: "/en/clients", permanent: false },
      { source: "/vendor-approvals", destination: "/en/vendor-approvals", permanent: false },
      { source: "/careers", destination: "/en/careers", permanent: false },
      { source: "/contact", destination: "/en/contact", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
