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
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServiceCategoryGrid } from "@/components/sections/ServiceCategoryGrid";
import { ProcessBand } from "@/components/sections/ProcessBand";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
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
      <Hero />
      <CapabilityMarquee />
      <AboutPreview />
      <ServiceCategoryGrid />
      <ProcessBand />
      <ProjectShowcase />
      <ClientMarquee />
      <section className="bg-navy-900 text-white relative isolate overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,55,0.18),transparent_55%)]" />
        <div className="relative container-wide">
          <VisionMission embedded />
        </div>
      </section>
      <VendorApprovals />
      <ContactCta />
    </>
  );
}
