import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion";
import { OptimizedImage } from "@/components/media/optimized-image";
import { cuisineImageSlots } from "@/data/cuisine-images";
import type { ExperienceCuisine } from "@/data/experiences-i18n";

type TanzaniaCuisineSectionProps = {
  cuisine: ExperienceCuisine[];
};

export function TanzaniaCuisineSection({ cuisine }: TanzaniaCuisineSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-6 sm:py-28 md:px-12">
      <Reveal>
        <span className="eyebrow">{t("experiences.cuisineEyebrow")}</span>
        <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
          <Trans i18nKey="experiences.cuisineTitle" components={{ i: <span className="gradient-text italic" /> }} />
        </h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{t("experiences.cuisineDesc")}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
        {cuisine.map((dish, i) => {
          const slot = cuisineImageSlots[i];
          return (
          <Reveal
            key={dish.title}
            delay={0.05 + i * 0.06}
            className="image-zoom group relative min-h-[320px] overflow-hidden border border-border gold-border-glow sm:min-h-[380px] lg:min-h-[420px]"
          >
            <OptimizedImage
              src={slot?.src}
              alt={dish.title}
              priority={i < 2}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={slot?.objectPosition ? { objectPosition: slot.objectPosition } : undefined}
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-colors duration-500 group-hover:from-ink/92" />
            <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-8">
              <span className="font-serif text-sm tracking-wide text-gold/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-2xl text-bone transition-colors duration-300 group-hover:text-gold sm:text-[1.65rem]">
                {dish.title}
              </h3>
              <span className="mt-3 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/75">{dish.desc}</p>
            </div>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}
