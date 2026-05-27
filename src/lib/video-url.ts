/**
 * Resolve brand film MP4 URLs from Cloudflare R2.
 *
 * Set VITE_VIDEO_CDN_BASE to your R2 public URL (r2.dev subdomain or custom domain).
 * Files are served at `{CDN_BASE}/videos/{filename}`.
 * Local dev: VITE_USE_LOCAL_VIDEOS=true uses /public/videos/*.mp4 on disk instead.
 */

/** R2 / media CDN origin — proxied at /videos/* (see src/lib/video-proxy.ts). */
const DEFAULT_R2_CDN = "https://media.aardvarktanzania.com";

const env = import.meta.env ?? {};

/** Set VITE_USE_LOCAL_VIDEOS=true to force /public/videos/*.mp4 in dev (files not in Git). */
const USE_LOCAL_VIDEOS = env.VITE_USE_LOCAL_VIDEOS === "true";

const CDN_BASE = (
  (env.VITE_VIDEO_CDN_BASE as string | undefined)?.trim() ||
  (!USE_LOCAL_VIDEOS ? DEFAULT_R2_CDN : "")
).replace(/\/$/, "") || undefined;

const OVERRIDES = {
  /** Home hero background — short web-optimized loop on R2 (full reel: aardvark-wild.mp4). */
  "aardvark-hero.mp4": (env.VITE_VIDEO_HERO as string | undefined)?.trim(),
  /** Home “Watch the Film” modal only — do not alias to VITE_VIDEO_FEATURE_FILM (may point at another clip). */
  "aardvark-raw-footage.mp4": (env.VITE_VIDEO_RAW_FOOTAGE as string | undefined)?.trim(),
  "aardvark-film.mp4": (env.VITE_VIDEO_FEATURE_FILM as string | undefined)?.trim(),
  "aardvark-wild.mp4": (env.VITE_VIDEO_WILD_REEL as string | undefined)?.trim(),
  "gorilla-uganda.mp4": (env.VITE_VIDEO_GORILLA as string | undefined)?.trim(),
} as const;

export function videoUrl(filename: keyof typeof OVERRIDES): string {
  const override = OVERRIDES[filename];
  if (override) return override;
  // Same-origin paths — Worker proxies to R2 (mobile Safari-friendly). Local: public/videos/.
  return `/videos/${filename}`;
}

/** True when films are served from a remote CDN (not bundled in the repo). */
export function usesExternalVideos(): boolean {
  return Boolean(CDN_BASE || Object.values(OVERRIDES).some(Boolean));
}
