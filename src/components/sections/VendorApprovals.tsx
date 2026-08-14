"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { vendorApprovals } from "@/content/vendor-approvals";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, ShieldCheckIcon } from "lucide-react";

export function VendorApprovals() {
  const t = useTranslations();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-end mb-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={t("vendorApprovalsPreview.eyebrow")}
              title={t("vendorApprovalsPreview.headline")}
              description={t("vendorApprovalsPreview.subheadline")}
            />
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Button asChild variant="outlineDark">
              <Link href="/vendor-approvals">
                {t("vendorApprovalsPreview.cta")} →
              </Link>
            </Button>
          </div>
        </div>

        <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vendorApprovals.map((v) => (
            <StaggerItem key={v.name}>
              <div className="flex items-start gap-4 rounded-xl border border-bone-200 bg-bone-50 p-5 transition-colors hover:border-gold-500/40 hover:bg-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
                  {v.type === "certification" ? (
                    <ShieldCheckIcon className="size-5" />
                  ) : (
                    <CheckCircle2Icon className="size-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-900 leading-tight">
                    {v.name}
                  </p>
                  {v.detail && (
                    <p className="mt-1 text-xs text-bone-600">{v.detail}</p>
                  )}
                  {v.status === "in-progress" && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-gold-700">
                      <span className="size-1.5 rounded-full bg-gold-500 animate-pulse" />
                      In progress
                    </span>
                  )}
                  {v.certNo && (
                    <p className="mt-1 text-[11px] text-bone-500 tabular-nums">
                      Cert {v.certNo}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
