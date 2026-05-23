export type LeaderRole = {
  name: string;
  title: string;
  bio: string;
  initials: string;
  /** Optional accent palette for the placeholder portrait */
  accent: "navy" | "gold" | "ink" | "rust";
};

export const leadership: LeaderRole[] = [
  {
    name: "Mr. R. Al-Qahtani",
    title: "Managing Director",
    bio: "Twenty-five years across refining, petrochemical and EPC delivery. Sets the strategic direction and client relationships.",
    initials: "RQ",
    accent: "navy",
  },
  {
    name: "Eng. F. Hussain",
    title: "Chief Operating Officer",
    bio: "Operations veteran specialised in shutdown planning, multi-site mobilisation and HSE governance.",
    initials: "FH",
    accent: "gold",
  },
  {
    name: "Eng. S. Mahmoud",
    title: "Head of Engineering",
    bio: "Lead engineer for coatings, fabrication and mechanical scope. Custodian of QA/QC discipline.",
    initials: "SM",
    accent: "ink",
  },
  {
    name: "Mr. A. Al-Otaibi",
    title: "Commercial Director",
    bio: "Owns commercial strategy, tendering and contract management across public and private operators.",
    initials: "AO",
    accent: "rust",
  },
];
