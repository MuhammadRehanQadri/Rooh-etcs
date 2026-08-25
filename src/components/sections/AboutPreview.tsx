"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { pillars } from "@/content/pillars";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="flex justify-center py-20 lg:py-[120px] border-b border-bp-ink/16 bg-bp-paper">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-[60px] items-start">
        <div className="lg:sticky lg:top-[120px]">
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick mb-2.5">SEC. 01</div>
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-meta pt-2.5 border-t border-bp-ink/20 uppercase">
            {t("eyebrow")}
          </div>
        </div>
        <div>
          <Reveal>
            <h2 className="font-bp-display font-semibold text-[clamp(2.25rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.015em] max-w-[22ch] text-bp-ink mb-11 text-pretty">
              {t("headline")}
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-11 mb-[52px]">
            <Reveal delay={0.05}>
              <p className="text-[16.5px] leading-[1.72] font-bp-sans font-light text-bp-body">
                {t("body")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16.5px] leading-[1.72] font-bp-sans font-light text-bp-body">
                {t("body2")}
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="grid sm:grid-cols-3 gap-px bg-bp-ink/16 border border-bp-ink/16 mb-11">
            {pillars.map((p) => (
              <StaggerItem key={p.key}>
                <div className="bg-bp-paper h-full p-7">
                  <div className="font-bp-mono text-[10px] tracking-[0.14em] text-bp-bronze mb-4">{p.number}</div>
                  <h4 className="font-bp-display font-semibold text-[19px] text-bp-ink mb-2.5">{p.title}</h4>
                  <p className="text-[14.5px] leading-[1.6] font-bp-sans font-light text-bp-muted">{p.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 font-bp-display font-semibold text-[15px] tracking-[0.06em] uppercase text-bp-ink border-b-2 border-bp-brick pb-1.5 transition-colors hover:text-bp-brick"
            >
              {t("cta")} <span>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
