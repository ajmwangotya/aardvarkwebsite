import { videoUrl } from "@/lib/video-url";

/** Brand films — URLs from CDN env in production, /public/videos locally. See docs/EXTERNAL-VIDEOS.md */
export const SITE_VIDEOS = {
  /** Hero “Watch the Film” modal — Aardvark raw footage */
  featureFilm: videoUrl("aardvark-raw-footage.mp4"),
  featureFilmPoster: "/og-default.jpg",
  /** Brand / field reel — About page */
  wildReel: videoUrl("aardvark-wild.mp4"),
  wildReelPoster: "/og-default.jpg",
  /** Uganda gorilla encounter — Uganda destination */
  gorillaUganda: videoUrl("gorilla-uganda.mp4"),
  gorillaUgandaPoster: "/og-default.jpg",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEOS;
