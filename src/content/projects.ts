import type { ServiceCategory } from "./services";

/**
 * Rev 01 — ETCS is newly established with no client-attributable project
 * record yet. The fabricated case studies (and fake client names / metrics /
 * quotes) have been removed. This file now models an honest "Our Work"
 * capability gallery: real field photographs grouped by discipline, with no
 * client names, contract values, or invented numbers.
 */
export type WorkItem = {
  slug: string;
  title: string;
  /** Short capability blurb — no client/contract claims */
  blurb: string;
  category: ServiceCategory;
  /** Cover image */
  image: string;
  /** Gallery images for the discipline */
  gallery: string[];
  /** Linked service slug (for cross-navigation) */
  service?: string;
};

export const work: WorkItem[] = [
  {
    slug: "coating-and-lining",
    title: "Coating & Lining",
    blurb: "Surface preparation, protective coating and tank lining for corrosion control on industrial assets.",
    category: "industrial",
    image: "/images/work/coating/01.jpg",
    gallery: [
      "/images/work/coating/01.jpg",
      "/images/work/coating/02.jpg",
      "/images/work/coating/03.jpg",
      "/images/work/coating/04.jpg",
    ],
    service: "coating-and-lining",
  },
  {
    slug: "insulation-and-cladding",
    title: "Insulation & Cladding",
    blurb: "Thermal and acoustic insulation with metal cladding across process piping and equipment.",
    category: "industrial",
    image: "/images/work/insulation/01.jpg",
    gallery: [
      "/images/work/insulation/01.jpg",
      "/images/work/insulation/02.jpg",
      "/images/work/insulation/03.jpg",
    ],
    service: "insulation-and-cladding",
  },
  {
    slug: "refractory",
    title: "Refractory",
    blurb: "High-temperature refractory linings for furnaces, boilers and process equipment.",
    category: "industrial",
    image: "/images/work/refractory/01.jpg",
    gallery: [
      "/images/work/refractory/01.jpg",
      "/images/work/refractory/02.jpg",
      "/images/work/refractory/03.jpg",
    ],
    service: "refractory",
  },
  {
    slug: "passive-fire-protection",
    title: "Passive Fire Protection",
    blurb: "Certified intumescent and cementitious fire protection for structures and supports.",
    category: "industrial",
    image: "/images/work/passive-fire-protection/01.jpg",
    gallery: [
      "/images/work/passive-fire-protection/01.jpg",
      "/images/work/passive-fire-protection/02.jpg",
      "/images/work/passive-fire-protection/03.jpg",
    ],
    service: "passive-fire-protection",
  },
  {
    slug: "fabrication",
    title: "Fabrication",
    blurb: "Pipe spools, structural steel, tanks, supports and handrails fabricated to specification.",
    category: "industrial",
    image: "/images/work/fabrication/01.jpg",
    gallery: [
      "/images/work/fabrication/01.jpg",
      "/images/work/fabrication/02.jpg",
      "/images/work/fabrication/03.jpg",
      "/images/work/fabrication/04.jpg",
      "/images/work/fabrication/05.jpg",
    ],
    service: "piping-and-fabrication",
  },
  {
    slug: "civil-construction",
    title: "Civil Construction",
    blurb: "Surveying, excavation, concrete, GRP piping and structural civil works.",
    category: "construction",
    image: "/images/work/civil/01.jpg",
    gallery: [
      "/images/work/civil/01.jpg",
      "/images/work/civil/02.jpg",
      "/images/work/civil/03.jpg",
      "/images/work/civil/04.jpg",
      "/images/work/civil/05.jpg",
    ],
    service: "civil-construction",
  },
  {
    slug: "waste-management",
    title: "Waste Management",
    blurb: "Collection, segregation, transport and responsible disposal of industrial waste streams.",
    category: "industrial",
    image: "/images/work/waste/01.jpg",
    gallery: ["/images/work/waste/01.jpg", "/images/work/waste/02.jpg"],
    service: "waste-management",
  },
  {
    slug: "inspection-services",
    title: "Inspection Services",
    blurb: "Welding, coating, civil and mechanical inspection with audit-ready documentation.",
    category: "engineering",
    image: "/images/work/inspection/01.jpg",
    gallery: [
      "/images/work/inspection/01.jpg",
      "/images/work/inspection/02.jpg",
      "/images/work/inspection/03.jpg",
      "/images/work/inspection/04.jpg",
    ],
    service: "inspection-services",
  },
  {
    slug: "training-services",
    title: "Training Services",
    blurb: "Trade training and qualification for blasters, applicators, welders and inspectors.",
    category: "supply",
    image: "/images/work/training/01.jpg",
    gallery: [
      "/images/work/training/01.jpg",
      "/images/work/training/02.jpg",
      "/images/work/training/03.jpg",
      "/images/work/training/04.jpg",
    ],
    service: "training-services",
  },
  {
    slug: "manpower-supply",
    title: "Manpower Supply",
    blurb: "Skilled and technical workforce mobilised for projects, shutdowns and operations.",
    category: "supply",
    image: "/images/work/manpower/01.jpg",
    gallery: ["/images/work/manpower/01.jpg", "/images/work/manpower/02.jpg"],
    service: "manpower-supply",
  },
];

export const workCategories: ServiceCategory[] = [
  "industrial",
  "construction",
  "engineering",
  "supply",
];

export function getWorkItem(slug: string): WorkItem | undefined {
  return work.find((w) => w.slug === slug);
}

export function getWorkByCategory(category: ServiceCategory): WorkItem[] {
  return work.filter((w) => w.category === category);
}
