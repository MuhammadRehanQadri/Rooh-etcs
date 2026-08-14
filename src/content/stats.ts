/**
 * Homepage hero "stats" — reworked in Rev 01 from fabricated numbers
 * (120+/15+/60+/450+) to capability-focused statements, since ETCS is a
 * newly established company. Labels live in messages/{locale}.json (stats.*).
 */
export type HeroCapability = {
  key: string;
  /** lucide-react icon name */
  icon: string;
  /** messages key: stats.<labelKey> */
  labelKey: string;
  /** optional emphasised value, e.g. "15+" */
  value?: string;
};

export const heroStats: HeroCapability[] = [
  { key: "solutions", icon: "Layers", labelKey: "stats.solutions" },
  { key: "experience", icon: "Award", labelKey: "stats.experience", value: "15+" },
  { key: "approach", icon: "Handshake", labelKey: "stats.approach" },
  { key: "team", icon: "Users", labelKey: "stats.team" },
];
