import { useEffect, useState } from "react";
import { imageFallback } from "@/data/destination-images";

type OptimizedImageProps = {
  src: string | undefined;
  alt: string;
  className?: string;
  /** LCP / hero images */
  priority?: boolean;
  /** Responsive hint, e.g. "(max-width: 768px) 100vw, 50vw" */
  sizes?: string;
  width?: number;
  height?: number;
  /** Override default fallback when src fails */
  fallbackSrc?: string;
};

/**
 * Performance-minded img wrapper: lazy loading, async decode, optional priority, dimensions for CLS.
 * Always resolves to a visible image — falls back on missing src or load errors.
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  width,
  height,
  fallbackSrc = imageFallback,
}: OptimizedImageProps) {
  const safeSrc = src || fallbackSrc;
  const [resolvedSrc, setResolvedSrc] = useState(safeSrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setResolvedSrc(src || fallbackSrc);
    setFailed(false);
  }, [src, fallbackSrc]);

  const displaySrc = failed ? fallbackSrc : resolvedSrc || fallbackSrc;

  return (
    <img
      src={displaySrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setResolvedSrc(fallbackSrc);
        }
      }}
    />
  );
}
