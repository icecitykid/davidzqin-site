import Image from "next/image";

/** Selected-work cover — single banner asset fills the 1664×750 card frame. */
export function ArtAightBet() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/assets/aightbet-cover.png"
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, min(1536px, 95vw)"
        className="object-cover"
      />
    </div>
  );
}
