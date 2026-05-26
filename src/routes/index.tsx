import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { FilmModal } from "@/components/media/film-modal";
import { SITE_VIDEOS } from "@/data/site-videos";
import { SiteFooter } from "@/components/layout/site-footer";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { FeaturedPackages } from "@/components/sections/featured-packages";
import { TrustCredentials } from "@/components/sections/trust-credentials";
import { HomeStartHere } from "@/components/sections/home-start-here";
import { HeroVideoBackground } from "@/components/sections/hero-video-background";
import { HeroSlideshow } from "@/components/sections/hero-slideshow";
import { IntroPhotoMosaic } from "@/components/sections/intro-photo-mosaic";
import { MigrationCalendar } from "@/components/sections/migration-calendar";
import { SectionDivider } from "@/components/layout/section-divider";
import { buildPageHead } from "@/lib/seo";
import { SITE, TRIPADVISOR, pageTitle } from "@/lib/site-config";
import { Reveal, blurIn, ParallaxSection } from "@/components/motion";
import { ArrowRight, Calendar, Shield, Sparkles, Heart, MapPin, Play, Star } from "lucide-react";
import heroNdutu1 from "@/assets/heroes/hero-ndutu-1.jpg";
import heroNdutu2 from "@/assets/heroes/hero-ndutu-2.jpg";
import heroNdutu3 from "@/assets/heroes/hero-ndutu-3.jpg";
import heroNdutu4 from "@/assets/heroes/hero-ndutu-4.jpg";
import heroNdutu5 from "@/assets/heroes/hero-ndutu-5.jpg";
import heroNdutu6 from "@/assets/heroes/hero-ndutu-6.jpg";
import heroNdutu7 from "@/assets/editorial/zanzibar-beach.jpg";
import migration from "@/assets/editorial/migration.jpg";
import acacia from "@/assets/editorial/acacia.jpg";
import elephantSilhouette from "@/assets/editorial/elephant-silhouette.png";
import { countryImages, iconicDestinationImages } from "@/data/destination-images";

export const Route = createFileRoute("/")({
  head: () =>
    buildPageHead({
      title: pageTitle("Trekking · Safari · Beach Holidays"),
      description:
        "Personalised & reliable safari services across Tanzania and East Africa — Serengeti, Ngorongoro, Kilimanjaro, gorillas, and Zanzibar. Tailor-made journeys from Arusha.",
      path: "/",
    }),
  component: HomePage,
});

const reasonIcons = [MapPin, Shield, Sparkles, Heart];

const heroSlideImages = [
  { img: heroNdutu1, alt: "Giraffes of Ndutu" },
  { img: heroNdutu2, alt: "Safari wildlife" },
  { img: heroNdutu3, alt: "East African landscape" },
  { img: heroNdutu4, alt: "Wildlife on the plains" },
  { img: heroNdutu5, alt: "Lion at golden hour" },
  { img: heroNdutu6, alt: "Elephant tusks" },
  { img: heroNdutu7, alt: "Dhow sailing at sunset on Zanzibar beach" },
];

const destinations = [
  { name: "Tanzania", tagKey: "nationalPark", img: iconicDestinationImages.tanzania, countrySlug: "tanzania", altKey: "tanzania" },
  { name: "Kenya", tagKey: "nationalPark", img: iconicDestinationImages.kenya, countrySlug: "kenya", altKey: "kenya" },
  { name: "Uganda", tagKey: "nationalPark", img: iconicDestinationImages.uganda, countrySlug: "uganda", altKey: "uganda" },
  { name: "Rwanda", tagKey: "nationalPark", img: iconicDestinationImages.rwanda, countrySlug: "rwanda", altKey: "rwanda" },
  { name: "Zanzibar", tagKey: "island", img: iconicDestinationImages.zanzibar, countrySlug: "zanzibar", altKey: "zanzibar" },
  { name: "Serengeti", tagKey: "nationalPark", img: iconicDestinationImages.serengeti, countrySlug: "tanzania", altKey: "serengeti" },
];

