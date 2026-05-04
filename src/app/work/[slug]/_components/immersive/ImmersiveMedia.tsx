"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CaseStudyImmersiveMedia } from "@/lib/case-studies";

type Props = {
  media: CaseStudyImmersiveMedia;
  /** Pass through to `next/image` for responsive sizing. */
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders an immersive scene media item. `<Image fill>` for images, `<video>`
 * with autoplay+muted+loop+playsinline for video, and a `prefers-reduced-motion`
 * guard that pauses video and shows the poster instead.
 */
export function ImmersiveMedia({ media, sizes, priority }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (media.type !== "video") return;
    const el = videoRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      el.removeAttribute("autoplay");
      el.pause();
    }
  }, [media.type]);

  const fitClass = media.objectFit === "contain" ? "object-contain" : "object-cover";

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className={`absolute inset-0 h-full w-full ${fitClass}`}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={fitClass}
    />
  );
}
