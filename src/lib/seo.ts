import { SITE, absoluteUrl, ogImageUrl, hreflangLinks } from "@/lib/site-config";

export type PageHeadOptions = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
};

export function buildPageHead({
  title,
  description,
  path = "/",
  ogImage,
  ogType = "website",
  noindex = false,
}: PageHeadOptions) {
  const url = absoluteUrl(path);
  const image = ogImageUrl(ogImage);

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE.name },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return {
    meta,
    links: [
      { rel: "canonical", href: url },
      ...hreflangLinks(path),
    ],
  };
}
