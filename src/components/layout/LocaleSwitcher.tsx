"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { GlobeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const next = locale === "en" ? "ar" : "en";

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
      className={cn(
        "inline-flex items-center gap-2 h-11 px-4 rounded-full text-xs uppercase tracking-[0.18em] transition cursor-pointer",
        dark
          ? "border border-white/20 text-white hover:bg-white/5"
          : "border border-white/20 text-white hover:bg-white/5",
        className
      )}
    >
      <GlobeIcon className="size-4" />
      <span>{next === "en" ? "EN" : "ع"}</span>
    </button>
  );
}
