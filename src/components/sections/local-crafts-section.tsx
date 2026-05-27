import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion";
import { OptimizedImage } from "@/components/media/optimized-image";
import { craftHeroImage, craftImages } from "@/data/craft-images";
import type { ExperienceCraft } from "@/data/experiences-i18n";
import { cn } from "@/lib/utils";

const craftLayout = [
  "sm:col-span-2 lg:col-span-7 min-h-[280px] lg:min-h-[340px]",
  "lg:col-span-5 min-h-[240px] lg:min-h-[340px]",
  "lg:col-span-5 min-h-[240px] lg:min-h-[300px]",
  "sm:col-span-2 lg:col-span-7 min-h-[280px] lg:min-h-[300px]",
] as const;

type LocalCraftsSectionProps = {
  crafts: ExperienceCraft[];
};

export function LocalCraftsSection({ crafts }: LocalCraftsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-card">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 0%, color-mix(in oklab, var(--color-gold) 14%, transparent), transparent 65%), radial-gradient(ellipse 60% 45% at 100% 100%, color-mix(in oklab, var(--color-coral) 10%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-6 sm:py-28 md:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">{t("experiences.craftsEyebrow")}</span>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
              <Trans i18nKey="experiences.craftsTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">{t("experiences.craftsDesc")}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="image-zoom gold-border-glow relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
              <OptimizedImage
                src={craftHeroImage}
                alt={t("experiences.craftsHeroAlt")}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {crafts.map((craft, i) => (
            <Reveal
              key={craft.title}
              delay={0.05 + i * 0.06}
              className={cn("group relative overflow-hidden border border-border gold-border-glow", craftLayout[i])}
            >
              <OptimizedImage
                src={craftImages[i]}
                alt={craft.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/10 transition-colors duration-500 group-hover:from-ink/95" />
              <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-8">
                <span className="font-serif text-sm tracking-wide text-gold/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-bone transition-colors duration-300 group-hover:text-gold sm:text-[1.65rem]">
                  {craft.title}
                </h3>
                <span className="mt-3 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/75">{craft.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
