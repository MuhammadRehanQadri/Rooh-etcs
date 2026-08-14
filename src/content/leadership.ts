export type LeaderRole = {
  name: string;
  title: string;
  bio: string;
  initials: string;
  /** Optional accent palette for the placeholder portrait */
  accent: "navy" | "gold" | "ink" | "rust";
  /** Portrait pending — monogram tile is shown until a photo is supplied */
  photo?: string;
};

/**
 * Real ETCS leadership (Rev 01). Portrait photos are pending; the monogram
 * tiles render until they arrive. Bios are brief, role-based statements —
 * no tenure/figures were supplied by the client, so none are invented.
 */
export const leadership: LeaderRole[] = [
  {
    name: "Sajjad Ur Rehman",
    title: "Operations Manager",
    bio: "Leads day-to-day project operations and site execution across ETCS contracts, aligning resources, schedule and quality from mobilisation to hand-over.",
    initials: "SR",
    accent: "navy",
  },
  {
    name: "Rooh ul Amin",
    title: "Technical Support Manager",
    bio: "Owns technical planning and engineering support across disciplines, ensuring scope, methods and specifications are met on every project.",
    initials: "RA",
    accent: "gold",
  },
  {
    name: "Shamas Elahi",
    title: "QHSE Manager",
    bio: "Custodian of Quality, Health, Safety and Environment — embedding integrated QA/QC and HSE discipline aligned with international standards.",
    initials: "SE",
    accent: "ink",
  },
  {
    name: "Muhammad Amin Khan",
    title: "Projects Coordinator",
    bio: "Coordinates project delivery, client communication and documentation, keeping execution on track across concurrent workfronts.",
    initials: "MA",
    accent: "rust",
  },
];
