import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { vendorApprovals } from "@/content/vendor-approvals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { CheckCircle2Icon, ShieldCheckIcon, HandshakeIcon, DownloadIcon } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.vendorApprovals" });
  return pageMetadata({
    locale,
    path: "/vendor-approvals",
    title: t("metaTitle"),
    description: t("description"),
    keywords: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "ISO 45001:2018",
      "vendor pre-qualification Saudi Arabia",
    ],
  });
}

export default async function VendorApprovalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.vendorApprovals");
  const tNav = await getTranslations("nav");

  const operators = vendorApprovals.filter((v) => v.type === "operator");
  const certifications = vendorApprovals.filter((v) => v.type === "certification");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "/vendor-approvals",
      name: t("title"),
      description: t("description"),
      hasBreadcrumb: true,
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("vendorApprovals"), path: "/vendor-approvals" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Badge variant="eyebrow">Operator registrations</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 mb-10 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                Registered with Saudi Aramco, more underway
              </h2>
            </Reveal>
            <StaggerGroup className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
              {operators.map((v) => (
                <StaggerItem key={v.name}>
                  <div className="flex items-start gap-4 rounded-xl border border-bone-200 bg-bone-50 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
                      <CheckCircle2Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">{v.name}</p>
                      {v.detail && (
                        <p className="mt-1 text-xs text-bone-600">{v.detail}</p>
                      )}
                      {v.status === "approved" ? (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-navy-900/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-navy-900">
                          <span className="size-1.5 rounded-full bg-navy-900" />
                          Registered
                        </span>
                      ) : (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-gold-700">
                          <span className="size-1.5 rounded-full bg-gold-500 animate-pulse" />
                          In progress
                        </span>
                      )}
                      {v.vendorCode && (
                        <p className="mt-2 text-[11px] text-bone-500 tabular-nums">
                          Vendor code {v.vendorCode}
                        </p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <Badge variant="eyebrow">Certifications</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 mb-10 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                Management systems & inspections
              </h2>
            </Reveal>
            <StaggerGroup className="space-y-3" stagger={0.05}>
              {certifications.map((c) => (
                <StaggerItem key={c.name}>
                  <div className="flex items-start gap-4 rounded-xl border border-bone-200 bg-navy-900 text-white p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-400">
                      <ShieldCheckIcon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{c.name}</p>
                      {c.detail && (
                        <p className="mt-1 text-xs text-white/65">{c.detail}</p>
                      )}
                      {c.certNo && (
                        <p className="mt-2 text-[11px] text-gold-400 tabular-nums">
                          Cert {c.certNo}
                          {c.validTo ? ` · valid to ${c.validTo}` : ""}
                        </p>
                      )}
                      {!c.certNo && c.status === "in-progress" && (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-gold-400">
                          <span className="size-1.5 rounded-full bg-gold-400 animate-pulse" />
                          In progress
                        </span>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-bone-200 bg-bone-50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600 mb-4">
                  <HandshakeIcon className="size-5" />
                </div>
                <p className="text-sm font-semibold text-navy-900 mb-1">
                  Capability statement
                </p>
                <p className="text-xs text-bone-600 mb-5 leading-relaxed">
                  Detailed certifications, ISO documents, vendor approval letters and
                  references available on request.
                </p>
                <Button asChild size="md" variant="primary">
                  <a href="/documents/etcs-company-profile.pdf" download>
                    <DownloadIcon className="size-4" />
                    {tNav("downloadProfile")}
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
