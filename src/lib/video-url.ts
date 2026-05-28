/**
 * Brand film URLs — MP4s on Cloudflare R2, not in the Worker bundle.
 *
 * - `videoUrl()` returns same-origin `/videos/{file}` (Worker proxies to R2; Safari-friendly).
 * - `getVideoUpstreamBase()` is the R2 public origin used by the proxy and for env checks.
 *
 * Set `VITE_VIDEO_CDN_BASE` at **build time** (Cloudflare → Settings → Variables).
 * Local dev: `VITE_USE_LOCAL_VIDEOS=true` serves `public/videos/*.mp4` via Vite instead of R2.
 */

/** R2 custom domain — fallback when `VITE_VIDEO_CDN_BASE` is unset at build. */
export const DEFAULT_VIDEO_CDN = "https://media.aardvarktanzania.com";

const env = import.meta.env ?? {};

/** Set `VITE_USE_LOCAL_VIDEOS=true` to use `public/videos/*.mp4` in dev. */
const USE_LOCAL_VIDEOS = env.VITE_USE_LOCAL_VIDEOS === "true";

const OVERRIDES = {
  /** Home hero background — short web-optimized loop on R2 (full reel: aardvark-wild.mp4). */
  "aardvark-hero.mp4": (env.VITE_VIDEO_HERO as string | undefined)?.trim(),
  /** Home “Watch the Film” modal only — do not alias to VITE_VIDEO_FEATURE_FILM (may point at another clip). */
  "aardvark-raw-footage.mp4": (env.VITE_VIDEO_RAW_FOOTAGE as string | undefined)?.trim(),
  "aardvark-film.mp4": (env.VITE_VIDEO_FEATURE_FILM as string | undefined)?.trim(),
  "aardvark-wild.mp4": (env.VITE_VIDEO_WILD_REEL as string | undefined)?.trim(),
  "gorilla-uganda.mp4": (env.VITE_VIDEO_GORILLA as string | undefined)?.trim(),
} as const;

/** R2 / r2.dev public origin — used by `video-proxy.ts` and deploy checks. */
export function getVideoUpstreamBase(): string {
  const fromEnv = (env.VITE_VIDEO_CDN_BASE as string | undefined)?.trim();
  const base = fromEnv || (!USE_LOCAL_VIDEOS ? DEFAULT_VIDEO_CDN : "");
  const trimmed = base.replace(/\/$/, "");
  return trimmed || DEFAULT_VIDEO_CDN;
}

/** Same-origin path proxied to `{getVideoUpstreamBase()}/videos/{filename}` in production. */
export function videoUrl(filename: keyof typeof OVERRIDES): string {
  const override = OVERRIDES[filename];
  if (override) return override;
  // Keep /videos/* so the Worker can proxy Range requests (mobile Safari).
  return `/videos/${filename}`;
}

/** True when films are served from R2 / overrides (not only from `public/videos/`). */
export function usesExternalVideos(): boolean {
  return !USE_LOCAL_VIDEOS || Object.values(OVERRIDES).some(Boolean);
}
