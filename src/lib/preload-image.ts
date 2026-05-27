/** Inject a one-time preload link so LCP images start downloading immediately. */
export function preloadImage(href: string) {
  if (typeof document === "undefined" || !href) return;
  const id = `preload-${href}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  document.head.appendChild(link);
}
