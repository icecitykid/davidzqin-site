'use client';

import { useEffect, useRef, useState } from 'react';
import { StatBlock, type StatBlockProps } from './StatBlock';

type StatConfig = Omit<StatBlockProps, 'start'>;

const STATS: StatConfig[] = [
  {
    endValue: 3,
    decimals: 0,
    suffix: ' min',
    descriptor: 'Time to Onboard',
  },
  {
    endValue: 100,
    decimals: 0,
    suffix: '%',
    trailingText: 'complete',
    descriptor: 'Key Profile Data',
  },
  {
    endValue: 72,
    decimals: 0,
    suffix: '%',
    descriptor: 'First Week Engagement',
  },
  {
    endValue: 4.7,
    decimals: 1,
    suffix: '/5',
    descriptor: 'Athlete Satisfaction',
  },
];

export function ResultsStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || active) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="mx-auto w-full max-w-dzq-content px-dzq-space-6 py-dzq-space-10"
    >
      <div className="grid grid-cols-2 gap-dzq-space-9 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatBlock key={i} {...stat} start={active} />
        ))}
      </div>
    </section>
  );
}
