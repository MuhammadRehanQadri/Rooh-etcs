"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { work } from "@/content/projects";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { useTier } from "@/lib/use-tier";
import { cn } from "@/lib/utils";

const GAP = 22;

export function ProjectShowcase() {
  const t = useTranslations();
  const tier = useTier();
  const visible = tier === "wide" ? 3 : tier === "mid" ? 2 : 1;
  const maxIndex = Math.max(0, work.length - visible);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const cardBasis = `calc((100% - ${(visible - 1) * GAP}px)/${visible})`;
  const shift = index === 0 ? "none" : `translateX(calc(-1 * ${index} * (${cardBasis} + ${GAP}px)))`;

  return (
    <section className="flex justify-center py-20 lg:py-[120px] border-b border-bp-ink/16 bg-bp-paper">
      <div className="container-wide">
        <div className="flex justify-between items-end gap-12 flex-wrap mb-[52px]">
          <div className="max-w-[700px]">
            <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick mb-4 uppercase">
              SEC. 04 / {t("projectsPreview.eyebrow")}
            </div>
            <h2 className="font-bp-display font-semibold text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.015em] text-bp-ink mb-4">
              {t("projectsPreview.headline")}
            </h2>
            <p className="text-[17px] leading-[1.66] font-bp-sans font-light text-bp-body">
              {t("projectsPreview.subheadline")}
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 font-bp-display font-semibold text-[14.5px] tracking-[0.06em] uppercase text-bp-ink border-b-2 border-bp-brick pb-1.5 whitespace-nowrap transition-colors hover:text-bp-brick"
          >
            {t("projectsPreview.viewAll")} <span>→</span>
          </Link>
        </div>

        <div className="flex justify-between items-center gap-5 mb-6">
          <div className="flex items-center gap-3.5 font-bp-mono text-[10px] tracking-[0.14em] text-bp-meta">
            <span className="text-bp-ink">{String(index + 1).padStart(2, "0")}</span>
            <span className="block w-[74px] h-px bg-bp-ink/22" />
            <span>{String(work.length).padStart(2, "0")}</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              aria-label="Previous"
              className={cn(
                "w-[46px] h-[46px] border font-bp-mono text-[15px] transition-colors",
                index === 0
                  ? "border-bp-ink/18 text-bp-ink/28 cursor-not-allowed"
                  : "border-bp-ink/50 text-bp-ink cursor-pointer hover:bg-bp-ink/5"
              )}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={index === maxIndex}
              aria-label="Next"
              className={cn(
                "w-[46px] h-[46px] border font-bp-mono text-[15px] transition-colors",
                index === maxIndex
                  ? "border-bp-ink/18 text-bp-ink/28 cursor-not-allowed"
                  : "border-bp-ink/50 text-bp-ink cursor-pointer hover:bg-bp-ink/5"
              )}
            >
              →
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <StaggerGroup
            className="flex gap-[22px] transition-transform duration-[800ms] ease-[cubic-bezier(.22,.68,.28,1)]"
            style={{ transform: shift }}
          >
            {work.map((item) => (
              <StaggerItem key={item.slug} style={{ flex: `0 0 ${cardBasis}` }}>
                <Link
                  href={`/services/${item.service ?? ""}` as never}
                  className="group block h-full bg-white/55 border border-bp-ink/16 p-3.5 text-bp-ink transition-colors hover:border-bp-brick hover:bg-white"
                >
                  <div className="relative aspect-[5/4] overflow-hidden mb-4.5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover [filter:saturate(.72)]"
                    />
                  </div>
                  <div className="flex justify-between items-center font-bp-mono text-[9.5px] tracking-[0.14em] mb-3.5">
                    <span className="text-bp-brick uppercase">{t(`categories.${item.category}` as never)}</span>
                  </div>
                  <h3 className="font-bp-display font-semibold text-lg leading-[1.2] mb-4 min-h-[44px]">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.55] font-bp-sans font-light text-bp-muted pt-3 border-t border-bp-ink/14">
                    {item.blurb}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
