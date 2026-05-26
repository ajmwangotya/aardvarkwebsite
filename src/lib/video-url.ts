/**
 * Resolve brand film URLs from env (CDN) or local /public/videos for dev.
 *
 * Production: set VITE_VIDEO_CDN_BASE (and optional per-file overrides) in Vercel / Cloudflare.
 * Local: leave unset — videos load from public/videos/*.mp4 on disk.
 */

const CDN_BASE = (import.meta.env.VITE_VIDEO_CDN_BASE as string | undefined)?.trim().replace(/\/$/, "");

const OVERRIDES = {
  "aardvark-film.mp4": (import.meta.env.VITE_VIDEO_FEATURE_FILM as string | undefined)?.trim(),
  "aardvark-wild.mp4": (import.meta.env.VITE_VIDEO_WILD_REEL as string | undefined)?.trim(),
  "gorilla-uganda.mp4": (import.meta.env.VITE_VIDEO_GORILLA as string | undefined)?.trim(),
} as const;

export function videoUrl(filename: keyof typeof OVERRIDES): string {
  const override = OVERRIDES[filename];
  if (override) return override;
  if (CDN_BASE) return `${CDN_BASE}/videos/${filename}`;
  return `/videos/${filename}`;
}

/** True when films are served from a remote CDN (not bundled in the repo). */
export function usesExternalVideos(): boolean {
  return Boolean(CDN_BASE || Object.values(OVERRIDES).some(Boolean));
}
