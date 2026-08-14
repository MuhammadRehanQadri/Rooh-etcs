import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description:
      "Technical contracting and industrial services across the Kingdom of Saudi Arabia.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#0A1A2F",
    theme_color: "#0F2645",
    lang: "en",
    dir: "ltr",
    categories: ["business", "industrial", "construction"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
