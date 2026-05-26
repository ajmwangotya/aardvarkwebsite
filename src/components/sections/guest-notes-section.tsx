import { PenLine } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { GUEST_NOTES } from "@/data/guest-notes";
import { Reveal } from "@/components/motion";

export function GuestNotesSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-bone" aria-labelledby="guest-notes-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 27px, color-mix(in oklab, var(--ink) 6%, transparent) 28px)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-36">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{t("guestNotes.eyebrow")}</span>
            <h2
              id="guest-notes-heading"
              className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.1] sm:mt-6"
            >
              <Trans i18nKey="guestNotes.title" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <span className="gold-rule mx-auto mt-8" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("guestNotes.desc")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {GUEST_NOTES.map((note, i) => (
            <article
              key={note.id}
              className={`guest-note-paper group relative flex flex-col ${i === 2 ? "lg:mt-8" : ""} ${i === 4 ? "lg:-mt-6" : ""}`}
              style={{ transform: `rotate(${note.rotation ?? 0}deg)` }}
            >
              {note.scanImage ? (
                <div className="relative overflow-hidden rounded-sm border border-ink/10 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)]">
                  <img
                    src={note.scanImage}
                    alt={`Handwritten guest note from ${note.attribution}`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
                    <p className="font-hand text-lg text-bone">{note.attribution}</p>
                    {note.trip && (
                      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-bone/70">{note.trip}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="guest-note-paper__sheet">
                  <div className="guest-note-paper__content">
                    <PenLine
                      className="h-5 w-5 text-gold/55"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <blockquote className="guest-note-paper__quote mt-4 flex-1 font-hand text-[1.05rem] text-ink/88 sm:mt-5 sm:text-[1.15rem]">
                      &ldquo;{note.quote}&rdquo;
                    </blockquote>
                    <footer className="guest-note-paper__footer">
                      <cite className="not-italic">
                        <span className="font-serif text-[1.05rem] text-ink">{note.attribution}</span>
                        {note.location && (
                          <span className="mt-1.5 block text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                            {note.location}
                          </span>
                        )}
                      </cite>
                      <div className="guest-note-paper__meta">
                        {note.trip && <span>{note.trip}</span>}
                        {note.date && <span>{note.date}</span>}
                      </div>
                    </footer>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {t("guestNotes.footer")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
