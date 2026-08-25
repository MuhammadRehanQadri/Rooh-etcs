import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Expert Technical Contracting & Services",
  legalName: "Expert Technical Contracting Services Company",
  shortName: "ETCS",
  tagline: "Where Vision Becomes Reality",
  /** Saudi Commercial Registration number — from the CR certificate in public/documents/etcs-company-profile.pdf */
  crNumber: "7054306282",
  url: "https://etcs-ksa.com",
  phone: "+966590517642",
  phoneDisplay: "+966 59 051 7642",
  /** Additional reachable numbers (display only) */
  phonesExtra: ["+966 53 938 6566", "+966 58 062 6541", "+966 56 732 1879"],
  email: "info@etcs-ksa.com",
  /** Role-based inboxes (all on the verified etcs-ksa.com domain) */
  emails: {
    info: "info@etcs-ksa.com",
    inquiry: "inquiry@etcs-ksa.com",
    sales: "sales@etcs-ksa.com",
    accounts: "accounts@etcs-ksa.com",
    careers: "hr@etcs-ksa.com",
  },
  careersEmail: "hr@etcs-ksa.com",
  address:
    "P.O. Box 35514, Dana District, Omar Bin Abdul Aziz St., Al Jubail, Kingdom of Saudi Arabia",
  workingHours: "Saturday – Thursday: 7:00 AM – 6:00 PM · Friday: Closed",
  whatsapp: "966590517642",
  // re-enable when client provides live social URLs (left blank in Rev 01 checklist)
  social: {
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
  },
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
