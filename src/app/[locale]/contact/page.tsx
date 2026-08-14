import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Toaster } from "sonner";
import { SITE, whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Faq, getFaqItems } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const tNav = await getTranslations("nav");

  const jsonLd = graph(
    webPageSchema({
      locale,
      path: "/contact",
      name: t("title"),
      description: t("description"),
      type: "ContactPage",
      hasBreadcrumb: true,
    }),
    breadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("contact"), path: "/contact" },
    ]),
    faqSchema(locale, "/contact", await getFaqItems(locale))
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <Toaster richColors position="top-center" closeButton />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <Badge variant="eyebrow">{t("formTitle")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 mb-10 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight">
                {t("formTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>

          {/* contact info */}
          <aside className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32 space-y-4">
            <Reveal>
              <div className="rounded-2xl bg-navy-900 text-white p-7">
                <Badge variant="dark" className="mb-5">
                  {t("officeTitle")}
                </Badge>
                <p className="font-display text-xl font-medium leading-snug">
                  {SITE.name}
                </p>
                <p className="mt-1 text-sm text-white/65">{SITE.tagline}</p>
                <ul className="mt-8 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPinIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                    <span>{SITE.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PhoneIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                    <span className="flex flex-col gap-1">
                      <a href={`tel:${SITE.phone}`} dir="ltr" className="hover:text-gold-400 transition">
                        {SITE.phoneDisplay}
                      </a>
                      {SITE.phonesExtra.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.replace(/[\s-]/g, "")}`}
                          dir="ltr"
                          className="text-white/60 hover:text-gold-400 transition"
                        >
                          {p}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MailIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                    <span className="flex flex-col gap-1">
                      <a href={`mailto:${SITE.emails.info}`} className="hover:text-gold-400 transition">
                        {SITE.emails.info}
                      </a>
                      <a href={`mailto:${SITE.emails.sales}`} className="text-white/60 hover:text-gold-400 transition">
                        {SITE.emails.sales}
                      </a>
                      <a href={`mailto:${SITE.emails.inquiry}`} className="text-white/60 hover:text-gold-400 transition">
                        {SITE.emails.inquiry}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ClockIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                    <span>{t("hours")}</span>
                  </li>
                </ul>
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="mt-10 w-full"
                >
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircleIcon className="size-4" />
                    {t("whatsapp")}
                  </a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="overflow-hidden rounded-2xl border border-bone-200">
                <iframe
                  title="ETCS location — Al Jubail"
                  src="https://maps.google.com/maps?q=Al+Jubail+Dana+District+Saudi+Arabia&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <Faq locale={locale} />
    </>
  );
}
