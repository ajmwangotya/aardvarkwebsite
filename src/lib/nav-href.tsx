import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";

type NavHrefLinkProps = {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

/** Resolve internal paths (including /destinations hashes) to TanStack Router links. */
export function NavHrefLink({ href, className, onClick, children }: NavHrefLinkProps) {
  const [pathname, hashPart] = href.split("#");
  const hash = hashPart || undefined;

  if (pathname === "/destinations") {
    return (
      <Link to="/destinations" hash={hash} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const countryMatch = pathname.match(/^\/destinations\/([^/]+)$/);
  if (countryMatch) {
    return (
      <Link
        to="/destinations/$slug"
        params={{ slug: countryMatch[1] }}
        className={className}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link to={pathname as LinkProps["to"]} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function closeMobileNav() {
  const input = document.getElementById("site-mobile-nav-toggle") as HTMLInputElement | null;
  if (input) input.checked = false;
}
