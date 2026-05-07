import type { CaseStudyImmersiveLearnings } from "@/lib/case-studies";
import { ReadMoreButton } from "./ReadMoreButton";

type Props = {
  id: string;
  learnings: CaseStudyImmersiveLearnings;
};

/**
 * Mirrors the Figma `Stats section` for AightBet (4148:2326). Unlike the
 * AthleteHQ stats grid this is just a left-column heading and a stack of
 * paragraph takeaways on the right, followed by a centered Read More
 * button. Layout columns mirror the intro section (1000fr / 197fr feel,
 * scaled to 418fr / 673fr per Figma) so it visually rhymes with the rest
 * of the case.
 */
export function ImmersiveLearnings({ id, learnings }: Props) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1334px] scroll-mt-[72px] p-[50px] md:py-[clamp(80px,10vw,160px)]"
    >
      <div className="flex flex-col gap-[clamp(64px,10vw,150px)]">
        <div className="grid grid-cols-1 items-start gap-dzq-space-9 md:grid-cols-[minmax(0,418fr)_minmax(0,673fr)] md:gap-[clamp(48px,9vw,128px)]">
          <h2 className="m-0 font-dzq-display text-[clamp(28px,3vw,36px)] font-dzq-medium leading-tight tracking-tight text-dzq-fg-1">
            {learnings.title}
          </h2>
          <ul className="m-0 flex list-none flex-col gap-[1em] p-0 text-[clamp(18px,2vw,24px)] leading-snug text-[#334155]">
            {learnings.paragraphs.map((para, i) => (
              <li key={i} className="m-0">
                {para}
              </li>
            ))}
          </ul>
        </div>

        {learnings.readMore && (
          <div className="flex w-full justify-center md:justify-start">
            <ReadMoreButton
              label={learnings.readMore.label}
              href={learnings.readMore.href}
            />
          </div>
        )}
      </div>
    </section>
  );
}
