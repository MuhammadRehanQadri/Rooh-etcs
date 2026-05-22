import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("pages.notFound");
  return (
    <section className="container-wide py-40 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-600 mb-4">404</p>
      <h1 className="text-4xl font-semibold text-navy-900 mb-4">{t("title")}</h1>
      <p className="text-base text-bone-600 mb-10 max-w-md mx-auto">{t("body")}</p>
      <Button asChild>
        <Link href="/">{t("cta")}</Link>
      </Button>
    </section>
  );
}
