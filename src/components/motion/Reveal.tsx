"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "h1" | "h2" | "h3" | "p";
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 24,
  once = true,
}: RevealProps) {
  const shouldReduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  style,
  stagger = 0.08,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger },
    },
  };
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
}) {
  const shouldReduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}
