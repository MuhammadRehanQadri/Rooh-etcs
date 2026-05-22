"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function GearWatermark({
  className,
  size = 520,
  duration = 60,
}: {
  className?: string;
  size?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("pointer-events-none select-none", className)}
      aria-hidden
      style={{ width: size, height: size }}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      <Gear />
    </motion.div>
  );
}

function Gear() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <linearGradient id="gear-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A537" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D4A537" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g stroke="url(#gear-gradient)" strokeWidth="1.2">
        <circle cx="100" cy="100" r="78" />
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="32" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = 100 + Math.cos(a) * 78;
          const y1 = 100 + Math.sin(a) * 78;
          const x2 = 100 + Math.cos(a) * 94;
          const y2 = 100 + Math.sin(a) * 94;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          const x1 = 100 + Math.cos(a) * 32;
          const y1 = 100 + Math.sin(a) * 32;
          const x2 = 100 + Math.cos(a) * 60;
          const y2 = 100 + Math.sin(a) * 60;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.6" />;
        })}
      </g>
    </svg>
  );
}
