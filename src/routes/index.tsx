import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { FilmModal } from "@/components/media/film-modal";
import { SITE_VIDEOS } from "@/data/site-videos";
import { SiteFooter } from "@/components/layout/site-footer";
import { FeaturedTrips } from "@/components/sections/featured-trips";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { DestinationsShowcase } from "@/components/sections/destinations-showcase";
import { HomeStartHere } from "@/components/sections/home-start-here";
import { CinematicHero, heroLeopard } from "@/components/sections/cinematic-hero";
import { IntroPhotoMosaic } from "@/components/sections/intro-photo-mosaic";
import { MigrationCalendar } from "@/components/sections/migration-calendar";
import { SectionDivider } from "@/components/layout/section-divider";
import { buildPageHead } from "@/lib/seo";
import { preloadImage } from "@/lib/preload-image";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Reveal, blurIn, ParallaxSection } from "@/components/motion";
import { Shield, Sparkles, Heart, MapPin } from "lucide-react";
import migration from "@/assets/editorial/migration.jpg";
import maasai from "@/assets/editorial/maasai.jpg";
import walking from "@/assets/editorial/walking.jpg";
import acaciaEditorial from "@/assets/editorial/acacia.jpg";
import elephants from "@/assets/editorial/elephants.jpg";

export const Route = createFileRoute("/")({
  head: () => {
    const base = buildPageHead({
      title: "Aardvark Safaris Tanzania | Official Site",
      description:
        "Official site of Aardvark Safaris Tanzania. Tailor-made northern Tanzania safaris from Arusha — Serengeti, Ngorongoro, Tarangire, Kilimanjaro, and Zanzibar.",
      path: "/",
    });
    return {
      ...base,
      links: [...base.links, { rel: "preload", href: heroLeopard, as: "image" }],
    };
  },
  component: HomePage,
});

const reasonIcons = [MapPin, Shield, Sparkles, Heart];

const introMosaicPhotos = [
  { src: maasai, alt: "Maasai community in Tanzania" },
  { src: walking, alt: "Safari guests watching wildlife" },
  { src: acaciaEditorial, alt: "Guest photographing a zebra on safari" },
  { src: elephants, alt: "Safari guests watching giraffes from an Aardvark vehicle" },
];

function HomePage() {
  const { t } = useTranslation();

  const reasonsData = (t("home.reasons", { returnObjects: true }) as { title: string; desc: string }[]).slice(0, 4);
  const reasons = reasonsData.map((r, i) => ({ ...r, icon: reasonIcons[i] }));
  const [filmOpen, setFilmOpen] = useState(false);

  useEffect(() => {
    preloadImage(heroLeopard);
    const deferMosaic = window.setTimeout(() => {
      for (const photo of introMosaicPhotos) preloadImage(photo.src);
    }, 2000);
    return () => window.clearTimeout(deferMosaic);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light />

      <CinematicHero onWatchFilm={() => setFilmOpen(true)} filmOpen={filmOpen} />

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
          <OptimizedImage
            src={migration}
            alt="Plains zebras on the Great Migration circuit, Tanzania"
            className="h-full w-full object-cover object-[center_42%]"
          />
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
