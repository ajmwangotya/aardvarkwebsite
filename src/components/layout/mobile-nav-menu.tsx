import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-config";
import { NavHrefLink, closeMobileNav } from "@/lib/nav-href";

export const MOBILE_NAV_TOGGLE_ID = "site-mobile-nav-toggle";

export type MobileNavLink = { href: string; label: string; highlight?: boolean; indent?: boolean };

type NavProps = {
  light?: boolean;
  links: MobileNavLink[];
};

const FALLBACK_LINKS: MobileNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/about", label: "About" },
  { href: "/plan-trip", label: "Plan your trip" },
  { href: "/experiences", label: "Experiences" },
  { href: "/camps", label: "Camps & Lodges" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/** Hamburger / close icon — place in the header bar. */
export function MobileNavTrigger({ light = false }: { light?: boolean }) {
  const { t } = useTranslation();

  return (
    <label
      htmlFor={MOBILE_NAV_TOGGLE_ID}
      className={cn(
        "mobile-nav-trigger",
        light
          ? "border-bone/40 text-bone hover:border-gold hover:text-gold"
          : "border-border text-foreground hover:border-gold hover:text-gold",
      )}
      aria-label={t("a11y.openMenu")}
    >
      <Menu className="mobile-nav-icon-open h-5 w-5" strokeWidth={1.75} aria-hidden />
      <X className="mobile-nav-icon-close h-5 w-5" strokeWidth={1.75} aria-hidden />
    </label>
  );
}

/**
 * Full-screen menu panel — render as a sibling AFTER </header>, not inside it,
 * so header backdrop-filter does not clip position:fixed content.
 */
export function MobileNavPanel({ links }: { links: MobileNavLink[] }) {
  const { t } = useTranslation();
  const navLinks = links.length > 0 ? links : FALLBACK_LINKS;

  return (
    <div className="mobile-nav-panel-host">
      <input type="checkbox" id={MOBILE_NAV_TOGGLE_ID} className="mobile-nav-toggle" aria-hidden tabIndex={-1} />

      <div className="mobile-nav-root" role="dialog" aria-modal="true" aria-label={t("nav.navigation")}>
        <label htmlFor={MOBILE_NAV_TOGGLE_ID} className="mobile-nav-backdrop" aria-label={t("a11y.closeMenu")} />

        <aside className="mobile-nav-drawer">
          <div className="mobile-nav-drawer-header">
            <p className="eyebrow text-gold">{t("nav.navigation")}</p>
            <label htmlFor={MOBILE_NAV_TOGGLE_ID} className="mobile-nav-close" aria-label={t("a11y.closeMenu")}>
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </label>
          </div>

          <nav className="mobile-nav-list" aria-label={t("nav.navigation")}>
            <ul>
              {navLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <NavHrefLink
                    href={link.href}
                    onClick={closeMobileNav}
                    className={cn(
                      "mobile-nav-link",
                      link.indent && "mobile-nav-link--indent",
                      link.highlight && "mobile-nav-link--highlight",
                    )}
                  >
                    {link.label}
                  </NavHrefLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-nav-footer">
            <a href={`tel:${SITE.phoneAfricaTel}`} className="mobile-nav-contact-link">
              {SITE.phoneAfrica}
            </a>
            <a href={`mailto:${SITE.emailAfrica}`} className="mobile-nav-contact-link">
              {SITE.emailAfrica}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
