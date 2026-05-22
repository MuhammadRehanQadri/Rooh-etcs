"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { whatsappLink, SITE } from "@/lib/utils";
import { PhoneIcon, MessageCircleIcon } from "lucide-react";

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-gold-400 uppercase tracking-[0.22em] text-xs">
            {SITE.shortName}
          </SheetTitle>
          <p className="text-sm text-white/80 mt-1">{SITE.tagline}</p>
        </SheetHeader>
        <div className="p-6 flex flex-col h-[calc(100%-110px)]">
          <nav className="flex flex-col gap-1" aria-label={t("ariaPrimary")}>
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SheetClose asChild key={item.key}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <span className="text-gold-500 text-xs">→</span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
            <LocaleSwitcher dark />
            <SheetClose asChild>
              <Button asChild variant="primary" className="w-full">
                <Link href="/contact">{t("requestQuote")}</Link>
              </Button>
            </SheetClose>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-white/20 text-sm text-white hover:bg-white/5 transition cursor-pointer"
              >
                <PhoneIcon className="size-4" /> Call
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-white/20 text-sm text-white hover:bg-white/5 transition cursor-pointer"
              >
                <MessageCircleIcon className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
