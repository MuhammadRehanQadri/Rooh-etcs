export type CareerRole = {
  slug: string;
  title: string;
  location: string;
  department: string;
  type: "Full-time" | "Contract" | "Project-based";
  description: string;
};

export const careerRoles: CareerRole[] = [
  {
    slug: "site-engineer-coatings",
    title: "Site Engineer — Coatings",
    location: "Eastern Province, KSA",
    department: "Industrial Services",
    type: "Full-time",
    description:
      "Plan, supervise and report on coating works at refinery and tank-farm sites. NACE certification preferred.",
  },
  {
    slug: "qa-qc-inspector",
    title: "QA/QC Inspector",
    location: "Jubail / Yanbu",
    department: "Quality",
    type: "Full-time",
    description:
      "Lead QA/QC inspection across welding, coating and mechanical scope. CSWIP or equivalent certification required.",
  },
  {
    slug: "ei-supervisor",
    title: "Electrical & Instrumentation Supervisor",
    location: "Jeddah",
    department: "Engineering",
    type: "Project-based",
    description:
      "Supervise field E&I installation including cabling, panel and instrumentation works. Hazardous-area experience essential.",
  },
  {
    slug: "civil-foreman",
    title: "Civil Foreman",
    location: "Riyadh",
    department: "Construction",
    type: "Full-time",
    description:
      "Manage day-to-day site activities for civil works on villa and commercial projects.",
  },
];
