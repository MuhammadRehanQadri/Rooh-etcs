export type VendorApproval = {
  name: string;
  type: "operator" | "certification" | "partner";
  detail?: string;
  /** Operator registration / certification status */
  status?: "approved" | "in-progress";
  /** Certificate number, where applicable */
  certNo?: string;
  /** Operator-issued supplier/vendor code, where the registration has completed */
  vendorCode?: string;
  /** Validity / expiry as displayed on the page, e.g. "21 May 2029" */
  validTo?: string;
  /** Same date in ISO 8601 (YYYY-MM-DD) — required by schema.org `expires`. */
  validToISO?: string;
};

/**
 * Rev 02 — updated from the July 2026 corporate profile. Saudi Aramco supplier
 * registration has COMPLETED (approval letter 19 Jul 2026, vendor code
 * 10120303); every other operator pre-qualification remains IN PROGRESS. ISO
 * certifications carry real certificate numbers and expiry dates.
 *
 * Registration is not a commitment to procure — the Aramco letter says so
 * explicitly, which is why the label is "Registered supplier", never
 * "approved contractor". Do not upgrade this wording without a new letter.
 */
export const vendorApprovals: VendorApproval[] = [
  {
    name: "Saudi Aramco",
    type: "operator",
    status: "approved",
    detail: "Registered supplier — Supplier Management System",
    vendorCode: "10120303",
  },
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
    name: "SABIC Vendor Code",
    type: "certification",
    status: "in-progress",
    detail: "Registration in progress",
  },
];
