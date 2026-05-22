"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import { cn, whatsappLink, SITE } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/projects/ongoing", key: "projects" },
  { href: "/clients", key: "clients" },
  { href: "/vendor-approvals", key: "vendorApprovals" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  // Determine if we are on the home page (where the hero sits behind the header)
  const isHome = pathname === "/";

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-[0_4px_30px_-12px_rgba(0,0,0,0.3)]"
          : isHome
          ? "bg-transparent"
          : "bg-navy-900/95 backdrop-blur-md"
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-white transition-opacity hover:opacity-80"
          aria-label={SITE.shortName}
        >
          <Logo className="h-10 w-10" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold-400">
              {SITE.shortName}
            </span>
            <span className="text-sm font-medium tracking-wide">
              {locale === "ar" ? "للمقاولات الفنية والخدمات" : "Expert Technical Contracting"}
            </span>
          </div>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label={t("ariaPrimary")}
        >
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white",
                  active && "text-white"
                )}
              >
                {t(item.key)}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 bottom-1 h-px bg-gold-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden md:flex" />
          <Button
            asChild
            variant="primary"
            size="md"
            className="hidden md:inline-flex"
          >
            <Link href="/contact">{t("requestQuote")}</Link>
          </Button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:text-white hover:border-white/50 cursor-pointer"
            aria-label="WhatsApp"
          >
            <MessageCircleIcon className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:text-white hover:border-white/50 cursor-pointer"
            aria-label={t("ariaMobile")}
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onOpenChange={setOpen} navItems={navItems} />
    </motion.header>
  );
}
