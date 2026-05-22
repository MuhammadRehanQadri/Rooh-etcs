"use client";

import { useTranslations } from "next-intl";
import { clients } from "@/content/clients";
import { Marquee } from "@/components/motion/Marquee";
import { SectionHeading } from "./SectionHeading";

export function ClientMarquee() {
  const t = useTranslations();
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
        {clients.map((c) => (
          <ClientChip key={c.name} name={c.name} />
        ))}
      </Marquee>
      <Marquee speed={45} reverse className="mt-8">
        {clients.slice().reverse().map((c) => (
          <ClientChip key={`r-${c.name}`} name={c.name} />
        ))}
      </Marquee>
    </section>
  );
}

function ClientChip({ name }: { name: string }) {
  return (
    <div className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-bone-200 bg-white px-6 transition-colors hover:border-gold-500/40 hover:bg-bone-50">
      <span className="text-sm font-medium tracking-tight text-bone-600 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
