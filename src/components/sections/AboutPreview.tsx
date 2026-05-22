"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="bg-bone-50">
      <div className="container-wide py-24 lg:py-32 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/hero-02.jpg"
                alt="ETCS field crew"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="absolute -bottom-8 -end-6 hidden md:block bg-navy-900 text-white p-6 rounded-2xl max-w-[260px] shadow-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-400">
                Vision 2030
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                A proud contributor to the Kingdom&apos;s industrial transformation.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold-600">
            <span className="block h-px w-8 bg-current opacity-60" />
            {t("eyebrow")}
          </p>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight text-navy-900">
              {t("headline")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-bone-700 text-pretty">
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-bone-700 text-pretty">
              {t("body2")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button asChild variant="outlineDark" size="lg" className="mt-10">
              <Link href="/about">
                {t("cta")}
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
