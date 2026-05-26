import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/media/optimized-image";

export type MosaicPhoto = {
  src: string;
  alt: string;
};

const ROTATE_MS = 5000;
const FADE_MS = 900;

type IntroPhotoMosaicProps = {
  photos: MosaicPhoto[];
  /** Four starting indices into `photos` (one per cell). */
  layout: [number, number, number, number];
  aspects: [string, string, string, string];
};

function MosaicCell({
  photos,
  startIndex,
  aspectClass,
  staggerMs,
}: {
  photos: MosaicPhoto[];
  startIndex: number;
  aspectClass: string;
  staggerMs: number;
}) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (photos.length < 2) return;
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % photos.length);
      }, ROTATE_MS);
    }, staggerMs);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [photos.length, staggerMs]);

  return (
    <div className={`image-zoom ${aspectClass} gold-border-glow relative overflow-hidden`}>
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className="intro-mosaic__slide absolute inset-0"
          style={{
            opacity: i === index ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          <OptimizedImage src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

/** Four-up mosaic under the hero — each cell crossfades through the photo pool. */
export function IntroPhotoMosaic({ photos, layout, aspects }: IntroPhotoMosaicProps) {
  if (photos.length === 0) return null;

  const cells: { startIndex: number; aspect: string; staggerMs: number }[] = [
    { startIndex: layout[0], aspect: aspects[0], staggerMs: 0 },
    { startIndex: layout[1], aspect: aspects[1], staggerMs: 800 },
    { startIndex: layout[2], aspect: aspects[2], staggerMs: 1600 },
    { startIndex: layout[3], aspect: aspects[3], staggerMs: 2400 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <MosaicCell photos={photos} startIndex={cells[0].startIndex} aspectClass={cells[0].aspect} staggerMs={cells[0].staggerMs} />
        <MosaicCell photos={photos} startIndex={cells[1].startIndex} aspectClass={cells[1].aspect} staggerMs={cells[1].staggerMs} />
      </div>
      <div className="space-y-4 md:pt-12">
        <MosaicCell photos={photos} startIndex={cells[2].startIndex} aspectClass={cells[2].aspect} staggerMs={cells[2].staggerMs} />
        <MosaicCell photos={photos} startIndex={cells[3].startIndex} aspectClass={cells[3].aspect} staggerMs={cells[3].staggerMs} />
      </div>
    </div>
  );
}
