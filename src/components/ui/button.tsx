import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-[0_8px_30px_-12px_rgba(212,165,55,0.6)] hover:shadow-[0_12px_40px_-12px_rgba(212,165,55,0.8)] hover:-translate-y-0.5",
        secondary:
          "bg-navy-900 text-white hover:bg-navy-700 shadow-[0_8px_30px_-12px_rgba(15,38,69,0.5)] hover:-translate-y-0.5",
        outline:
          "border border-white/30 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-sm",
        outlineDark:
          "border border-navy-900/20 text-navy-900 hover:bg-navy-900/5 hover:border-navy-900/40",
        ghost: "text-navy-900 hover:bg-navy-900/5",
        link: "text-navy-900 underline-offset-4 hover:underline rounded-none",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-[15px]",
        xl: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
