import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Expert Technical Contracting & Services",
  shortName: "ETCS",
  tagline: "Where Vision Becomes Reality",
  url: "https://etcs-ksa.com",
  phone: "+966590517642",
  phoneDisplay: "+966 59 051 7642",
  email: "info@etcs-ksa.com",
  address: "Kingdom of Saudi Arabia",
  whatsapp: "966590517642",
  social: {
    linkedin: "https://www.linkedin.com/company/etcs",
    twitter: "https://twitter.com/etcs",
    instagram: "https://instagram.com/etcs",
    facebook: "https://facebook.com/etcs",
  },
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
