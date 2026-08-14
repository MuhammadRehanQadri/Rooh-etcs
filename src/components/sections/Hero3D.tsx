"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * Signature hero centerpiece — a layered, metallic 3D gear assembly built with
 * CSS 3D transforms + SVG (no WebGL, so it renders reliably everywhere and on
 * Cloudflare Workers). Pointer parallax tilts the whole assembly in 3D.
 */
export function Hero3D() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [12, -12]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(px, [0, 1], [-16, 16]), { stiffness: 120, damping: 16 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full select-none"
      style={{ perspective: 1100 }}
      aria-hidden
    >
      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(212,165,55,0.28),transparent_60%)] blur-xl" />

      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
      >
        {/* back navy gear */}
        <Gear
          className="absolute left-[8%] top-[14%] h-44 w-44 sm:h-56 sm:w-56 text-navy-500"
          teeth={11}
          duration={48}
          reverse
          depth={-90}
          opacity={0.9}
        />
        {/* main gold gear */}
        <Gear
          className="absolute right-[10%] top-[30%] h-60 w-60 sm:h-80 sm:w-80 text-gold-500 drop-shadow-[0_30px_60px_rgba(212,165,55,0.25)]"
          teeth={14}
          duration={64}
          depth={40}
          metallic
        />
        {/* small accent gear */}
        <Gear
          className="absolute left-[34%] bottom-[12%] h-28 w-28 sm:h-36 sm:w-36 text-gold-400"
          teeth={9}
          duration={36}
          depth={120}
          metallic
          opacity={0.95}
        />

        {/* floating spec dots for depth */}
        {[
          { c: "left-[20%] top-[10%]", z: 160, d: 6 },
          { c: "right-[16%] bottom-[18%]", z: 200, d: 5 },
          { c: "left-[12%] bottom-[30%]", z: 80, d: 4 },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute ${p.c} rounded-full bg-gold-400/80`}
            style={{
              width: p.d,
              height: p.d,
              transform: `translateZ(${p.z}px)`,
              boxShadow: "0 0 12px rgba(212,165,55,0.8)",
            }}
          />
        ))}

        {/* thin orbit ring */}
        <div
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/15"
          style={{ transform: "translate(-50%,-50%) translateZ(-40px) rotateX(74deg)" }}
        />
      </motion.div>
    </div>
  );
}

function Gear({
  className,
  teeth,
  duration,
  reverse = false,
  depth = 0,
  metallic = false,
  opacity = 1,
}: {
  className?: string;
  teeth: number;
  duration: number;
  reverse?: boolean;
  depth?: number;
  metallic?: boolean;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const id = React.useId().replace(/:/g, "");
  return (
    <motion.div
      className={className}
      style={{ transform: `translateZ(${depth}px)`, opacity }}
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={reduce ? undefined : { duration, ease: "linear", repeat: Infinity }}
    >
      <GearSVG teeth={teeth} metallic={metallic} gid={id} />
    </motion.div>
  );
}

function GearSVG({ teeth, metallic, gid }: { teeth: number; metallic: boolean; gid: string }) {
  const rects = Array.from({ length: teeth }).map((_, i) => {
    const a = (i * 360) / teeth;
    return (
      <rect
        key={i}
        x={31}
        y={2}
        width={6}
        height={10}
        rx={1.2}
        fill="currentColor"
        transform={`rotate(${a} 34 34)`}
      />
    );
  });
  return (
    <svg viewBox="0 0 68 68" className="h-full w-full">
      <defs>
        <radialGradient id={`core-${gid}`} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#1B3A66" />
          <stop offset="100%" stopColor="#0A1A2F" />
        </radialGradient>
        <linearGradient id={`metal-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E5B1" />
          <stop offset="45%" stopColor="currentColor" />
          <stop offset="100%" stopColor="#8E6815" />
        </linearGradient>
      </defs>
      <g fill={metallic ? `url(#metal-${gid})` : "currentColor"} color="currentColor">
        {rects}
        <circle cx="34" cy="34" r="25" />
      </g>
      <circle cx="34" cy="34" r="18" fill={`url(#core-${gid})`} />
      <circle cx="34" cy="34" r="6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
