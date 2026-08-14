import { OG_ALT, OG_SIZE, renderOgCard } from "@/lib/og-card";

/**
 * Twitter/X card art. Same artwork as the OpenGraph card (shared via
 * `@/lib/og-card`) but declared as its own file convention so Next emits an
 * explicit `twitter:image` instead of leaving clients to infer one.
 */
export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgCard();
}
