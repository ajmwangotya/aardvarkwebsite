import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal, stagger, fadeUp, blurIn, flipIn, slideRight, ParallaxSection } from "@/components/motion";
import { Sun, Cloud, Leaf, Plane } from "lucide-react";
import { experienceImages } from "@/data/destination-images";
import migration from "@/assets/migration.jpg";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/experiences")({
  head: () =>
    buildPageHead({
      title: pageTitle("Experiences"),
      description:
        "Game drives, walking safaris, balloon flights, cultural encounters, local crafts, cuisine, and travel planning tips for Tanzania.",
      path: "/experiences",
    }),
  component: ExperiencesPage,
});

const seasonIcons = [Sun, Cloud, Leaf];

function ExperiencesPage() {
  const { t } = useTranslation();

  const experienceItems = t("experiences.items", { returnObjects: true }) as { title: string; desc: string }[];
  const craftItems = t("experiences.crafts", { returnObjects: true }) as { title: string; desc: string }[];
  const cuisineItems = t("experiences.cuisine", { returnObjects: true }) as { title: string; desc: string }[];
  const seasonItems = t("experiences.seasons", { returnObjects: true }) as { title: string; items: string[] }[];
  const airportItems = t("experiences.airports", { returnObjects: true }) as { code: string; name: string; desc: string }[];

  const experiences = experienceItems.map((item, i) => ({ ...item, img: experienceImages[i] }));
  const seasons = seasonItems.map((item, i) => ({ ...item, icon: seasonIcons[i] }));

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="pt-40 pb-16 mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal variants={blurIn}>
          <span className="eyebrow">{t("experiences.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="experiences.heroTitle" components={{ i: <span className="shimmer-text italic" /> }} />
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-6 sm:pb-32 md:px-12">
        <div className="grid gap-12 sm:gap-16">
          {experiences.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`grid gap-8 md:grid-cols-12 md:items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="md:col-span-7 [direction:ltr]">
                <div className="image-zoom gold-border-glow relative aspect-[16/10]">
                  <img src={e.img} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="md:col-span-5 [direction:ltr]">
                <span className="eyebrow shimmer-text">0{i + 1}</span>
                <h2 className="mt-4 font-serif text-[clamp(1.5rem,4.5vw,3rem)]">{e.title}</h2>
                <span className="mt-4 block h-px w-12 bg-gold" />
                <p className="mt-6 leading-relaxed text-muted-foreground">{e.desc}</p>
                <Link to="/plan-trip" className="btn-line mt-8">{t("experiences.addToSafari")}</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOCAL CRAFTS & ART */}
      <section className="bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">
          <Reveal>
            <span className="eyebrow">{t("experiences.craftsEyebrow")}</span>
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
              <Trans i18nKey="experiences.craftsTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {craftItems.map((c) => (
              <motion.div key={c.title} variants={flipIn} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.3 }} className="border border-border p-5 sm:p-8 bg-background gold-border-glow group">
                <h3 className="font-serif text-2xl transition-colors duration-300 group-hover:text-[var(--gold)]">{c.title}</h3>
                <span className="mt-3 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CUISINE */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("experiences.cuisineEyebrow")}</span>
          <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
            <Trans i18nKey="experiences.cuisineTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            {t("experiences.cuisineDesc")}
          </p>
        </Reveal>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {cuisineItems.map((c) => (
            <motion.div key={c.title} variants={fadeUp} className="flex gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <span className="font-serif text-2xl text-gold">{c.title[0]}</span>
              </div>
              <div>
                <h3 className="font-serif text-xl">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* BEST TIME TO TRAVEL */}
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">
          <Reveal>
            <span className="eyebrow text-gold">{t("experiences.whenEyebrow")}</span>
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)] text-bone">
              <Trans i18nKey="experiences.whenTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-6 max-w-2xl text-bone/70">
              {t("experiences.whenDesc")}
            </p>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {seasons.map((s) => (
              <motion.div key={s.title} variants={flipIn} whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="border border-bone/10 p-8 group transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(196,155,70,0.1)]">
                <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <s.icon className="h-8 w-8 text-gold" />
                </motion.div>
                <h3 className="mt-4 font-serif text-xl text-bone transition-colors group-hover:text-gold">{s.title}</h3>
                <ul className="mt-4 space-y-3">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-bone/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AIRPORTS */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("experiences.airportsEyebrow")}</span>
          <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
            <Trans i18nKey="experiences.airportsTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
        </Reveal>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {airportItems.map((a) => (
            <motion.div key={a.code} variants={fadeUp} whileHover={{ x: 6 }} transition={{ duration: 0.3 }} className="flex gap-5 border border-border p-6 gold-border-glow group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-ink text-bone font-serif text-sm font-bold tracking-wide transition-all duration-500 group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]">
                {a.code}
              </div>
              <div>
                <h3 className="font-serif text-lg transition-colors duration-300 group-hover:text-[var(--gold)]">{a.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
