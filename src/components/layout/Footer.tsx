"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/utils";
import { Logo } from "./Logo";
import { services } from "@/content/services";

export function Footer() {
  const tNav = useTranslations("nav");
  const tF = useTranslations("footer");
  const year = new Date().getFullYear();

  const featuredServices = services.slice(0, 5);

  return (
    <footer className="flex justify-center bg-bp-ink text-bp-ondark">
      <div className="container-wide pt-[76px]">
        <div className="grid gap-14 pb-[60px] lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-[15px] mb-6">
              <Logo className="h-[54px] w-[54px]" light />
              <div className="border-s border-bp-ondark/25 ps-[15px]">
                <div className="font-bp-display font-bold text-[23px] tracking-[0.1em] text-white leading-none mb-1.5">
                  {SITE.shortName}
                </div>
                <div className="font-bp-mono text-[8px] tracking-[0.12em] text-bp-ondark-dim leading-[1.4] uppercase">
                  Expert Technical
                  <br />
                  Contracting &amp; Services
                </div>
              </div>
            </Link>
            <p className="font-bp-sans font-light text-[14.5px] leading-[1.66] text-bp-ondark-dim max-w-[34ch] mb-5">
              {tF("tagline")}
            </p>
            <div className="font-bp-mono text-[11px] tracking-[0.12em] text-bp-ondark-dim mb-3 flex flex-col gap-1.5">
              <a href={`tel:${SITE.phone}`} dir="ltr" className="hover:text-white transition-colors">
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.emails.info}`} className="hover:text-white transition-colors">
                {SITE.emails.info}
              </a>
            </div>
            <div className="font-bp-mono text-[10px] tracking-[0.16em] text-bp-brick uppercase">
              {SITE.tagline}
            </div>
          </div>

          {/* company */}
          <div>
            <h4 className="font-bp-mono text-[10px] tracking-[0.18em] text-white mb-5 uppercase">
              {tF("company")}
            </h4>
            <ul className="grid gap-3 font-bp-sans font-light text-sm">
              <li><Link href="/about" className="text-bp-ondark-dim hover:text-white transition-colors">{tNav("about")}</Link></li>
              <li><Link href="/projects" className="text-bp-ondark-dim hover:text-white transition-colors">{tNav("projects")}</Link></li>
              <li><Link href="/clients" className="text-bp-ondark-dim hover:text-white transition-colors">{tNav("clients")}</Link></li>
              <li><Link href="/vendor-approvals" className="text-bp-ondark-dim hover:text-white transition-colors">{tNav("vendorApprovals")}</Link></li>
              <li><Link href="/careers" className="text-bp-ondark-dim hover:text-white transition-colors">{tNav("careers")}</Link></li>
            </ul>
          </div>

          {/* services */}
          <div>
            <h4 className="font-bp-mono text-[10px] tracking-[0.18em] text-white mb-5 uppercase">
              {tF("services")}
            </h4>
            <ul className="grid gap-3 font-bp-sans font-light text-sm">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-bp-ondark-dim hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-bp-brick hover:text-white transition-colors">
                  {tNav("services")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* subscribe */}
          <div>
            <h4 className="font-bp-mono text-[10px] tracking-[0.18em] text-white mb-5 uppercase">
              {tF("newsletter")}
            </h4>
            <p className="font-bp-sans font-light text-sm leading-[1.6] text-bp-ondark-dim mb-4">
              {tF("newsletterDescription")}
            </p>
            <form
              className="flex border border-bp-ondark/28"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder={tF("email")}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none px-[15px] py-[13px] text-white font-bp-sans text-[13.5px] placeholder:text-bp-ondark-dim"
              />
              <button
                type="submit"
                className="bg-bp-brick border-0 text-white font-bp-display font-semibold text-[12.5px] tracking-[0.08em] uppercase px-[18px] cursor-pointer hover:bg-bp-bronze transition-colors"
              >
                {tF("subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[26px] py-6 border-t border-bp-ondark/18 font-bp-mono text-[10px] tracking-[0.1em] text-bp-meta">
          <span>
            © {year} {SITE.name.toUpperCase()}. {tF("rights").toUpperCase()}
          </span>
          <span>{tF("licensed").toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
