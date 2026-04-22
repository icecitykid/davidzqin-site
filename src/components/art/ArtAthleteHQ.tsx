import Image from "next/image";

const SCREENS = [
  {
    src: "/assets/work/athletehq-landing.png",
    alt: "",
    width: 386,
    height: 766,
    left: 18,
    top: 95,
    radius: 20,
  },
  {
    src: "/assets/work/athletehq-profile-3.png",
    alt: "",
    width: 388,
    height: 766,
    left: 436,
    top: -51,
    radius: 20,
  },
  {
    src: "/assets/work/athletehq-profile-1-1.png",
    alt: "",
    width: 386,
    height: 766,
    left: 856,
    top: 95,
    radius: 20,
  },
] as const;

const CARD_W = 1664;
const CARD_H = 750;

/** Phone screenshot composition for the Nike AthleteHQ card (Figma 2026). */
export function ArtAthleteHQ() {
  return (
    <>
      {SCREENS.map((s) => (
        <div
          key={s.src}
          className="work-screen"
          style={{
            left: `${(s.left / CARD_W) * 100}%`,
            top: `${(s.top / CARD_H) * 100}%`,
            width: `${(s.width / CARD_W) * 100}%`,
            aspectRatio: `${s.width} / ${s.height}`,
            borderRadius: s.radius,
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="(max-width: 900px) 25vw, 400px"
            style={{ objectFit: "cover", borderRadius: s.radius }}
          />
        </div>
      ))}
      {/* 4th slot — Figma source was a video frame; placeholder rounded rect */}
      <div
        aria-hidden="true"
        className="work-screen work-screen--placeholder"
        style={{
          left: `${(1274 / CARD_W) * 100}%`,
          top: `${(-88 / CARD_H) * 100}%`,
          width: `${(369 / CARD_W) * 100}%`,
          aspectRatio: "369 / 803",
          borderRadius: 54,
        }}
      />
    </>
  );
}
