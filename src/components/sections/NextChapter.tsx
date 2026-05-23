"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  ctaLabel: string;
  image?: string;
};

/**
 * Contextual "next chapter" callout. Use at the bottom of pages to guide
 * the reader to the most relevant next page.
 */
export function NextChapter({
  eyebrow = "Next",
  title,
  description,
  href,
  ctaLabel,
  image = "/images/hero/hero-04.jpg",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/85 to-navy-900/40" />
      <div className="absolute inset-0 grain" />
      <CursorSpotlight />

      <Link
        href={href as never}
        className="group relative block container-wide py-24 lg:py-32 z-10"
      >
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-9">
            <Reveal>
              <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold-400">
                <span className="block h-px w-8 bg-current opacity-60" />
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-balance font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                {title}
              </h2>
            </Reveal>
            {description && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-white/70">
                  {description}
                </p>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-3 flex lg:justify-end">
            <Reveal delay={0.15}>
              <Magnetic>
                <motion.span
                  className="inline-flex items-center gap-3 rounded-full bg-gold-500 text-navy-900 h-14 px-8 font-medium text-base"
                  whileHover={{ scale: 1.02 }}
                >
                  {ctaLabel}
                  <ArrowRightIcon className="size-4 rtl:rotate-180" />
                </motion.span>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Link>
    </section>
  );
}
