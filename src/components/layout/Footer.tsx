import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE, whatsappLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { services } from "@/content/services";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
// Social icons hidden until the client provides live social URLs (Rev 01).
// import { LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon } from "@/components/layout/SocialIcons";

export function Footer() {
  const t = useTranslations();
  const tNav = useTranslations("nav");
  const tF = useTranslations("footer");
  const year = new Date().getFullYear();

  const featuredServices = services.slice(0, 7);

  return (
    <footer className="relative isolate overflow-hidden bg-navy-900 text-white/80">
      {/* top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="container-wide pt-20 pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold-400">
                  {SITE.shortName}
                </span>
                <span className="text-base font-medium text-white">
                  {SITE.name}
                </span>
              </div>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/65 max-w-sm">
              {tF("tagline")}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-gold-400">
              {SITE.tagline}
            </p>
          </div>

          {/* company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              {tF("company")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-gold-400 transition">{tNav("about")}</Link></li>
              <li><Link href="/projects" className="hover:text-gold-400 transition">{tNav("projects")}</Link></li>
              <li><Link href="/clients" className="hover:text-gold-400 transition">{tNav("clients")}</Link></li>
              <li><Link href="/vendor-approvals" className="hover:text-gold-400 transition">{tNav("vendorApprovals")}</Link></li>
              <li><Link href="/careers" className="hover:text-gold-400 transition">{tNav("careers")}</Link></li>
            </ul>
          </div>

          {/* services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              {tF("services")}
            </h4>
            <ul className="space-y-3 text-sm">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-gold-400 transition"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-gold-400 hover:underline">
                  {t("servicesPreview.cta")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.18em] text-white/50 mb-5">
              {tF("contact")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPinIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                <span className="flex flex-col gap-1">
                  <a href={`tel:${SITE.phone}`} className="hover:text-gold-400 transition" dir="ltr">
                    {SITE.phoneDisplay}
                  </a>
                  {SITE.phonesExtra.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/[\s-]/g, "")}`}
                      className="text-white/55 hover:text-gold-400 transition"
                      dir="ltr"
                    >
                      {p}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="size-4 mt-0.5 text-gold-500 shrink-0" />
                <span className="flex flex-col gap-1">
                  <a href={`mailto:${SITE.emails.info}`} className="hover:text-gold-400 transition">
                    {SITE.emails.info}
                  </a>
                  <a href={`mailto:${SITE.emails.sales}`} className="text-white/55 hover:text-gold-400 transition">
                    {SITE.emails.sales}
                  </a>
                </span>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-9 px-4 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition text-xs font-medium cursor-pointer">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <p>© {year} {SITE.name}. {tF("rights")}</p>
          <p>{tF("licensed")}</p>
        </div>
      </div>
    </footer>
  );
}
