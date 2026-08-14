import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { VisionMission } from "@/components/sections/VisionMission";
import { ValuesRibbon } from "@/components/sections/ValuesRibbon";
import { ContactCta } from "@/components/sections/ContactCta";
import { NextChapter } from "@/components/sections/NextChapter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { SectionDots } from "@/components/motion/SectionDots";
import { GearWatermark } from "@/components/motion/GearWatermark";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheckIcon, UsersIcon, AwardIcon } from "lucide-react";
import { leadership } from "@/content/leadership";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

const dots = [
  { id: "manifesto", label: "Manifesto" },
  { id: "origin", label: "Origin" },
  { id: "capability", label: "Capability" },
  { id: "values", label: "Values" },
  { id: "leadership", label: "Leadership" },
  { id: "vision-2030", label: "Vision 2030" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const tAbout = await getTranslations("aboutPreview");
  const tNav = await getTranslations("nav");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "/about",
      name: t("title"),
      description: t("description"),
      type: "AboutPage",
      hasBreadcrumb: true,
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("about"), path: "/about" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingProgress />
      <SectionDots sections={dots} />

      {/* MANIFESTO — full-bleed editorial opener */}
      <section
        id="manifesto"
        className="relative isolate overflow-hidden bg-navy-900 text-white min-h-[100vh] flex items-center"
      >
        <Image
          src="/images/hero/hero-03.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-navy-900/70 to-navy-900" />
        <div className="absolute inset-0 grain" />
        <CursorSpotlight />
        <GearWatermark className="absolute -end-32 top-24 opacity-25 hidden md:block" size={520} />

        <div className="relative container-wide pt-32 pb-20 grid gap-10 lg:grid-cols-12 items-end z-10">
          <div className="lg:col-span-8">
            <Reveal>
              <Badge variant="dark">{t("eyebrow")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-tight text-balance">
                We build the unseen{" "}
                <span className="text-gold-500">scaffolding</span> of the Kingdom&apos;s
                industrial future.
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <p className="text-base lg:text-lg leading-relaxed text-white/75 text-pretty">
                {t("lead")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ORIGIN — magazine spread */}
      <section id="origin" className="bg-white py-24 lg:py-32 scroll-mt-24">
        <div className="container-wide grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="font-display text-7xl lg:text-8xl font-semibold text-gold-500/90 tabular-nums leading-none mb-6">
              01
            </p>
            <Reveal>
              <Badge variant="eyebrow">{tAbout("eyebrow")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl lg:text-5xl font-semibold text-navy-900 leading-tight text-balance">
                {tAbout("headline")}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base lg:text-lg leading-relaxed text-bone-700 text-pretty">
            <Reveal><p>{tAbout("body")}</p></Reveal>
            <Reveal delay={0.05}><p>{tAbout("body2")}</p></Reveal>

            <Reveal delay={0.1}>
              <blockquote className="my-12 border-s-2 border-gold-500 ps-6 font-display text-xl lg:text-2xl text-navy-900 leading-snug">
                &ldquo;Our work is rarely glamorous. A coated tank that resists corrosion for 25 years.
                A pipe rack that holds through a fire test. That&apos;s the kind of quiet excellence
                we exist to deliver.&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <Stat title="ISO 9001 · 14001 · 45001" detail="Certified management systems" icon={ShieldCheckIcon} />
                <Stat title="Multi-discipline" detail="Industrial, construction & engineering" icon={UsersIcon} />
                <Stat title="Al Jubail, KSA" detail="Serving the Kingdom" icon={AwardIcon} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITY — vision & mission */}
      <section id="capability" className="scroll-mt-24">
        <VisionMission />
      </section>

      {/* VALUES */}
      <section id="values" className="scroll-mt-24">
        <ValuesRibbon />
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="bg-white py-24 lg:py-32 scroll-mt-24">
        <div className="container-wide grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="font-display text-7xl lg:text-8xl font-semibold text-gold-500/90 tabular-nums leading-none mb-6">
              02
            </p>
            <Reveal>
              <Badge variant="eyebrow">{t("leadershipTitle")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl lg:text-5xl font-semibold text-navy-900 leading-tight text-balance">
                Multidisciplinary by design
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-bone-600">
                {t("leadershipBody")}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <StaggerGroup className="grid gap-5 sm:grid-cols-2">
              {leadership.map((l) => (
                <StaggerItem key={l.name}>
                  <article className="group h-full rounded-2xl border border-bone-200 bg-bone-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:border-gold-500/40 hover:shadow-[0_24px_60px_-30px_rgba(15,38,69,0.3)]">
                    <Portrait initials={l.initials} accent={l.accent} />
                    <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      {l.title}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-navy-900 leading-tight">
                      {l.name}
                    </h3>
                    <p className="mt-3 text-sm text-bone-600 leading-relaxed">
                      {l.bio}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* HSE & Quality */}
      <section className="bg-bone-50 py-24 lg:py-32">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-2">
              <CardHeader>
                <Badge variant="eyebrow">{t("hseTitle")}</Badge>
                <CardTitle className="mt-4 text-2xl lg:text-3xl">
                  Safety, quality and environment by design
                </CardTitle>
                <CardDescription className="mt-4 text-base leading-relaxed">
                  {t("hseBody")}
                </CardDescription>
              </CardHeader>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl border border-bone-200 bg-white p-8 flex flex-col">
              <Badge variant="eyebrow">Our commitment</Badge>
              <h3 className="mt-4 font-display text-2xl lg:text-3xl font-semibold text-navy-900 leading-tight">
                Built on principle
              </h3>
              <ul className="mt-8 grid gap-4 flex-1">
                {[
                  "Driven by Safety Excellence",
                  "Committed to Zero-Harm Principles",
                  "Focused on Operational Reliability",
                  "Built on Quality Standards",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <ShieldCheckIcon className="size-5 mt-0.5 text-gold-600 shrink-0" />
                    <span className="text-base font-medium text-navy-900 leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION 2030 */}
      <section
        id="vision-2030"
        className="relative isolate overflow-hidden bg-navy-950 text-white py-24 lg:py-32 scroll-mt-24"
      >
        <Image
          src="/images/hero/hero-04.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-900/60" />
        <div className="absolute inset-0 grain" />
        <CursorSpotlight />

        <div className="relative container-wide grid gap-10 lg:grid-cols-12 items-center z-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Badge variant="dark">Vision 2030</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-balance">
                Partnering in the Kingdom&apos;s industrial transformation.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-white/70">
                ETCS is aligned with Saudi Vision 2030 through a commitment to sustainable
                development, local talent empowerment, and the delivery of high-quality
                industrial and infrastructure solutions across the Kingdom.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <StaggerGroup className="grid grid-cols-2 gap-4">
              {[
                "Saudi Talent Development",
                "Renewable Energy Focus",
                "Industry-Ready Solutions",
                "Commitment to HSE Standards",
              ].map((c) => (
                <StaggerItem key={c}>
                  <V2030 label={c} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <NextChapter
        eyebrow="What we do"
        title="Four divisions. One integrated promise."
        description="From coatings to fabrication to solar — see the full service catalogue."
        href="/services"
        ctaLabel="Services"
        image="/images/services/piping-01.jpg"
      />

      <ContactCta />
    </>
  );
}

function Stat({
  title,
  detail,
  icon: Icon,
}: {
  title: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-bone-200 bg-bone-50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
        <Icon className="size-5" />
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-navy-900">{title}</p>
      <p className="mt-1 text-xs text-bone-600">{detail}</p>
    </div>
  );
}

function V2030({ label }: { label: string }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <span className="block size-2 rounded-full bg-gold-500 mb-4" />
      <p className="font-display text-base lg:text-lg font-semibold text-white leading-snug text-balance">
        {label}
      </p>
    </div>
  );
}

function Portrait({
  initials,
  accent,
}: {
  initials: string;
  accent: "navy" | "gold" | "ink" | "rust";
}) {
  const palettes = {
    navy: ["#0F2645", "#1B3A66"],
    gold: ["#B5871F", "#D4A537"],
    ink: ["#111418", "#353530"],
    rust: ["#4A4A43", "#6B6B61"],
  } as const;
  const [a, b] = palettes[accent];
  return (
    <div
      className="relative aspect-[4/5] w-full rounded-xl overflow-hidden ring-1 ring-bone-200"
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 grain opacity-50" />
      <p className="absolute inset-0 flex items-center justify-center font-display text-7xl font-semibold text-white/90 tabular-nums">
        {initials}
      </p>
      <div className="absolute bottom-3 end-3 text-[10px] uppercase tracking-[0.22em] text-white/45">
        Portrait pending
      </div>
    </div>
  );
}
