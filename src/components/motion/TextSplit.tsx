"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type TextSplitProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
};

export function TextSplit({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
}: TextSplitProps) {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={container}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          className={"inline-block " + (wordClassName ?? "")}
          aria-hidden
        >
          {w}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </motion.span>
  );
}
