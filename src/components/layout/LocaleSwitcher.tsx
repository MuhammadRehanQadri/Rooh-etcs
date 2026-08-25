"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const next = locale === "en" ? "ar" : "en";
  const label = next === "en" ? "English" : "العربية";

  function switchTo() {
    router.replace(
      // @ts-expect-error - dynamic pathname is fine here
      { pathname, params },
      { locale: next }
    );
  }

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={t("switchLanguage")}
      className={cn("cursor-pointer transition-colors", className)}
    >
      {label}
    </button>
  );
}
