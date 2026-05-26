import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal, fadeUp } from "@/components/motion";
import { COUNTRY_SLUGS, isCountrySlug } from "@/data/countries";
import { circuitAnchor, type CircuitSlug } from "@/data/circuits";
import { countryImages } from "@/data/destination-images";
import migration from "@/assets/migration.jpg";
import { CinematicVideoSection } from "@/components/cinematic-video-section";
import { SITE_VIDEOS } from "@/data/site-videos";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    if (!isCountrySlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const slug = params.slug;
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);
    return buildPageHead({
      title: pageTitle(title),
      description: `Safari destinations in ${title}: national parks, wildlife, culture, and the best time to visit.`,
      path: `/destinations/${slug}`,
    });
  },
  component: CountryDestinationPage,
});

function CountryDestinationPage() {
  const { slug } = Route.useLoaderData();
  const { t } = useTranslation();
  const base = `countryPages.${slug}`;
  const hero = countryImages[slug] ?? migration;

  const parks = t(`${base}.parks`, { returnObjects: true }) as { name: string; desc: string }[];
  const wildlife = t(`${base}.wildlife`, { returnObjects: true }) as string[];
  const culture = t(`${base}.culture`, { returnObjects: true }) as string[];
  const bestTime = t(`${base}.bestTime`, { returnObjects: true }) as { season: string; note: string }[];
  const tiers = t(`${base}.tiers`, { returnObjects: true }) as { tier: string; desc: string }[];

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light />
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden sm:h-[60vh]">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/85" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-12 sm:px-6 md:px-12 md:pb-20">
          <Reveal>
            <Link to="/destinations" className="eyebrow text-gold hover:underline">
              ← {t("countryPages.back")}
            </Link>
            <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2rem,6vw,4.5rem)] text-bone">
              <Trans i18nKey={`${base}.heroTitle`} components={{ i: <span className="shimmer-text italic" /> }} />
            </h1>
            <p className="mt-4 max-w-2xl text-bone/85">{t(`${base}.heroDesc`)}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
        <Reveal>
          <p className="font-serif text-lg leading-relaxed sm:text-xl md:text-2xl">{t(`${base}.intro`)}</p>
        </Reveal>
      </section>

      {slug === "uganda" && (
        <CinematicVideoSection
          src={SITE_VIDEOS.gorillaUganda}
          eyebrowKey={`${base}.filmEyebrow`}
          titleKey={`${base}.filmTitle`}
          descKey={`${base}.filmDesc`}
        />
      )}

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
          <Reveal>
            <span className="eyebrow">{t("countryPages.parksEyebrow")}</span>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,3rem)]">
              <Trans i18nKey="countryPages.parksTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parks.map((p, i) => (
              <motion.article
                key={p.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border bg-background p-6 gold-border-glow"
              >
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <span className="mt-3 block h-px w-10 bg-gold" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{t("countryPages.wildlifeEyebrow")}</span>
            <h2 className="mt-4 font-serif text-3xl">{t("countryPages.wildlifeTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {wildlife.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow">{t("countryPages.cultureEyebrow")}</span>
            <h2 className="mt-4 font-serif text-3xl">{t("countryPages.cultureTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {culture.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
          <Reveal>
            <span className="eyebrow text-gold">{t("countryPages.whenEyebrow")}</span>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,3rem)]">{t("countryPages.whenTitle")}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {bestTime.map((b) => (
              <div key={b.season} className="border border-bone/15 p-6">
                <h3 className="font-serif text-xl text-gold">{b.season}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/75">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {slug === "tanzania" && (
        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
            <Reveal>
              <span className="eyebrow">{t(`${base}.circuitsEyebrow`)}</span>
              <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,3rem)]">
                <Trans i18nKey={`${base}.circuitsTitle`} components={{ i: <span className="gradient-text italic" /> }} />
              </h2>
              <p className="mt-6 max-w-3xl text-muted-foreground">{t(`${base}.circuitsDesc`)}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {(t("destPage.circuits", { returnObjects: true }) as { slug: CircuitSlug; name: string; intro: string; route: string }[]).map(
                (circuit) => (
                  <div key={circuit.slug} className="border border-border bg-background p-6">
                    <h3 className="font-serif text-xl">{circuit.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-eyebrow text-muted-foreground">{circuit.route}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-4">{circuit.intro}</p>
                    <Link
                      to="/destinations"
                      hash={circuitAnchor(circuit.slug)}
                      className="mt-4 inline-block text-xs uppercase tracking-eyebrow text-gold hover:underline"
                    >
                      {t("home.explore")} →
                    </Link>
                  </div>
                )
              )}
            </div>
            <Reveal className="mt-8">
              <Link to="/destinations" hash="circuit-northern" className="text-sm text-gold hover:underline">
                {t(`${base}.circuitsLink`)}
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
        <Reveal>
          <span className="eyebrow">{t("countryPages.tiersEyebrow")}</span>
          <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,3rem)]">{t("countryPages.tiersTitle")}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <div key={tier.tier} className="border border-border p-8">
              <h3 className="font-serif text-2xl">{tier.tier}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{tier.desc}</p>
            </div>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link to="/packages" className="btn-line mr-4">{t("countryPages.viewPackages")}</Link>
          <Link to="/plan-trip" className="btn-fill">{t("countryPages.planTrip")}</Link>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}

export { COUNTRY_SLUGS };
