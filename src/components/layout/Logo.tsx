import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Client-supplied globe mark, cut from their uploaded lockup (brick globe,
 * navy "ETCS" lettering, bronze arrow) with a real alpha channel. `light`
 * knocks the navy lettering to a pale tone for use on --ink backgrounds
 * (footer, mobile menu overlay) where the navy would otherwise disappear.
 */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <Image
        src={light ? "/images/logo/etcs-mark-light.png" : "/images/logo/etcs-mark.png"}
        alt="ETCS"
        fill
        sizes="80px"
        className="object-contain"
        priority
      />
    </span>
  );
}
