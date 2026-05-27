/** Preload an MP4 so the hero background can start buffering immediately. */
export function preloadVideo(href: string) {
  if (typeof document === "undefined" || !href) return;
  const id = `preload-video-${href}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "preload";
  link.as = "video";
  link.href = href;
  link.type = "video/mp4";
  document.head.appendChild(link);
}
