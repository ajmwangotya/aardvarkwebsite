import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { campImages } from "@/data/destination-images";
import { FEATURED_CAMPS } from "@/data/camps";
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

  const camps = FEATURED_CAMPS.map((c, i) => ({
    ...c,
    img: campImages[i] ?? campImages[0],
  }));

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-12">
        <span className="eyebrow">{t("camps.eyebrow")}</span>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
          <Trans i18nKey="camps.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
        </h1>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <h2 className="sr-only">Featured camps and lodges</h2>
        <ul className="grid list-none gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((c) => (
            <li key={c.name} className="transition-transform duration-300 hover:-translate-y-2">
              <Link to="/plan-trip" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={c.img}
                    alt={`${c.name} — luxury safari camp in ${c.region}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <div className="text-[0.6rem] uppercase tracking-[0.5em] text-gold">{c.region}</div>
                    <h3 className="mt-2 font-serif text-3xl text-bone">{c.name}</h3>
                    <p className="mt-3 text-sm text-bone/70">{c.desc}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
