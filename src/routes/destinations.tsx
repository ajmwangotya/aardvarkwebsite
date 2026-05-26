import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/motion";
import { CIRCUIT_SLUGS, circuitAnchor, type CircuitSlug } from "@/data/circuits";
import {
  circuitImages,
  countryImages,
  destinationGroupImages,
  featuredParkImages,
} from "@/data/destination-images";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/destinations")({
  head: () =>
    buildPageHead({
      title: pageTitle("Destinations"),
      description:
        "Tanzania's national parks, safari circuits, and country guides — plus Kenya, Uganda, Rwanda, and Zanzibar.",
      path: "/destinations",
    }),
  component: DestinationsPage,
});

function destSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function DestinationsPage() {
  const { t } = useTranslation();

  const countries = t("destPage.countries", { returnObjects: true }) as {
    slug: string;
    name: string;
    tagline: string;
    highlights?: string[];
  }[];
  const circuits = t("destPage.circuits", { returnObjects: true }) as {
    slug: CircuitSlug;
    name: string;
    route: string;
    duration: string;
    intro: string;
    parks: string[];
    highlights: string[];
  }[];
  const featuredParks = t("destPage.featuredParks", { returnObjects: true }) as { name: string; desc: string }[];
  const groupsData = t("destPage.groups", { returnObjects: true }) as { eyebrow: string; title: string; items: { name: string; desc: string }[] }[];

  const groups = groupsData.map((g, gi) => ({
    ...g,
    items: g.items.map((item, ii) => ({ ...item, img: destinationGroupImages[gi][ii] })),
  }));

  const parkImgs = [...featuredParkImages];

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="pt-28 pb-12 sm:pt-40 sm:pb-16 mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("destPage.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="destPage.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            {t("destPage.heroDesc")}
          </p>
        </Reveal>
      </section>

      {/* Countries */}
      <section className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("destPage.countriesEyebrow")}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            <Trans i18nKey="destPage.countriesTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <Link
              key={c.slug}
              to="/destinations/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col border border-border overflow-hidden gold-border-glow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={countryImages[c.slug as keyof typeof countryImages]}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl group-hover:text-[var(--gold)] transition-colors">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
                {c.highlights && c.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-border pt-4">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-auto pt-4 text-xs uppercase tracking-eyebrow text-gold max-md:opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  {t("home.explore")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Safari circuits */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
          <Reveal>
            <span className="eyebrow">{t("destPage.circuitsEyebrow")}</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              <Trans i18nKey="destPage.circuitsTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-6 max-w-3xl text-muted-foreground">{t("destPage.circuitsDesc")}</p>
          </Reveal>

          <div className="mt-12 space-y-16">
            {CIRCUIT_SLUGS.map((slug) => {
              const circuit = circuits.find((c) => c.slug === slug);
              if (!circuit) return null;
              return (
                <article
                  key={slug}
                  id={circuitAnchor(slug)}
                  className="scroll-mt-32 grid gap-8 border border-border bg-background p-6 md:grid-cols-2 md:gap-12 md:p-10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[320px]">
                    <img
                      src={circuitImages[slug]}
                      alt={circuit.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="eyebrow text-gold">{circuit.duration}</span>
                      <h3 className="mt-2 font-serif text-3xl text-bone">{circuit.name}</h3>
                      <p className="mt-1 text-sm text-bone/80">{circuit.route}</p>
                    </div>
                  </div>
                  <div>
                    <p className="leading-relaxed text-muted-foreground">{circuit.intro}</p>
                    <div className="mt-6">
                      <span className="text-xs uppercase tracking-eyebrow text-muted-foreground">{t("destPage.parksTitle")}</span>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {circuit.parks.map((park) => (
                          <li key={park} className="border border-border px-3 py-1.5 text-xs text-foreground/80">
                            {park}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ul className="mt-6 space-y-2">
                      {circuit.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link to="/packages" className="btn-fill">
                        {t("destPage.circuitsViewPackages")}
                      </Link>
                      <Link to="/plan-trip" className="btn-line">
                        {t("destPage.circuitsPlanTrip")}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-6 md:px-12 border-t border-border pt-16">
        <Reveal>
          <span className="eyebrow">{t("destPage.featuredParksEyebrow")}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            <Trans i18nKey="destPage.featuredParksTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredParks.map((p, i) => (
            <div key={p.name} className="border border-border p-6 bg-card">
              <img src={parkImgs[i]} alt={p.name} loading="lazy" className="mb-4 aspect-[16/9] w-full object-cover" />
              <h3 className="font-serif text-xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-6 sm:pb-32 md:px-12 space-y-16 sm:space-y-24">
        {groups.map((g) => (
          <div key={g.eyebrow}>
            <Reveal>
              <span className="eyebrow">{g.eyebrow}</span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">{g.title}</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p, i) => (
                <motion.div
                  key={p.name}
                  id={destSlug(p.name)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="scroll-mt-32"
                >
                  <div className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={p.img} alt={`${p.name} — wildlife and landscape`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-serif text-2xl text-bone">{p.name}</h3>
                      </div>
                    </div>
                    {p.desc && <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
