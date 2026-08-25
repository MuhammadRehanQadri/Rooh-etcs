"use client";

import { useTranslations } from "next-intl";
import { sectors } from "@/content/clients";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

/**
 * Rev 01 constraint carries forward: ETCS is newly established and does not
 * display client names/logos. This is the sectors ETCS serves, in the
 * Blueprint "trusted by" grid treatment — cells keyed by real sector data,
 * not fabricated company names.
 */
export function TrustedBySectors() {
  const t = useTranslations();

  return (
    <section className="flex justify-center py-16 lg:py-[100px] border-b border-bp-ink/16 bg-bp-paper">
      <div className="container-wide">
        <div className="flex items-baseline gap-5 mb-10">
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick whitespace-nowrap uppercase">
            {t("clientsPreview.eyebrow")}
          </div>
          <div className="flex-1 h-px bg-bp-ink/20" />
        </div>
        <h2 className="font-bp-display font-medium text-[clamp(1.5rem,2.6vw,2.125rem)] text-bp-ink max-w-[26ch] mb-12">
          {t("clientsPreview.headline")}
        </h2>
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bp-ink/14 border border-bp-ink/14">
          {sectors.map((s) => (
            <StaggerItem key={s.key}>
              <div className="bg-bp-paper h-full p-6 min-h-[140px] flex flex-col justify-between gap-3">
                <span className="font-bp-display font-medium text-base leading-[1.3] text-bp-ink">
                  {s.title}
                </span>
                <div>
                  <span className="font-bp-mono text-[9px] tracking-[0.14em] text-bp-faint uppercase">
                    {s.key}
                  </span>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] font-bp-sans font-light text-bp-muted">
                    {s.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
