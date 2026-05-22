import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]",
              dark ? "text-gold-400" : "text-gold-600"
            )}
          >
            <span className="block h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-5 text-balance font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight",
            dark ? "text-white" : "text-navy-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-base sm:text-lg leading-relaxed text-pretty",
              dark ? "text-white/70" : "text-bone-600"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
