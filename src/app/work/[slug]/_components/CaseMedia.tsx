"use client";

import Image from "next/image";
import type { CaseStudyMedia } from "@/lib/case-studies";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  media: CaseStudyMedia;
  /** Mark hero media to short-circuit Next/Image LCP optimisation. */
  priority?: boolean;
  /** Forwarded to next/image; defaults to a single full-bleed slot. */
  sizes?: string;
};

/**
 * Renders a single media item (image or video) inside a relatively-positioned
 * parent that defines the aspect ratio. Handles `prefers-reduced-motion` by
 * suppressing video autoplay + preload.
 */
export function CaseMedia({ media, priority, sizes }: Props) {
  const reducedMotion = useReducedMotion();

  if (!media.src) return null;

  if (media.type === "video") {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={media.src}
        poster={media.poster}
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload={reducedMotion ? "none" : "metadata"}
        aria-label={media.alt || undefined}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      sizes={sizes ?? "100vw"}
      quality={95}
      className="object-cover"
    />
  );
}
