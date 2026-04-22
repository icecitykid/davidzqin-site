import Image from "next/image";

const SCREENS = [
  {
    src: "/assets/work/aightbet-bet-details.png",
    alt: "",
    width: 375,
    height: 812,
    left: 21,
    top: 103,
    radius: 0,
  },
  {
    src: "/assets/work/aightbet-home.png",
    alt: "",
    width: 374,
    height: 817,
    left: 436,
    top: -88,
    radius: 0,
  },
  {
    src: "/assets/work/aightbet-leaderboard.png",
    alt: "",
    width: 376,
    height: 817,
    left: 850,
    top: 103,
    radius: 20,
  },
] as const;

const CARD_W = 1664;
const CARD_H = 750;

/** Phone screenshot composition for the AightBet card (Figma 2026). */
export function ArtAightBet() {
  return (
    <>
      <div className="aightbet-mark" aria-hidden="true">
        AightBet
      </div>
      {SCREENS.map((s) => (
        <div
          key={s.src}
          className="work-screen work-screen--lifted"
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
            style={{
              objectFit: "cover",
              borderRadius: s.radius ? s.radius : undefined,
            }}
          />
        </div>
      ))}
      {/* 4th slot — Figma source had no image asset (video); placeholder */}
      <div
        aria-hidden="true"
        className="work-screen work-screen--placeholder work-screen--lifted"
        style={{
          left: `${(1266 / CARD_W) * 100}%`,
          top: `${(-85 / CARD_H) * 100}%`,
          width: `${(374 / CARD_W) * 100}%`,
          aspectRatio: "374 / 814",
          borderRadius: 20,
        }}
      />
    </>
  );
}
