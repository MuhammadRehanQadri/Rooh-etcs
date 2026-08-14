"use client";

import * as React from "react";
import { Hero3D } from "./Hero3D";
import { HeroSlideshow } from "./HeroSlideshow";

/**
 * Hero visual: the signature CSS/SVG 3D gear assembly on larger viewports,
 * and the photo slideshow on small screens (more useful on mobile + lighter).
 * Renders the slideshow on the server / first paint, then upgrades on the
 * client once the viewport is known (avoids hydration mismatch).
 */
export function HeroVisual() {
  const [large, setLarge] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLarge(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // First paint (and mobile): photo slideshow.
  if (large !== true) return <HeroSlideshow />;
  return <Hero3D />;
}
