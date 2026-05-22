import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { VisionMission } from "@/components/sections/VisionMission";
import { ValuesRibbon } from "@/components/sections/ValuesRibbon";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheckIcon, UsersIcon, AwardIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return { title: t("title") };
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

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {/* Story */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <Badge variant="eyebrow">{tAbout("eyebrow")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight text-balance">
                {tAbout("headline")}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-5 text-base lg:text-lg leading-relaxed text-bone-700 text-pretty">
            <Reveal><p>{tAbout("body")}</p></Reveal>
            <Reveal delay={0.05}><p>{tAbout("body2")}</p></Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <Stat title="ISO 9001 · 14001 · 45001" detail="Certified management systems" icon={ShieldCheckIcon} />
                <Stat title="450+" detail="Skilled workforce on demand" icon={UsersIcon} />
                <Stat title="15+ years" detail="Operating across the Kingdom" icon={AwardIcon} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <VisionMission />
      <ValuesRibbon />

      {/* HSE policy + leadership */}
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
            <Card className="h-full p-2 bg-navy-900 border-navy-700">
              <CardHeader>
                <Badge variant="eyebrow" className="text-gold-400">
                  {t("leadershipTitle")}
                </Badge>
                <CardTitle className="mt-4 text-2xl lg:text-3xl text-white">
                  Multidisciplinary by design
                </CardTitle>
                <CardDescription className="mt-4 text-base leading-relaxed text-white/70">
                  {t("leadershipBody")}
                </CardDescription>
              </CardHeader>
            </Card>
          </Reveal>
        </div>
      </section>

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
      <p className="mt-4 font-display text-lg font-semibold text-navy-900">
        {title}
      </p>
      <p className="mt-1 text-xs text-bone-600">{detail}</p>
    </div>
  );
}

