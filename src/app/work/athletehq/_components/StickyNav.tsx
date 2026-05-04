'use client';

import { useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';

const SECTIONS = [
  { id: 'intro', label: 'Overview' },
  { id: 'phone-trio', label: 'Design' },
  { id: 'results', label: 'Results' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 80,
      end: 'max',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    SECTIONS.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 100',
        end: 'bottom 100',
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
    });
  });

  const linkClass = (isActive: boolean) => {
    const base = 'transition-colors duration-300 ease-out';
    if (scrolled) {
      return `${base} ${
        isActive ? 'text-dzq-fg-1' : 'text-dzq-fg-2 hover:text-dzq-fg-1'
      }`;
    }
    return `${base} ${
      isActive ? 'text-white' : 'text-white/70 hover:text-white'
    }`;
  };

  return (
    <nav
      className={[
        'sticky top-0 z-50 border-b',
        scrolled
          ? 'border-black/[0.06] bg-white/85 backdrop-blur-[12px]'
          : 'border-transparent bg-transparent',
      ].join(' ')}
      style={{ transition: 'all 0.3s ease' }}
    >
      <div className="mx-auto flex max-w-dzq-content gap-dzq-space-7 px-dzq-space-6 py-dzq-space-4 text-dzq-base font-dzq-medium">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={linkClass(active === id)}
            aria-current={active === id ? 'true' : undefined}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
