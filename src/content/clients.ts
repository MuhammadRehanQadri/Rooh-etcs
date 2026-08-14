/**
 * Rev 01 — ETCS is newly established and is NOT authorised to display client
 * names or logos (legal + credibility risk per the client's checklist).
 * The Clients page therefore presents the SECTORS ETCS serves, each with a
 * single supporting line — no company names or implied contracts.
 */
export type SectorKey = "government" | "industrial" | "private" | "commercial";

export type Sector = {
  key: SectorKey;
  title: string;
  description: string;
  /** lucide-react icon name */
  icon: string;
};

export const sectors: Sector[] = [
  {
    key: "government",
    title: "Government / Public Sector",
    description:
      "Supporting infrastructure, utilities, and national development initiatives across the Kingdom.",
    icon: "Landmark",
  },
  {
    key: "industrial",
    title: "Industrial / Refining / Petrochemical",
    description:
      "Providing technical contracting solutions for industrial facilities, energy, and process-related operations.",
    icon: "Factory",
  },
  {
    key: "private",
    title: "Private Sector",
    description:
      "Delivering reliable engineering and contracting services tailored to private-sector project requirements.",
    icon: "Building2",
  },
  {
    key: "commercial",
    title: "Commercial / Developers",
    description:
      "Supporting commercial developments through quality-focused construction and technical solutions.",
    icon: "Store",
  },
];
