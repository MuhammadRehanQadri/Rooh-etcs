import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { ChevronDownIcon } from "lucide-react";

/** Message keys under `pages.contact.faq` — q1/a1 … q6/a6. */
export const FAQ_KEYS = [1, 2, 3, 4, 5, 6] as const;

/** Returns the resolved Q&A pairs so the page can also emit FAQPage JSON-LD. */
export async function getFaqItems(locale: string) {
  const t = await getTranslations({ locale, namespace: "pages.contact.faq" });
  return FAQ_KEYS.map((n) => ({
    q: t(`q${n}` as never),
    a: t(`a${n}` as never),
  }));
}

/**
 * Built on native <details>/<summary> rather than the Radix accordion on
 * purpose: the answers stay in the served HTML whether open or closed, so
 * crawlers read them, and the section works with JavaScript disabled.
 */
export async function Faq({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  const items = await getFaqItems(locale);

  return (
    <section className="bg-bone-50 py-24 lg:py-32 border-t border-bone-200">
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <Reveal>
            <Badge variant="eyebrow">{t("faqEyebrow")}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold text-navy-900 leading-tight text-balance">
              {t("faqTitle")}
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <dl className="divide-y divide-bone-200 border-y border-bone-200">
            {items.map((item, i) => (
              <div key={item.q}>
                <details className="group" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-start marker:content-none [&::-webkit-details-marker]:hidden">
                    <dt className="font-display text-base lg:text-lg font-medium text-navy-900 transition-colors group-hover:text-gold-600">
                      {item.q}
                    </dt>
                    <ChevronDownIcon
                      aria-hidden
                      className="size-4 shrink-0 text-bone-500 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <dd className="pb-6 pe-10 text-sm leading-relaxed text-bone-600 text-pretty">
                    {item.a}
                  </dd>
                </details>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