function HomePage() {
  const { t } = useTranslation();

  const countryHighlights = Object.fromEntries(
    (
      t("destPage.countries", { returnObjects: true }) as { slug: string; highlights?: string[] }[]
    ).map((c) => [c.slug, c.highlights ?? []])
  );

  const signatureDestinations = (
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

  const reasonsData = (t("home.reasons", { returnObjects: true }) as { title: string; desc: string }[]).slice(0, 4);
  const reasons = reasonsData.map((r, i) => ({ ...r, icon: reasonIcons[i] }));
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pauseHeroVideo, setPauseHeroVideo] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const useHeroSlideshow = pauseHeroVideo || heroVideoFailed;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [hoveredItin, setHoveredItin] = useState<number | null>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmDataAck, setFilmDataAck] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mobile.matches);
      setReduceMotion(mobile.matches || motion.matches);
      setPauseHeroVideo(motion.matches);
    };
    update();
    mobile.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light />

      {/* HERO */}
      <section
        ref={heroRef}
        className="hero-section relative h-[88dvh] min-h-[420px] w-full overflow-hidden sm:min-h-[500px] sm:h-[90dvh] md:min-h-[720px] md:h-[100svh]"
      >
        <motion.div style={{ y }} className="absolute inset-0 z-0 h-[115%] w-full">
          {useHeroSlideshow ? (
            <HeroSlideshow
              slides={heroSlideImages}
              activeIndex={heroSlide}
              onActiveIndexChange={setHeroSlide}
              reduceMotion={reduceMotion}
            />
          ) : (
            <HeroVideoBackground
              src={SITE_VIDEOS.wildReel}
              poster={heroNdutu5}
              paused={pauseHeroVideo}
              onVideoError={() => setHeroVideoFailed(true)}
            />
          )}
        </motion.div>

        {/* Cinematic overlay — dark ink + warm gold tint (matches brand hero look) */}
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/85 md:from-ink/60 md:via-ink/20 md:to-ink/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(196,155,70,0.14)_0%,transparent_58%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent md:hidden" />
        </div>

        {/* Hero copy — mobile: stacked above sticky bar; desktop: centred */}
        <motion.div
          style={{ opacity }}
          className="hero-content relative z-10 flex h-full w-full flex-col justify-end px-4 pb-[max(5.5rem,calc(4.25rem+env(safe-area-inset-bottom,0px)))] pt-[max(6.5rem,calc(5rem+env(safe-area-inset-top,0px)))] text-center text-bone sm:px-6 sm:pb-12 md:justify-center md:px-8 md:pb-12 md:pt-[calc(4.5rem+env(safe-area-inset-top))]"
        >
          <div className="hero-content-inner mx-auto flex w-full max-w-[min(100%,26rem)] flex-col items-center sm:max-w-md md:max-w-5xl md:gap-8">
            <p
              className="hero-eyebrow order-1 font-sans text-[0.65rem] font-medium uppercase leading-snug tracking-[0.22em] text-gold sm:text-[0.65rem] md:flex md:items-center md:gap-3 md:bg-transparent md:px-0 md:py-0 md:tracking-[0.45em]"
              aria-live="polite"
            >
              <span className="hidden h-px w-10 bg-gold md:inline-block" aria-hidden />
              <span className="block text-balance">{t("home.heroEyebrow")}</span>
              <span className="hidden h-px w-10 bg-gold md:inline-block" aria-hidden />
            </p>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title order-2 font-serif text-[clamp(2rem,8.25vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-balance text-bone md:text-[clamp(2.5rem,6vw,7rem)] md:font-normal md:leading-[1.06] md:tracking-tight"
            >
              <Trans i18nKey="home.dreamTitle" components={{ i: <span className="hero-accent shimmer-text italic" /> }} />
            </motion.h1>

            <span className="hero-rule order-3 md:hidden" aria-hidden />

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-subtitle order-4 max-w-[24rem] font-sans text-[0.9375rem] font-normal leading-[1.5] tracking-[0.01em] text-bone/95 text-balance sm:max-w-md sm:text-base md:order-3 md:max-w-2xl md:font-serif md:text-[clamp(1.05rem,2vw,1.45rem)] md:leading-[1.5] md:text-bone/90"
            >
              <Trans i18nKey="home.welcomeTitle" components={{ i: <span className="hero-accent-inline italic" /> }} />
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-actions order-5 flex w-full flex-col gap-3 md:order-4 md:mt-2 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-5"
            >
              <Link to="/plan-trip" className="btn-fill w-full justify-center md:w-auto">
                <Calendar className="h-8 w-8 shrink-0 md:h-7 md:w-7" strokeWidth={2} aria-hidden />
                {t("nav.bookNow")}
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (isMobile && !filmDataAck) {
                    setFilmDataAck(true);
                    return;
                  }
                  setFilmOpen(true);
                }}
                className="group mx-auto flex min-h-11 w-full max-w-[14rem] items-center justify-center gap-3 text-bone md:w-auto md:max-w-none md:justify-start"
                aria-haspopup="dialog"
                aria-expanded={filmOpen}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/60 transition-all group-hover:border-gold group-hover:bg-gold/10 group-active:scale-95 md:group-hover:shadow-[0_0_30px_rgba(196,155,70,0.3)]">
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.2em] md:text-xs md:tracking-[0.3em]">
                  {filmDataAck && isMobile ? t("home.filmPlayAnyway") : t("home.watchFilm")}
                </span>
              </button>
              {filmDataAck && isMobile && !filmOpen && (
                <p className="order-5 text-center text-[0.65rem] leading-relaxed text-bone/80" role="status">
                  {t("home.filmDataWarning")}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="hero-trust order-6 flex w-full flex-col items-center gap-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-bone/85 md:order-5 md:mt-2 md:flex-row md:flex-wrap md:justify-center md:gap-x-8 md:text-[0.65rem] md:tracking-[0.28em] md:text-bone/80"
            >
              <a
                href={SITE.tripAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center justify-center gap-1.5 text-center leading-relaxed transition-colors hover:text-gold active:text-gold"
              >
                <Star className="h-3.5 w-3.5 shrink-0 fill-gold text-gold" aria-hidden />
                <span>{t("home.tripAdvisorLine", { rating: TRIPADVISOR.rating, count: TRIPADVISOR.reviewCount })}</span>
              </a>
              <span className="hidden text-bone/75 md:inline md:leading-relaxed">{t("home.trustLocal")}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.5em] text-bone/70 md:flex"
        >
          {t("home.scroll")}
          <span className="h-10 w-px bg-gradient-to-b from-bone/70 to-transparent" />
        </motion.div>
      </section>

      <SectionDivider variant="tracks" />

      <HomeStartHere />

      {/* INTRO */}
      <section className="mx-auto max-w-[1400px] pb-16 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6 sm:pb-28 md:px-12 md:pb-40">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-5">
            <span className="eyebrow">{t("home.weHaveItAll")}</span>
            <h2 className="mt-6 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-tight sm:mt-8 text-ink">
              <Trans i18nKey="home.dreamTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <span className="gold-rule mt-6 sm:mt-8" />
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/85 sm:mt-10 sm:text-xl md:text-2xl">
              {t("home.expertCopy")}
            </p>
            <p className="mt-5 text-sm leading-loose text-muted-foreground sm:mt-6 sm:text-base">
              {t("home.expertCopyCta")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Link to="/plan-trip" className="btn-fill hidden lg:inline-flex">
                {t("home.letUsPlan")}
              </Link>
              <Link to="/about" className="btn-line">{t("home.aboutUs")}</Link>
            </div>
          </Reveal>

          {/* Staggered 4-image mosaic — tall / short / tall / short */}
          <Reveal delay={0.2} className="md:col-span-6 md:col-start-7">
            <IntroPhotoMosaic
              photos={heroSlideImages.map(({ img, alt }) => ({ src: img, alt }))}
              layout={[4, 6, 5, 0]}
              aspects={["aspect-[3/4]", "aspect-[3/2]", "aspect-[3/2]", "aspect-[3/4]"]}
            />
          </Reveal>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden sm:h-[55vh] sm:min-h-[380px] md:h-[70vh]">
        <ParallaxSection speed={0.4} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          <img src={migration} alt="Wildebeest migration" className="h-full w-full object-cover" loading="lazy" />
        </ParallaxSection>
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <Reveal variants={blurIn} className="relative z-10 flex h-full flex-col items-center justify-center text-center text-bone">
          <motion.span
            initial={false}
            whileInView={{ letterSpacing: "0.4em", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow glow-gold"
          >
            {t("home.greatMigration")}
          </motion.span>
          <p className="mt-6 max-w-3xl px-4 font-serif text-[clamp(1.25rem,4vw,3rem)] leading-snug sm:mt-8 sm:px-6 glow-gold">
            <Trans i18nKey="home.migrationQuote" components={{ br: <br /> }} />
          </p>
        </Reveal>
      </section>

      <MigrationCalendar />

      <SectionDivider variant="beads" />

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-[1600px] px-6 pb-6 sm:px-6 sm:pb-10 md:px-12 md:pb-16">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">{t("home.iconicEyebrow")}</span>
              <h2 className="mt-4 max-w-2xl font-serif text-[clamp(1.75rem,5vw,3.75rem)] sm:mt-6">
                <Trans i18nKey="home.iconicTitle" components={{ i: <span className="gradient-text italic" /> }} />
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:mt-6 sm:text-base">
                {t("home.iconicDesc")}
              </p>
            </div>
            <Link to="/destinations" className="btn-line">{t("home.allDestinations")}</Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <div key={d.name}>
              <Link to="/destinations/$slug" params={{ slug: d.countrySlug }} className="group relative block overflow-hidden card-hover-lift">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={d.img}
                    alt={t(`home.destAlt.${d.altKey}`)}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle at 50% 80%, rgba(196,155,70,0.15) 0%, transparent 60%)" }}
                  />
                  <div className="absolute left-5 top-5 text-[0.55rem] uppercase tracking-[0.4em] text-gold sm:left-6 sm:top-6 sm:text-[0.6rem] sm:tracking-[0.5em]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                    <div className="text-[0.55rem] uppercase tracking-[0.4em] text-gold-soft sm:text-[0.6rem] sm:tracking-[0.5em]">{t(`home.destTags.${d.tagKey}`)}</div>
                    <h3 className="mt-2 font-serif text-2xl text-bone sm:text-3xl transition-transform duration-500 group-hover:translate-x-2">{d.name}</h3>
                    {countryHighlights[d.countrySlug]?.[0] && (
                      <p className="mt-2 text-xs text-bone/75 line-clamp-2">{countryHighlights[d.countrySlug][0]}</p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-[0.65rem] uppercase tracking-eyebrow text-bone sm:mt-4 sm:text-xs max-md:opacity-100 md:opacity-0 md:translate-y-2 md:transition-all md:duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                      {t("home.explore")} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
          <Reveal className="text-center">
            <span className="eyebrow text-gold">{t("home.whyChoose")}</span>
            <h2 className="mt-4 mx-auto max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)] text-bone sm:mt-6">
              <Trans i18nKey="home.whyChooseTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-bone/70 sm:mt-6 sm:text-base">
              {t("home.whyChooseDesc")}
            </p>
          </Reveal>

          <motion.div
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.15, margin: "-10% 0px -10% 0px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
            className="scroll-hint-x mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mt-16 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-bone/30 [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                variants={{
                  hidden: { opacity: 0, x: i < 3 ? -160 : 160 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 320, damping: 26, mass: 0.7 },
                  },
                }}
                className="relative h-[280px] w-[72vw] max-w-[260px] shrink-0 snap-start [perspective:1200px] sm:h-[300px] sm:w-[40vw] lg:h-[320px] lg:w-[calc((100%-3rem)/4)] lg:max-w-none"
              >
                <div className="absolute inset-x-1 inset-y-0 flex items-center justify-center rounded-sm bg-bone p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] sm:inset-x-2 lg:hidden">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-ink/80">
                      <r.icon className="h-6 w-6" strokeWidth={1.2} />
                    </div>
                    <span className="block font-serif text-xs uppercase tracking-[0.2em] text-ink/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-serif text-lg uppercase tracking-[0.16em] text-ink">
                      {r.title}
                    </h3>
                    <span className="mx-auto mt-3 block h-px w-10 bg-gold" />
                    <p className="mt-3 font-serif text-sm italic leading-relaxed text-ink/80">
                      {r.desc}
                    </p>
                  </div>
                </div>

                <motion.div
                  variants={{
                    hidden: { opacity: 1 },
                    show: { opacity: 0, transition: { delay: 0.55, duration: 0.3 } },
                  }}
                  className="absolute inset-0 hidden flex-col items-center justify-center gap-4 px-2 text-center lg:flex"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full text-bone/90 sm:h-16 sm:w-16">
                    <r.icon className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.2} />
                  </div>
                  <h3 className="font-serif text-base uppercase tracking-[0.18em] text-bone/90 sm:text-lg">
                    {r.title}
                  </h3>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, rotateX: -95 },
                    show: {
                      opacity: 1,
                      rotateX: 0,
                      transition: { delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  style={{ transformOrigin: "top center", transformPerspective: 1200 }}
                  className="absolute inset-x-1 inset-y-0 hidden items-center justify-center rounded-sm bg-bone p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] sm:inset-x-2 lg:flex"
                >
                  <div className="text-center">
                    <span className="block font-serif text-xs uppercase tracking-[0.2em] text-ink/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-serif text-lg uppercase tracking-[0.16em] text-ink">
                      {r.title}
                    </h3>
                    <span className="mx-auto mt-3 block h-px w-10 bg-gold" />
                    <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/80 sm:text-lg">
                      {r.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FeaturedPackages className="border-t border-border py-16 md:py-24" />
      <FeaturedJourneys className="border-y border-border bg-secondary/40 py-16 md:py-24" />

      <SectionDivider variant="tracks" className="!py-2 sm:!py-3" />

      {/* ITINERARIES LIST — editorial split with hover preview */}
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
                <span className="eyebrow">{t("home.signature")}</span>
                <h2 className="mt-4 max-w-2xl font-serif text-[clamp(1.75rem,5vw,3.75rem)] sm:mt-6">
                  <Trans i18nKey="home.tailorTitle" components={{ i: <span className="gradient-text italic" /> }} />
                </h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground sm:mt-4">
                  {t("home.tailorDesc")}
                </p>
              </div>
              <Link to="/destinations" className="btn-line">{t("home.allDestinations")}</Link>
            </div>
          </Reveal>

          <div
            className="mt-10 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-14"
            onMouseLeave={() => setHoveredItin(null)}
          >
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-6 sm:gap-8 lg:border-t lg:border-border lg:gap-0">
                {signatureDestinations.map((dest, i) => {
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

                        {/* Mobile & tablet — cinematic luxury cards */}
                        <div className="lg:hidden">
                          <div
                            className={`itin-mobile-card overflow-hidden rounded-sm border bg-ink shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] transition-all duration-500 ${
                              isActive
                                ? "itin-mobile-card--active border-gold/50 shadow-[0_32px_70px_-24px_rgba(196,155,70,0.35)]"
                                : "border-border/50"
                            }`}
                          >
                            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
                              <img
                                src={dest.img}
                                alt={dest.name}
                                loading="lazy"
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

                        {/* Desktop — horizontal row + hover preview panel */}
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
                              <span className="text-xs uppercase tracking-eyebrow text-coral">
                                {dest.duration}
                              </span>
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
                  {signatureDestinations.map((dest, i) => {
                    const active = (hoveredItin ?? 0) === i;
                    return (
                      <motion.div
                        key={dest.slug}
                        initial={false}
                        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.05 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <img src={dest.img} alt={dest.name} loading="lazy" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <span className="text-[10px] uppercase tracking-eyebrow text-gold">
                            {dest.duration} · {dest.tagline}
                          </span>
                          <h4 className="mt-2 font-serif text-2xl text-bone">{dest.name}</h4>
                          <p className="mt-1 text-xs uppercase tracking-eyebrow text-bone/70">{dest.route}</p>
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-bone/85">{dest.intro}</p>
                          <ul className="mt-3 space-y-1.5">
                            {dest.highlights.slice(0, 3).map((h) => (
                              <li key={h} className="flex gap-2 text-xs text-bone/75">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                  <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-bone/60" />
                  <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-bone/60" />
                  <span className="absolute left-3 bottom-3 h-4 w-4 border-l border-b border-bone/60" />
                  <span className="absolute right-3 bottom-3 h-4 w-4 border-r border-b border-bone/60" />
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                  <span>{t("home.eastAfrica")}</span>
                  <span>{String((hoveredItin ?? 0) + 1).padStart(2, "0")} / {String(signatureDestinations.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="beads" />

      <TrustCredentials />

      {/* REVIEWS */}
      <ReviewsSection />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <ParallaxSection speed={0.3} className="absolute inset-0 -top-[10%] -bottom-[10%]">
          <img src={acacia} alt="" aria-hidden className="h-full w-full object-cover opacity-40" loading="lazy" />
        </ParallaxSection>
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,155,70,0.08)_0%,transparent_70%)]" />

        {/* Sliding elephant silhouette */}
        <motion.img
          src={elephantSilhouette}
          alt=""
          aria-hidden
          loading="lazy"
          initial={false}
          whileInView={{ x: "0%", opacity: 0.28, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-4 left-2 z-[1] h-20 w-auto max-w-none select-none sm:bottom-6 sm:left-4 sm:h-28 md:h-36"
        />

        <Reveal variants={blurIn} className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-28 md:py-40">
          <span className="eyebrow glow-gold">{t("home.tailorMade")}</span>
          <h2 className="mt-6 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-tight sm:mt-8 text-bone glow-gold">
            <Trans i18nKey="home.ctaTitle" components={{ i: <span className="shimmer-text italic" /> }} />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-bone/80 sm:mt-8 sm:text-base">
            {t("home.ctaDesc")}
          </p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link to="/plan-trip" className="btn-fill hidden lg:inline-flex">
              {t("home.planTrip")}
            </Link>
            <Link to="/contact" className="btn-line text-bone">{t("home.contactUs")}</Link>
          </motion.div>
        </Reveal>
      </section>

      <FilmModal
        open={filmOpen}
        onOpenChange={setFilmOpen}
        src={SITE_VIDEOS.watchFilm}
        poster={SITE_VIDEOS.watchFilmPoster}
        titleKey="home.filmTitle"
      />

      <SiteFooter />
    </div>
  );
}
