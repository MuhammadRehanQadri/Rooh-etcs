"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  cap: string;
  dim: string;
  note: string;
};

const SLIDES: Slide[] = [
  { src: "/images/hero/hero-01.jpg", cap: "FIG. 01 — INDUSTRIAL CONTRACTING & TECHNICAL SERVICES", dim: "KINGDOM OF SAUDI ARABIA", note: "COATING & LINING" },
  { src: "/images/hero/hero-02.jpg", cap: "FIG. 02 — SKILLED WORKFORCE & QUALITY EXECUTION", dim: "FIELD OPERATIONS", note: "MANPOWER & SITE SUPPORT" },
  { src: "/images/hero/hero-03.jpg", cap: "FIG. 03 — INSULATION, CLADDING & SURFACE PROTECTION", dim: "FIELD OPERATIONS", note: "INSULATION & CLADDING" },
  { src: "/images/hero/hero-04.jpg", cap: "FIG. 04 — FABRICATION, PIPING & STRUCTURAL STEEL", dim: "FABRICATION & SITE WORKS", note: "PIPING & FABRICATION" },
];

const INTERVAL_MS = 5600;

const OVERLAY_PATHS = [
  { d: "M8,9 L92,9", stroke: "#C84749", dur: "1.15s", delay: "0s" },
  { d: "M8,5 L8,13 M92,5 L92,13", stroke: "#C84749", dur: "0.7s", delay: "0.15s" },
  { d: "M9,24 L9,84", stroke: "rgba(255,255,255,.5)", dur: "1s", delay: "0.2s" },
  { d: "M5,24 L13,24 M5,84 L13,84", stroke: "rgba(255,255,255,.5)", dur: "0.7s", delay: "0.3s" },
  { d: "M58,62 L78,46 L92,46", stroke: "#C84749", dur: "0.95s", delay: "0.4s" },
  { d: "M82,88 L94,88 M88,82 L88,94", stroke: "rgba(255,255,255,.45)", dur: "0.7s", delay: "0.55s" },
];

