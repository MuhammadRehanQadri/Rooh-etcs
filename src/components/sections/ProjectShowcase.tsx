"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/content/projects";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

export function ProjectShowcase() {
  const t = useTranslations();

  return (
    <section className="bg-bone-50 py-24 lg:py-32">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow={t("projectsPreview.eyebrow")}
            title={t("projectsPreview.headline")}
            description={t("projectsPreview.subheadline")}
          />
          <Link
            href="/projects/ongoing"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-900 gold-underline self-start lg:self-end"
          >
            {t("projectsPreview.viewAll")} →
          </Link>
        </div>

        <StaggerGroup className="grid gap-6 lg:grid-cols-12">
          {featuredProjects.map((project, idx) => (
            <StaggerItem
              key={project.slug}
              className={
                idx === 0
                  ? "lg:col-span-7"
                  : idx === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-12"
              }
            >
              <article className="group relative h-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-bone-200">
                <div className={`relative ${idx === 2 ? "aspect-[24/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] mb-3">
                    <span className={`size-1.5 rounded-full ${project.status === "ongoing" ? "bg-gold-500 animate-pulse" : "bg-white/70"}`} />
                    <span className="text-gold-400">
                      {project.status === "ongoing"
                        ? t("projectsPreview.ongoingLabel")
                        : t("projectsPreview.completedLabel")}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/70">{project.client}</span>
                  </div>
                  <h3 className="text-balance text-xl sm:text-2xl font-semibold leading-tight">
                    {project.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/65">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="size-3.5 text-gold-500" />
                      {project.location}
                    </span>
                    {project.status === "ongoing" && project.progress !== undefined && (
                      <span className="inline-flex items-center gap-2">
                        <span className="relative inline-block h-1 w-20 rounded-full bg-white/15 overflow-hidden">
                          <span
                            className="absolute inset-y-0 start-0 bg-gold-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </span>
                        {project.progress}%
                      </span>
                    )}
                    {project.year && (
                      <span className="text-white/65">{project.year}</span>
                    )}
                  </div>
                </div>
                <div className="absolute top-5 end-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white/80 transition group-hover:bg-gold-500 group-hover:text-navy-900">
                  <ArrowUpRightIcon className="size-4 rtl:rotate-90" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
