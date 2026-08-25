/**
 * "About" section pillars — capability statements, not measurable claims.
 * Matches the pattern in values.ts / vendor-approvals.ts (English content
 * lives in src/content/*.ts, not messages/*.json — this repo's convention
 * for structured lists rather than page copy).
 */
export type Pillar = {
  key: string;
  number: string;
  title: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    key: "accountability",
    number: "P.01",
    title: "Single accountability",
    description: "Four divisions under one contract and one project manager.",
  },
  {
    key: "hse",
    number: "P.02",
    title: "Zero-harm HSE",
    description: "ISO 45001 discipline from mobilisation through hand-over.",
  },
  {
    key: "qaqc",
    number: "P.03",
    title: "Audit-ready QA/QC",
    description: "Documentation aligned to NACE and SSPC standards, maintained throughout each project.",
  },
];