export function Hero() {
  const t = useTranslations();
  const reduced = useReducedMotion();
  const [hero, setHero] = React.useState(0);
  const [drawn, setDrawn] = React.useState(true);
  const frameRef = React.useRef<HTMLDivElement>(null);
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const drawTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const goToSlide = React.useCallback(
    (i: number) => {
      if (reduced) {
        setHero(i);
        return;
      }
      setHero(i);
      setDrawn(false);
      clearTimeout(drawTimer.current);
      drawTimer.current = setTimeout(() => setDrawn(true), 70);
    },
    [reduced]
  );

  React.useEffect(() => {
    if (reduced) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      id = setInterval(() => {
        setHero((h) => {
          const next = (h + 1) % SLIDES.length;
          setDrawn(false);
          clearTimeout(drawTimer.current);
          drawTimer.current = setTimeout(() => setDrawn(true), 70);
          return next;
        });
      }, INTERVAL_MS);
    };
    const stop = () => id && clearInterval(id);
    const onVisibility = () => (document.hidden ? stop() : (stop(), start()));
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(drawTimer.current);
    };
  }, [reduced]);

  React.useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      const p = parallaxRef.current;
      const frame = frameRef.current;
      if (!p || !frame) return;
      if (!frame.contains(e.target as Node)) {
        p.style.transform = "translate3d(0,0,0)";
        return;
      }
      const r = frame.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * -18;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * -18;
      p.style.transform = `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)`;
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const slide = SLIDES[hero];
  const drawOn = reduced ? true : drawn;

  return (
    <section className="flex justify-center border-b border-bp-ink/16 bg-bp-paper">
      <div className="container-wide grid lg:grid-cols-[1.15fr_.85fr] items-stretch">
        {/* Left — copy */}
        <div className="pt-16 pb-12 lg:py-24 lg:pe-[60px] border-e-0 lg:border-e border-bp-ink/16">
          <div className="flex items-center gap-3.5 mb-11 font-bp-mono text-[10.5px] tracking-[0.16em] text-bp-meta">
            <span className="border border-bp-brick text-bp-brick px-2.5 py-1.5">KSA</span>
            <span className="uppercase">{t("hero.eyebrow")}</span>
          </div>
          <h1 className="font-bp-display font-bold text-[clamp(2.6rem,7.2vw,6.5rem)] leading-[0.94] tracking-[-0.02em] text-bp-ink mb-2">
            {t("hero.headlineStart")}
          </h1>
          <div className="relative inline-block mb-9">
            <span className="font-bp-display font-bold text-[clamp(2.6rem,7.2vw,6.5rem)] leading-[0.94] tracking-[-0.02em] text-bp-brick">
              {t("hero.headlineAccent")}
            </span>
            <span className="absolute inset-x-0 bottom-1.5 h-2 bg-bp-brick/18" aria-hidden />
          </div>
          <p className="max-w-[50ch] text-[18.5px] leading-[1.66] font-bp-sans font-light text-bp-body mb-10">
            {t("hero.subheadline")}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/contact"
              className="bg-bp-ink text-bp-paper font-bp-display font-semibold text-[15px] tracking-[0.06em] uppercase px-8 py-[18px] transition-colors hover:bg-bp-brick hover:text-white"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/services"
              className="border-[1.5px] border-bp-ink/35 text-bp-ink font-bp-display font-semibold text-[15px] tracking-[0.06em] uppercase px-8 py-[16.5px] transition-colors hover:border-bp-ink hover:bg-bp-ink/5"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* Right — slideshow */}
        <div className="relative pt-4 pb-12 lg:py-24 lg:ps-[60px] flex flex-col gap-6">
          <div ref={frameRef} className="relative flex-1 min-h-[340px] sm:min-h-[452px]">
            <div className="absolute -top-2.5 left-[50px] -right-2.5 bottom-2.5 border border-bp-brick/40" aria-hidden />
            <div className="relative h-full w-full overflow-hidden bg-bp-ink">
              <div ref={parallaxRef} className="absolute -inset-3.5 transition-transform duration-[550ms] ease-[cubic-bezier(.2,.7,.3,1)]">
                {SLIDES.map((s, i) => (
                  <div
                    key={s.src}
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(.4,0,.2,1)]"
                    style={{ opacity: hero === i ? 1 : 0 }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-[7000ms] ease-linear"
                      style={{ transform: hero === i && !reduced ? "scale(1.07)" : "scale(1)" }}
                    >
                      <Image
                        src={s.src}
                        alt=""
                        fill
                        priority={i === 0}
                        sizes="(min-width:1024px) 45vw, 100vw"
                        className="object-cover [filter:saturate(.72)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,35,56,.34)_0%,rgba(11,35,56,.04)_36%,rgba(11,35,56,.52)_100%)]" />

              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
                {OVERLAY_PATHS.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    fill="none"
                    stroke={p.stroke}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={320}
                    style={{
                      strokeDashoffset: drawOn ? 0 : 320,
                      transition: reduced ? "none" : `stroke-dashoffset ${p.dur} cubic-bezier(.2,.7,.3,1) ${p.delay}`,
                    }}
                  />
                ))}
              </svg>

              <div
                className="absolute left-[8%] top-[calc(9%+10px)] bg-bp-ink/78 text-bp-paper font-bp-mono text-[9px] tracking-[0.18em] px-2 py-1 transition-opacity duration-700"
                style={{ opacity: drawOn ? 1 : 0, transitionDelay: reduced ? "0s" : "0.45s" }}
              >
                {slide.dim}
              </div>
              <div
                className="absolute right-[8%] top-[calc(46%-30px)] bg-bp-ink/78 text-bp-paper font-bp-mono text-[9.5px] tracking-[0.14em] px-2.5 py-1.5 transition-opacity duration-700"
                style={{ opacity: drawOn ? 1 : 0, transitionDelay: reduced ? "0s" : "0.75s" }}
              >
                {slide.note}
              </div>

              {!reduced && (
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-bp-brick to-transparent bp-scanline" aria-hidden />
              )}

              <div className="absolute top-[13px] right-[13px] bg-bp-ink/84 text-bp-paper font-bp-mono text-[9.5px] tracking-[0.14em] px-2.5 py-1.5">
                {String(hero + 1).padStart(2, "0")} / 04
              </div>
            </div>
            <div className="absolute left-0 -bottom-px bg-bp-ink text-bp-paper font-bp-mono text-[9.5px] tracking-[0.14em] px-3.5 py-2">
              {slide.cap}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`View slide ${i + 1}`}
                  className={cn(
                    "h-[3px] cursor-pointer border-0 p-0 transition-[width,background-color] duration-500",
                    hero === i ? "w-[46px] bg-bp-brick" : "w-[18px] bg-bp-ink/24"
                  )}
                />
              ))}
            </div>
            <span className="flex-1 h-px bg-bp-ink/20" />
            <span className="font-bp-mono text-[10px] tracking-[0.14em] text-bp-meta">
              {t("hero.scroll")} ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
