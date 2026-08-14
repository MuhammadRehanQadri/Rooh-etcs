"use client";

import { sectors } from "@/content/clients";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { Landmark, Factory, Building2, Store } from "lucide-react";

const ICONS = { Landmark, Factory, Building2, Store } as const;

export function ClientsBoard() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-wide">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2">
          {sectors.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={s.key}>
                <Tilt className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-bone-200 bg-bone-50 p-8 transition-all duration-500 hover:bg-white hover:border-gold-500/40 hover:shadow-[0_24px_60px_-30px_rgba(15,38,69,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-gold-500">
                        {Icon && <Icon className="size-6" strokeWidth={1.5} />}
                      </div>
                      <h3 className="mt-7 font-display text-xl font-semibold text-navy-900 leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-bone-600 text-pretty">
                        {s.description}
                      </p>
                    </div>
                  </article>
                </Tilt>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
