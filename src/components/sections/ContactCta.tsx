"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappLink } from "@/lib/utils";

export function ContactCta() {
  const t = useTranslations("contactCta");
  return (
    <section className="relative flex justify-center bg-bp-brick text-white overflow-hidden">
      <div className="absolute inset-0 bp-grid-invert" aria-hidden />
      <div className="relative container-wide py-16 lg:py-24 flex justify-between items-center gap-14 flex-wrap">
        <div className="max-w-[640px]">
          <Reveal>
            <div className="font-bp-mono text-[10.5px] tracking-[0.18em] text-white/78 mb-5 uppercase">
              {t("eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-bp-display font-bold text-[clamp(2.375rem,4.8vw,4.25rem)] leading-[1] tracking-[-0.02em] mb-4">
              {t("headline")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.6] font-bp-sans font-light text-white/92">
              {t("subheadline")}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="flex flex-col gap-3 min-w-[270px]">
          <Link
            href="/contact"
            className="bg-white text-bp-brick font-bp-display font-semibold text-[15px] tracking-[0.06em] uppercase py-[19px] px-8 text-center transition-colors hover:bg-bp-ink hover:text-white"
          >
            {t("ctaPrimary")}
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border-[1.5px] border-white/65 text-white font-bp-display font-semibold text-[15px] tracking-[0.06em] uppercase py-[17.5px] px-8 text-center transition-colors hover:bg-white/16 hover:border-white"
          >
            {t("ctaSecondary")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
