export type VendorApproval = {
  name: string;
  type: "operator" | "certification" | "partner";
  detail?: string;
  /** Operator pre-qualification / certification status (Rev 01) */
  status?: "approved" | "in-progress";
  /** Certificate number, where applicable */
  certNo?: string;
  /** Validity / expiry as displayed on the page, e.g. "21 May 2029" */
  validTo?: string;
  /** Same date in ISO 8601 (YYYY-MM-DD) — required by schema.org `expires`. */
  validToISO?: string;
};

/**
 * Rev 01 — honest realignment. ETCS is newly established: operator
 * pre-qualifications are IN PROGRESS (not yet approved), and ISO
 * certifications carry real certificate numbers and expiry dates.
 */
export const vendorApprovals: VendorApproval[] = [
  { name: "Saudi Aramco", type: "operator", status: "in-progress", detail: "Vendor pre-qualification" },
  { name: "SABIC", type: "operator", status: "in-progress", detail: "Vendor pre-qualification" },
  { name: "Saudi Electricity Company", type: "operator", status: "in-progress", detail: "Vendor pre-qualification" },
  {
    name: "ISO 9001:2015 — Quality",
    type: "certification",
    status: "approved",
    detail: "Quality Management System",
    certNo: "220526019624",
    validTo: "21 May 2029",
    validToISO: "2029-05-21",
  },
  {
    name: "ISO 14001:2015 — Environment",
    type: "certification",
    status: "approved",
    detail: "Environmental Management System",
    certNo: "220526029625",
    validTo: "21 May 2029",
    validToISO: "2029-05-21",
  },
  {
    name: "ISO 45001:2018 — OH&S",
    type: "certification",
    status: "approved",
    detail: "Occupational Health & Safety Management System",
    certNo: "220526039626",
    validTo: "21 May 2029",
    validToISO: "2029-05-21",
  },
  {
    name: "NACE / SSPC Compliance",
    type: "certification",
    status: "in-progress",
    detail: "Coatings inspection program",
  },
  {
    name: "Aramco / SABIC Vendor Codes",
    type: "certification",
    status: "in-progress",
    detail: "Registration in progress",
  },
];
