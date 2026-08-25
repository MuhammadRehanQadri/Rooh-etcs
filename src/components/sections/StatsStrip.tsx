"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { heroStats } from "@/content/stats";

/**
 * Only one capability in stats.ts ships a verified numeral ("15+" combined
 * experience) — the other three are qualitative on purpose (Rev 01 replaced
 * fabricated counts with capability statements). Columns without a number
 * get a bronze "diamond" glyph in the numeral's slot instead of an invented
 * figure — the design system's own sanctioned glyph set allows it.
 */
export function StatsStrip() {
  const t = useTranslations();

  return (
    <div className="flex justify-center border-b border-bp-ink/16 bg-white/40">
      <div className="container-wide grid grid-cols-2 lg:grid-cols-4">
        {heroStats.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.09} className="py-9 pe-8 border-e border-bp-ink/12 flex items-baseline gap-4">
            <div className="flex items-baseline">
              {s.value ? (
                <span className="font-bp-display font-bold text-[44px] sm:text-[58px] leading-[.85] text-bp-ink">
                  <CountUp to={Number(s.value.replace(/\D/g, ""))} />
                </span>
              ) : (
                <span className="font-bp-display font-medium text-[36px] sm:text-[44px] leading-[.85] text-bp-bronze" aria-hidden>
                  ◆
                </span>
              )}
              {s.value && (
                <span className="font-bp-display font-medium text-xl sm:text-[26px] text-bp-brick">+</span>
              )}
            </div>
            <div className="font-bp-mono text-[10px] tracking-[0.14em] text-bp-meta uppercase leading-[1.5] max-w-[11ch]">
              {t(s.labelKey as never)}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
