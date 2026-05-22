"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { GearWatermark } from "@/components/motion/GearWatermark";
import { whatsappLink } from "@/lib/utils";
import { MessageCircleIcon, ArrowRightIcon } from "lucide-react";

export function ContactCta() {
  const t = useTranslations("contactCta");
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,55,0.18),transparent_55%)]" />
      <GearWatermark
        className="absolute -bottom-40 -end-40 opacity-25 hidden md:block"
        size={620}
      />
      <div className="absolute inset-0 grain" />

      <div className="relative container-wide text-center">
        <Reveal>
          <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold-400">
            <span className="block h-px w-8 bg-current opacity-60" />
            {t("eyebrow")}
            <span className="block h-px w-8 bg-current opacity-60" />
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-balance font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            {t("headline")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-white/70">
            {t("subheadline")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="xl" variant="primary">
              <Link href="/contact">
                {t("ctaPrimary")}
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircleIcon className="size-4" />
                {t("ctaSecondary")}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
