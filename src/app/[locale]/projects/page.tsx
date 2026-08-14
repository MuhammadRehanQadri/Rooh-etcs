import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { work } from "@/content/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  return pageMetadata({
    locale,
    path: "/projects",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projects");
  const tNav = await getTranslations("nav");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "/projects",
      name: t("title"),
      description: t("description"),
      type: "CollectionPage",
      hasBreadcrumb: true,
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("projects"), path: "/projects" },
    ]),
    // The gallery links each discipline through to its service page, so the
    // list items point at those canonical URLs rather than at anchors.
    itemListSchema(
      locale,
      "/projects",
      t("title"),
      work.map((w) => ({
        name: w.title,
        path: w.service ? `/services/${w.service}` : "/projects",
        description: w.blurb,
        image: w.image,
      }))
    )
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <WorkGallery />
      <ContactCta />
    </>
  );
}
