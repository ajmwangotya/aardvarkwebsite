/**
 * Resolve brand film URLs from env (CDN) or local /public/videos for dev.
 *
 * Production: set VITE_VIDEO_CDN_BASE (and optional per-file overrides) in Vercel / Cloudflare.
 * Overrides may be a full MP4 URL or a YouTube watch link — see docs/EXTERNAL-VIDEOS.md.
 * Local: leave unset — videos load from public/videos/*.mp4 on disk.
 */

/** Public media CDN (R2 custom domain) — films at /videos/*.mp4 (see docs/EXTERNAL-VIDEOS.md). */
const PRODUCTION_VIDEO_CDN = "https://media.aardvarktanzania.com";

const env = import.meta.env ?? {};

/** Set VITE_USE_LOCAL_VIDEOS=true to force /public/videos/*.mp4 in dev (files not in Git). */
const USE_LOCAL_VIDEOS = env.VITE_USE_LOCAL_VIDEOS === "true";

const CDN_BASE = (
  (env.VITE_VIDEO_CDN_BASE as string | undefined)?.trim() ||
  (!USE_LOCAL_VIDEOS ? PRODUCTION_VIDEO_CDN : "")
).replace(/\/$/, "") || undefined;

const OVERRIDES = {
  /** Home “Watch the Film” modal only — do not alias to VITE_VIDEO_FEATURE_FILM (may point at another clip). */
  "aardvark-raw-footage.mp4": (env.VITE_VIDEO_RAW_FOOTAGE as string | undefined)?.trim(),
  "aardvark-film.mp4": (env.VITE_VIDEO_FEATURE_FILM as string | undefined)?.trim(),
  "aardvark-wild.mp4": (env.VITE_VIDEO_WILD_REEL as string | undefined)?.trim(),
  "gorilla-uganda.mp4": (env.VITE_VIDEO_GORILLA as string | undefined)?.trim(),
} as const;

export function videoUrl(filename: keyof typeof OVERRIDES): string {
  const override = OVERRIDES[filename];
  if (override) return override;
  if (CDN_BASE) return `${CDN_BASE}/videos/${filename}`;
  // No CDN configured — use files in public/videos/ (local dev or self-hosted prod)
  return `/videos/${filename}`;
}

/** True when films are served from a remote CDN (not bundled in the repo). */
export function usesExternalVideos(): boolean {
  return Boolean(CDN_BASE || Object.values(OVERRIDES).some(Boolean));
}
