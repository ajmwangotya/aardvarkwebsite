import { cn } from "@/lib/utils";
import { youtubeEmbedUrl } from "@/lib/youtube";

type YouTubeEmbedProps = {
  src: string;
  title: string;
  /** Cover the container (hero background). Scales iframe larger than box. */
  cover?: boolean;
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
};

export function YouTubeEmbed({
  src,
  title,
  cover = false,
  autoplay = false,
  mute = false,
  loop = false,
  controls = true,
  className,
}: YouTubeEmbedProps) {
  const embedSrc = youtubeEmbedUrl(src, { autoplay, mute, loop, controls: controls ? true : false });

  if (!embedSrc) return null;

  if (cover) {
    return (
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute top-1/2 left-1/2 h-[300%] w-[300%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>
    );
  }

  return (
    <iframe
      src={embedSrc}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      className={cn("h-full w-full border-0", className)}
    />
  );
}
