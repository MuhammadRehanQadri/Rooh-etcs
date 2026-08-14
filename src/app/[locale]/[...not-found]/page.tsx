import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";

/**
 * Unmatched routes render the bespoke 404. They must never be indexed — the
 * catch-all is the only place metadata can be attached, since `not-found.tsx`
 * is a client component and cannot export `metadata`.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.notFound" });
  return {
    title: t("title"),
    description: t("body"),
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
