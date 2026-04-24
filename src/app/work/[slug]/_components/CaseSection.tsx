import type { CaseStudySection } from "@/lib/case-studies";
import { CaseMedia } from "./CaseMedia";

export function CaseSection({ section }: { section: CaseStudySection }) {
  const hasText = Boolean(
    section.kicker || section.punchline || section.paragraph,
  );
  const mediaItems = section.media.filter((m) => m.src.length > 0);

  if (!hasText && mediaItems.length === 0) return null;

  const mediaCount = Math.min(mediaItems.length, 3);

  return (
    <section className="mx-auto w-full max-w-dzq-content">
      {hasText && (
        <div className="grid gap-dzq-space-7 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:gap-dzq-space-10">
          <div className="flex flex-col gap-dzq-space-5">
            {section.kicker && (
              <p className="m-0 text-dzq-sm font-dzq-medium uppercase tracking-[0.18em] text-dzq-fg-2">
                {section.kicker}
              </p>
            )}
            {section.punchline && (
              <h2 className="m-0 font-dzq-display text-dzq-2xl font-dzq-medium leading-tight tracking-tight text-dzq-fg-1">
                {section.punchline}
              </h2>
            )}
          </div>

          {section.paragraph && (
            <p className="m-0 max-w-[68ch] text-dzq-lg leading-snug text-dzq-ink">
              {section.paragraph}
            </p>
          )}
        </div>
      )}

      {mediaCount > 0 && (
        <div
          className="mt-dzq-space-8 grid gap-dzq-space-5"
          style={{
            gridTemplateColumns: `repeat(${mediaCount}, minmax(0, 1fr))`,
          }}
        >
          {mediaItems.map((media, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] overflow-hidden rounded-dzq-radius-md bg-dzq-bg-card"
            >
              <CaseMedia
                media={media}
                sizes={
                  mediaCount === 1
                    ? "(max-width: 900px) 100vw, 1664px"
                    : "(max-width: 900px) 100vw, 33vw"
                }
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
