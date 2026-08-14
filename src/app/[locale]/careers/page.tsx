import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { careerRoles } from "@/content/careers";
import { SITE } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { MapPinIcon, BriefcaseIcon, ArrowRightIcon, MailIcon } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  graph,
  jobPostingSchemas,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.careers" });
  return pageMetadata({
    locale,
    path: "/careers",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.careers");
  const tNav = await getTranslations("nav");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "/careers",
      name: t("title"),
      description: t("description"),
      type: "CollectionPage",
      hasBreadcrumb: true,
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("careers"), path: "/careers" },
    ]),
    ...jobPostingSchemas(locale, careerRoles)
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <Badge variant="eyebrow">{t("rolesTitle")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                Roles open right now
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-bone-600">
                {t("applyBody")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            {careerRoles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-bone-300 p-12 text-center">
                <p className="text-sm text-bone-600 mb-6 max-w-md mx-auto">{t("noRoles")}</p>
                <Button asChild variant="primary" size="lg">
                  <a
                    href={`mailto:${SITE.careersEmail}?subject=${encodeURIComponent(
                      "Speculative application — ETCS"
                    )}`}
                  >
                    <MailIcon className="size-4" />
                    {t("speculativeCta")}
                  </a>
                </Button>
                <p className="mt-4 text-xs text-bone-500" dir="ltr">{SITE.careersEmail}</p>
              </div>
            ) : (
              <StaggerGroup className="space-y-4">
                {careerRoles.map((role) => (
                  <StaggerItem key={role.slug}>
                    <article className="group relative rounded-2xl border border-bone-200 bg-bone-50 p-6 sm:p-8 transition-all hover:border-gold-500/40 hover:bg-white hover:shadow-[0_24px_60px_-30px_rgba(15,38,69,0.3)]">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center rounded-full bg-navy-900 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-400">
                              {role.department}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.16em] text-bone-500">
                              {role.type}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-navy-900 leading-tight mb-2">
                            {role.title}
                          </h3>
                          <p className="text-sm text-bone-600 leading-relaxed mb-4 max-w-2xl">
                            {role.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-bone-600">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPinIcon className="size-3.5 text-gold-500" />
                              {role.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <BriefcaseIcon className="size-3.5 text-gold-500" />
                              {role.department}
                            </span>
                          </div>
                        </div>
                        <Button
                          asChild
                          variant="outlineDark"
                          size="md"
                          className="shrink-0"
                        >
                          <a
                            href={`mailto:${SITE.careersEmail}?subject=${encodeURIComponent(
                              `Application — ${role.title}`
                            )}`}
                          >
                            Apply
                            <ArrowRightIcon className="size-4 rtl:rotate-180" />
                          </a>
                        </Button>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
