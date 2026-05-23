"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

/**
 * Sticky right-edge dot navigator. Pass section ids/labels; current section
 * highlights as the user scrolls. Click jumps. Hides under lg.
 */
export function SectionDots({ sections, className }: { sections: Section[]; className?: string }) {
  const [active, setActive] = React.useState<string | null>(sections[0]?.id ?? null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top in viewport
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((acc, e) => {
          return e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc;
        });
        setActive(topmost.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        "fixed end-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3",
        className
      )}
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.18em] transition-opacity duration-300",
                isActive ? "opacity-100 text-gold-600" : "opacity-0 text-bone-600 group-hover:opacity-100"
              )}
            >
              {s.label}
            </span>
            <motion.span
              animate={reduced ? undefined : { scale: isActive ? 1 : 0.55 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "block h-2 w-2 rounded-full transition-colors duration-300",
                isActive ? "bg-gold-500" : "bg-bone-400 group-hover:bg-bone-600"
              )}
            />
          </a>
        );
      })}
    </nav>
  );
}
