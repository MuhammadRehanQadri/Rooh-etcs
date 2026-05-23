"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MapPinIcon, ArrowUpRightIcon } from "lucide-react";

const filters = [
  { key: "all", value: "all" },
  { key: "industrial", value: "industrial" },
  { key: "construction", value: "construction" },
  { key: "engineering", value: "engineering" },
  { key: "supply", value: "supply" },
] as const;

export function ProjectsBoard({
  ongoing,
  completed,
  initialTab = "ongoing",
}: {
  ongoing: Project[];
  completed: Project[];
  initialTab?: "ongoing" | "completed";
}) {
  const t = useTranslations("pages.projects");
  const [filter, setFilter] = React.useState<(typeof filters)[number]["value"]>("all");

  const applyFilter = (list: Project[]) =>
    filter === "all" ? list : list.filter((p) => p.category === filter);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-wide">
        <Tabs defaultValue={initialTab} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <TabsList>
              <TabsTrigger value="ongoing">{t("tabOngoing")}</TabsTrigger>
              <TabsTrigger value="completed">{t("tabCompleted")}</TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition cursor-pointer",
                    filter === f.value
                      ? "bg-gold-500 text-navy-900"
                      : "bg-bone-100 text-bone-600 hover:bg-bone-200"
                  )}
                >
                  {t(`filter${f.key.charAt(0).toUpperCase()}${f.key.slice(1)}` as never)}
                </button>
              ))}
            </div>
          </div>

          <TabsContent value="ongoing">
            <ProjectGrid items={applyFilter(ongoing)} />
          </TabsContent>
          <TabsContent value="completed">
            <ProjectGrid items={applyFilter(completed)} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  const t = useTranslations("pages.projects");
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-bone-300 p-16 text-center">
        <p className="font-display text-2xl text-navy-900 mb-3">{t("emptyTitle")}</p>
        <p className="text-sm text-bone-600 max-w-md mx-auto">{t("emptyBody")}</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={items.map((i) => i.slug).join("-")}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("pages.projects");
  const content = (
    <>
      <div className="relative aspect-[4/3]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/30 to-transparent" />
      </div>
      {project.featured && (
        <div className="absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white/85 transition group-hover:bg-gold-500 group-hover:text-navy-900">
          <ArrowUpRightIcon className="size-4 rtl:rotate-90" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] mb-3">
          <span className={`size-1.5 rounded-full ${project.status === "ongoing" ? "bg-gold-500 animate-pulse" : "bg-white/70"}`} />
          <span className="text-gold-400">
            {project.status === "ongoing" ? t("tabOngoing") : t("tabCompleted")}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-tight text-balance mb-2">
          {project.title}
        </h3>
        <p className="text-xs text-white/70 mb-3">{project.client}</p>
        <div className="flex items-center justify-between text-xs text-white/65">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-3 text-gold-500" />
            {project.location}
          </span>
          {project.status === "ongoing" && project.progress !== undefined && (
            <span>{project.progress}%</span>
          )}
          {project.year && <span>{project.year}</span>}
        </div>
      </div>
    </>
  );
  if (project.featured) {
    return (
      <Link
        href={`/projects/${project.slug}` as never}
        className="group relative block h-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-bone-200"
      >
        {content}
      </Link>
    );
  }
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-bone-200">
      {content}
    </article>
  );
}
