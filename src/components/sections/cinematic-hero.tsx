import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Play, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroLeopard from "@/assets/heroes/hero-leopard.jpg";
import { TRIPADVISOR } from "@/lib/site-config";

type CinematicHeroProps = {
  onWatchFilm: () => void;
  filmOpen: boolean;
};

export function CinematicHero({ onWatchFilm, filmOpen }: CinematicHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="hero-section hero-cinematic relative isolate min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Background */}
      <img
        src={heroLeopard}
        alt={t("home.heroImageAlt")}
        className="hero-cinematic__image absolute inset-0 z-0 h-full w-full object-cover object-[70%_center] md:object-[72%_30%]"
        fetchPriority="high"
        decoding="sync"
      />

      <div className="hero-cinematic__overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* Copy */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-[max(5.5rem,calc(4.5rem+env(safe-area-inset-bottom,0px)))] pt-[max(7rem,calc(5.5rem+env(safe-area-inset-top,0px)))] sm:px-6 md:justify-center md:px-10 md:pb-20 lg:px-14">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="hero-cinematic__copy max-w-2xl rounded-sm border border-bone/15 bg-ink/35 p-4 text-left shadow-[0_24px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-[2px] sm:border-bone/10 sm:bg-ink/20 lg:max-w-3xl lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0">
            <h1>
              <span className="hero-cinematic__brand block font-sans text-[clamp(3rem,13vw,7rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-bone">
                {t("home.heroBrand")}
              </span>
              <span className="mt-1 block font-sans text-[clamp(1rem,3vw,1.6rem)] font-bold uppercase leading-tight tracking-[0.06em] text-bone/95">
                {t("home.heroTaglineLine1")}
              </span>
              <span className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-[clamp(1.25rem,3.5vw,2.25rem)] italic leading-none text-[var(--gold-soft)]">
                  {t("home.heroTaglineLine2")}
                </span>
                <span className="font-sans text-[clamp(0.85rem,2.2vw,1.25rem)] font-bold uppercase leading-none tracking-[0.08em] text-bone/95">
                  {t("home.heroTaglineEastAfrica")}
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-md font-sans text-[0.95rem] leading-relaxed text-bone/90 sm:mt-6 sm:text-base md:max-w-lg">
              {t("home.heroDescription")}
            </p>

            <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <Link
                to="/packages"
                className="btn-line btn-line-light group inline-flex min-h-12 w-full items-center justify-center border-[var(--gold)] bg-gold/10 text-bone shadow-[0_10px_28px_-16px_rgba(0,0,0,0.7)] sm:min-h-11 sm:w-auto sm:bg-transparent sm:shadow-none"
              >
                {t("home.heroExploreCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
              </Link>
              <button
                type="button"
                onClick={onWatchFilm}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm border border-bone/30 bg-ink/40 text-bone sm:min-h-11 sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent"
                aria-haspopup="dialog"
                aria-expanded={filmOpen}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/55 transition-colors group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/15">
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                </span>
                <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.28em]">
                  {t("home.watchFilm")}
                </span>
              </button>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-bone/80 sm:mt-10 sm:text-[0.65rem] sm:tracking-[0.18em]"
              aria-label={t("home.heroTrustAria")}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex text-[var(--gold)]" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                  ))}
                </span>
                {t("home.heroReviews", {
                  rating: TRIPADVISOR.rating.toFixed(1),
                  count: TRIPADVISOR.reviewCount,
                })}
              </span>
              <span className="text-bone/30" aria-hidden>
                |
              </span>
              <span>{t("home.heroLicensed")}</span>
              <span className="text-bone/30" aria-hidden>
                |
              </span>
              <span>{t("home.heroEstablished")}</span>
            </div>
          </div>

          <aside className="w-full max-w-sm shrink-0 border border-bone/15 bg-ink/70 p-5 backdrop-blur-md sm:p-6 md:max-w-xs lg:mb-2">
            <div className="flex items-center gap-2 text-[var(--gold)]">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em]">
                {t("home.heroBasedIn")}
              </span>
            </div>
            <p className="mt-3 font-sans text-sm leading-relaxed text-bone/85">{t("home.heroRegionsDesc")}</p>
            <Link
              to="/destinations"
              className="mt-4 inline-flex font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-bone underline-offset-4 transition-colors hover:text-[var(--gold)] hover:underline"
            >
              {t("home.heroSeeRegions")}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export { heroLeopard };
