"use client";

import { useTranslations } from "next-intl";
import { coreValues } from "@/content/values";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";

export function ValuesRibbon() {
  const t = useTranslations("values");
  return (
    <section className="bg-bone-50 py-24 lg:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("headline")}
          align="center"
          className="mb-14"
        />
        <StaggerGroup
          className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.05}
        >
          {coreValues.map((v, idx) => (
            <StaggerItem key={v.key}>
              <div className="group h-full">
                <p className="font-display text-3xl font-semibold text-gold-600 mb-3 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="text-base font-semibold text-navy-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-bone-600 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
