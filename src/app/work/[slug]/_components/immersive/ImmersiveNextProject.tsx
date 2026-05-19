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
 * full-bleed wordmark — or a text headline when no logo asset is provided
 * (AightBet → Shopify reads as plain text in Figma 4148:2353).
 */
export function ImmersiveNextProject({ currentSlug, next }: Props) {
  if (CASE_SLUGS.length < 2) return null;
  const idx = CASE_SLUGS.indexOf(currentSlug);
  if (idx === -1) return null;
  const nextSlug = CASE_SLUGS[(idx + 1) % CASE_SLUGS.length];
  if (nextSlug === currentSlug) return null;

  const ariaLabelTarget = next.headline ?? next.logoAlt ?? "next case study";

  return (
    <section
      id="next-project"
      className="w-full bg-black"
      style={{
        paddingBlock: "calc(var(--dzq-space-10) + 150px)",
      }}
    >
      <Link
        href={workHref(nextSlug)}
        aria-label={`Next project: ${ariaLabelTarget}`}
        className="group mx-auto flex w-full max-w-dzq-content flex-col items-center gap-dzq-space-7 px-dzq-space-6 text-center"
      >
        <p className="m-0 text-[18px] font-dzq-medium leading-none text-slate-400">
          {next.eyebrow ?? "Next project"}
        </p>
        {next.logoSrc ? (
          <Image
            src={next.logoSrc}
            alt={next.logoAlt ?? ""}
            width={next.logoWidth ?? 854}
            height={next.logoHeight ?? 145}
            className="h-auto w-full max-w-[854px] transition-transform duration-dzq-med ease-dzq-out group-hover:scale-[1.02]"
            quality={95}
            priority={false}
          />
        ) : (
          <p className="m-0 max-w-[854px] font-dzq-display text-[clamp(28px,5vw,48px)] font-dzq-medium leading-tight tracking-tight text-white transition-transform duration-dzq-med ease-dzq-out group-hover:scale-[1.02]">
            {next.headline}
          </p>
        )}
      </Link>
    </section>
  );
}
