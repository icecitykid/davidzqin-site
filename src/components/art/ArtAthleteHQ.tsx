import Image from "next/image";

/** Selected-work cover — single banner asset fills the 1664×750 card frame. */
export function ArtAthleteHQ() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/assets/athletehq-cover.png"
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, min(1536px, 95vw)"
        className="object-cover"
        priority
      />
    </div>
  );
}
