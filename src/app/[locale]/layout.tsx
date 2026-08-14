import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sora, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, OG_IMAGE, graph, organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/utils";
import "../globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // An unknown locale segment (e.g. /some-random-url) 404s in the layout body,
  // but generateMetadata still runs first. Bail out before building canonical,
  // hreflang and OpenGraph tags for a URL that doesn't exist — Next adds the
  // `noindex` for the 404 status itself.
  if (!hasLocale(routing.locales, locale)) {
    return { metadataBase: new URL(BASE_URL) };
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(BASE_URL),
    title: { template: t("titleTemplate"), default: t("title") },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    applicationName: SITE.shortName,
    generator: undefined,
    authors: [{ name: SITE.legalName, url: BASE_URL }],
    creator: SITE.legalName,
    publisher: SITE.legalName,
    category: "Industrial contracting",
    // Referrer-Policy is set as a response header in next.config.ts — don't
    // also emit a <meta name="referrer"> with a different value.
    formatDetection: { telephone: true, address: true, email: true },
    // NOTE: `alternates` is deliberately NOT set here. Setting canonical /
    // hreflang at the layout level made every page advertise the homepage as
    // its alternate. Each page supplies its own cluster via `pageMetadata()`.
    openGraph: {
      type: "website",
      url: `${BASE_URL}/${locale}`,
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      siteName: SITE.shortName,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [OG_IMAGE],
    },
    // No `robots` here on purpose. When a child route calls notFound(), Next
    // discards that route's metadata and falls back to the layout's, so a
    // layout-level "index, follow" would sit next to the `noindex` Next injects
    // for the 404 status. Every real page sets its own robots via
    // `pageMetadata()`; the absence of a tag means index+follow anyway.
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  // Sitewide entity graph. Page-level graphs reference these nodes by @id.
  const siteGraph = graph(
    organizationSchema(locale),
    websiteSchema(locale, tMeta("title"), tMeta("description"))
  );

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sora.variable} ${inter.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen bg-white antialiased">
        <JsonLd data={siteGraph} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-navy-900"
        >
          {tCommon("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main" className="pt-0">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
