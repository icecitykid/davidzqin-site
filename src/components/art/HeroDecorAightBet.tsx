"use client";

import { useRef } from "react";
import { useParallax } from "@/hooks/useParallax";

/**
 * Floating chat-bubble decor for the AightBet hero — a callback to the
 * "problem" slide in the AightBet pitch deck where bettors trade
 * messages. Shapes are intentionally very low opacity so they read as
 * texture, not content.
 */
export function HeroDecorAightBet() {
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const cRef = useRef<HTMLDivElement>(null);

  useParallax(aRef, 0.35);
  useParallax(bRef, 0.55);
  useParallax(cRef, 0.4);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-dzq-fg-1"
    >
      {/* Large bubble, top-left, slow drift */}
      <div
        ref={aRef}
        className="absolute left-[5%] top-[10%] w-[240px] opacity-[0.08]"
      >
        <ChatBubble tail="left" />
      </div>

      {/* Mid bubble, top-right, fastest drift */}
      <div
        ref={bRef}
        className="absolute right-[7%] top-[26%] w-[190px] opacity-[0.07]"
      >
        <ChatBubble tail="right" />
      </div>

      {/* Small bubble, bottom-mid, mid drift */}
      <div
        ref={cRef}
        className="absolute bottom-[12%] left-[36%] w-[160px] opacity-[0.06]"
      >
        <ChatBubble tail="left" />
      </div>
    </div>
  );
}

function ChatBubble({ tail }: { tail: "left" | "right" }) {
  const tailPath =
    tail === "left"
      ? "M40,110 L60,110 L34,134 Z"
      : "M160,110 L140,110 L166,134 Z";
  return (
    <svg viewBox="0 0 200 134" className="h-auto w-full">
      <rect x="0" y="0" width="200" height="110" rx="22" fill="currentColor" />
      <path d={tailPath} fill="currentColor" />
    </svg>
  );
}
