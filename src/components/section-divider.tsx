import { motion } from "framer-motion";

type Variant = "tracks" | "beads" | "dots";
type Tone = "light" | "dark";

/**
 * Safari-inspired section dividers.
 * - `tracks`: animal paw prints walking across the page
 * - `beads`:  Maasai-style beaded line
 * - `dots`:   minimal three-dot rhythm
 */
export function SectionDivider({
  variant = "tracks",
  tone = "light",
  className = "",
}: {
  variant?: Variant;
  tone?: Tone;
  className?: string;
}) {
  const lineColor = tone === "dark" ? "via-bone/25" : "via-ink/15";

  return (
    <div
      role="separator"
      aria-hidden
      className={`relative mx-auto flex w-full max-w-[1400px] items-center justify-center px-6 py-8 sm:py-12 ${className}`}
    >
      {variant === "tracks" && <Tracks lineColor={lineColor} />}
      {variant === "beads" && <Beads lineColor={lineColor} />}
      {variant === "dots" && <Dots />}
    </div>
  );
}

function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <ellipse cx="12" cy="16" rx="5" ry="4.2" />
      <ellipse cx="5.5" cy="10" rx="2.2" ry="2.8" />
      <ellipse cx="18.5" cy="10" rx="2.2" ry="2.8" />
      <ellipse cx="9" cy="5.5" rx="1.8" ry="2.4" />
      <ellipse cx="15" cy="5.5" rx="1.8" ry="2.4" />
    </svg>
  );
}

function Tracks({ lineColor: _lineColor }: { lineColor: string }) {
  void _lineColor;
  const paws = Array.from({ length: 28 });
  return (
    <motion.div
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04 } },
      }}
      className="flex w-full items-center justify-between gap-2 sm:gap-3"
    >
      {paws.map((_, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 6, scale: 0.8 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="text-gold shrink-0"
          style={{ transform: `rotate(${i % 2 === 0 ? -10 : 10}deg)` }}
        >
          <Paw className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-80" />
        </motion.span>
      ))}
    </motion.div>
  );
}

function Beads({ lineColor: _lineColor }: { lineColor: string }) {
  void _lineColor;
  const palette = ["bg-coral", "bg-gold", "bg-ink", "bg-moss", "bg-gold-soft"];
  const beads = Array.from({ length: 60 });
  return (
    <motion.div
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.015 } },
      }}
      className="flex w-full items-center justify-between gap-1"
    >
      {beads.map((_, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
          }}
          className={`${palette[i % palette.length]} h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full ring-1 ring-ink/10`}
        />
      ))}
    </motion.div>
  );
}

function Dots() {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <span className="h-1 w-1 rounded-full bg-gold opacity-50" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="h-1 w-1 rounded-full bg-gold opacity-50" />
    </motion.div>
  );
}
