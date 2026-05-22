"use client";

import { useTranslations } from "next-intl";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { TargetIcon, CompassIcon } from "lucide-react";
import { GearWatermark } from "@/components/motion/GearWatermark";

export function VisionMission({ embedded = false }: { embedded?: boolean }) {
  const t = useTranslations("visionMission");

  return (
    <section className={embedded ? "" : "bg-navy-900 text-white relative isolate overflow-hidden py-24 lg:py-32"}>
      {!embedded && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,55,0.18),transparent_55%)]" />
          <GearWatermark
            className="absolute -bottom-32 -start-32 opacity-25"
            size={520}
          />
        </>
      )}
      <div className={embedded ? "" : "relative container-wide"}>
        <StaggerGroup className="grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <article className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 lg:p-10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <CompassIcon className="size-6" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold-400">
                  {t("visionTitle")}
                </p>
              </div>
              <p className="mt-8 text-xl lg:text-2xl font-display font-medium leading-snug text-white text-balance">
                {t("visionBody")}
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 lg:p-10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <TargetIcon className="size-6" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold-400">
                  {t("missionTitle")}
                </p>
              </div>
              <p className="mt-8 text-xl lg:text-2xl font-display font-medium leading-snug text-white text-balance">
                {t("missionBody")}
              </p>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
