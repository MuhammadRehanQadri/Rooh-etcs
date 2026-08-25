"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    key: "discover",
    title: "Discover",
    body: "We listen first. Scoping calls, site walk-downs, and stakeholder reviews to lock the problem before the proposal.",
  },
  {
    n: "02",
    key: "engineer",
    title: "Engineer",
    body: "Drawings, BoQ, method statements, JSA. Pricing benchmarked, schedule baselined, every assumption documented.",
  },
  {
    n: "03",
    key: "mobilize",
    title: "Mobilize",
    body: "Workforce certified and inducted. Materials staged. Equipment positioned. Iqama and access cleared in advance.",
  },
  {
    n: "04",
    key: "execute",
    title: "Execute",
    body: "Daily QA/QC, weekly progress reviews, zero-harm safety. Variance reported in hours, not weeks.",
  },
  {
    n: "05",
    key: "handover",
    title: "Hand-over",
    body: "Punch-list closed, dossier delivered, warranty active. Operations briefed and aftercare scheduled.",
  },
];

export function ProcessBand() {
  return (
    <section className="flex justify-center py-20 lg:py-[110px] bg-bp-ink text-bp-ondark">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-[60px] items-start">
        <div>
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick mb-2.5">SEC. 03</div>
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-ondark-dim pt-2.5 border-t border-bp-ondark/25 uppercase">
            How We Deliver
          </div>
        </div>
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0">
          {steps.map((s) => (
            <StaggerItem key={s.key}>
              <div className="h-full border-s border-bp-ondark/22 ps-6 pe-6">
                <div className="w-[9px] h-[9px] bg-bp-brick mb-[22px]" />
                <div className="font-bp-mono text-[10px] tracking-[0.16em] text-bp-bronze mb-3.5">STEP {s.n}</div>
                <h4 className="font-bp-display font-semibold text-xl text-white mb-3">{s.title}</h4>
                <p className="text-[14.5px] leading-[1.62] font-bp-sans font-light text-bp-ondark-dim">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
