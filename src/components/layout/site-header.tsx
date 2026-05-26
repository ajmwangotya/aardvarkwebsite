import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/brand/aardvark-logo.svg";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  MobileNavPanel,
  MobileNavTrigger,
  type MobileNavLink,
} from "@/components/layout/mobile-nav-menu";
import { SITE, TRIPADVISOR } from "@/lib/site-config";

type NavItem =
  | { href: string; label: string; highlight?: boolean }
  | { label: string; children: NavChild[]; key: string };

const brandLabel = SITE.name;

function destSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function asCountryList(value: unknown): { slug: string; name: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (c): c is { slug: string; name: string } =>
      typeof c === "object" &&
      c !== null &&
      typeof (c as { slug?: unknown }).slug === "string" &&
      typeof (c as { name?: unknown }).name === "string",
  );
}

type NavChild = { label: string; href: string };

export function SiteHeader({ light = true }: { light?: boolean }) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDrop(null);
  }, [pathname]);

  const solid = !light || scrolled;

  const countries = asCountryList(t("destPage.countries", { returnObjects: true }));
  const destinations: NavChild[] = [
    { label: t("nav.viewAllCountries"), href: "/destinations" },
    ...countries.map((c) => ({
      label: c.name,
      href: `/destinations/${c.slug}`,
    })),
    { label: t("destPage.circuitsEyebrow"), href: "/destinations#circuit-northern" },
    { label: t("destinations.serengeti"), href: `/destinations#${destSlug("Serengeti")}` },
    { label: t("destinations.ngorongoro"), href: `/destinations#${destSlug("Ngorongoro")}` },
    { label: t("destinations.kilimanjaro"), href: `/destinations#${destSlug("Kilimanjaro")}` },
  ];

  const planTrip: NavChild[] = [
    { label: t("planMenu.plan"), href: "/plan-trip" },
    { label: t("planMenu.itineraries"), href: "/itineraries" },
    { label: t("planMenu.experiences"), href: "/experiences" },
    { label: t("planMenu.camps"), href: "/camps" },
  ];

  const navItems: NavItem[] = [
    { href: "/", label: t("nav.home") },
    { href: "/packages", label: t("nav.packages"), highlight: true },
    { label: t("nav.destinations"), children: destinations, key: "destinations" },
    { href: "/itineraries", label: t("nav.itineraries") },
    { href: "/about", label: t("nav.about") },
    { label: t("nav.planTrip"), children: planTrip, key: "plan" },
    { href: "/faq", label: t("nav.faq") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const mobileNavLinks: MobileNavLink[] = [
    { href: "/", label: t("nav.home") },
    { href: "/packages", label: t("nav.packages"), highlight: true },
    { href: "/destinations", label: t("nav.destinations") },
    ...countries.map((c) => ({
      href: `/destinations/${c.slug}`,
      label: c.name,
      indent: true,
    })),
    { href: "/itineraries", label: t("nav.itineraries") },
    { href: "/about", label: t("nav.about") },
    { href: "/plan-trip", label: t("nav.planTrip") },
    { href: "/experiences", label: t("planMenu.experiences") },
    { href: "/camps", label: t("planMenu.camps") },
    { href: "/faq", label: t("nav.faq") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
        solid
          ? "border-b border-border bg-background/95 shadow-sm max-lg:backdrop-blur-none lg:backdrop-blur"
          : "bg-transparent max-lg:bg-ink/25"
      }`}
    >
      <div className="hidden w-full border-b border-primary-foreground/10 bg-primary text-primary-foreground md:block">
        <div className="mx-auto max-w-[1600px] px-6 py-2.5 md:px-10 lg:py-3">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.68rem] uppercase tracking-[0.12em] sm:gap-x-5">
              <span className="whitespace-nowrap font-medium text-primary-foreground">{SITE.locationLabel}</span>
              <a href={`tel:${SITE.phoneAfricaTel}`} className="whitespace-nowrap normal-case tracking-normal hover:text-gold">
                {SITE.phoneAfrica}
              </a>
              <a href={`mailto:${SITE.emailAfrica}`} className="whitespace-nowrap normal-case tracking-normal hover:text-gold">
                {SITE.emailAfrica}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 text-[0.62rem] uppercase tracking-[0.1em] text-primary-foreground/85">
              <span>{SITE.hoursWeekdays}</span>
              <span className="text-primary-foreground/30" aria-hidden>
                ·
              </span>
              <span>{SITE.hoursWeekends}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto border-b border-primary-foreground/10 bg-primary/90 px-4 py-1 text-center text-[0.6rem] uppercase tracking-[0.16em] text-primary-foreground md:hidden">
        <a
          href={SITE.tripAdvisor}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 hover:text-gold"
        >
          <span className="text-gold">{TRIPADVISOR.rating} ★</span>
          <span>{t("home.tripAdvisorShort", { count: TRIPADVISOR.reviewCount, defaultValue: "{{count}} reviews" })}</span>
        </a>
      </div>

      <div className="pointer-events-auto relative mx-auto flex h-16 w-full max-w-[1600px] items-center gap-2 px-5 md:h-20 md:gap-4 md:px-10 lg:gap-12">
        <a
          href="/"
          aria-label={`${brandLabel} — Home`}
          className="relative z-[1] flex max-w-[min(40vw,9rem)] shrink-0 items-center sm:max-w-none"
        >
          <img
            src={logoUrl}
            alt={brandLabel}
            className={`h-9 w-auto max-w-full sm:h-10 md:h-14 ${solid ? "[filter:invert(1)_brightness(0.15)]" : ""}`}
          />
        </a>

        <nav
          className="pointer-events-auto hidden min-w-0 items-center justify-center gap-6 md:flex lg:gap-8"
          aria-label={t("nav.navigation")}
        >
            {navItems.map((item) => {
              if ("children" in item) {
                const isOpen = openDrop === item.key;
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setOpenDrop(item.key)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    <button
                      type="button"
                      className={`nav-link flex items-center gap-1 ${solid ? "text-foreground" : "text-bone"} hover:text-primary`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenDrop((k) => (k === item.key ? null : item.key))}
                    >
                      {item.label}
                      <ChevronDown className={`h-3 w-3 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={false}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute left-1/2 top-full z-[110] mt-3 w-72 -translate-x-1/2 border border-border bg-card p-2 shadow-xl"
                        >
                          {item.children.map((c) => (
                            <a
                              key={c.href}
                              href={c.href}
                              className="block px-4 py-3 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                              onClick={() => setOpenDrop(null)}
                            >
                              {c.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  activeOptions={{ exact: item.href === "/" }}
                  className={`nav-link ${solid ? "text-foreground" : "text-bone"} hover:text-primary ${
                    item.highlight ? "font-medium text-gold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="pointer-events-auto relative z-[2] ml-auto flex shrink-0 items-center gap-2">
          <div className="lg:hidden">
            <LanguageSwitcher light={!solid} />
          </div>
          <div className="hidden lg:block">
            <LanguageSwitcher light={!solid} />
          </div>
          <MobileNavTrigger light={!solid} />
          <div className="hidden lg:block">
            <Link to="/plan-trip" className="btn-fill">
              <Calendar className="h-6 w-6 shrink-0" strokeWidth={2} aria-hidden />
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      </div>
    </header>

    <MobileNavPanel links={mobileNavLinks} />
    </>
  );
}
