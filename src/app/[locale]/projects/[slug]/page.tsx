import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { caseStudies, getProject, getNextProject } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { ContactCta } from "@/components/sections/ContactCta";
import { NextChapter } from "@/components/sections/NextChapter";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  CalendarIcon,
  QuoteIcon,
} from "lucide-react";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.scope,
    openGraph: {
      title: `${p.title} — ETCS`,
      description: p.scope,
      images: [{ url: p.image, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getProject(slug);
  if (!p || !p.featured) notFound();

  const tNav = await getTranslations("nav");
  const next = getNextProject(slug);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-white pt-32 lg:pt-40 pb-20 lg:pb-28">
        <Image
          src={p.image}
          alt={p.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/75 to-navy-900 -z-10" />
        <div className="absolute inset-0 grain -z-10" />

        <div className="relative container-wide">
          <Link
            href="/projects/ongoing"
            className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-gold-400 transition mb-8"
          >
            <ArrowLeftIcon className="size-4 rtl:rotate-180" />
            {tNav("projects")}
          </Link>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="dark">
                <span
                  className={`size-1.5 rounded-full ${p.status === "ongoing" ? "bg-gold-500 animate-pulse" : "bg-white/70"}`}
                />
                {p.status === "ongoing" ? "Ongoing" : "Completed"}
              </Badge>
              <Badge variant="dark">{p.category}</Badge>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              {p.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-base lg:text-lg leading-relaxed text-white/75">
              {p.scope}
            </p>
          </Reveal>

          {/* Meta strip */}
          <Reveal delay={0.15}>
            <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
              <Meta label="Client" value={p.client} />
              <Meta label="Location" value={p.location} icon={MapPinIcon} />
              <Meta label="Duration" value={p.duration || "—"} icon={CalendarIcon} />
              <Meta
                label={p.status === "ongoing" ? "Progress" : "Delivered"}
                value={p.status === "ongoing" ? `${p.progress}%` : String(p.year ?? "—")}
              />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* METRICS strip */}
      {p.metrics && p.metrics.length > 0 && (
        <section className="bg-bone-50 py-16 lg:py-20 border-y border-bone-200">
          <div className="container-wide">
            <StaggerGroup className="grid gap-x-8 gap-y-10 grid-cols-2 lg:grid-cols-4">
              {p.metrics.map((m) => (
                <StaggerItem key={m.label}>
                  <div>
                    <p className="font-display text-4xl lg:text-5xl font-semibold text-navy-900 tabular-nums">
                      {m.value}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gold-600">
                      {m.label}
                    </p>
                    {m.detail && (
                      <p className="mt-1 text-sm text-bone-600">{m.detail}</p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* NARRATIVE + SCOPE */}
      {(p.narrative || p.scopeDetail) && (
        <section className="bg-white py-24 lg:py-32">
          <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <Badge variant="eyebrow">Project narrative</Badge>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 mb-10 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                  The brief, the plan, the delivery
                </h2>
              </Reveal>
              <div className="space-y-5 text-base lg:text-lg leading-relaxed text-bone-700 text-pretty">
                {(p.narrative ?? []).map((para, i) => (
                  <Reveal key={i} delay={0.05 + i * 0.05}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            {p.scopeDetail && (
              <aside className="lg:col-span-5 lg:sticky lg:top-32">
                <Reveal>
                  <Badge variant="eyebrow">Scope of work</Badge>
                </Reveal>
                <Reveal delay={0.05}>
                  <h3 className="mt-4 mb-8 font-display text-2xl lg:text-3xl font-semibold text-navy-900 leading-tight">
                    What ETCS executed
                  </h3>
                </Reveal>
                <StaggerGroup className="space-y-3">
                  {p.scopeDetail.map((s, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-3 rounded-xl border border-bone-200 bg-bone-50 p-4">
                        <CheckIcon className="size-4 mt-1 text-gold-600 shrink-0" />
                        <p className="text-sm text-navy-900 leading-relaxed">
                          {s}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* QUOTE */}
      {p.quote && (
        <section className="bg-navy-900 text-white py-24 lg:py-32 relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,55,0.18),transparent_55%)]" />
          <div className="absolute inset-0 grain" />
          <div className="relative container-wide max-w-4xl text-center">
            <Reveal>
              <QuoteIcon className="size-10 text-gold-500 mx-auto mb-8" />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-balance">
                &ldquo;{p.quote.body}&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-sm uppercase tracking-[0.22em] text-gold-400">
                {p.quote.author}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-1 text-xs text-white/55">{p.quote.role}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {p.gallery && p.gallery.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="container-wide">
            <div className="mb-12">
              <Badge variant="eyebrow">From the field</Badge>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                Visual record
              </h2>
            </div>
            <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.gallery.map((src, i) => (
                <StaggerItem key={i} className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
                  <figure className={`relative overflow-hidden rounded-2xl ring-1 ring-bone-200 ${i === 0 ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
                    <Image
                      src={src}
                      alt={`${p.title} — image ${i + 1}`}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <figcaption className="absolute bottom-2 end-3 text-[10px] uppercase tracking-[0.18em] text-white/60 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm">
                      ETCS Archive · {String(i + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* NEXT PROJECT */}
      {next && (
        <NextChapter
          eyebrow="Next case study"
          title={next.title}
          description={next.scope}
          href={`/projects/${next.slug}` as never}
          ctaLabel="View"
          image={next.image}
        />
      )}

      <ContactCta />
    </>
  );
}

function Meta({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.22em] text-gold-400 mb-2 flex items-center gap-2">
        {Icon && <Icon className="size-3" />}
        {label}
      </dt>
      <dd className="text-sm text-white/85 font-medium">{value}</dd>
    </div>
  );
}
