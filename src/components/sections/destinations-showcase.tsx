import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { preloadImage } from "@/lib/preload-image";
import { Trans, useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { OptimizedImage } from "@/components/media/optimized-image";
import { countryImages } from "@/data/destination-images";
import migration from "@/assets/editorial/migration.jpg";

export function DestinationsShowcase() {
  const { t } = useTranslation();
  const [hoveredItin, setHoveredItin] = useState<number | null>(null);

  const destinations = (
    t("home.signatureDestinations", { returnObjects: true }) as {
      slug: string;
      name: string;
      tagline: string;
      route: string;
      duration: string;
      intro: string;
      highlights: string[];
    }[]
  ).map((d) => ({ ...d, img: countryImages[d.slug as keyof typeof countryImages] ?? migration }));

  const activeIndex = hoveredItin ?? 0;
  const activeDest = destinations[activeIndex] ?? destinations[0];

  useEffect(() => {
    if (activeDest?.img) preloadImage(activeDest.img);
    const next = destinations[(activeIndex + 1) % destinations.length];
    if (next?.img) preloadImage(next.img);
  }, [activeIndex, activeDest?.img, destinations]);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, color-mix(in oklab, var(--color-gold) 12%, transparent), transparent 70%), radial-gradient(ellipse 70% 50% at 100% 100%, color-mix(in oklab, var(--color-coral) 8%, transparent), transparent 65%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-24 hidden lg:block opacity-[0.07]">
        <svg width="520" height="520" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-ink">
          <circle cx="100" cy="100" r="98" />
          <circle cx="100" cy="100" r="78" />
          <circle cx="100" cy="100" r="58" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1="100" y1="2" x2="100" y2={i % 6 === 0 ? 18 : 10} transform={`rotate(${i * 15} 100 100)`} />
          ))}
          <path d="M100 20 L112 100 L100 180 L88 100 Z" fill="currentColor" fillOpacity="0.4" stroke="none" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1600px] pt-4 pb-20 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:pt-6 sm:pb-28 sm:px-6 md:px-12 md:pt-8 md:pb-40">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
            <div>
              <span className="eyebrow">{t("home.destinationsEyebrow")}</span>
              <h2 className="mt-4 max-w-2xl font-serif text-[clamp(1.75rem,5vw,3.75rem)] sm:mt-6">
                <Trans i18nKey="home.tailorTitle" components={{ i: <span className="gradient-text italic" /> }} />
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4">{t("home.tailorDesc")}</p>
            </div>
            <Link to="/destinations" className="btn-line">
              {t("home.allDestinations")}
            </Link>
          </div>
        </Reveal>

        <div
          className="mt-10 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-14"
          onMouseLeave={() => setHoveredItin(null)}
        >
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6 sm:gap-8 lg:border-t lg:border-border lg:gap-0">
              {destinations.map((dest, i) => {
                const isActive = hoveredItin === i;
                return (
                  <motion.div
                    key={dest.slug}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.75, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredItin(i)}
                    onTouchStart={() => setHoveredItin(i)}
                    className="lg:border-b lg:border-border"
                  >
                    <Link
                      to="/destinations/$slug"
                      params={{ slug: dest.slug }}
                      className="group relative block lg:flex lg:items-center lg:gap-6 lg:py-7"
                    >
                      <span
                        className={`absolute left-0 top-0 hidden h-full w-[3px] origin-top bg-gradient-to-b from-gold to-coral transition-transform duration-500 lg:block ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                      />

                      <div className="lg:hidden">
                        <div
                          className={`itin-mobile-card overflow-hidden rounded-sm border bg-ink shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] transition-all duration-500 ${
                            isActive
                              ? "itin-mobile-card--active border-gold/50 shadow-[0_32px_70px_-24px_rgba(196,155,70,0.35)]"
                              : "border-border/50"
                          }`}
                        >
                          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
                            <OptimizedImage
                              src={dest.img}
                              alt={dest.name}
                              priority={i === 0}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-active:scale-110"
                            />
                            <div className="itin-mobile-shine pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light opacity-60" />
                            <div className="absolute inset-0 z-[3] bg-gradient-to-b from-ink/30 via-transparent to-ink/90" />
                            <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_80%_15%,rgba(196,155,70,0.22)_0%,transparent_55%)]" />
                            <span
                              aria-hidden
                              className="pointer-events-none absolute right-0 top-6 z-[4] select-none font-serif text-[5rem] leading-none tabular-nums text-bone/[0.08] sm:text-[6rem]"
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="absolute left-3 top-3 z-20 h-5 w-5 border-l border-t border-gold/80 sm:left-4 sm:top-4 sm:h-6 sm:w-6" />
                            <span className="absolute right-3 top-3 z-20 h-5 w-5 border-r border-t border-gold/80 sm:right-4 sm:top-4 sm:h-6 sm:w-6" />
                            <span className="absolute left-3 top-10 z-20 border border-gold/35 bg-ink/55 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.28em] text-gold backdrop-blur-md sm:left-4 sm:top-11 sm:text-[0.65rem]">
                              {dest.duration}
                            </span>
                            <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-5 sm:p-5 sm:pb-6">
                              <span className="gold-rule w-12 opacity-90" />
                              <p className="mt-3 text-[0.6rem] uppercase tracking-[0.2em] text-gold-soft sm:text-[0.65rem]">
                                {dest.tagline}
                              </p>
                              <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.12] text-bone drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-2xl">
                                <span className="shimmer-text italic">{dest.name}</span>
                              </h3>
                              <p className="mt-2.5 text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-bone/75 sm:mt-3 sm:text-[0.65rem] sm:tracking-[0.2em]">
                                {dest.route}
                              </p>
                              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-bone/80 sm:line-clamp-3">
                                {dest.intro}
                              </p>
                              <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
                                <span className="text-[0.62rem] uppercase tracking-[0.28em] text-gold sm:text-xs sm:tracking-eyebrow">
                                  {t("home.explore")}
                                </span>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold via-gold-soft to-coral text-ink shadow-[0_8px_28px_rgba(196,155,70,0.45)] transition-transform duration-300 group-active:scale-95 sm:h-12 sm:w-12">
                                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                                </span>
                              </div>
                            </div>
                            <span className="absolute bottom-3 left-3 z-20 h-5 w-5 border-b border-l border-bone/50 sm:bottom-4 sm:left-4 sm:h-6 sm:w-6" />
                            <span className="absolute bottom-3 right-3 z-20 h-5 w-5 border-b border-r border-bone/50 sm:bottom-4 sm:right-4 sm:h-6 sm:w-6" />
                          </div>
                        </div>
                      </div>

                      <div className="hidden lg:contents">
                        <div
                          className={`pl-6 font-serif text-5xl tabular-nums transition-colors duration-500 ${
                            isActive ? "text-gold" : "text-ink/30"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-3">
                            <span className="text-xs uppercase tracking-eyebrow text-coral">{dest.duration}</span>
                            <span className="h-px flex-1 bg-border" />
                          </div>
                          <h3
                            className={`mt-1.5 font-serif text-2xl transition-all duration-500 ${
                              isActive ? "translate-x-2 text-gold" : "text-ink"
                            }`}
                          >
                            {dest.name}
                          </h3>
                          <p className="mt-0.5 text-xs italic text-muted-foreground">{dest.tagline}</p>
                          <p className="mt-1 truncate text-xs uppercase tracking-eyebrow text-muted-foreground">
                            {dest.route}
                          </p>
                        </div>
                        <div
                          className={`flex shrink-0 items-center gap-2 text-xs uppercase tracking-eyebrow transition-all duration-500 ${
                            isActive ? "translate-x-1 text-gold" : "text-ink/50"
                          }`}
                        >
                          {t("home.explore")} <span className="text-lg">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-card">
                <OptimizedImage
                  key={activeDest.slug}
                  src={activeDest.img}
                  alt={activeDest.name}
                  priority={activeIndex === 0}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[10px] uppercase tracking-eyebrow text-gold">
                    {activeDest.duration} · {activeDest.tagline}
                  </span>
                  <h4 className="mt-2 font-serif text-2xl text-bone">{activeDest.name}</h4>
                  <p className="mt-1 text-xs uppercase tracking-eyebrow text-bone/70">{activeDest.route}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-bone/85">{activeDest.intro}</p>
                  <ul className="mt-3 space-y-1.5">
                    {activeDest.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex gap-2 text-xs text-bone/75">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-bone/60" />
                <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-bone/60" />
                <span className="absolute left-3 bottom-3 h-4 w-4 border-l border-b border-bone/60" />
                <span className="absolute right-3 bottom-3 h-4 w-4 border-r border-b border-bone/60" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                <span>{t("home.eastAfrica")}</span>
                <span>
                  {String((hoveredItin ?? 0) + 1).padStart(2, "0")} / {String(destinations.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
