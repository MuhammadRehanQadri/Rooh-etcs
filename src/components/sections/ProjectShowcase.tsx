"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { work, type WorkItem } from "@/content/projects";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "lucide-react";

/** Homepage "Our Work" strip — first 5 disciplines from the work gallery. */
const featured = work.slice(0, 5);

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
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-900 gold-underline self-start lg:self-end"
          >
            {t("projectsPreview.viewAll")} →
          </Link>
        </div>

        <StaggerGroup className="grid gap-6 lg:grid-cols-12">
          {featured.map((item, idx) => (
            <StaggerItem
              key={item.slug}
              className={
                idx === 0
                  ? "lg:col-span-7"
                  : idx === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-4"
              }
            >
              <WorkCard item={item} big={idx === 0} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function WorkCard({ item, big }: { item: WorkItem; big: boolean }) {
  return (
    <Tilt className="h-full">
      <Link
        href={`/services/${item.service ?? ""}` as never}
        className="group relative block h-full overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-bone-200"
      >
        <div className={`relative ${big ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/40 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
          <h3 className="text-balance text-xl sm:text-2xl font-semibold leading-tight">
            {item.title}
          </h3>
          <p className="mt-3 max-w-md text-sm text-white/65 leading-relaxed line-clamp-2">
            {item.blurb}
          </p>
        </div>
        <div className="absolute top-5 end-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white/80 transition group-hover:bg-gold-500 group-hover:text-navy-900">
          <ArrowUpRightIcon className="size-4 rtl:rotate-90" />
        </div>
      </Link>
    </Tilt>
  );
}
