import Image from "next/image";
import Link from "next/link";
import type { CaseStudyImmersiveNextProject } from "@/lib/case-studies";
import {
  CASE_SLUGS,
  type CaseSlug,
  workHref,
} from "@/lib/work";

type Props = {
  currentSlug: CaseSlug;
  next: CaseStudyImmersiveNextProject;
};

/**
 * Mirrors the Figma `Next project` row (4138:1554): centered eyebrow + a
 * full-bleed wordmark for the next case in `CASE_SLUGS` order.
 */
export function ImmersiveNextProject({ currentSlug, next }: Props) {
  if (CASE_SLUGS.length < 2) return null;
  const idx = CASE_SLUGS.indexOf(currentSlug);
  if (idx === -1) return null;
  const nextSlug = CASE_SLUGS[(idx + 1) % CASE_SLUGS.length];
  if (nextSlug === currentSlug) return null;

  return (
    <section
      id="next-project"
      className="mx-auto w-full max-w-dzq-content px-dzq-space-6 py-dzq-space-10"
    >
      <Link
        href={workHref(nextSlug)}
        aria-label={`Next project: ${next.logoAlt}`}
        className="group flex flex-col items-center gap-dzq-space-7 text-center"
      >
        <p className="m-0 text-[18px] font-dzq-medium leading-none text-[#64748B]">
          {next.eyebrow ?? "Next project"}
        </p>
        <Image
          src={next.logoSrc}
          alt={next.logoAlt}
          width={next.logoWidth}
          height={next.logoHeight}
          className="h-auto w-full max-w-[854px] transition-transform duration-dzq-med ease-dzq-out group-hover:scale-[1.02]"
          priority={false}
        />
      </Link>
    </section>
  );
}
