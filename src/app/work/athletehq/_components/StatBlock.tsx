'use client';

import { useEffect, useRef, useState } from 'react';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export type StatBlockProps = {
  endValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Static word(s) rendered after the animated value (e.g. "complete"). */
  trailingText?: string;
  descriptor: string;
  /** Counter animation duration in ms. */
  duration?: number;
  /** When this flips true, the counter + descriptor reveal run. */
  start: boolean;
};

export function StatBlock({
  endValue,
  decimals = 0,
  prefix = '',
  suffix = '',
  trailingText,
  descriptor,
  duration = 1500,
  start,
}: StatBlockProps) {
  const frameRef = useRef<number | null>(null);
  const descTimerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);
  const [descriptorVisible, setDescriptorVisible] = useState(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      setDisplayValue(endValue);
      setDescriptorVisible(true);
      return;
    }

    descTimerRef.current = window.setTimeout(() => {
      setDescriptorVisible(true);
    }, 100);

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplayValue(easeOutQuart(progress) * endValue);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (descTimerRef.current !== null) clearTimeout(descTimerRef.current);
    };
  }, [start, endValue, duration]);

  const formatted = displayValue.toFixed(decimals);
  const accessibleValue = `${prefix}${endValue.toFixed(decimals)}${suffix}${
    trailingText ? ` ${trailingText}` : ''
  }`;

  return (
    <div className="flex flex-col gap-dzq-space-3">
      <p
        className="m-0 font-dzq-display text-dzq-3xl font-dzq-medium leading-none tracking-tight text-dzq-fg-1 tabular-nums"
        aria-label={accessibleValue}
      >
        <span aria-hidden="true">
          {prefix}
          {formatted}
          {suffix}
          {trailingText ? <> {trailingText}</> : null}
        </span>
      </p>

      <p
        className={`m-0 text-dzq-md font-dzq-medium text-dzq-fg-2 transition-opacity duration-dzq-slow ease-dzq-out ${
          descriptorVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {descriptor}
      </p>
    </div>
  );
}
