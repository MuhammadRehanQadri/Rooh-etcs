"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Pull strength (lower = more magnetic). Default 4. */
  strength?: number;
  /** Trigger radius in px. Default 80. */
  radius?: number;
};

/**
 * Wrap any clickable element to make it lean toward the cursor when nearby.
 * Use sparingly — best on the primary CTA only.
 */
export function Magnetic({ children, className, strength = 4, radius = 80 }: Props) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 });

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        x.set(dx / strength);
        y.set(dy / strength);
      } else {
        x.set(0);
        y.set(0);
      }
    }
    function onLeave() {
      x.set(0);
      y.set(0);
    }
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, radius, strength, x, y]);

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={cn("inline-flex", className)}>
      {children}
    </motion.div>
  );
}
