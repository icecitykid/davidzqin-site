'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ResultsStats } from './_components/ResultsStats';
import { StatementSection } from './_components/StatementSection';
import { StickyNav } from './_components/StickyNav';

export default function AthleteHQPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);

  const phoneTrioRef = useRef<HTMLElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

      if (!isMobile) {
        gsap.to(heroBgRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        heroLogoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      );

      const phones = [
        phoneLeftRef.current,
        phoneCenterRef.current,
        phoneRightRef.current,
      ];

      if (isMobile) {
        gsap.fromTo(
          phones,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: phoneTrioRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        );
      } else {
        const sidePhones = [phoneLeftRef.current, phoneRightRef.current];

        gsap.set(phones, { opacity: 0 });
        gsap.set(sidePhones, { y: 80 });

        const phoneTrioTl = gsap.timeline({
          scrollTrigger: {
            trigger: phoneTrioRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        });

        phoneTrioTl.to(phones, { opacity: 1, duration: 0.3 }, 0);
        phoneTrioTl.to(sidePhones, { y: 0, duration: 1 }, 0);
      }
    }
  });

  return (
    <main className="relative bg-dzq-bg">
      <StickyNav />

      <section
        ref={heroRef}
        id="hero"
        className="relative h-screen w-full overflow-hidden bg-dzq-bg-dark"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-x-0 top-0 h-[130%] will-change-transform"
        >
          <Image
            src="/assets/work/athletehq-landing.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </div>

        <div
          ref={heroLogoRef}
          className="absolute inset-x-0 bottom-[20%] flex justify-center px-dzq-space-6 will-change-transform"
        >
          <h1 className="m-0 text-center font-dzq-display text-[clamp(48px,8vw,96px)] font-dzq-medium leading-none tracking-tight text-white">
            Nike AthleteHQ
          </h1>
        </div>
      </section>

      <div id="intro" />

      <section
        ref={phoneTrioRef}
        id="phone-trio"
        className="mx-auto w-full max-w-[1200px] px-dzq-space-6 py-[120px]"
      >
        <div className="grid grid-cols-1 gap-dzq-space-6 md:grid-cols-3">
          <div
            ref={phoneLeftRef}
            className="relative aspect-[440/872] overflow-hidden rounded-dzq-radius-xl border border-dzq-border-hl bg-dzq-bg-card will-change-transform"
          >
            <Image
              src="/assets/work/athletehq-landing.png"
              alt="AthleteHQ landing screen"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>

          <div
            ref={phoneCenterRef}
            className="relative aspect-[440/872] overflow-hidden rounded-dzq-radius-xl border border-dzq-border-hl bg-dzq-bg-card will-change-transform"
          >
            <Image
              src="/assets/work/athletehq-profile-1-1.png"
              alt="AthleteHQ profile screen"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>

          <div
            ref={phoneRightRef}
            className="relative aspect-[440/872] overflow-hidden rounded-dzq-radius-xl border border-dzq-border-hl bg-dzq-bg-card will-change-transform"
          >
            <Image
              src="/assets/work/athletehq-profile-3.png"
              alt="AthleteHQ profile interstitial"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <StatementSection
        id="statement-1"
        layout="50/50"
        leftText="Seen as a whole individual — beyond just a performer"
        rightText={`Athletes wanted to be seen as whole people, not just as performance. Sports Marketing needed visibility they'd never had.

The app onboards an athlete in under 3 minutes — replacing a 45-minute Airtable intake — and surfaces the identity, interests, and goals that make matching possible.`}
      />

      <div id="screens-1" />

      <StatementSection
        id="statement-2"
        layout="50/50"
        leftText="Right athlete. Right moment. Right opportunity."
        rightText="Sport reps needed to find the right athlete for the right moment without paging through spreadsheets. Live dashboards, filter, and real-time polls replaced weeks of manual briefs."
      />

      <div id="dashboard" />
      <div id="screens-2" />

      <StatementSection
        id="statement-3"
        layout="50/50"
        leftText="Beyond the swoosh."
        rightText="Beyond MVP, I worked with another Senior Designer to help envision what athlete-led commerce could look like — athlete picks, personal stories, and fundraisers stitched into the shopping experience. It gave Sports Marketing a north star to point engineering and leadership toward."
      />

      <div id="vision" />
      <div id="screens-3" />

      <ResultsStats />

      <div id="next-project" />
    </main>
  );
}
