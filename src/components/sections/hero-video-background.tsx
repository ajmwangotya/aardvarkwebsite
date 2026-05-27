import { useCallback, useEffect, useRef, useState } from "react";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { isYouTubeSource } from "@/lib/youtube";
import { preloadImage } from "@/lib/preload-image";

type HeroVideoBackgroundProps = {
  src: string;
  poster?: string;
  paused?: boolean;
  onVideoError?: () => void;
};

function canShowFirstFrame(el: HTMLVideoElement) {
  return el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

export function HeroVideoBackground({ src, poster, paused = false, onVideoError }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const useYouTube = isYouTubeSource(src);
  const [failed, setFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const fallbackImage = poster;

  useEffect(() => {
    setFailed(false);
    setVideoReady(false);
  }, [src]);

  useEffect(() => {
    if (fallbackImage) preloadImage(fallbackImage);
  }, [fallbackImage]);

  const markReady = useCallback(() => {
    const el = videoRef.current;
    if (!el || !canShowFirstFrame(el)) return;
    setVideoReady(true);
  }, []);

  const tryPlay = useCallback(() => {
    if (useYouTube || paused || failed) return;
    const el = videoRef.current;
    if (!el) return;
    markReady();
    void el.play().catch(() => {
      // Autoplay can fail until enough data is buffered — retry on canplay.
    });
  }, [paused, useYouTube, failed, markReady]);

  useEffect(() => {
    tryPlay();
  }, [tryPlay, src]);

  if ((paused || failed) && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt=""
        className="h-full w-full object-cover object-[center_38%] md:object-center"
        decoding="sync"
        fetchPriority="high"
        loading="eager"
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
    <div className="absolute inset-0">
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-[center_38%] transition-opacity duration-500 md:object-center ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
          decoding="sync"
          fetchPriority="high"
          loading="eager"
          aria-hidden
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={fallbackImage}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        data-video-fill
        className={`absolute inset-0 h-full w-full object-cover object-[center_38%] transition-opacity duration-500 md:object-center ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
        onLoadedMetadata={() => {
          markReady();
          tryPlay();
        }}
        onLoadedData={() => {
          markReady();
          tryPlay();
        }}
        onCanPlay={() => {
          markReady();
          tryPlay();
        }}
        onPlaying={() => setVideoReady(true)}
        onError={() => {
          setFailed(true);
          onVideoError?.();
        }}
      />
    </div>
  );
}
