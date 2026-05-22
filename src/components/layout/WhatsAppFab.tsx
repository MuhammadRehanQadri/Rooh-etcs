"use client";

import { motion, useReducedMotion } from "motion/react";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFab() {
  const reduced = useReducedMotion();
  return (
    <a
      href={whatsappLink(
        "Hello ETCS, I would like to discuss a project."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 end-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] hover:scale-105 transition-transform cursor-pointer"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]/60"
        animate={reduced ? undefined : { scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        aria-hidden
      />
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="relative size-6"
        aria-hidden
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.546-1.964a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.844 2.692.844.602 0 1.978-.43 2.234-1.347.071-.272.108-.467.108-.617 0-.187-.043-.351-.115-.502-.18-.39-1.06-.617-1.275-.617z" />
        <path d="M16.001 0C7.16 0 0 7.16 0 16.001a15.9 15.9 0 0 0 2.413 8.45L0 32l7.733-2.39A15.97 15.97 0 0 0 16 32c8.84 0 16-7.16 16-16S24.84 0 16.001 0zm0 28.929a12.86 12.86 0 0 1-6.93-2.02l-.498-.292-5.156 1.586 1.61-5.014-.323-.516a12.866 12.866 0 0 1-2.06-6.99c0-7.117 5.79-12.908 12.907-12.908 7.117 0 12.907 5.79 12.907 12.907 0 7.118-5.79 12.908-12.907 12.908z" />
      </svg>
    </a>
  );
}
