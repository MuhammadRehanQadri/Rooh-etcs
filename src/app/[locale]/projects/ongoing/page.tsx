import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { ProjectsBoard } from "@/components/sections/ProjectsBoard";
import { ongoingProjects, completedProjects } from "@/content/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  return { title: `${t("ongoingTitle")} — ${t("title")}` };
}

export default async function OngoingProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projects");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("ongoingTitle")} lead={t("lead")} />
      <ProjectsBoard
        ongoing={ongoingProjects}
        completed={completedProjects}
        initialTab="ongoing"
      />
      <ContactCta />
    </>
  );
}
