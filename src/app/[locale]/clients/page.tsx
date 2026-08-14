import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { ClientsBoard } from "@/components/sections/ClientsBoard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.clients" });
  return pageMetadata({
    locale,
    path: "/clients",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.clients");
  const tNav = await getTranslations("nav");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "/clients",
      name: t("title"),
      description: t("description"),
      type: "CollectionPage",
      hasBreadcrumb: true,
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("clients"), path: "/clients" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <ClientsBoard />
      <ContactCta />
    </>
  );
}
