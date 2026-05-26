import { useEffect, useRef, useState } from "react";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { isYouTubeSource } from "@/lib/youtube";

type HeroVideoBackgroundProps = {
  src: string;
  poster?: string;
  /** When true, show poster only (reduced motion / save data). */
  paused?: boolean;
  onVideoError?: () => void;
};

/**
 * Full-bleed hero background — MP4 file or YouTube URL (via env override).
 * Falls back to poster image when the video fails to load (common in production without CDN env).
 */
export function HeroVideoBackground({ src, poster, paused = false, onVideoError }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const useYouTube = isYouTubeSource(src);
  const [failed, setFailed] = useState(false);
  const fallbackImage = poster;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (useYouTube || paused || failed) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      /* Autoplay may be blocked until user interaction */
    });
  }, [paused, src, useYouTube, failed]);

  if ((paused || failed) && fallbackImage) {
    return (
      <img
        src={fallbackImage}
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
      poster={fallbackImage}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="h-full w-full object-cover object-[center_38%] md:object-center"
      aria-hidden
      onError={() => {
        setFailed(true);
        onVideoError?.();
      }}
    />
  );
}
