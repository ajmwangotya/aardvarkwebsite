import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal, stagger, fadeUp } from "@/components/motion";
import { campImages } from "@/data/destination-images";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/camps")({
  head: () =>
    buildPageHead({
      title: pageTitle("Camps & Lodges"),
      description: "Hand-picked luxury camps and lodges across Tanzania's most iconic wilderness areas.",
      path: "/camps",
    }),
  component: CampsPage,
});

function CampsPage() {
  const { t } = useTranslation();

  const campItems = t("camps.items", { returnObjects: true }) as { name: string; region: string; desc: string }[];

  const camps = campItems.map((c, i) => ({ ...c, img: campImages[i] }));

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="pt-40 pb-16 mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("camps.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="camps.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <h2 className="sr-only">Featured camps and lodges</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {camps.map((c) => (
            <motion.div key={c.name} variants={fadeUp} whileHover={{ y: -8 }}>
              <Link to="/plan-trip" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={c.img} alt={`${c.name} — luxury safari camp in ${c.region}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <div className="text-[0.6rem] uppercase tracking-[0.5em] text-gold">{c.region}</div>
                    <h3 className="mt-2 font-serif text-3xl text-bone">{c.name}</h3>
                    <p className="mt-3 text-sm text-bone/70">{c.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
