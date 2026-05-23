"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GearWatermark } from "@/components/motion/GearWatermark";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { Magnetic } from "@/components/motion/MagneticButton";
import { ArrowLeftIcon, HardHatIcon } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("pages.notFound");
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white min-h-[80vh] flex items-center">
      {/* Blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,165,55,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,55,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* dimensional lines */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="dim" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 L60 30" stroke="rgba(212,165,55,0.25)" strokeWidth="0.5" strokeDasharray="2 4" />
            <path d="M30 0 L30 60" stroke="rgba(212,165,55,0.25)" strokeWidth="0.5" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dim)" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,26,47,0.85)_80%)]" />
      <CursorSpotlight />
      <GearWatermark
        className="absolute -end-40 -top-40 opacity-30 hidden md:block"
        size={520}
      />

      <div className="relative container-wide z-10 text-center">
        <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5">
          <HardHatIcon className="size-4 text-gold-400" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-gold-400">
            Site Notice · 404
          </span>
        </div>
        <h1 className="font-display text-[clamp(4rem,12vw,9rem)] font-semibold leading-none text-white tabular-nums">
          4<span className="text-gold-500">0</span>4
        </h1>
        <p className="mt-8 font-display text-2xl lg:text-3xl text-white text-balance">
          This route isn&apos;t on the blueprint.
        </p>
        <p className="mt-4 max-w-md mx-auto text-white/65 leading-relaxed text-pretty">
          {t("body")}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button asChild size="xl" variant="primary">
              <Link href="/">
                <ArrowLeftIcon className="size-4 rtl:rotate-180" />
                {t("cta")}
              </Link>
            </Button>
          </Magnetic>
          <Button asChild size="xl" variant="outline">
            <Link href="/contact">Talk to the team</Link>
          </Button>
        </div>

        {/* Tiny dimension call-out — visual flourish */}
        <p className="mt-16 text-[10px] uppercase tracking-[0.32em] text-white/30">
          Drawing No. · ETCS-404-A · Rev. 01
        </p>
      </div>
    </section>
  );
}
