import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { services, getService } from "@/content/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { ContactCta } from "@/components/sections/ContactCta";
import { CheckIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const s = getService(slug);
  if (!s) notFound();

  const t = await getTranslations("service");
  const tCat = await getTranslations("categories");
  const tNav = await getTranslations("nav");

  const related = services
    .filter((x) => x.category === s.category && x.slug !== s.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-white pt-36 pb-24 lg:pt-44 lg:pb-32">
        <Image
          src={s.heroImage}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/80 to-navy-900 -z-10" />
        <div className="relative container-wide">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-gold-400 transition mb-8"
          >
            <ArrowLeftIcon className="size-4 rtl:rotate-180" />
            {tNav("services")}
          </Link>
          <Reveal>
            <Badge variant="dark">{tCat(s.category as never)}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              {s.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-base lg:text-lg leading-relaxed text-white/75">
              {s.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="xl" variant="primary">
                <Link href="/contact">
                  {t("ctaButton")}
                  <ArrowRightIcon className="size-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scope + Sectors */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Badge variant="eyebrow">{t("scopeTitle")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                What we cover
              </h2>
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-3 sm:grid-cols-2">
              {s.scope.map((line) => (
                <StaggerItem key={line}>
                  <div className="flex items-start gap-3 rounded-xl border border-bone-200 bg-bone-50 p-4">
                    <CheckIcon className="size-4 mt-1 text-gold-600 shrink-0" />
                    <p className="text-sm text-navy-900 leading-relaxed">{line}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <Badge variant="eyebrow">{t("sectorsTitle")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                Sectors served
              </h2>
            </Reveal>
            <StaggerGroup className="mt-10 flex flex-wrap gap-2">
              {s.sectors.map((sector) => (
                <StaggerItem key={sector}>
                  <span className="inline-flex items-center rounded-full border border-bone-300 bg-white px-4 py-2 text-xs uppercase tracking-[0.14em] text-navy-900">
                    {sector}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal delay={0.1}>
              <div className="mt-12 relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={s.heroImage}
                  alt={s.title}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold-400">
                    {tCat(s.category as never)}
                  </p>
                  <p className="mt-1 font-medium">{s.title}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-bone-50 py-20 lg:py-28">
          <div className="container-wide">
            <Badge variant="eyebrow">More in {tCat(s.category as never)}</Badge>
            <h2 className="mt-4 mb-12 font-display text-3xl lg:text-4xl font-semibold text-navy-900">
              Related services
            </h2>
            <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group block h-full rounded-2xl border border-bone-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_24px_60px_-30px_rgba(15,38,69,0.3)]"
                  >
                    <h3 className="text-lg font-semibold text-navy-900 leading-tight mb-3 text-balance group-hover:text-navy-700 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-bone-600 leading-relaxed mb-5">
                      {r.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-600 group-hover:gap-3 transition-all">
                      Read more <ArrowRightIcon className="size-3 rtl:rotate-180" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}
