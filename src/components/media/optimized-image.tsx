import { useEffect, useState } from "react";
import { imageFallback } from "@/data/destination-images";
import { preloadImage } from "@/lib/preload-image";

type OptimizedImageProps = {
  src: string | undefined;
  alt: string;
  className?: string;
  /** LCP / hero images — eager load, high priority, sync decode */
  priority?: boolean;
  /** Skip download until visible (slideshow off-screen slides) */
  hidden?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
};

export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  hidden = false,
  sizes,
  width,
  height,
  fallbackSrc = imageFallback,
}: OptimizedImageProps) {
  const safeSrc = hidden ? undefined : src || fallbackSrc;
  const [resolvedSrc, setResolvedSrc] = useState(safeSrc);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (hidden) {
      setLoaded(false);
      return;
    }
    const next = src || fallbackSrc;
    setResolvedSrc(next);
    setFailed(false);
    setLoaded(false);
    if (priority && next) preloadImage(next);
  }, [src, fallbackSrc, hidden, priority]);

  const displaySrc = hidden ? undefined : failed ? fallbackSrc : resolvedSrc || fallbackSrc;

  if (!displaySrc) {
    return <div className={className} aria-hidden />;
  }

  return (
    <img
      src={displaySrc}
      alt={alt}
      className={`${className}${!priority && !loaded ? " opacity-0" : ""} transition-opacity duration-200`}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setResolvedSrc(fallbackSrc);
          setLoaded(true);
        }
      }}
    />
  );
}
