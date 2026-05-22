import type { ServiceCategory } from "./services";

export type ProjectStatus = "ongoing" | "completed";

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
  image: string;
  gallery?: string[];
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
    image: "/images/projects/ongoing/coating-tank-01.jpg",
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
    image: "/images/projects/ongoing/insulation-plant-01.jpg",
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
    image: "/images/projects/ongoing/peb-warehouse-01.jpg",
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
