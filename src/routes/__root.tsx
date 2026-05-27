import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  retainSearchParams,
  useRouter,
  useRouterState,
  useRouteContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import { useEffect, useLayoutEffect } from "react";
import { z } from "zod";

import appCss from "../styles.css?url";
import clientI18n from "@/lib/i18n";
import { createI18nForLang, parseLangParam } from "@/lib/i18n-instance";
import { applyLanguage } from "@/lib/switch-language";
import type { RouterContext } from "@/router";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { useTranslation } from "react-i18next";
import { MOBILE_NAV_TOGGLE_ID } from "@/components/layout/mobile-nav-menu";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE, TRIPADVISOR, absoluteUrl, ogImageUrl, hreflangLinks } from "@/lib/site-config";

const rootSearchSchema = z.object({
  lang: z.enum(["en", "it", "es", "de", "fr"]).optional(),
});

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader light={false} />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-serif text-foreground">404</h1>
          <p className="mt-4 text-sm tracking-eyebrow uppercase text-muted-foreground">{t("notFound.message")}</p>
          <Link to="/" className="btn-line mt-8 inline-flex">{t("notFound.home")}</Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-serif">This page didn't load</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="btn-line mt-6"
        >Try again</button>
      </div>
    </div>
  );
}

const defaultTitle = `${SITE.name} — Personalised & Reliable Safari Services`;
const defaultDescription =
  "Trekking, safari, and beach holidays across Tanzania and East Africa. Tailor-made journeys from our Arusha team — Serengeti, Ngorongoro, Kilimanjaro, gorillas, and Zanzibar.";

export const Route = createRootRouteWithContext<RouterContext>()({
  validateSearch: rootSearchSchema,
  search: {
    middlewares: [retainSearchParams(["lang"])],
  },
  beforeLoad: async ({ search, context }) => {
    const lang = parseLangParam(search.lang ?? context.lang);
    const i18n =
      context.i18n?.language === lang ? context.i18n : await createI18nForLang(lang);
    return { lang, i18n };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#3d2918" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: defaultTitle },
      { name: "description", content: defaultDescription },
      { property: "og:title", content: defaultTitle },
      { property: "og:description", content: defaultDescription },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: ogImageUrl() },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImageUrl() },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: absoluteUrl("/") },
      ...hreflangLinks("/"),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: SITE.legalName,
          alternateName: SITE.name,
          url: SITE.url,
          image: ogImageUrl(),
          description: `${SITE.tagline} — ${SITE.servicesLine}`,
          areaServed: ["Tanzania", "Kenya", "Uganda", "Rwanda", "Botswana", "Zimbabwe", "South Africa"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "P.O. Box 11342",
            addressLocality: "Arusha",
            addressCountry: "TZ",
          },
          telephone: SITE.phoneAfricaTel,
          email: SITE.emailAfrica,
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "08:00",
              closes: "20:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday"],
              opens: "09:00",
              closes: "17:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: TRIPADVISOR.rating,
            reviewCount: TRIPADVISOR.reviewCount,
            bestRating: 5,
          },
          sameAs: [
            "https://www.instagram.com/aardvark_safaris/",
            "https://web.facebook.com/aardvarktanzanialtd",
            SITE.tripAdvisor,
            "https://linkedin.com/company/aardvarktanzania",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const { lang } = useRouteContext({ from: Route.id });
  return (
    <html lang={lang ?? "en"}>
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SkipToContent() {
  const { t } = useTranslation();
  return (
    <a href="#main-content" className="skip-to-content">
      {t("a11y.skipToContent")}
    </a>
  );
}

function CloseMobileNavOnNavigate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const toggle = document.getElementById(MOBILE_NAV_TOGGLE_ID) as HTMLInputElement | null;
    if (toggle?.checked) toggle.checked = false;
  }, [pathname]);

  return null;
}

function RootComponent() {
  const { queryClient, i18n: requestI18n, lang } = Route.useRouteContext();
  const isClient = typeof document !== "undefined";
  const providerI18n = isClient ? clientI18n : (requestI18n ?? clientI18n);

  useLayoutEffect(() => {
    if (!isClient) return;
    void applyLanguage(lang, clientI18n);
  }, [lang, isClient]);

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.classList.add("js-ready");
  }, [isClient]);

  return (
    <I18nextProvider i18n={providerI18n} defaultNS="translation">
      <QueryClientProvider client={queryClient}>
        <CloseMobileNavOnNavigate />
        <SkipToContent />
        <main id="main-content">
          <Outlet />
        </main>
        <MobileCtaBar />
        <WhatsAppFloat />
        <CookieConsent />
      </QueryClientProvider>
    </I18nextProvider>
  );
}
