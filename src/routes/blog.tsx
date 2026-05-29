import { createFileRoute, Link } from "@tanstack/react-router";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";
import { motion } from "framer-motion";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { BLOG_POST_META } from "@/data/blog";
import { blogPostMatchesQuery, getBlogPosts } from "@/data/blog-i18n";
import { asObjectArray } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/motion";
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

  const topicTags = asObjectArray<string>(t("blog.topicTags", { returnObjects: true }));

  const postImages = [migration, elephants, acacia, walking, balloon, maasai, leopard, camp1, dining];

  const posts = getBlogPosts(t).map((p) => {
    const meta = BLOG_POST_META[p.slug];
    return {
      ...p,
      img: postImages[meta.imageIndex],
      date: meta.date,
      author: meta.author,
      featured: meta.featured ?? false,
    };
  });

  const categoryKeys = ["all", "guides", "wildlife", "culture", "trekking", "experiences", "travelTips"] as const;
  type CategoryKey = (typeof categoryKeys)[number];
  const categories = categoryKeys.map((k) => t(`blog.categories.${k}`));

  const [activeKey, setActiveKey] = useState<CategoryKey>("all");
  const [query, setQuery] = useState("");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const trending = posts.filter((p) => !p.featured).slice(0, 3);

  if (!featured) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <SiteHeader light={false} />
        <div className="mx-auto max-w-xl px-5 py-40 text-center text-muted-foreground">
          <p>{t("blog.noResults")}</p>
          <Link to="/" className="mt-6 inline-block text-primary underline">
            {t("nav.home")}
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }
  const activeCategoryLabel = t(`blog.categories.${activeKey}`);
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => activeKey === "all" || p.category === activeCategoryLabel)
    .filter((p) => blogPostMatchesQuery(p, query));

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
          <div className="group block w-full text-left">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="relative md:col-span-7">
                <a href={`/blog/${featured.slug}`} className="block w-full cursor-pointer text-left">
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
                </a>
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
                <a href={`/blog/${featured.slug}`} className="block w-full cursor-pointer text-left">
                  <h2 className="mt-6 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                </a>
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
                <details className="mt-10 group/featuredread">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary [&::-webkit-details-marker]:hidden">
                    {t("blog.readStory")}
                    <ArrowRight className="h-3 w-3 transition-transform group-open/featuredread:translate-x-1" />
                  </summary>
                  <div className="mt-6 space-y-4 border-t border-border pt-5">
                    {featured.body.map((para, idx) => (
                      <p key={`${featured.slug}-${idx}`} className="text-sm leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                    <a
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.26em] text-primary"
                    >
                      Open full article <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTROLS */}
      <section className="border-y border-border bg-card/40 backdrop-blur sticky top-16 sm:top-20 z-20">
        <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-6 px-5 py-4 sm:px-6 sm:py-5 md:px-12">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:h-0">
            {categoryKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-colors whitespace-nowrap shrink-0 sm:shrink ${
                  activeKey === key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeKey === key && (
                  <motion.span
                    layoutId="cat-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 bg-primary"
                  />
                )}
                {categories[i]}
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
          <div key={`${activeKey}-${query}`} className="grid gap-10 sm:grid-cols-2">
              {filtered.map((p, i) => (
                <article
                  key={p.slug}
                  className={`group transition-transform duration-300 hover:-translate-y-1.5 ${i === 0 ? "sm:col-span-2" : ""}`}
                >
                  <a href={`/blog/${p.slug}`} className="block w-full cursor-pointer text-left">
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
                  </a>
                  <div className="mt-5">
                    <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{p.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.read}</span>
                    </div>
                    <a href={`/blog/${p.slug}`} className="block cursor-pointer text-left">
                      <h3 className={`mt-3 font-serif transition-colors group-hover:text-primary ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                        {p.title}
                      </h3>
                    </a>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <details className="mt-4 group/readmore">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-primary [&::-webkit-details-marker]:hidden">
                        {t("blog.readMore")}
                        <ArrowRight className="h-3 w-3 transition-transform group-open/readmore:translate-x-1" />
                      </summary>
                      <div className="mt-6 space-y-4 border-t border-border pt-5">
                        {p.body.map((para, idx) => (
                          <p key={`${p.slug}-${idx}`} className="text-sm leading-relaxed text-muted-foreground">
                            {para}
                          </p>
                        ))}
                        <a
                          href={`/blog/${p.slug}`}
                          className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.26em] text-primary"
                        >
                          Open full article <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && (
                <div className="sm:col-span-2 py-20 text-center text-muted-foreground">
                  {t("blog.noResults")}
                </div>
              )}
          </div>
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
                  <div className="min-w-0 flex-1">
                    <details className="group/trending">
                      <summary className="cursor-pointer list-none font-serif text-lg leading-snug transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                        {tr.title}
                      </summary>
                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        {tr.body.map((para, idx) => (
                          <p key={`${tr.slug}-${idx}`} className="text-sm leading-relaxed text-muted-foreground">
                            {para}
                          </p>
                        ))}
                        <a
                          href={`/blog/${tr.slug}`}
                          className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.26em] text-primary"
                        >
                          Open full article <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </details>
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
