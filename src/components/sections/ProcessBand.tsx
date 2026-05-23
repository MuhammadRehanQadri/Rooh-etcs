"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import {
  SearchIcon,
  PencilRulerIcon,
  TruckIcon,
  HardHatIcon,
  CheckCircle2Icon,
} from "lucide-react";

const steps = [
  {
    n: "01",
    key: "discover",
    title: "Discover",
    body: "We listen first. Scoping calls, site walk-downs, and stakeholder reviews to lock the problem before the proposal.",
    icon: SearchIcon,
  },
  {
    n: "02",
    key: "engineer",
    title: "Engineer",
    body: "Drawings, BoQ, method statements, JSA. Pricing benchmarked, schedule baselined, every assumption documented.",
    icon: PencilRulerIcon,
  },
  {
    n: "03",
    key: "mobilize",
    title: "Mobilize",
    body: "Workforce certified and inducted. Materials staged. Equipment positioned. Iqama and access cleared in advance.",
    icon: TruckIcon,
  },
  {
    n: "04",
    key: "execute",
    title: "Execute",
    body: "Daily QA/QC, weekly progress reviews, zero-harm safety. Variance reported in hours, not weeks.",
    icon: HardHatIcon,
  },
  {
    n: "05",
    key: "handover",
    title: "Hand-over",
    body: "Punch-list closed, dossier delivered, warranty active. Operations briefed and aftercare scheduled.",
    icon: CheckCircle2Icon,
  },
];

export function ProcessBand() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="How we deliver"
          title="Five steps. One point of accountability."
          description="Industrial work that runs to schedule and on safety standards comes from disciplined process, not optimism."
          className="mb-16 max-w-3xl"
        />

        <StaggerGroup className="relative grid gap-8 lg:grid-cols-5 lg:gap-0">
          {/* Connecting line behind cards (desktop only) */}
          <div className="hidden lg:block absolute inset-x-12 top-[58px] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent -z-0" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.key}>
                <article
                  className={cn(
                    "group relative h-full bg-white lg:px-6 lg:py-2 transition-all",
                    i < steps.length - 1 && "lg:border-e lg:border-bone-200/50"
                  )}
                >
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 mb-6 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                    <Icon className="size-5" />
                    <span className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[10px] font-semibold text-navy-900 ring-2 ring-white">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-bone-600">
                    {s.body}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
