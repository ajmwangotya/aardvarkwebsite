import { useEffect, useRef, useState } from "react";
import { useMutedAutoplay } from "@/lib/use-muted-autoplay";
import { preloadImage } from "@/lib/preload-image";

type HeroVideoBackgroundProps = {
  /** MP4 URL — typically same-origin /videos/* (proxied to R2 in production). */
  src: string;
  poster?: string;
  paused?: boolean;
};

/** Hero background — SSR <video> + muted autoplay (iOS/Safari-friendly retries). */
export function HeroVideoBackground({ src, poster, paused = false }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { tryPlay } = useMutedAutoplay(videoRef, src, { paused, enabled: !failed });

  useEffect(() => {
    if (poster) preloadImage(poster);
  }, [poster]);

  useEffect(() => {
    setFailed(false);
    setPlaying(false);
  }, [src]);

  if (paused || failed) {
    return poster ? (
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_38%] md:object-center"
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        aria-hidden
      />
    ) : null;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={playing ? undefined : poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      data-video-fill
      className="absolute inset-0 z-0 h-full w-full object-cover object-[center_38%] md:object-center"
      aria-hidden
      onLoadedData={() => void tryPlay()}
      onCanPlay={() => void tryPlay()}
      onPlaying={() => setPlaying(true)}
      onError={() => setFailed(true)}
    />
  );
}
