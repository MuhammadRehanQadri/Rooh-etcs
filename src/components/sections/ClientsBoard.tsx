"use client";

import { useTranslations } from "next-intl";
import { clients, clientGroups } from "@/content/clients";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export function ClientsBoard() {
  const t = useTranslations("pages.clients");

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-wide">
        <Tabs defaultValue="all">
          <TabsList className="mb-12 flex-wrap">
            <TabsTrigger value="all">{t("tabsAll")}</TabsTrigger>
            {clientGroups.map((g) => (
              <TabsTrigger key={g} value={g}>
                {t(
                  `tabs${g.charAt(0).toUpperCase()}${g.slice(1)}` as never
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <ClientGrid items={clients} />
          </TabsContent>
          {clientGroups.map((g) => (
            <TabsContent key={g} value={g}>
              <ClientGrid items={clients.filter((c) => c.group === g)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function ClientGrid({ items }: { items: typeof clients }) {
  return (
    <StaggerGroup
      className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      stagger={0.04}
    >
      {items.map((c) => (
        <StaggerItem key={c.name}>
          <div className="group flex h-20 items-center justify-center rounded-xl border border-bone-200 bg-bone-50 px-5 transition-all hover:border-gold-500/40 hover:bg-white hover:-translate-y-0.5">
            <span className="text-sm font-medium text-navy-900 text-center leading-tight text-balance">
              {c.name}
            </span>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
