type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** LCP / hero images */
  priority?: boolean;
  /** Responsive hint, e.g. "(max-width: 768px) 100vw, 50vw" */
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Performance-minded img wrapper: lazy loading, async decode, optional priority, dimensions for CLS.
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  width,
  height,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
    />
  );
}
