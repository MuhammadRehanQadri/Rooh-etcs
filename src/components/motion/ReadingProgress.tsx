"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gold reading-progress bar fixed at the top of the page.
 * Drop into a page layout to enable it.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 inset-x-0 z-50 h-px bg-gold-500/80 origin-left"
      style={{ scaleX }}
    />
  );
}
