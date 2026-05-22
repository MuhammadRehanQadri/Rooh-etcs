import { setRequestLocale } from "next-intl/server";
import { Toaster } from "sonner";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServiceCategoryGrid } from "@/components/sections/ServiceCategoryGrid";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { VisionMission } from "@/components/sections/VisionMission";
import { VendorApprovals } from "@/components/sections/VendorApprovals";
import { ContactCta } from "@/components/sections/ContactCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Toaster richColors position="top-center" closeButton />
      <Hero />
      <AboutPreview />
      <ServiceCategoryGrid />
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
