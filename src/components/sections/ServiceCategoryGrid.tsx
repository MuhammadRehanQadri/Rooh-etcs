"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  HardHatIcon,
  HammerIcon,
  CpuIcon,
  TruckIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const categoryMeta = [
  {
    slug: "industrial",
    icon: HardHatIcon,
    countKey: "5",
    accent: "from-gold-500/20 to-transparent",
    tone: "industrial",
  },
  {
    slug: "construction",
    icon: HammerIcon,
    countKey: "3",
    accent: "from-navy-500/20 to-transparent",
    tone: "construction",
  },
  {
    slug: "engineering",
    icon: CpuIcon,
    countKey: "4",
    accent: "from-gold-400/20 to-transparent",
    tone: "engineering",
  },
  {
    slug: "supply",
    icon: TruckIcon,
    countKey: "3",
    accent: "from-navy-400/20 to-transparent",
    tone: "supply",
  },
] as const;

export function ServiceCategoryGrid({ dark = false }: { dark?: boolean }) {
  const t = useTranslations();

  return (
    <section className={cn("py-24 lg:py-32", dark ? "bg-navy-900" : "bg-white")}>
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow={t("servicesPreview.eyebrow")}
            title={t("servicesPreview.headline")}
            description={t("servicesPreview.subheadline")}
            dark={dark}
          />
          <Link
            href="/services"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium gold-underline self-start lg:self-end",
              dark ? "text-gold-400" : "text-navy-900"
            )}
          >
            {t("servicesPreview.cta")} →
          </Link>
        </div>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryMeta.map((meta) => {
            const Icon = meta.icon;
            return (
              <StaggerItem key={meta.slug}>
                <Link
                  href={{ pathname: "/services", hash: meta.slug } as never}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1",
                    dark
                      ? "bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-gold-500/30"
                      : "bg-bone-50 border border-bone-200 hover:bg-white hover:shadow-[0_24px_60px_-30px_rgba(15,38,69,0.3)] hover:border-gold-500/40"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    meta.accent
                  )} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-xl",
                        dark ? "bg-gold-500/10 text-gold-400" : "bg-navy-900 text-gold-500"
                      )}>
                        <Icon className="size-6" />
                      </div>
                      <ArrowUpRightIcon className={cn(
                        "size-5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-90 group-hover:-translate-y-1 rtl:group-hover:-translate-y-1 rtl:group-hover:translate-x-0",
                        dark ? "text-white/40 group-hover:text-gold-400" : "text-bone-400 group-hover:text-navy-900"
                      )} />
                    </div>
                    <h3 className={cn(
                      "mt-8 text-xl font-semibold leading-tight",
                      dark ? "text-white" : "text-navy-900"
                    )}>
                      {t(`categories.${meta.slug}` as never)}
                    </h3>
                    <p className={cn(
                      "mt-3 text-sm leading-relaxed",
                      dark ? "text-white/65" : "text-bone-600"
                    )}>
                      {t(`categories.${meta.slug}Description` as never)}
                    </p>
                    <p className={cn(
                      "mt-6 pt-6 text-[11px] uppercase tracking-[0.18em] border-t",
                      dark ? "border-white/10 text-gold-400" : "border-bone-200 text-bone-500"
                    )}>
                      {meta.countKey} services →
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
