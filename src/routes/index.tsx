import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { FilmModal } from "@/components/media/film-modal";
import { SITE_VIDEOS } from "@/data/site-videos";
import { SiteFooter } from "@/components/layout/site-footer";
import { FeaturedTrips } from "@/components/sections/featured-trips";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { DestinationsShowcase } from "@/components/sections/destinations-showcase";
import { HomeStartHere } from "@/components/sections/home-start-here";
import { HeroVideoBackground } from "@/components/sections/hero-video-background";
import { HeroSlideshow } from "@/components/sections/hero-slideshow";
import { IntroPhotoMosaic } from "@/components/sections/intro-photo-mosaic";
import { MigrationCalendar } from "@/components/sections/migration-calendar";
import { SectionDivider } from "@/components/layout/section-divider";
import { buildPageHead } from "@/lib/seo";
import { preloadImage } from "@/lib/preload-image";
import { pageTitle } from "@/lib/site-config";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Reveal, blurIn, ParallaxSection } from "@/components/motion";
import { Calendar, Shield, Sparkles, Heart, MapPin, Play } from "lucide-react";
import heroNdutu1 from "@/assets/heroes/hero-ndutu-1.jpg";
import heroNdutu2 from "@/assets/heroes/hero-ndutu-2.jpg";
import heroNdutu3 from "@/assets/heroes/hero-ndutu-3.jpg";
import heroNdutu4 from "@/assets/heroes/hero-ndutu-4.jpg";
import heroNdutu5 from "@/assets/heroes/hero-ndutu-5.jpg";
import heroNdutu6 from "@/assets/heroes/hero-ndutu-6.jpg";
import heroNdutu7 from "@/assets/editorial/zanzibar-beach.jpg";
import migration from "@/assets/editorial/migration.jpg";
import maasai from "@/assets/editorial/maasai.jpg";
import walking from "@/assets/editorial/walking.jpg";
import dining from "@/assets/editorial/dining.jpg";
import acaciaEditorial from "@/assets/editorial/acacia.jpg";
import elephants from "@/assets/editorial/elephants.jpg";

