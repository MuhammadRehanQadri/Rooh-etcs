import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  lead,
  image = "/images/hero/hero-03.jpg",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white pt-36 pb-20 lg:pt-44 lg:pb-28">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-20 -z-10"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,165,55,0.18),transparent_55%)] -z-10" />
      <div className="absolute inset-0 grain -z-10" />
      <div className="relative container-wide grid gap-10 lg:grid-cols-12 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <Badge variant="dark">{eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              {title}
            </h1>
          </Reveal>
        </div>
        {lead && (
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <p className="text-base lg:text-lg leading-relaxed text-white/70 text-pretty">
                {lead}
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
