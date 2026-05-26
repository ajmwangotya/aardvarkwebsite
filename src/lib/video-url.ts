/**
 * Resolve brand film URLs from env (CDN) or local /public/videos for dev.
 *
 * Production: set VITE_VIDEO_CDN_BASE (and optional per-file overrides) in Vercel / Cloudflare.
 * Overrides may be a full MP4 URL or a YouTube watch link — see docs/EXTERNAL-VIDEOS.md.
 * Local: leave unset — videos load from public/videos/*.mp4 on disk.
 */

/** Public R2 bucket — films live at /videos/*.mp4 (see docs/EXTERNAL-VIDEOS.md). */
const PRODUCTION_VIDEO_CDN = "https://pub-63bf513aa48e4a83a4da0d27b2e2d577.r2.dev";

const CDN_BASE = (
  (import.meta.env.VITE_VIDEO_CDN_BASE as string | undefined)?.trim() ||
  (import.meta.env.PROD ? PRODUCTION_VIDEO_CDN : "")
).replace(/\/$/, "") || undefined;

const OVERRIDES = {
  "aardvark-raw-footage.mp4":
    (import.meta.env.VITE_VIDEO_RAW_FOOTAGE as string | undefined)?.trim() ||
    (import.meta.env.VITE_VIDEO_FEATURE_FILM as string | undefined)?.trim(),
  "aardvark-film.mp4": (import.meta.env.VITE_VIDEO_FEATURE_FILM as string | undefined)?.trim(),
  "aardvark-wild.mp4": (import.meta.env.VITE_VIDEO_WILD_REEL as string | undefined)?.trim(),
  "gorilla-uganda.mp4": (import.meta.env.VITE_VIDEO_GORILLA as string | undefined)?.trim(),
} as const;

export function videoUrl(filename: keyof typeof OVERRIDES): string {
  const override = OVERRIDES[filename];
  if (override) return override;
  // Dev server: always use public/videos on disk (CDN env is often set but R2 may be empty or blocked)
  if (import.meta.env.DEV) return `/videos/${filename}`;
  if (CDN_BASE) return `${CDN_BASE}/videos/${filename}`;
  return `/videos/${filename}`;
}

/** True when films are served from a remote CDN (not bundled in the repo). */
export function usesExternalVideos(): boolean {
  return Boolean(CDN_BASE || Object.values(OVERRIDES).some(Boolean));
}
