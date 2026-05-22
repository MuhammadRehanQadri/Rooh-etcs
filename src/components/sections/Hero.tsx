"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextSplit } from "@/components/motion/TextSplit";
import { GearWatermark } from "@/components/motion/GearWatermark";
import { CountUp } from "@/components/motion/CountUp";
import { motion } from "motion/react";
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import { heroStats } from "@/content/stats";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,165,55,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(27,58,102,0.6),transparent_55%)]" />
      {/* Grain layer */}
      <div className="absolute inset-0 grain" />

      <div className="relative container-wide pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — copy */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="dark" className="mb-7">
                <span className="size-1.5 rounded-full bg-gold-500" />
                {t("hero.eyebrow")}
              </Badge>
            </motion.div>

            <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-tight">
              <TextSplit text={t("hero.headlineStart")} className="block text-white" />
              <TextSplit
                text={t("hero.headlineAccent")}
                className="block mt-2 text-gold-500"
                delay={0.45}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg text-white/75 leading-relaxed text-pretty"
            >
              {t("hero.subheadline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button asChild size="xl" variant="primary">
                <Link href="/contact">
                  {t("hero.ctaPrimary")}
                  <ArrowRightIcon className="size-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="/documents/etcs-company-profile.pdf" download>
                  <DownloadIcon className="size-4" />
                  {t("nav.downloadProfile")}
                </a>
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 border-t border-white/10 pt-8"
            >
              {heroStats.map((s) => (
                <div key={s.key}>
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-white">
                    <CountUp to={Number(t(s.valueKey as never))} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                    {t(s.labelKey as never)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — media */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              <Image
                src="/images/hero/hero-01.jpg"
                alt="ETCS field operations"
                fill
                priority
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-gold-500 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold-400">
                    On site · Jubail
                  </span>
                </div>
                <p className="mt-3 text-lg font-medium text-white text-balance">
                  Refinery coating program — 12 tanks, in progress
                </p>
              </div>
            </motion.div>
            <GearWatermark
              className="absolute -bottom-16 -end-16 opacity-40"
              size={320}
            />
          </div>
        </div>
      </div>

      {/* bottom thin gold rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
    </section>
  );
}
