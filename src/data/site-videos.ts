import { videoUrl } from "@/lib/video-url";

/** Brand films — MP4 URLs from R2 (VITE_VIDEO_CDN_BASE). See docs/EXTERNAL-VIDEOS.md */
const WATCH_FILM = "aardvark-raw-footage.mp4" as const;

export const SITE_VIDEOS = {
  /** Hero “Watch the Film” modal — raw brand footage */
  watchFilm: videoUrl(WATCH_FILM),
  watchFilmPoster: "/og-default.jpg",
  /** @deprecated Use watchFilm — kept for any legacy imports */
  featureFilm: videoUrl(WATCH_FILM),
  featureFilmPoster: "/og-default.jpg",
  /** Home hero background + About page reel (aardvark-wild.mp4 on R2) */
  wildReel: videoUrl("aardvark-wild.mp4"),
  wildReelPoster: "/og-default.jpg",
  /** Uganda gorilla encounter — Uganda destination */
  gorillaUganda: videoUrl("gorilla-uganda.mp4"),
  gorillaUgandaPoster: "/og-default.jpg",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEOS;
