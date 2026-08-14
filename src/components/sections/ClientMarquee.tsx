"use client";

import { useTranslations } from "next-intl";
import { sectors } from "@/content/clients";
import { Marquee } from "@/components/motion/Marquee";
import { SectionHeading } from "./SectionHeading";

/**
 * Rev 01 — no client names/logos (ETCS is newly established). This band shows
 * the SECTORS ETCS serves, scrolling as editorial chips.
 */
export function ClientMarquee() {
  const t = useTranslations();
  const chips = sectors.map((s) => s.title);
  return (
    <section className="bg-white py-24 lg:py-28 border-y border-bone-200">
      <div className="container-wide">
        <SectionHeading
          eyebrow={t("clientsPreview.eyebrow")}
          title={t("clientsPreview.headline")}
          align="center"
          className="mb-14"
        />
      </div>
      <Marquee speed={50}>
        {chips.map((name) => (
          <SectorChip key={name} name={name} />
        ))}
      </Marquee>
      <Marquee speed={45} reverse className="mt-8">
        {chips.slice().reverse().map((name) => (
          <SectorChip key={`r-${name}`} name={name} />
        ))}
      </Marquee>
    </section>
  );
}

function SectorChip({ name }: { name: string }) {
  return (
    <div className="flex h-16 min-w-[220px] items-center justify-center rounded-xl border border-bone-200 bg-white px-7 transition-colors hover:border-gold-500/40 hover:bg-bone-50">
      <span className="text-sm font-medium tracking-tight text-bone-600 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
