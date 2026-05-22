import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold-500", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6B954" />
          <stop offset="100%" stopColor="#B5871F" />
        </linearGradient>
        <linearGradient id="logo-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3A66" />
          <stop offset="100%" stopColor="#0A1A2F" />
        </linearGradient>
      </defs>
      {/* outer gear */}
      <g fill="url(#logo-gear)">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const cx = 32 + Math.cos(a) * 26;
          const cy = 32 + Math.sin(a) * 26;
          return (
            <rect
              key={i}
              x={cx - 3}
              y={cy - 3}
              width={6}
              height={6}
              rx={1.2}
              transform={`rotate(${(i * 30)} ${cx} ${cy})`}
            />
          );
        })}
        <circle cx="32" cy="32" r="22" fill="url(#logo-gear)" />
      </g>
      {/* inner ring */}
      <circle cx="32" cy="32" r="17" fill="url(#logo-core)" />
      {/* monogram E */}
      <g fill="#E6B954">
        <rect x="24" y="23" width="14" height="3" rx="0.6" />
        <rect x="24" y="30.5" width="11" height="3" rx="0.6" />
        <rect x="24" y="38" width="14" height="3" rx="0.6" />
        <rect x="24" y="23" width="3" height="18" rx="0.6" />
      </g>
    </svg>
  );
}
