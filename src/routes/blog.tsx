import { createFileRoute, Link } from "@tanstack/react-router";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal, stagger, fadeUp } from "@/components/motion";
import { ArrowRight, Clock, Search, BookOpen, TrendingUp } from "lucide-react";
import migration from "@/assets/editorial/migration.jpg";
import elephants from "@/assets/editorial/elephants.jpg";
import walking from "@/assets/editorial/walking.jpg";
import balloon from "@/assets/editorial/balloon.jpg";
import acacia from "@/assets/editorial/acacia.jpg";
import maasai from "@/assets/editorial/maasai.jpg";
import leopard from "@/assets/editorial/leopard.jpg";
import camp1 from "@/assets/editorial/camp-1.jpg";
import dining from "@/assets/editorial/dining.jpg";

export const Route = createFileRoute("/blog")({
  head: () =>
    buildPageHead({
      title: pageTitle("The Journal"),
      description: "Stories, guides and dispatches from the Tanzanian wild.",
      path: "/blog",
    }),
  component: BlogPage,
});

function BlogPage() {
  const { t } = useTranslation();

  const postsI18n = t("blog.posts", { returnObjects: true }) as { slug: string; title: string; read: string; category: string; excerpt: string; body: string[] }[];
  const topicTags = t("blog.topicTags", { returnObjects: true }) as string[];

  const postImages = [migration, elephants, acacia, walking, balloon, maasai, leopard, camp1, dining];
  const postDates = ["May 12, 2026", "Apr 28, 2026", "Apr 14, 2026", "Mar 30, 2026", "Mar 16, 2026", "Feb 22, 2026", "Feb 08, 2026", "Jan 25, 2026", "Jan 11, 2026"];
  const postAuthors = ["Augustine Mwangotya", "Lucy Mollel", "James Kimaro", "Hassan Mwakyusa", "Lucy Mollel", "Naserian Lemomo", "Hassan Mwakyusa", "Lucy Mollel", "James Kimaro"];
  const postFeatured = [true, false, false, false, false, false, false, false, false];

  const posts = postsI18n.map((p, i) => ({
    ...p,
    img: postImages[i],
    date: postDates[i],
    author: postAuthors[i],
    featured: postFeatured[i] || false,
  }));

  const categoryKeys = ["all", "guides", "wildlife", "culture", "trekking", "experiences", "travelTips"] as const;
  const categories = categoryKeys.map(k => t(`blog.categories.${k}`));

  const [active, setActive] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const featured = posts.find((p) => p.featured)!;
  const trending = posts.filter((p) => !p.featured).slice(0, 3);
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => active === categories[0] || p.category === active)
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary via-background to-background" />
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_60%)]" />

        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.5em] text-primary">
              <BookOpen className="h-3.5 w-3.5" /> {t("blog.theJournal")}
            </div>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,5rem)] leading-[1.05]">
              <Trans i18nKey="blog.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              {t("blog.heroDesc")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-5 pb-14 sm:px-6 sm:pb-20 md:px-12">
        <Reveal>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group block w-full text-left"
          >
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="relative md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 to-transparent" />
                  <span className="absolute left-5 top-5 bg-primary px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.4em] text-primary-foreground">
                    {t("blog.featured")}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -right-4 -top-4 hidden h-28 w-28 place-items-center rounded-full bg-accent text-center text-[0.6rem] uppercase leading-tight tracking-[0.25em] text-accent-foreground shadow-xl md:grid"
                >
                  {t("blog.editorsPick")}
                </motion.div>
              </div>

              <div className="md:col-span-5">
                <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
                  <span className="text-primary">{featured.category}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {featured.read}</span>
                </div>
                <h2 className="mt-6 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground font-serif">
                    {featured.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{featured.author}</div>
                    <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t("blog.headGuide")}</div>
                  </div>
                </div>
                <div className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                  {t("blog.readStory")} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* CONTROLS */}
      <section className="border-y border-border bg-card/40 backdrop-blur sticky top-16 sm:top-20 z-20">
        <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-6 px-5 py-4 sm:px-6 sm:py-5 md:px-12">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:h-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-colors whitespace-nowrap shrink-0 sm:shrink ${
                  active === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === c && (
                  <motion.span
                    layoutId="cat-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 bg-primary"
                  />
                )}
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-border bg-background px-3 py-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              className="w-full sm:w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* GRID + SIDEBAR */}
      <section className="mx-auto max-w-[1400px] grid gap-10 sm:gap-12 px-5 py-14 sm:px-6 sm:py-20 md:grid-cols-12 md:px-12">
        <div className="md:col-span-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active + query}
              initial="hidden"
              animate="show"
              variants={stagger}
              className="grid gap-10 sm:grid-cols-2"
            >
              {filtered.map((p, i) => (
                <motion.article
                  key={p.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className={`group ${i === 0 ? "sm:col-span-2" : ""}`}
                >
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="block w-full text-left">
                    <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
                      <span className="absolute left-4 top-4 bg-background/90 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.4em] text-primary backdrop-blur">
                        {p.category}
                      </span>
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                        <span>{p.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.read}</span>
                      </div>
                      <h3 className={`mt-3 font-serif transition-colors group-hover:text-primary ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                        {p.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-primary">
                        {t("blog.readMore")} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
              {filtered.length === 0 && (
                <div className="sm:col-span-2 py-20 text-center text-muted-foreground">
                  {t("blog.noResults")}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SIDEBAR */}
        <aside className="md:col-span-4 space-y-12">
          <div>
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.4em] text-primary">
              <TrendingUp className="h-3.5 w-3.5" /> {t("blog.trending")}
            </div>
            <ol className="mt-6 space-y-6">
              {trending.map((tr, i) => (
                <li key={tr.title} className="group flex items-start gap-4">
                  <span className="font-serif text-4xl text-primary/40 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: tr.slug }}
                      className="font-serif text-lg leading-snug hover:text-primary transition-colors"
                    >
                      {tr.title}
                    </Link>
                    <div className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {tr.category} · {tr.read}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative overflow-hidden bg-primary p-8 text-primary-foreground">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" />
            <div className="relative">
              <div className="text-[0.65rem] uppercase tracking-[0.5em]">{t("blog.theDispatch")}</div>
              <h4 className="mt-4 font-serif text-3xl leading-tight">{t("blog.dispatchTitle")}</h4>
              <p className="mt-3 text-sm opacity-90">{t("blog.dispatchDesc")}</p>
              <NewsletterForm
                source="blog"
                className="mt-6 flex"
                inputClassName="flex-1 bg-primary-foreground/10 px-4 py-3 text-sm placeholder:text-primary-foreground/60 outline-none border border-primary-foreground/20"
                buttonClassName="bg-accent px-5 text-xs uppercase tracking-[0.3em] text-accent-foreground hover:bg-foreground hover:text-background transition min-h-11"
              />
            </div>
          </div>

          <div>
            <div className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">{t("blog.topics")}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {topicTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary cursor-pointer transition"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}
