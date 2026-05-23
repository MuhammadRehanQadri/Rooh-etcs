"use client";

import { Marquee } from "@/components/motion/Marquee";

const tokens = [
  "Coating",
  "Insulation",
  "Fabrication",
  "Fireproofing",
  "Civil Construction",
  "E&I",
  "Mechanical",
  "PEB Buildings",
  "Solar Energy",
  "Manpower",
  "O&M",
  "Kingdom of Saudi Arabia",
] as const;

export function CapabilityMarquee() {
  return (
    <section className="bg-bone-50 border-y border-bone-200 py-10 overflow-hidden">
      <Marquee speed={55}>
        {tokens.map((t, i) => (
          <span key={`${t}-${i}`} className="inline-flex items-center gap-12">
            <span className="font-display text-3xl md:text-4xl font-medium uppercase tracking-tight text-navy-900/80 whitespace-nowrap">
              {t}
            </span>
            <span className="text-gold-500 text-2xl" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
