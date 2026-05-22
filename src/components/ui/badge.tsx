import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "bg-navy-900/5 text-navy-900",
        gold: "bg-gold-500/10 text-gold-700",
        dark: "bg-white/10 text-white border border-white/20 backdrop-blur-sm",
        outline: "border border-current bg-transparent",
        eyebrow:
          "bg-transparent text-gold-600 px-0 before:content-[''] before:block before:w-8 before:h-px before:bg-gold-500 before:me-3",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
