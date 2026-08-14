export type ServiceCategory = "industrial" | "construction" | "engineering" | "supply";

export type Service = {
  slug: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  description: string;
  scope: string[];
  sectors: string[];
  heroImage: string;
  galleryImages?: string[];
};

export const CATEGORIES: { slug: ServiceCategory; key: keyof IntlCategories }[] = [
  { slug: "industrial", key: "industrial" },
  { slug: "construction", key: "construction" },
  { slug: "engineering", key: "engineering" },
  { slug: "supply", key: "supply" },
];

type IntlCategories = {
  industrial: string;
  construction: string;
  engineering: string;
  supply: string;
};

export const services: Service[] = [
  /* ───────── Industrial ───────── */
  {
    slug: "coating-and-lining",
    category: "industrial",
    title: "Coating & Lining Works",
    shortDescription:
      "Protective coatings and lining systems engineered to maximise asset durability and corrosion resistance.",
    description:
      "Advanced protective coating and lining solutions engineered to maximize the durability, corrosion resistance, and operational lifespan of industrial assets. Our expertise covers surface preparation, corrosion control, tank lining, and pipeline coating for storage tanks, pipelines, steel structures, and industrial facilities.",
    scope: [
      "Surface preparation & abrasive blasting",
      "Internal tank lining (epoxy, FBE, glass-flake)",
      "External pipeline coating systems",
      "Corrosion protection for steel structures",
      "QA/QC and DFT inspection per NACE/SSPC",
    ],
    sectors: ["Oil & Gas", "Refining & Petrochemical", "Storage & Terminals", "Water"],
    heroImage: "/images/services/coating-01.jpg",
  },
  {
    slug: "insulation-and-cladding",
    category: "industrial",
    title: "Insulation & Cladding Works",
    shortDescription:
      "High-performance insulation and metal cladding that lift energy efficiency and operational safety.",
    description:
      "High-performance insulation and cladding solutions designed to improve energy efficiency, equipment reliability, and operational safety across industrial facilities. Expertise includes thermal insulation, hot & cold insulation, acoustic insulation, and metal cladding works for refineries, process plants, pipelines, and industrial equipment.",
    scope: [
      "Thermal hot & cold insulation",
      "Acoustic and personnel-protection insulation",
      "Aluminium / stainless cladding",
      "Cryogenic insulation systems",
      "Trace-heating integration",
    ],
    sectors: ["Refining", "Petrochemical", "Power Generation", "LNG"],
    heroImage: "/images/services/insulation-01.jpg",
  },
  {
    slug: "piping-and-fabrication",
    category: "industrial",
    title: "Piping, Handrails, Pipe Supports & Tank Fabrication",
    shortDescription:
      "Precision fabrication and installation for piping, supports, handrails and tanks to project specification.",
    description:
      "Precision fabrication and installation solutions engineered to meet complex industrial project requirements. Expertise includes piping fabrication, tank fabrication, structural supports, handrails, welding, and installation works for oil & gas facilities, fabrication yards, and industrial plants.",
    scope: [
      "Carbon steel & stainless piping spools",
      "API tank fabrication and erection",
      "Structural supports and handrails",
      "Certified welders (6G, TIG, MIG)",
      "Hydro-testing and pre-commissioning",
    ],
    sectors: ["Oil & Gas", "Petrochemical", "Fabrication Yards", "Industrial Plants"],
    heroImage: "/images/services/piping-01.jpg",
  },
  {
    slug: "fireproofing",
    category: "industrial",
    title: "Fireproofing Works",
    shortDescription:
      "Passive fire protection that preserves structural integrity in the harshest industrial environments.",
    description:
      "Advanced fireproofing solutions developed to enhance structural integrity, asset protection, and fire resistance in industrial environments. Expertise includes passive fireproofing, intumescent coatings, cementitious fireproofing, and steel protection systems for industrial structures, process facilities, and steel buildings.",
    scope: [
      "Intumescent coating application",
      "Cementitious fireproofing systems",
      "Steel-structure passive protection",
      "Hydrocarbon fire-rated certifications",
      "Inspection and rectification works",
    ],
    sectors: ["Refining", "Petrochemical", "Power", "Industrial Facilities"],
    heroImage: "/images/services/fireproofing-01.jpg",
  },
  {
    slug: "refractory",
    category: "industrial",
    title: "Refractory",
    shortDescription:
      "Advanced refractory systems engineered for high-temperature, high-demand industrial service.",
    description:
      "Advanced refractory solutions engineered for high-temperature and demanding industrial applications, delivering superior durability, operational reliability, and thermal efficiency. ETCS installs, repairs and maintains refractory linings for furnaces, boilers, kilns, and process equipment.",
    scope: [
      "Castable, gunning and shotcrete refractory installation",
      "Brick and tile lining works",
      "Ceramic fibre and insulation linings",
      "Refractory repair, dry-out and maintenance",
      "Inspection and material selection support",
    ],
    sectors: ["Refining", "Petrochemical", "Power Generation", "Cement & Steel"],
    heroImage: "/images/services/refractory-01.jpg",
  },
  {
    slug: "passive-fire-protection",
    category: "industrial",
    title: "Passive Fire Protection",
    shortDescription:
      "PFP systems that protect critical infrastructure against fire exposure and structural risk.",
    description:
      "Passive fire protection systems designed to protect critical infrastructure against fire exposure, helping clients maintain safety standards while minimizing operational and structural risks. ETCS delivers certified PFP application across structures, vessels and supports.",
    scope: [
      "Intumescent and cementitious PFP application",
      "Structural steel and vessel fire protection",
      "Hydrocarbon (jet-fire) rated systems",
      "Surface preparation and mesh reinforcement",
      "Inspection, DFT verification and rectification",
    ],
    sectors: ["Oil & Gas", "Refining", "Petrochemical", "Industrial Facilities"],
    heroImage: "/images/services/passive-fire-protection-01.jpg",
  },
  {
    slug: "waste-management",
    category: "industrial",
    title: "Waste Management",
    shortDescription:
      "Compliant collection, transport and disposal of industrial and construction waste streams.",
    description:
      "Efficient waste management solutions focused on environmental sustainability, operational efficiency, and regulatory compliance. Expertise includes waste collection, transportation, recycling, disposal, and environmental support services for industrial plants, construction sites, and infrastructure developments.",
    scope: [
      "Hazardous and non-hazardous waste handling",
      "On-site segregation and packaging",
      "Licensed transportation and disposal",
      "Recycling and recovery programmes",
      "Environmental compliance reporting",
    ],
    sectors: ["Industrial Plants", "Construction Sites", "Infrastructure", "Municipal"],
    heroImage: "/images/services/waste-01.jpg",
  },

  /* ───────── Construction ───────── */
  {
    slug: "civil-construction",
    category: "construction",
    title: "Civil Construction of Buildings & Villas",
    shortDescription:
      "Durable, modern civil works for residential, commercial and industrial developments.",
    description:
      "Comprehensive civil construction solutions delivering durable, modern, and high-quality developments for residential, commercial, and industrial sectors. Expertise includes structural works, concrete works, finishing, infrastructure development, and project execution for villas, offices, warehouses, and commercial buildings.",
    scope: [
      "Structural & concrete works",
      "Internal & external finishing",
      "MEP coordination",
      "Infrastructure and site development",
      "Turnkey delivery",
    ],
    sectors: ["Residential", "Commercial", "Industrial", "Public Sector"],
    heroImage: "/images/services/civil-01.jpg",
  },
  {
    slug: "renovation-and-maintenance",
    category: "construction",
    title: "Renovation & Maintenance Works",
    shortDescription:
      "Renovations, interior upgrades and preventive maintenance for offices, residences and facilities.",
    description:
      "Professional renovation and maintenance solutions designed to enhance the functionality, appearance, and long-term value of facilities. Expertise includes repairs, remodeling, interior upgrades, preventive maintenance, and facility improvement works for residential compounds, offices, and industrial facilities.",
    scope: [
      "Interior and exterior remodeling",
      "Preventive and corrective maintenance",
      "MEP repairs and upgrades",
      "Facility refurbishment",
      "Compound and office fit-outs",
    ],
    sectors: ["Residential Compounds", "Offices", "Industrial Facilities", "Hospitality"],
    heroImage: "/images/services/renovation-01.jpg",
  },
  {
    slug: "operation-and-maintenance",
    category: "construction",
    title: "Operation & Maintenance (O&M)",
    shortDescription:
      "Integrated O&M that protects asset performance and maximises operational uptime.",
    description:
      "Integrated operation and maintenance solutions ensuring reliable performance, operational continuity, and maximum efficiency of facilities and equipment. Expertise includes equipment maintenance, inspections, troubleshooting, and technical support services for industrial plants, utilities, and commercial facilities.",
    scope: [
      "Planned, predictive & corrective maintenance",
      "Equipment inspections and audits",
      "On-call technical support",
      "Shutdown and turnaround support",
      "Performance reporting",
    ],
    sectors: ["Industrial Plants", "Utilities", "Commercial Facilities", "Government"],
    heroImage: "/images/services/om-01.jpg",
  },

  /* ───────── Engineering & Technical ───────── */
  {
    slug: "electrical-and-instrumentation",
    category: "engineering",
    title: "Electrical & Instrumentation (E&I) Works",
    shortDescription:
      "End-to-end E&I works for safe, efficient and reliable industrial operations.",
    description:
      "Comprehensive electrical and instrumentation solutions supporting safe, efficient, and reliable industrial operations. Expertise includes cable installation, panel works, instrumentation calibration, testing, and commissioning for power plants, industrial facilities, and process industries.",
    scope: [
      "LV/MV cabling and termination",
      "Panel & switchgear installation",
      "Field instrumentation and calibration",
      "Loop checks and pre-commissioning",
      "Hazardous-area certification",
    ],
    sectors: ["Power", "Refining", "Petrochemical", "Process Industries"],
    heroImage: "/images/services/ei-01.jpg",
  },
  {
    slug: "mechanical-works",
    category: "engineering",
    title: "Mechanical Works",
    shortDescription:
      "Mechanical solutions for industrial operations and infrastructure — installed, tested and commissioned.",
    description:
      "Efficient mechanical solutions engineered to support industrial operations and infrastructure development with precision and reliability. Expertise includes equipment installation, piping systems, maintenance, testing, and commissioning for manufacturing plants, industrial facilities, and energy sectors.",
    scope: [
      "Rotating and static equipment installation",
      "Piping system fabrication and erection",
      "Pre-commissioning and commissioning",
      "Mechanical maintenance",
      "Equipment alignment and balancing",
    ],
    sectors: ["Manufacturing", "Energy", "Industrial Facilities", "Utilities"],
    heroImage: "/images/services/mechanical-01.jpg",
  },
  {
    slug: "peb-buildings",
    category: "engineering",
    title: "PEB Buildings",
    shortDescription:
      "Pre-engineered buildings — designed, fabricated and erected for industrial and commercial use.",
    description:
      "Modern and cost-effective Pre-Engineered Building solutions designed for strength, flexibility, and long-term performance in industrial and commercial applications. Expertise includes design, fabrication, erection, roofing, cladding, and structural steel works for warehouses, factories, workshops, and storage facilities.",
    scope: [
      "PEB design and engineering",
      "Workshop fabrication of primary & secondary members",
      "Site erection and bolt-up",
      "Roofing and cladding systems",
      "Mezzanine and crane support structures",
    ],
    sectors: ["Warehousing", "Factories", "Workshops", "Storage Facilities"],
    heroImage: "/images/services/peb-01.jpg",
  },
  {
    slug: "solar-energy",
    category: "engineering",
    title: "Solar Energy Solutions",
    shortDescription:
      "Solar PV design and installation that drives sustainability and reduces operating cost.",
    description:
      "Innovative solar energy solutions developed to promote sustainability, energy efficiency, and environmentally responsible operations. Expertise includes solar system design, panel installation, maintenance, and energy optimization for commercial buildings, industrial facilities, and renewable energy projects.",
    scope: [
      "Solar PV system design and engineering",
      "Rooftop and ground-mount installation",
      "Inverter integration and monitoring",
      "Operations and maintenance",
      "Energy audit and optimisation",
    ],
    sectors: ["Commercial", "Industrial", "Government", "Renewables"],
    heroImage: "/images/services/solar-01.jpg",
  },
  {
    slug: "inspection-services",
    category: "engineering",
    title: "Inspection Services",
    shortDescription:
      "Independent inspection of civil, mechanical and fabrication works against quality and safety specs.",
    description:
      "Inspection services for civil, mechanical, and fabrication works to ensure compliance with quality, safety, and project specifications — covering structural works, piping systems, welding, mechanical equipment, and construction materials. ETCS provides qualified inspectors and audit-ready documentation.",
    scope: [
      "Welding and NDT inspection (visual, RT, UT, MT, PT)",
      "Coating and DFT inspection (NACE/SSPC)",
      "Civil and structural works inspection",
      "Piping and mechanical equipment verification",
      "Material receiving inspection and reporting",
    ],
    sectors: ["Oil & Gas", "Fabrication Yards", "Construction", "Industrial Plants"],
    heroImage: "/images/services/inspection-services-01.jpg",
  },

  /* ───────── Supply & Support ───────── */
  {
    slug: "manpower-supply",
    category: "supply",
    title: "Manpower Supply",
    shortDescription:
      "Skilled professionals and technical workforce mobilised on demand for projects and shutdowns.",
    description:
      "Reliable manpower solutions providing qualified and skilled professionals to support industrial, construction, and technical projects. Expertise includes technical staffing, skilled labor supply, workforce support, and manpower management for industrial shutdowns, construction projects, and plant operations.",
    scope: [
      "Skilled and semi-skilled labor supply",
      "Technical staffing (engineers, supervisors, QC)",
      "Shutdown and turnaround workforce",
      "Iqama and mobilisation support",
      "Workforce management on site",
    ],
    sectors: ["Shutdowns & Turnarounds", "Construction", "Plant Operations", "Industrial"],
    heroImage: "/images/services/manpower-01.jpg",
  },
  {
    slug: "training-services",
    category: "supply",
    title: "Training Services",
    shortDescription:
      "Industrial training that builds workforce competency, safety and certified technical skill.",
    description:
      "Professional industrial training focused on workforce competency, safety, and technical skill development — abrasive blasters, coating applicators, quality inspectors, safety officers, welders, electricians, plumbers, and other skilled trades, aligned with international standards and industry best practice.",
    scope: [
      "Abrasive blaster & coating applicator training",
      "Welder and fabricator qualification",
      "Quality inspector & welding inspection training",
      "Safety officer and HSE awareness programs",
      "Electrical, plumbing and skilled-trade development",
    ],
    sectors: ["Oil & Gas", "Construction", "Industrial Plants", "Fabrication Yards"],
    heroImage: "/images/services/training-services-01.jpg",
  },
  {
    slug: "rental-equipment",
    category: "supply",
    title: "Rental Equipment",
    shortDescription:
      "Reliable equipment rental — lifting, access, power and support — for uninterrupted operations.",
    description:
      "Dependable equipment rental solutions supporting efficient and uninterrupted construction and industrial operations. Expertise includes heavy equipment rental, lifting machinery, operational support, and equipment maintenance for construction sites, industrial plants, and infrastructure projects.",
    scope: [
      "Cranes and lifting equipment",
      "Aerial work platforms",
      "Generators and compressors",
      "Earthmoving and material handling",
      "On-site operator support",
    ],
    sectors: ["Construction Sites", "Industrial Plants", "Infrastructure", "Marine"],
    heroImage: "/images/services/rental-01.jpg",
  },
  {
    slug: "industrial-material-supply",
    category: "supply",
    title: "Industrial Material Supply",
    shortDescription:
      "Procurement and logistics for industrial materials, tools and project equipment.",
    description:
      "ETCS supplies quality materials for civil, mechanical, industrial, and general building projects — construction materials, piping components, structural steel, fabrication consumables, and safety equipment — with timely and reliable delivery support across the Kingdom.",
    scope: [
      "Pipe, fittings and valves",
      "Electrical and instrumentation consumables",
      "PPE and safety equipment",
      "Power tools and consumables",
      "Logistics and last-mile delivery",
    ],
    sectors: ["Industrial", "Commercial", "Infrastructure", "Government"],
    heroImage: "/images/services/supply-01.jpg",
  },
];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
