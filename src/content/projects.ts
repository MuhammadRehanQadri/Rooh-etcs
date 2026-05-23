import type { ServiceCategory } from "./services";

export type ProjectStatus = "ongoing" | "completed";

export type ProjectMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectQuote = {
  body: string;
  author: string;
  role: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  location: string;
  scope: string;
  category: ServiceCategory;
  status: ProjectStatus;
  progress?: number;
  year?: number;
  duration?: string;
  image: string;
  /** Set true to enable the detailed case-study page at /projects/[slug] */
  featured?: boolean;
  /** Long-form narrative shown on the case-study page */
  narrative?: string[];
  /** Project highlights / numbers strip */
  metrics?: ProjectMetric[];
  /** Detailed scope bullets shown on the case-study page */
  scopeDetail?: string[];
  /** Image gallery for the case-study page (relative paths under /images/projects/...) */
  gallery?: string[];
  /** Optional client quote */
  quote?: ProjectQuote;
};

export const projects: Project[] = [
  /* ───────── Ongoing ───────── */
  {
    slug: "refinery-tank-coating-jubail",
    title: "Storage Tank External Coating Program",
    client: "Confidential — Refining Operator",
    location: "Jubail Industrial City",
    scope: "Surface preparation and external coating of 12 atmospheric storage tanks.",
    category: "industrial",
    status: "ongoing",
    progress: 68,
    duration: "14 months",
    image: "/images/projects/ongoing/coating-tank-01.jpg",
    featured: true,
    narrative: [
      "ETCS was awarded the multi-tank external coating program for a major refinery in Jubail Industrial City — a 14-month campaign covering twelve atmospheric storage tanks ranging from 18 m to 32 m in diameter.",
      "The scope required full surface preparation to SSPC-SP10 standard, application of a high-performance three-coat epoxy/polyurethane system, and a NACE-certified inspection regime to deliver a 25-year design life under coastal exposure conditions.",
      "Working on a live refinery imposed a strict permit-to-work regime, hot-work clearances, and zero-tolerance HSE governance. ETCS mobilised a 64-strong crew on two shift patterns to maintain progress without compromising plant safety.",
    ],
    metrics: [
      { label: "Tanks", value: "12", detail: "Atmospheric storage" },
      { label: "Surface area", value: "48k m²", detail: "Prepared & coated" },
      { label: "Workforce", value: "64", detail: "Two-shift pattern" },
      { label: "Safety", value: "0", detail: "LTI to date" },
    ],
    scopeDetail: [
      "SSPC-SP10 abrasive blasting and surface profile verification",
      "Three-coat epoxy/polyurethane high-build system",
      "NACE inspection — DFT, holiday detection, adhesion testing",
      "Scaffolding, containment, and waste media management",
      "Coordination with operations for safe tank handover and energising",
      "Daily HSE walk-downs, weekly client progress reviews",
    ],
    gallery: [
      "/images/projects/ongoing/coating-tank-01.jpg",
      "/images/services/coating-01.jpg",
      "/images/services/fireproofing-01.jpg",
      "/images/projects/ongoing/insulation-plant-01.jpg",
      "/images/projects/completed/tank-fabrication-01.jpg",
      "/images/services/piping-01.jpg",
    ],
    quote: {
      body: "ETCS held the schedule through two unplanned plant events. The QA/QC documentation was audit-ready every single week.",
      author: "Project Engineer",
      role: "Refining operator (client name protected under NDA)",
    },
  },
  {
    slug: "process-plant-insulation-rabigh",
    title: "Process Plant Insulation & Cladding",
    client: "Confidential — Petrochemical Operator",
    location: "Rabigh",
    scope: "Hot and cold insulation with aluminium cladding across process units.",
    category: "industrial",
    status: "ongoing",
    progress: 42,
    duration: "9 months",
    image: "/images/projects/ongoing/insulation-plant-01.jpg",
    featured: true,
    narrative: [
      "A multi-unit insulation and cladding refresh across a petrochemical complex in Rabigh. ETCS scope covers hot insulation on steam lines, cold insulation on chilled-water systems, and a full aluminium cladding upgrade across visible process areas.",
      "The challenge: install in a live, high-temperature environment without disrupting production. Crews work to a hot-work-permit cadence and use modular pre-fab cladding sections to compress field installation time.",
      "Material control is critical — rock-wool and polyurethane delivery is sequenced to weekly milestones so the yard never holds more than 5 days of stock in a salt-air environment.",
    ],
    metrics: [
      { label: "Lines", value: "11 km", detail: "Of insulated piping" },
      { label: "Cladding", value: "26k m²", detail: "Aluminium upgrade" },
      { label: "Crew peak", value: "84", detail: "Skilled insulators" },
      { label: "Shutdown", value: "0", detail: "Production hours lost" },
    ],
    scopeDetail: [
      "Hot insulation on steam, heat-transfer fluid, and process piping",
      "Cold insulation on chilled-water and cryogenic services",
      "Aluminium cladding fabrication and field installation",
      "Surface preparation and corrosion-under-insulation (CUI) inspection",
      "Permitting, scaffold management, and waste removal",
    ],
    gallery: [
      "/images/projects/ongoing/insulation-plant-01.jpg",
      "/images/services/insulation-01.jpg",
      "/images/services/mechanical-01.jpg",
      "/images/services/piping-01.jpg",
      "/images/projects/completed/tank-fabrication-01.jpg",
    ],
    quote: {
      body: "The pre-fab approach saved us weeks of field time. ETCS understood our production calendar better than some of our own contractors.",
      author: "Plant Maintenance Manager",
      role: "Petrochemical operator",
    },
  },
  {
    slug: "peb-warehouse-dammam",
    title: "Pre-Engineered Warehouse Complex",
    client: "Industrial Developer",
    location: "Dammam Second Industrial City",
    scope: "Design, fabrication and erection of 8,400 m² PEB warehouse with mezzanine.",
    category: "engineering",
    status: "ongoing",
    progress: 55,
    duration: "11 months",
    image: "/images/projects/ongoing/peb-warehouse-01.jpg",
    featured: true,
    narrative: [
      "ETCS is delivering a turnkey 8,400 m² pre-engineered warehouse complex with a 1,200 m² intermediate steel mezzanine for an industrial developer in Dammam Second Industrial City.",
      "Scope spans engineering, primary and secondary steel fabrication, on-site erection, roofing, sandwich-panel cladding, fire-rated dock doors, and a coordinated MEP shell ready for tenant fit-out.",
      "A modular fabrication-then-erection approach lets the developer phase the structure into operations: bays 1-3 are tenant-ready while bays 4-6 are still under cladding.",
    ],
    metrics: [
      { label: "Footprint", value: "8,400 m²", detail: "Single-storey" },
      { label: "Mezzanine", value: "1,200 m²", detail: "Steel-framed" },
      { label: "Steel", value: "640 t", detail: "Fabricated + erected" },
      { label: "Phasing", value: "3 bays", detail: "Handed over ahead" },
    ],
    scopeDetail: [
      "PEB design, calculations and shop drawings",
      "Primary and secondary steel fabrication (640 t)",
      "Site erection and bolt-up",
      "Roof and wall sandwich-panel cladding",
      "Mezzanine deck, stairs, handrails, and fall protection",
      "Coordinated MEP penetrations and grounding",
    ],
    gallery: [
      "/images/projects/ongoing/peb-warehouse-01.jpg",
      "/images/services/peb-01.jpg",
      "/images/services/piping-01.jpg",
      "/images/services/mechanical-01.jpg",
      "/images/services/civil-01.jpg",
    ],
    quote: {
      body: "Phased hand-over let us start storing inventory three months early. That single decision recovered most of the project's commercial value.",
      author: "Development Director",
      role: "Industrial developer",
    },
  },
  {
    slug: "solar-rooftop-riyadh",
    title: "Commercial Rooftop Solar PV",
    client: "Commercial Real Estate Group",
    location: "Riyadh",
    scope: "1.2 MWp rooftop PV system with grid-tied inverters and monitoring.",
    category: "engineering",
    status: "ongoing",
    progress: 73,
    duration: "5 months",
    image: "/images/projects/ongoing/solar-rooftop-01.jpg",
  },

  /* ───────── Completed ───────── */
  {
    slug: "pipeline-fireproofing-yanbu",
    title: "Pipeline Support Fireproofing",
    client: "Confidential — Refining Operator",
    location: "Yanbu",
    scope: "Cementitious fireproofing of structural supports across an active pipeline rack.",
    category: "industrial",
    status: "completed",
    year: 2025,
    image: "/images/projects/completed/fireproofing-pipeline-01.jpg",
  },
  {
    slug: "manpower-shutdown-jeddah",
    title: "Refinery Shutdown Workforce",
    client: "Confidential — Energy Major",
    location: "Jeddah",
    scope: "Mobilisation of 180 skilled tradesmen for a 21-day turnaround.",
    category: "supply",
    status: "completed",
    year: 2025,
    image: "/images/projects/completed/manpower-shutdown-01.jpg",
  },
  {
    slug: "villa-finishing-riyadh",
    title: "Executive Villa Finishing",
    client: "Private Developer",
    location: "Riyadh",
    scope: "Internal and external finishing for a six-villa compound.",
    category: "construction",
    status: "completed",
    year: 2024,
    image: "/images/projects/completed/villa-finishing-01.jpg",
  },
  {
    slug: "ei-substation-jubail",
    title: "Substation Cabling & Commissioning",
    client: "EPC Contractor",
    location: "Jubail",
    scope: "MV cabling, panel installation and pre-commissioning for a 33/11 kV substation.",
    category: "engineering",
    status: "completed",
    year: 2024,
    image: "/images/projects/completed/ei-substation-01.jpg",
  },
  {
    slug: "tank-fabrication-jazan",
    title: "API 650 Tank Fabrication",
    client: "Confidential — Industrial Operator",
    location: "Jazan",
    scope: "Workshop fabrication and site erection of two API 650 storage tanks.",
    category: "industrial",
    status: "completed",
    year: 2023,
    image: "/images/projects/completed/tank-fabrication-01.jpg",
  },
  {
    slug: "om-utility-riyadh",
    title: "Industrial Utility O&M Contract",
    client: "Industrial Group",
    location: "Riyadh",
    scope: "Two-year operation & maintenance contract covering utilities and steam generation.",
    category: "construction",
    status: "completed",
    year: 2023,
    image: "/images/projects/completed/om-utility-01.jpg",
  },
];

export const ongoingProjects = projects.filter((p) => p.status === "ongoing");
export const completedProjects = projects.filter((p) => p.status === "completed");
export const featuredProjects = [...ongoingProjects.slice(0, 2), ...completedProjects.slice(0, 1)];
export const caseStudies = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const list = projects.filter((p) => p.featured);
  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return list[(idx + 1) % list.length];
}
