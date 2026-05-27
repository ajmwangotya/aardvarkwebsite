import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion";
import { safariThumbImages } from "@/data/destination-images";
import { OptimizedImage } from "@/components/media/optimized-image";
import migration from "@/assets/editorial/migration.jpg";
import { asObjectArray } from "@/lib/utils";

export function SafariExtensionsSection() {
  const { t } = useTranslation();
  const items = asObjectArray<{ slug: string; title: string; desc: string; duration: string }>(
    t("itinerariesPage.extensions", { returnObjects: true }),
  );

  return (
    <section className="border-t border-border bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12">
        <Reveal>
          <span className="eyebrow text-gold">{t("itinerariesPage.extensionsEyebrow")}</span>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.25rem)]">
            <Trans i18nKey="itinerariesPage.extensionsTitle" components={{ i: <span className="shimmer-text italic" /> }} />
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-bone/75 sm:text-base">{t("itinerariesPage.extensionsDesc")}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const img = safariThumbImages[item.slug] ?? migration;
            return (
              <Reveal key={item.slug}>
                <Link
                  to="/safaris/$slug"
                  params={{ slug: item.slug }}
                  className="group flex h-full flex-col border border-bone/15 bg-bone/5 transition-colors hover:border-gold/50"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold">{item.duration}</span>
                    <h3 className="mt-2 font-serif text-2xl text-bone group-hover:text-gold">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/70">{item.desc}</p>
                    <span className="mt-4 text-xs uppercase tracking-eyebrow text-coral group-hover:text-gold">
                      {t("itinerariesPage.extensionsCta")} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
