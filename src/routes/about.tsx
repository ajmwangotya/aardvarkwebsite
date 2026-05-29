import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GuestNotesSection } from "@/components/sections/guest-notes-section";
import { CinematicVideoSection } from "@/components/sections/cinematic-video-section";
import { SITE_VIDEOS } from "@/data/site-videos";
import { Reveal, blurIn, slideRight, ParallaxSection, CountUp } from "@/components/motion";
import { asObjectArray } from "@/lib/utils";
import { COMPANY_STATS, pageTitle, SITE, TRIPADVISOR } from "@/lib/site-config";
import { ArrowRight, Star } from "lucide-react";
import { buildPageHead } from "@/lib/seo";
import maasai from "@/assets/editorial/maasai.jpg";
import acacia from "@/assets/editorial/acacia.jpg";
import walking from "@/assets/editorial/walking.jpg";
import dining from "@/assets/editorial/dining.jpg";
import augustinePhoto from "@/assets/team/team-augustine.jpg";
import waltPhoto from "@/assets/team/team-walt.jpg";
import deborahPhoto from "@/assets/team/team-deborah.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    buildPageHead({
      title: pageTitle("About"),
      description:
        "A leader in ethical and responsible tourism across Africa, committed to communities, conservation and unforgettable journeys.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();

  const values = asObjectArray<{ title: string; desc: string }>(t("about.values", { returnObjects: true }));
  const teamData = asObjectArray<{ name: string; role: string; bio: string }>(t("about.team", { returnObjects: true }));

  const photos = [augustinePhoto, waltPhoto, deborahPhoto];
  const initials = ["AM", "WA", "DM"];
  const team = teamData.map((m, i) => ({ ...m, photo: photos[i], initials: initials[i] }));

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />

      <section className="mx-auto max-w-[1600px] px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 md:px-12 md:pt-40">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <Reveal variants={blurIn} className="lg:col-span-6 xl:col-span-5">
            <span className="eyebrow">{t("about.eyebrow")}</span>
            <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.08]">
              <Trans i18nKey="about.heroTitle" components={{ i: <span className="shimmer-text italic" /> }} />
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
              {t("about.heroDesc")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Link to="/plan-trip" className="btn-fill">
                {t("about.heroCtaPlan")} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#our-story" className="btn-line">
                {t("about.heroCtaStory")}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-6 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground sm:mt-10">
              <span>{SITE.locationLabel}</span>
              <span className="hidden text-border sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={SITE.tripAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                <Star className="h-3 w-3 fill-gold text-gold" aria-hidden />
                {TRIPADVISOR.rating} · {TRIPADVISOR.reviewCount} {t("about.stats.reviews")}
              </a>
            </div>
          </Reveal>

          <Reveal variants={slideRight} delay={0.12} className="lg:col-span-6 xl:col-span-7">
            <div className="mx-auto w-full max-w-xl lg:max-w-none">
              <div className="grid min-h-[18rem] grid-cols-2 grid-rows-2 gap-3 sm:min-h-[22rem] sm:gap-4 md:min-h-[26rem]">
                <div className="row-span-2 min-h-0 overflow-hidden">
                  <div className="image-zoom gold-border-glow h-full">
                    <img
                      src={maasai}
                      alt="Maasai community in Tanzania"
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="min-h-0 overflow-hidden">
                  <div className="image-zoom gold-border-glow h-full">
                    <img
                      src={walking}
                      alt="Safari guests watching wildlife"
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_35%]"
                    />
                  </div>
                </div>
                <div className="min-h-0 overflow-hidden">
                  <div className="image-zoom gold-border-glow h-full">
                    <img
                      src={acacia}
                      alt="Acacia trees on the savannah"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <a
                href={SITE.tripAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-4 py-3 transition-colors hover:border-gold/40 sm:px-5"
              >
                <div className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
                  TripAdvisor {TRIPADVISOR.rating}
                </div>
                <p className="text-xs text-muted-foreground">{TRIPADVISOR.ranking}</p>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-4">
          {COMPANY_STATS.map((s) => (
            <div key={s.labelKey} className="gold-border-glow border border-ink/10 p-4 text-center sm:p-6">
              <div className="font-serif text-[clamp(1.75rem,6vw,3rem)] shimmer-text">
                <CountUp end={s.end} suffix={s.suffix} duration={2.5} />
              </div>
              <div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                {t(s.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="our-story" className="mx-auto max-w-[1400px] scroll-mt-28 px-5 pb-16 sm:px-6 sm:pb-24 md:px-12 md:scroll-mt-36">
        <Reveal>
          <span className="eyebrow">{t("about.storyEyebrow")}</span>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
            <Trans i18nKey="about.storyTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{t("about.storyP1")}</p>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="font-serif text-base leading-relaxed sm:text-lg md:text-xl">
              {t("about.missionP1")}
            </p>
            <p className="mt-8 leading-loose text-muted-foreground">
              {t("about.missionP2")}
            </p>
            <p className="mt-6 leading-loose text-muted-foreground">
              {t("about.missionP3")}
            </p>
            <p className="mt-6 leading-loose text-muted-foreground">
              {t("about.missionP4")}
            </p>
          </Reveal>
          <Reveal variants={slideRight} delay={0.2} className="md:col-span-5">
            <div className="image-zoom gold-border-glow">
              <img src={dining} alt="Guests enjoying a bush dining experience on safari" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <CinematicVideoSection
        src={SITE_VIDEOS.wildReel}
        poster={SITE_VIDEOS.wildReelPoster}
        eyebrowKey="about.filmEyebrow"
        titleKey="about.filmTitle"
        descKey="about.filmDesc"
        dark
      />

      {/* DIRECTOR'S WORD */}
      <section className="bg-ink text-bone relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(196,155,70,0.08)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12 relative">
          <div className="grid gap-10 sm:gap-16 md:grid-cols-12">
            <Reveal variants={blurIn} className="md:col-span-8">
              <span className="eyebrow text-gold glow-gold">{t("about.directorEyebrow")}</span>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.5rem,4.5vw,3rem)] text-bone glow-gold">
                <Trans i18nKey="about.directorGreeting" components={{ i: <span className="shimmer-text italic" /> }} />
              </h2>
              <div className="mt-8 space-y-6 font-serif text-lg leading-relaxed text-bone/85 italic">
                <p>{t("about.directorP1")}</p>
                <p>{t("about.directorP2")}</p>
                <p>{t("about.directorP3")}</p>
              </div>
              <div className="mt-8 border-l-2 border-gold pl-6">
                <p className="font-serif text-lg shimmer-text">{t("about.directorSignoff")}</p>
                <p className="mt-2 font-serif text-xl text-bone">{t("about.directorName")}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-bone/60">{t("about.directorRole")}</p>
              </div>
            </Reveal>
            <Reveal variants={slideRight} delay={0.2} className="md:col-span-4 flex items-center">
              <div className="relative group">
                <img src={augustinePhoto} alt="Augustine Mwangotya" loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 border border-gold/0 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_40px_rgba(196,155,70,0.15)]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24 grid gap-12 md:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{t("about.eastAfricaEyebrow")}</span>
            <h2 className="mt-4 font-serif text-3xl">
              <Trans i18nKey="about.eastAfricaTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.eastAfricaDesc")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">{t("about.localEyebrow")}</span>
            <h2 className="mt-4 font-serif text-3xl">
              <Trans i18nKey="about.localTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.localDesc")}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
        <Reveal>
          <span className="eyebrow">{t("about.sustainEyebrow")}</span>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
            <Trans i18nKey="about.sustainTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{t("about.sustainDesc")}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {(t("about.certifications", { returnObjects: true }) as { name: string; desc: string }[]).map((cert) => (
            <div key={cert.name} className="border border-border p-6 gold-border-glow">
              <h3 className="font-serif text-xl">{cert.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">
          <Reveal>
            <span className="eyebrow">{t("about.valuesEyebrow")}</span>
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
              <Trans i18nKey="about.valuesTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-px sm:bg-border md:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="rounded-sm border border-border bg-card p-6 sm:rounded-none sm:border-0 sm:p-10 group gold-border-glow cursor-default"
              >
                <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold/40 transition-colors group-hover:text-gold">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 font-serif text-3xl transition-colors duration-300 group-hover:text-[var(--gold)]">{v.title}</h3>
                <span className="mt-4 mb-4 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                <p className="leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("about.guidesEyebrow")}</span>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
            <Trans i18nKey="about.guidesTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{t("about.guidesDesc")}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12 border-t border-border">
        <Reveal>
          <span className="eyebrow">{t("about.teamEyebrow")}</span>
          <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
            <Trans i18nKey="about.teamTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            {t("about.teamDesc")}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {team.map((m) => (
            <article key={m.name} className="group card-hover-lift">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink/90 to-ink">
                    <span className="font-serif text-7xl text-bone/80">{m.initials}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent max-md:opacity-100 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />
                <div
                  className="absolute inset-0 max-md:opacity-60 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 60px rgba(196,155,70,0.15)" }}
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl transition-colors duration-300 group-hover:text-[var(--gold)]">{m.name}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">{m.role}</p>
              <div className="h-px w-0 bg-gold transition-all duration-500 mt-3 group-hover:w-16" />
              <p className="mt-4 leading-relaxed text-muted-foreground">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <GuestNotesSection />

      <section className="relative overflow-hidden">
        <ParallaxSection speed={0.25} className="absolute inset-0 -top-[10%] -bottom-[10%]">
          <img src={acacia} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover opacity-30" />
        </ParallaxSection>
        <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,155,70,0.06)_0%,transparent_60%)]" />
        <Reveal variants={blurIn} className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center md:py-40">
          <h2 className="font-serif text-[clamp(1.75rem,5vw,3.75rem)] text-bone glow-gold">
            <Trans i18nKey="about.ctaTitle" components={{ i: <span className="shimmer-text italic" /> }} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-bone/80">
            {t("about.ctaDesc")}
          </p>
          <Link to="/plan-trip" className="btn-fill mt-8">
            {t("about.ctaButton")}
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
