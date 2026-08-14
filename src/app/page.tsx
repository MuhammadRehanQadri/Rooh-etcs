import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/seo";

/**
 * The bare root only ever redirects to the default locale, but it still needs
 * `metadataBase` so the sitewide OpenGraph card at `/opengraph-image` resolves
 * to an absolute URL instead of falling back to localhost at build time.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: `${BASE_URL}/${routing.defaultLocale}` },
};

export default function RootPage() {
  // Deliberately a 307, not a 308. Unprefixed content paths (/about, /services)
  // are permanent redirects in next.config.ts because they are pure URL
  // normalisation, but "/" is the URL people actually link to, and Google's
  // i18n guidance is to keep a locale-selecting root redirect temporary so the
  // destination can change later. /en carries a self-referencing canonical and
  // is the x-default, so nothing is lost by leaving this one temporary.
  redirect(`/${routing.defaultLocale}`);
}
