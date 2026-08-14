"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees */
  max?: number;
  /** Lift on hover (px) */
  lift?: number;
};

/**
 * Pointer-driven 3D tilt wrapper with a soft gold sheen. Disabled under
 * prefers-reduced-motion. Wrap cards/tiles to add premium depth.
 */
export function Tilt({ children, className, max = 8, lift = 6 }: TiltProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });

  // sheen position follows the pointer
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ translateY: -lift }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={["group/tilt relative [transform-style:preserve-3d]", className].filter(Boolean).join(" ")}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: useTransform(
            [sheenX, sheenY],
            ([x, y]) =>
              `radial-gradient(380px circle at ${x} ${y}, rgba(212,165,55,0.16), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}
