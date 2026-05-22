import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { vendorApprovals } from "@/content/vendor-approvals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { CheckCircle2Icon, ShieldCheckIcon, HandshakeIcon, DownloadIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.vendorApprovals" });
  return { title: t("title") };
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

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Badge variant="eyebrow">Approved by</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 mb-10 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                Operators & client approvals
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
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-bone-500">
                        Pre-qualified vendor
                      </p>
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
