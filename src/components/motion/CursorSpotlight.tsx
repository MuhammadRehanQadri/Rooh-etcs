"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Size of the spotlight in px */
  size?: number;
  /** CSS color for the radial gradient core */
  color?: string;
  /** Opacity of the spotlight */
  opacity?: number;
};

/**
 * Mounts inside a dark section. Renders a soft radial gradient that follows
 * the mouse, springy. Degrades to nothing when prefers-reduced-motion.
 */
export function CursorSpotlight({
  className,
  size = 520,
  color = "rgba(212,165,55,0.18)",
  opacity = 1,
}: Props) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current?.parentElement;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
    function onEnter() { setVisible(true); }
    function onLeave() { setVisible(false); }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0 transition-opacity duration-500", className)}
      style={{ opacity: visible ? opacity : 0 }}
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute"
      />
    </motion.div>
  );
}
