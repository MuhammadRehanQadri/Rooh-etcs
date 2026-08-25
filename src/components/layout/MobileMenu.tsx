"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn, SITE } from "@/lib/utils";
import { Logo } from "./Logo";

type NavItem = { readonly href: string; readonly key: string };

export function MobileMenu({
  open,
  onOpenChange,
  navItems,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  navItems: readonly NavItem[];
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] bg-bp-ink flex-col px-[26px] pb-[30px] pt-[26px]",
        open ? "flex" : "hidden"
      )}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-[13px]">
          <Logo className="h-11 w-11" light />
          <span className="font-bp-display font-bold text-[22px] tracking-[0.1em] text-white">
            {SITE.shortName}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label={t("ariaClose")}
          className="flex h-12 w-12 items-center justify-center border border-bp-ondark/30 text-bp-paper font-bp-mono text-[17px] cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="font-bp-mono text-[10px] tracking-[0.18em] text-bp-brick mb-[14px] uppercase">
        Navigation
      </div>
      <nav className="flex flex-col" aria-label={t("ariaPrimary")}>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={`flex items-center min-h-[56px] py-2.5 border-b border-bp-ondark/16 font-bp-display font-semibold text-[27px] transition-colors hover:text-bp-brick ${
                active ? "text-white" : "text-bp-ondark-dim"
              }`}
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/contact"
        onClick={() => onOpenChange(false)}
        className="mt-8 bg-bp-brick text-white font-bp-display font-semibold text-[15px] tracking-[0.06em] uppercase py-[19px] text-center transition-colors hover:bg-bp-paper hover:text-bp-brick"
      >
        {t("requestQuote")}
      </Link>

      <div className="mt-auto pt-[26px] flex items-center justify-between gap-5 font-bp-mono text-[10px] tracking-[0.12em] text-bp-ondark-dim">
        <a href={`tel:${SITE.phone}`} dir="ltr" className="hover:text-white transition-colors">
          {SITE.phoneDisplay}
        </a>
        <LocaleSwitcher className="hover:text-white" />
      </div>
    </div>
  );
}
