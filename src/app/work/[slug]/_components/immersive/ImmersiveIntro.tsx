import type { CaseStudyImmersiveIntro } from "@/lib/case-studies";
import { ReadMoreButton } from "./ReadMoreButton";

type Props = {
  id: string;
  intro: CaseStudyImmersiveIntro;
};

/**
 * Mirrors the Figma `Intro section` (4144:1003):
 * - Container max-w 1410px, content side-by-side at md+ (1000fr / 197fr)
 * - Title: 48px medium, leading-tight
 * - Body: 24px regular, slate-700, blank-line separated paragraphs
 * - Right column: "Role" / "Company" labels at 18px slate-500 (NOT uppercase),
 *   list items at 24px black
 *
 * The intro body is split on blank lines into paragraphs so the Figma's
 * two-paragraph rhythm is preserved.
 */
export function ImmersiveIntro({ id, intro }: Props) {
  const paragraphs = intro.subtitle.split(/\n{2,}/).filter(Boolean);

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1410px] scroll-mt-[72px] px-dzq-space-6 py-[clamp(80px,12vw,249px)]"
    >
      <div className="grid grid-cols-1 items-start gap-dzq-space-9 md:grid-cols-[minmax(0,1000fr)_minmax(180px,197fr)] md:gap-[clamp(48px,12vw,205px)]">
        <div className="flex flex-col gap-[clamp(40px,6vw,128px)]">
          <h2 className="m-0 max-w-[1000px] font-dzq-display text-[clamp(32px,5vw,48px)] font-dzq-medium leading-tight tracking-tight text-dzq-fg-1">
            {intro.title}
          </h2>
          <div className="m-0 flex max-w-[1000px] flex-col gap-[1em] text-[clamp(18px,2vw,24px)] leading-snug text-[#334155]">
            {paragraphs.map((para, i) => (
              <p key={i} className="m-0">
                {para}
              </p>
            ))}
          </div>
          {intro.readMore && (
            <div className="mt-dzq-space-2">
              <ReadMoreButton
                label={intro.readMore.label}
                href={intro.readMore.href}
              />
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-[clamp(40px,5vw,64px)]">
          {intro.role.length > 0 && (
            <div className="flex flex-col gap-dzq-space-5">
              <p className="m-0 text-[18px] font-dzq-medium leading-none text-[#64748B]">
                Role
              </p>
              <ul className="m-0 flex list-none flex-col gap-dzq-space-2 p-0 text-[clamp(18px,2vw,24px)] leading-snug text-dzq-fg-1">
                {intro.role.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {intro.company && (
            <div className="flex flex-col gap-dzq-space-5">
              <p className="m-0 text-[18px] font-dzq-medium leading-none text-[#64748B]">
                Company
              </p>
              <p className="m-0 text-[clamp(18px,2vw,24px)] leading-snug text-dzq-fg-1">
                {intro.company}
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
