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
    <div className="bg-bp-ink py-4 overflow-hidden">
      <Marquee speed={48}>
        {tokens.map((tk, i) => (
          <span key={`${tk}-${i}`} className="inline-flex items-center gap-6">
            <span className="font-bp-mono text-xs tracking-[0.14em] uppercase text-bp-ondark-dim whitespace-nowrap">
              {tk}
            </span>
            <span className="text-bp-brick" aria-hidden>+</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
