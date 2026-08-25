"use client";

import * as React from "react";

/**
 * Single breakpoint source for the "Blueprint" theme's nav collapse, service-row
 * grid columns, and section-label-rail collapse. Keeping one shared value avoids
 * the nav collapsing at a different width than the row it sits above.
 */
export type Tier = "wide" | "mid" | "tight";

const WIDE_MIN = 1220;
const MID_MIN = 1024;

function tierFor(width: number): Tier {
  if (width >= WIDE_MIN) return "wide";
  if (width >= MID_MIN) return "mid";
  return "tight";
}

export function useTier(): Tier {
  const [tier, setTier] = React.useState<Tier>("wide");

  React.useEffect(() => {
    const update = () => setTier(tierFor(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return tier;
}
