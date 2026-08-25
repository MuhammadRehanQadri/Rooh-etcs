"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { useTier } from "@/lib/use-tier";
import { cn } from "@/lib/utils";
import { getServicesByCategory, type ServiceCategory } from "@/content/services";

const CATEGORIES: { n: string; slug: ServiceCategory }[] = [
  { n: "01", slug: "industrial" },
  { n: "02", slug: "construction" },
  { n: "03", slug: "engineering" },
  { n: "04", slug: "supply" },
];

export function WhatWeDo() {
  const t = useTranslations();
  const tier = useTier();
  const tight = tier === "tight";
  const [hovered, setHovered] = React.useState(-1);

  const rows = CATEGORIES.map((c) => ({
    ...c,
    title: t(`categories.${c.slug}` as never),
    description: t(`categories.${c.slug}Description` as never),
    image: getServicesByCategory(c.slug)[0]?.heroImage,
  }));

  return (
    <section className="flex justify-center py-20 lg:py-[120px] border-b border-bp-ink/16 bg-bp-paper">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-[60px] items-start">
        <div>
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-brick mb-2.5">SEC. 02</div>
          <div className="font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-meta pt-2.5 border-t border-bp-ink/20 uppercase">
            {t("servicesPreview.eyebrow")}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-end gap-12 flex-wrap mb-[52px]">
            <div className="max-w-[640px]">
              <h2 className="font-bp-display font-semibold text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.015em] text-bp-ink mb-4">
                {t("servicesPreview.headline")}
              </h2>
              <p className="text-[17px] leading-[1.66] font-bp-sans font-light text-bp-body">
                {t("servicesPreview.subheadline")}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 font-bp-display font-semibold text-[14.5px] tracking-[0.06em] uppercase text-bp-ink border-b-2 border-bp-brick pb-1.5 whitespace-nowrap transition-colors hover:text-bp-brick"
            >
              {t("servicesPreview.cta")} <span>→</span>
            </Link>
          </div>

          <Reveal>
            <div className="border-t border-bp-ink/20">
              {rows.map((c, i) => {
                const active = hovered === i;
                return (
                  <Link
                    key={c.slug}
                    href={{ pathname: "/services", hash: c.slug } as never}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(-1)}
                    style={{ paddingInlineStart: active ? "22px" : "0px" }}
                    className={cn(
                      "grid items-center border-b border-bp-ink/20 border-s-2 py-[26px] pe-[18px] transition-[background-color,border-color,color,padding-inline-start] duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)]",
                      tight
                        ? "grid-cols-[44px_1fr_28px] gap-[18px]"
                        : tier === "mid"
                        ? "grid-cols-[48px_1fr_220px_120px_28px] gap-7"
                        : "grid-cols-[56px_1fr_300px_150px_32px] gap-7",
                      active ? "bg-white border-s-bp-brick text-bp-brick" : "bg-transparent border-s-transparent text-bp-ink"
                    )}
                  >
                    <span className="font-bp-mono text-[11px] tracking-[0.12em] text-bp-brick">{c.n}</span>
                    <h3 className="font-bp-display font-semibold text-[clamp(1.25rem,2.2vw,1.875rem)] leading-[1.1]">
                      {c.title}
                    </h3>
                    {!tight && (
                      <p className="text-[14.5px] leading-[1.55] font-bp-sans font-light text-bp-muted">
                        {c.description}
                      </p>
                    )}
                    {!tight && c.image && (
                      <div className="relative h-[74px] overflow-hidden border border-bp-ink/14">
                        <Image
                          src={c.image}
                          alt=""
                          fill
                          sizes="150px"
                          className={cn(
                            "object-cover [filter:saturate(.7)] transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.3,1)]",
                            active && "scale-[1.09]"
                          )}
                        />
                      </div>
                    )}
                    <span
                      className={cn(
                        "font-bp-mono text-base text-end transition-transform duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)]",
                        active ? "translate-x-[7px]" : "translate-x-0"
                      )}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
