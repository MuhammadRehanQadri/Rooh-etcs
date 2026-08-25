"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

export function VisionMission() {
  const t = useTranslations("visionMission");

  return (
    <section className="flex justify-center py-20 lg:py-[110px] border-b border-bp-ink/16">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-px bg-bp-ink/16 border border-bp-ink/16">
        <Reveal className="bg-bp-paper p-9 lg:p-[52px]">
          <div className="flex items-center gap-3 font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick mb-6 uppercase">
            <span className="block w-[22px] h-px bg-bp-brick" />
            {t("visionTitle")}
          </div>
          <p className="font-bp-display font-normal text-[22px] leading-[1.5] text-bp-ink">
            {t("visionBody")}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="bg-white/60 p-9 lg:p-[52px]">
          <div className="flex items-center gap-3 font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-bronze mb-6 uppercase">
            <span className="block w-[22px] h-px bg-bp-bronze" />
            {t("missionTitle")}
          </div>
          <p className="font-bp-display font-normal text-[22px] leading-[1.5] text-bp-ink">
            {t("missionBody")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
