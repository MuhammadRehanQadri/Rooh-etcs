"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, useScroll } from "motion/react";
import { MenuIcon } from "lucide-react";
import { cn, SITE } from "@/lib/utils";
import { useTier } from "@/lib/use-tier";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/clients", key: "clients" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const tier = useTier();
  const narrow = tier !== "wide";
  const [shrunk, setShrunk] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const update = () => setShrunk(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  React.useEffect(() => {
    if (!narrow) setMenuOpen(false);
  }, [narrow]);

  React.useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden md:flex justify-center bg-bp-ink text-bp-ondark">
        <div className="container-wide flex h-[34px] items-center justify-between font-bp-mono text-[10.5px] tracking-[0.1em] uppercase">
          <span>{SITE.name} — Kingdom of Saudi Arabia</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.phone}`} dir="ltr" className="hover:text-white transition-colors">
              {SITE.phoneDisplay}
            </a>
            <span className="text-bp-brick">|</span>
            <LocaleSwitcher className="hover:text-white" />
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 flex justify-center bg-bp-paper/94 backdrop-blur-md border-b border-bp-ink/16 relative">
        <motion.div
          className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-bp-brick origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <div
          className={cn(
            "container-wide flex items-center justify-between transition-[height] duration-[350ms] ease-[cubic-bezier(.2,.7,.3,1)]",
            shrunk ? "h-[66px]" : "h-[88px]"
          )}
        >
          <Link href="/" className="flex items-center gap-[15px]" aria-label={SITE.shortName}>
            <Logo className="h-12 w-12 shrink-0" />
            <div className="border-s border-bp-ink/22 ps-[15px] flex flex-col gap-[3px]">
              <span className="font-bp-display font-bold text-[25px] tracking-[0.1em] leading-none text-bp-ink">
                {SITE.shortName}
              </span>
              <span className="font-bp-mono text-[8px] tracking-[0.14em] text-bp-meta leading-none whitespace-nowrap">
                EST. KSA · CR {SITE.crNumber}
              </span>
            </div>
          </Link>

          {!narrow && (
            <nav
              className="flex items-center gap-[30px] font-bp-display text-[14.5px] font-medium tracking-[0.05em] uppercase whitespace-nowrap"
              aria-label={t("ariaPrimary")}
            >
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "pb-[3px] border-b-2 transition-colors duration-300",
                      active
                        ? "border-bp-brick text-bp-ink"
                        : "border-transparent text-bp-muted hover:border-bp-ink/30 hover:text-bp-ink"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="border-[1.5px] border-bp-ink text-bp-ink px-5 py-3 text-[13px] tracking-[0.08em] transition-colors duration-300 hover:bg-bp-ink hover:text-bp-paper"
              >
                {t("requestQuote")}
              </Link>
            </nav>
          )}

          {narrow && (
            <div className="flex items-center gap-[11px]">
              <Link
                href="/contact"
                className="hidden sm:inline-flex border-[1.5px] border-bp-ink text-bp-ink font-bp-display font-medium text-xs tracking-[0.08em] uppercase px-[15px] py-3 whitespace-nowrap transition-colors duration-300 hover:bg-bp-ink hover:text-bp-paper"
              >
                {t("requestQuote")}
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t("ariaMobile")}
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center border-[1.5px] border-bp-ink text-bp-ink cursor-pointer"
              >
                <MenuIcon className="size-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      <MobileMenu open={narrow && menuOpen} onOpenChange={setMenuOpen} navItems={navItems} />
    </>
  );
}
