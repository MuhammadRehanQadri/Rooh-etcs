"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { work, workCategories, type WorkItem } from "@/content/projects";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";

const filters = ["all", ...workCategories] as const;

export function WorkGallery() {
  const t = useTranslations("pages.projects");
  const [filter, setFilter] = React.useState<(typeof filters)[number]>("all");

  const items = filter === "all" ? work : work.filter((w) => w.category === filter);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-wide">
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition cursor-pointer",
                filter === f
                  ? "bg-gold-500 text-navy-900"
                  : "bg-bone-100 text-bone-600 hover:bg-bone-200"
              )}
            >
              {t(`filter${f.charAt(0).toUpperCase()}${f.slice(1)}` as never)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-bone-300 p-16 text-center">
                <p className="font-display text-2xl text-navy-900 mb-3">{t("emptyTitle")}</p>
                <p className="text-sm text-bone-600 max-w-md mx-auto">{t("emptyBody")}</p>
              </div>
            ) : (
              <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((w) => (
                  <StaggerItem key={w.slug}>
                    <WorkCard item={w} viewLabel={t("viewService")} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function WorkCard({ item, viewLabel }: { item: WorkItem; viewLabel: string }) {
  const card = (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-bone-200">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/30 to-transparent" />
      </div>
      <div className="absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white/85 transition group-hover:bg-gold-500 group-hover:text-navy-900">
        <ArrowUpRightIcon className="size-4 rtl:rotate-90" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-lg font-semibold leading-tight text-balance mb-2">{item.title}</h3>
        <p className="text-xs text-white/70 leading-relaxed mb-3 line-clamp-2">{item.blurb}</p>
        {item.service && (
          <span className="text-[11px] uppercase tracking-[0.18em] text-gold-400 group-hover:underline">
            {viewLabel} →
          </span>
        )}
      </div>
    </article>
  );

  return (
    <Tilt className="h-full">
      {item.service ? (
        <Link href={`/services/${item.service}`} className="block h-full">
          {card}
        </Link>
      ) : (
        card
      )}
    </Tilt>
  );
}
