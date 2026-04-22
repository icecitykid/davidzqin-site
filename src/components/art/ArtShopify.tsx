import Image from "next/image";

const CARD_W = 1664;
const CARD_H = 750;
const IMG_W = 1808;
const IMG_H = 1285;
const LEFT = -51;
const TOP = -1;

/** Single large Modular UI screenshot for the Shopify card (Figma 2026). */
export function ArtShopify() {
  return (
    <div
      className="work-screen work-screen--flat"
      style={{
        left: `${(LEFT / CARD_W) * 100}%`,
        top: `${(TOP / CARD_H) * 100}%`,
        width: `${(IMG_W / CARD_W) * 100}%`,
        aspectRatio: `${IMG_W} / ${IMG_H}`,
        borderRadius: 10,
      }}
    >
      <Image
        src="/assets/work/shopify-modular-ui.png"
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 1808px"
        style={{ objectFit: "cover", borderRadius: 10 }}
      />
    </div>
  );
}
