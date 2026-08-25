import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  graph,
  itemListSchema,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo";
import { services } from "@/content/services";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ProcessBand } from "@/components/sections/ProcessBand";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { TrustedBySectors } from "@/components/sections/TrustedBySectors";
import { VisionMission } from "@/components/sections/VisionMission";
import { VendorApprovals } from "@/components/sections/VendorApprovals";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations("metadata");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "",
      name: tMeta("title"),
      description: tMeta("description"),
    }),
    itemListSchema(
      locale,
      "",
      "ETCS services",
      services.map((s) => ({
        name: s.title,
        path: `/services/${s.slug}`,
        description: s.shortDescription,
      }))
    )
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <Toaster richColors position="top-center" closeButton />
      <div className="bp-grid">
        <Hero />
        <StatsStrip />
        <CapabilityMarquee />
        <AboutPreview />
        <WhatWeDo />
        <ProcessBand />
        <ProjectShowcase />
        <VisionMission />
        <TrustedBySectors />
        <VendorApprovals />
      </div>
      <ContactCta />
    </>
  );
}
