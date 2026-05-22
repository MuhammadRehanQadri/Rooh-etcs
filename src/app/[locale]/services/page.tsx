import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, type ServiceCategory } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRightIcon } from "lucide-react";

const categoryOrder: ServiceCategory[] = ["industrial", "construction", "engineering", "supply"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return { title: t("title") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const tCat = await getTranslations("categories");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <div className="bg-white">
        {categoryOrder.map((cat) => {
          const inCategory = services.filter((s) => s.category === cat);
          return (
            <section
              key={cat}
              id={cat}
              className="container-wide py-20 lg:py-28 scroll-mt-32 border-b border-bone-200 last:border-b-0"
            >
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 mb-12">
                <div className="lg:col-span-5">
                  <SectionHeading
                    eyebrow={tCat(cat as never)}
                    title={tCat(`${cat}Description` as never)}
                  />
                </div>
                <div className="lg:col-span-7 self-end">
                  <p className="text-sm text-bone-500 uppercase tracking-[0.18em]">
                    {inCategory.length} services
                  </p>
                </div>
              </div>
              <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {inCategory.map((s) => (
                  <StaggerItem key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group block h-full rounded-2xl border border-bone-200 bg-bone-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:border-gold-500/40 hover:shadow-[0_24px_60px_-30px_rgba(15,38,69,0.3)]"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-navy-900 text-gold-500 text-sm font-medium">
                          {s.title.charAt(0)}
                        </span>
                        <ArrowUpRightIcon className="size-5 text-bone-400 transition-all duration-500 group-hover:text-navy-900 group-hover:translate-x-1 rtl:rotate-90 rtl:group-hover:translate-x-0 rtl:group-hover:-translate-y-1" />
                      </div>
                      <h3 className="text-lg font-semibold text-navy-900 leading-tight mb-3 text-balance">
                        {s.title}
                      </h3>
                      <p className="text-sm text-bone-600 leading-relaxed">
                        {s.shortDescription}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>
          );
        })}
      </div>
      <ContactCta />
    </>
  );
}
