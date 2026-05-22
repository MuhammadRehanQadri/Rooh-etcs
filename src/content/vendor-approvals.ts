export type VendorApproval = {
  name: string;
  type: "operator" | "certification" | "partner";
  detail?: string;
};

export const vendorApprovals: VendorApproval[] = [
  { name: "Saudi Aramco", type: "operator" },
  { name: "SABIC", type: "operator" },
  { name: "Royal Commission", type: "operator" },
  { name: "Petro Rabigh", type: "operator" },
  { name: "SATORP", type: "operator" },
  { name: "Marafiq", type: "operator" },
  { name: "ISO 9001:2015 — Quality", type: "certification", detail: "Quality Management System" },
  { name: "ISO 14001:2015 — Environment", type: "certification", detail: "Environmental Management" },
  { name: "ISO 45001:2018 — OH&S", type: "certification", detail: "Occupational Health & Safety" },
  { name: "NACE / SSPC Compliance", type: "certification", detail: "Coatings inspection program" },
];