export const Route = createFileRoute("/")({
  head: () => {
    const base = buildPageHead({
      title: pageTitle("Trekking · Safari · Beach Holidays"),
      description:
        "Tailor-made northern Tanzania safaris from Arusha — Serengeti, Ngorongoro, Tarangire, Kilimanjaro, and Zanzibar. 27 years, 5.0 on TripAdvisor.",
      path: "/",
    });
    return {
      ...base,
      links: [
        ...base.links,
        { rel: "preload", href: heroNdutu1, as: "image" },
        { rel: "preload", href: heroNdutu5, as: "image" },
      ],
    };
  },
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

const introMosaicPhotos = [
  { src: maasai, alt: "Maasai community in Tanzania" },
  { src: walking, alt: "Safari guests watching wildlife" },
  { src: dining, alt: "Bush dining experience" },
  { src: elephants, alt: "Elephants on the savannah" },
  { src: acaciaEditorial, alt: "Acacia trees on the savannah" },
];

function HomePage() {
  const { t } = useTranslation();

  const reasonsData = (t("home.reasons", { returnObjects: true }) as { title: string; desc: string }[]).slice(0, 4);
  const reasons = reasonsData.map((r, i) => ({ ...r, icon: reasonIcons[i] }));
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pauseHeroVideo, setPauseHeroVideo] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const useHeroSlideshow = pauseHeroVideo || heroVideoFailed;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [filmOpen, setFilmOpen] = useState(false);
  const [filmDataAck, setFilmDataAck] = useState(false);

  useLayoutEffect(() => {
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

  // Avoid competing with hero video for bandwidth — defer below-the-fold mosaic preloads.
  useEffect(() => {
    if (useHeroSlideshow) {
      preloadImage(heroNdutu1);
      preloadImage(heroNdutu5);
    }
    const deferMosaic = window.setTimeout(() => {
      for (const photo of introMosaicPhotos) preloadImage(photo.src);
    }, useHeroSlideshow ? 0 : 2500);
    return () => window.clearTimeout(deferMosaic);
  }, [useHeroSlideshow]);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light />

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

        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/85 md:from-ink/60 md:via-ink/20 md:to-ink/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(196,155,70,0.14)_0%,transparent_58%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent md:hidden" />
        </div>

        <motion.div
          style={{ opacity }}
          className="hero-content relative z-10 flex h-full w-full flex-col justify-end px-4 pb-[max(5.5rem,calc(4.25rem+env(safe-area-inset-bottom,0px)))] pt-[max(6.5rem,calc(5rem+env(safe-area-inset-top,0px)))] text-center text-bone sm:px-6 sm:pb-12 md:justify-center md:px-8 md:pb-12 md:pt-[calc(4.5rem+env(safe-area-inset-top))]"
        >
          <div className="hero-content-inner mx-auto flex w-full max-w-[min(100%,26rem)] flex-col items-center sm:max-w-md md:max-w-5xl md:gap-8">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title order-2 font-serif text-[clamp(2rem,8.25vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-balance text-bone md:text-[clamp(2.5rem,6vw,7rem)] md:font-normal md:leading-[1.06] md:tracking-tight"
            >
              <Trans i18nKey="home.dreamTitle" components={{ i: <span className="hero-accent shimmer-text italic" /> }} />
            </motion.h1>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-actions order-3 flex w-full flex-col gap-3 md:order-4 md:mt-2 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-5"
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

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="hero-trust order-4 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-bone/85 md:order-5 md:mt-2 md:text-[0.65rem] md:tracking-[0.28em] md:text-bone/80"
            >
              {t("home.trustLocal")}
            </motion.p>
          </div>
        </motion.div>
      </section>

      <SectionDivider variant="tracks" />

      <HomeStartHere />

      <section className="mx-auto max-w-[1400px] pb-16 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6 sm:pb-28 md:px-12 md:pb-40">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-5">
            <span className="eyebrow">{t("home.weHaveItAll")}</span>
            <h2 className="mt-6 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-tight sm:mt-8 text-ink">
              <Trans i18nKey="home.differenceTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <span className="gold-rule mt-6 sm:mt-8" />
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/85 sm:mt-10 sm:text-xl md:text-2xl">
              {t("home.expertCopy")}
            </p>
            <p className="mt-5 text-sm leading-loose text-muted-foreground sm:mt-6 sm:text-base">
              {t("home.expertCopyCta")}
            </p>
            <div className="mt-8 sm:mt-10">
              <Link to="/about" className="btn-line">
                {t("home.aboutUs")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-6 md:col-start-7">
            <IntroPhotoMosaic
              photos={introMosaicPhotos}
              layout={[0, 1, 2, 3]}
              aspects={["aspect-[3/4]", "aspect-[3/2]", "aspect-[3/2]", "aspect-[3/4]"]}
            />
          </Reveal>
        </div>
      </section>

      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden sm:h-[55vh] sm:min-h-[380px] md:h-[70vh]">
        <ParallaxSection speed={0.4} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          <OptimizedImage src={migration} alt="Wildebeest migration" className="h-full w-full object-cover" />
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

      <DestinationsShowcase />

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
                    <h3 className="mt-3 font-serif text-lg uppercase tracking-[0.16em] text-ink">{r.title}</h3>
                    <span className="mx-auto mt-3 block h-px w-10 bg-gold" />
                    <p className="mt-3 font-serif text-sm italic leading-relaxed text-ink/80">{r.desc}</p>
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
                  <h3 className="font-serif text-base uppercase tracking-[0.18em] text-bone/90 sm:text-lg">{r.title}</h3>
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
                    <h3 className="mt-3 font-serif text-lg uppercase tracking-[0.16em] text-ink">{r.title}</h3>
                    <span className="mx-auto mt-3 block h-px w-10 bg-gold" />
                    <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/80 sm:text-lg">{r.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FeaturedTrips className="border-t border-border bg-secondary/40 py-16 md:py-24" />

      <SectionDivider variant="tracks" className="!py-2 sm:!py-3" />

      <SocialProofSection showPlanCta />

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
