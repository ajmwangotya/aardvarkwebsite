import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { SITE } from "@/lib/site-config";

export type MobileNavChild = { label: string; href: string };

export type MobileNavItem =
  | { href: string; label: string; highlight?: boolean }
  | { label: string; children: MobileNavChild[]; key: string };

type MobileNavMenuProps = {
  navItems: MobileNavItem[];
  triggerClassName?: string;
};

export function MobileNavMenu({ navItems, triggerClassName }: MobileNavMenuProps) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useFocusTrap(drawerRef, open);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      close();
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const panel =
    mounted && open
      ? createPortal(
          <div
            id="mobile-nav-dialog"
            className="mobile-nav-overlay lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.navigation")}
          >
            <button
              type="button"
              className="mobile-nav-backdrop"
              aria-label={t("a11y.closeMenu")}
              onClick={close}
            />
            <div ref={drawerRef} className="mobile-nav-drawer flex flex-col bg-ink text-bone shadow-2xl">
              <div className="flex shrink-0 items-center justify-between gap-3">
                <p className="eyebrow text-gold">{t("nav.navigation")}</p>
                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-sm border border-bone/30 text-bone hover:border-gold hover:text-gold"
                  aria-label={t("a11y.closeMenu")}
                  onClick={close}
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <Link to="/plan-trip" onClick={close} className="btn-fill mt-6 w-full justify-center">
                {t("nav.bookNow")}
              </Link>

              <nav className="mt-6 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto" aria-label={t("nav.navigation")}>
                {navItems.map((item) =>
                  "children" in item ? (
                    <details key={item.key} className="mobile-nav-group border-b border-bone/10 py-1" open>
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-2 font-serif text-lg text-bone">
                        {item.label}
                        <ChevronDown className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                      </summary>
                      <div className="mb-2 ml-3 flex flex-col border-l border-gold/25 pl-3">
                        {item.children.map((c) => (
                          <a key={c.href} href={c.href} onClick={close} className="mobile-nav-link text-base">
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={close}
                      className={cn(
                        "mobile-nav-link border-b border-bone/10 py-3 font-serif text-lg",
                        item.highlight && "text-gold",
                      )}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="mt-6 shrink-0 space-y-2 border-t border-bone/10 pt-4 text-sm text-bone/80">
                <a href={`tel:${SITE.phoneAfricaTel}`} className="mobile-nav-contact-link block py-2 active:text-gold">
                  {SITE.phoneAfrica}
                </a>
                <a href={`mailto:${SITE.emailAfrica}`} className="mobile-nav-contact-link block py-2 active:text-gold">
                  {SITE.emailAfrica}
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((was) => !was)}
        className={cn(
          "relative z-[2] flex h-11 shrink-0 touch-manipulation items-center justify-center gap-1.5 rounded-sm border px-3 lg:hidden",
          open && "z-[401]",
          triggerClassName,
        )}
        aria-expanded={open}
        aria-controls="mobile-nav-dialog"
        aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
      >
        {open ? (
          <X className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
        ) : (
          <Menu className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
        )}
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em]">
          {open ? t("nav.close") : t("nav.menu")}
        </span>
      </button>
      {panel}
    </>
  );
}
