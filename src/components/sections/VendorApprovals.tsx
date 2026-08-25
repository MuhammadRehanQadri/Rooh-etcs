"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { vendorApprovals } from "@/content/vendor-approvals";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export function VendorApprovals() {
  const t = useTranslations();

  return (
    <section className="flex justify-center py-20 lg:py-[120px] border-b border-bp-ink/16 bg-bp-paper">
      <div className="container-wide grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-[70px] items-start">
        <div>
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick mb-4 uppercase">
            SEC. 05 / {t("vendorApprovalsPreview.eyebrow")}
          </div>
          <h2 className="font-bp-display font-semibold text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.06] tracking-[-0.015em] text-bp-ink mb-4">
            {t("vendorApprovalsPreview.headline")}
          </h2>
          <p className="text-[16.5px] leading-[1.66] font-bp-sans font-light text-bp-body mb-7">
            {t("vendorApprovalsPreview.subheadline")}
          </p>
          <Link
            href="/vendor-approvals"
            className="inline-flex items-center gap-2.5 font-bp-display font-semibold text-[14.5px] tracking-[0.06em] uppercase text-bp-ink border-b-2 border-bp-brick pb-1.5 transition-colors hover:text-bp-brick"
          >
            {t("vendorApprovalsPreview.cta")} <span>→</span>
          </Link>
        </div>
        <StaggerGroup className="border-t border-bp-ink/20">
          {vendorApprovals.map((v) => {
            const approved = v.status === "approved";
            const chip =
              v.type === "certification"
                ? approved
                  ? "CERTIFIED"
                  : "IN PROGRESS"
                : approved
                ? "REGISTERED"
                : "IN PROGRESS";
            const color = approved ? (v.type === "certification" ? "text-bp-bronze border-bp-bronze" : "text-bp-brick border-bp-brick") : "text-bp-meta border-bp-meta";
            return (
              <StaggerItem key={v.name}>
                <div className="flex justify-between items-center gap-5 py-[17px] border-b border-bp-ink/14">
                  <span className="font-bp-display font-medium text-[17px] text-bp-ink">{v.name}</span>
                  <span className={`font-bp-mono text-[9.5px] tracking-[0.14em] border px-2.5 py-1 whitespace-nowrap ${color}`}>
                    {chip}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
