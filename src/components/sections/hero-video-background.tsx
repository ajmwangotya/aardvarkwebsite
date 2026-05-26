import { useEffect, useRef } from "react";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { isYouTubeSource } from "@/lib/youtube";

type HeroVideoBackgroundProps = {
  src: string;
  poster?: string;
  /** When true, show poster only (reduced motion / save data). */
  paused?: boolean;
};

/**
 * Full-bleed hero background — MP4 file or YouTube URL (via env override).
 */
export function HeroVideoBackground({ src, poster, paused = false }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const useYouTube = isYouTubeSource(src);

  useEffect(() => {
    if (useYouTube || paused) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      /* Autoplay may be blocked until user interaction */
    });
  }, [paused, src, useYouTube]);

  if (paused && poster) {
    return (
      <img
        src={poster}
        alt=""
        className="h-full w-full object-cover object-[center_38%] md:object-center"
        aria-hidden
      />
    );
  }

  if (useYouTube) {
    return (
      <YouTubeEmbed
        src={src}
        title="Aardvark Safaris — hero film"
        cover
        autoplay
        mute
        loop
        controls={false}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="h-full w-full object-cover object-[center_38%] md:object-center"
      aria-hidden
    />
  );
}
