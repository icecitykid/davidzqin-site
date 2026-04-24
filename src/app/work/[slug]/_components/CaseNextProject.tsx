import Link from "next/link";
import {
  CASE_SLUGS,
  type CaseSlug,
  getCaseStudyTitle,
  workHref,
} from "@/lib/work";

export function CaseNextProject({ currentSlug }: { currentSlug: CaseSlug }) {
  if (CASE_SLUGS.length < 2) return null;

  const idx = CASE_SLUGS.indexOf(currentSlug);
  if (idx === -1) return null;

  const nextSlug = CASE_SLUGS[(idx + 1) % CASE_SLUGS.length];
  if (nextSlug === currentSlug) return null;

  return (
    <section className="mx-auto w-full max-w-dzq-content border-t border-dzq-border pt-dzq-space-7">
      <Link
        href={workHref(nextSlug)}
        className="group flex items-baseline justify-between gap-dzq-space-5"
      >
        <div>
          <p className="m-0 text-dzq-md font-dzq-medium text-dzq-fg-2">
            Next project
          </p>
          <p className="m-0 mt-dzq-space-3 font-dzq-display text-dzq-2xl font-dzq-medium tracking-tight text-dzq-fg-1 transition-colors group-hover:text-dzq-fg-2">
            {getCaseStudyTitle(nextSlug)}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="text-dzq-2xl text-dzq-fg-1 transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </section>
  );
}
