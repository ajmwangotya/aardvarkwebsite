import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/motion";
import { BLOG_POST_META, isBlogSlug } from "@/data/blog";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";
import { Clock, ArrowLeft } from "lucide-react";
import migration from "@/assets/migration.jpg";
import elephants from "@/assets/elephants.jpg";
import acacia from "@/assets/acacia.jpg";
import walking from "@/assets/walking.jpg";
import balloon from "@/assets/balloon.jpg";
import maasai from "@/assets/maasai.jpg";
import leopard from "@/assets/leopard.jpg";
import camp1 from "@/assets/camp-1.jpg";
import dining from "@/assets/dining.jpg";

const postImages = [migration, elephants, acacia, walking, balloon, maasai, leopard, camp1, dining];

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!isBlogSlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const path = `/blog/${params.slug}`;
    return buildPageHead({
      title: pageTitle("Journal"),
      description: "Stories, guides and dispatches from the Tanzanian wild.",
      path,
      ogType: "article",
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useLoaderData();
  const { t } = useTranslation();
  const meta = BLOG_POST_META[slug];

  const posts = t("blog.posts", { returnObjects: true }) as {
    slug: string;
    title: string;
    read: string;
    category: string;
    excerpt: string;
    body: string[];
  }[];

  const post = posts.find((p) => p.slug === slug);
  if (!post) throw notFound();

  const img = postImages[meta.imageIndex];

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />

      <article className="mx-auto max-w-[800px] px-5 pb-20 pt-28 sm:px-6 sm:pt-40 md:pb-32">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-foreground hover:text-gold">
            <ArrowLeft className="h-3 w-3" />
            {t("blog.backToJournal")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
            <span className="text-primary">{post.category}</span>
            <span>·</span>
            <span>{meta.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.read}
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[clamp(2rem,6vw,3.5rem)] leading-tight">{post.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>
        </Reveal>

        <div className="mt-10 aspect-[16/9] overflow-hidden">
          <img src={img} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="prose-custom mt-12 space-y-6">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="text-base leading-[1.85] text-muted-foreground md:text-lg">{para}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border-t border-border pt-10">
          <p className="text-sm text-muted-foreground">
            {meta.author} · {t("blog.headGuide")}
          </p>
          <Link to="/plan-trip" className="btn-fill mt-8">
            {t("nav.bookNow")}
          </Link>
        </Reveal>
      </article>

      <SiteFooter />
    </div>
  );
}
