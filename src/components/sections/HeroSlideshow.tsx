"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string; caption?: string; location?: string };

const SLIDES: Slide[] = [
  {
    src: "/images/hero/hero-01.jpg",
    alt: "Industrial contracting work on site",
    caption: "Industrial contracting & technical services",
    location: "Kingdom of Saudi Arabia",
  },
  {
    src: "/images/hero/hero-03.jpg",
    alt: "Insulation and cladding works",
    caption: "Insulation, cladding & surface protection",
    location: "Field operations",
  },
  {
    src: "/images/hero/hero-04.jpg",
    alt: "Fabrication and steel works",
    caption: "Fabrication, piping & structural steel",
    location: "Fabrication & site works",
  },
  {
    src: "/images/hero/hero-02.jpg",
    alt: "Skilled field crew",
    caption: "Skilled workforce & quality execution",
    location: "On site",
  },
];

const INTERVAL_MS = 5500;

export function HeroSlideshow() {
  const [i, setI] = React.useState(0);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const slide = SLIDES[i];

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-navy-950">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: reduced ? 1 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Ken-Burns: slow zoom over the slide's lifetime */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={reduced ? { scale: 1.05 } : { scale: 1.18 }}
            transition={{ duration: INTERVAL_MS / 1000 + 1.4, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-400">
                On site · {slide.location}
              </span>
            </div>
            <p className="mt-3 text-lg font-medium text-white text-balance">
              {slide.caption}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute top-5 end-5 flex flex-col gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show slide ${idx + 1}`}
            className={cn(
              "block h-6 w-1 rounded-full transition-all duration-500 cursor-pointer",
              idx === i ? "bg-gold-500 scale-y-100" : "bg-white/40 scale-y-75 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Photographer credit */}
      <p className="absolute end-5 bottom-3 text-[10px] uppercase tracking-[0.18em] text-white/40 z-10">
        ETCS Archive
      </p>
    </div>
  );
}
