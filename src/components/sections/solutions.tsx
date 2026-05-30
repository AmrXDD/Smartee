"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/primitives/section-header";
import { EASE } from "@/lib/utils";

const SOLUTIONS = [
  {
    code: "01.A",
    name: "Smartee Clear",
    duration: "6–9 months",
    range: "Mild crowding · spacing",
    body: "Our entry plan for adults with subtle alignment work. Twelve to twenty trays, weekly progress checks on the app.",
    swatch: "oklch(90% 0.055 28)",
  },
  {
    code: "01.B",
    name: "Smartee Studio",
    duration: "9–14 months",
    range: "Moderate · rotation · bite",
    body: "Our most-prescribed track. Includes attachments, mid-course refinement, and a printed retainer set.",
    swatch: "oklch(72% 0.155 26)",
  },
  {
    code: "01.C",
    name: "Smartee Surgical+",
    duration: "12–22 months",
    range: "Complex · jaw correction",
    body: "Co-planned with our maxillofacial partners. Pre-surgical alignment, post-op refinement, lifetime retention.",
    swatch: "oklch(46% 0.205 24)",
  },
  {
    code: "01.D",
    name: "Smartee Teens",
    duration: "10–16 months",
    range: "Mixed dentition",
    body: "Compliance indicators, eruption tabs, parent dashboard. Built for jaws still in motion.",
    swatch: "oklch(78% 0.155 65)",
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return isDesktop;
}

export function Solutions() {
  const isDesktop = useIsDesktop();

  return (
    <section id="solutions" className="relative bg-[var(--color-porcelain)]">
      <div className="mx-auto max-w-[1480px] px-5 pt-24 sm:px-6 sm:pt-32 md:px-10 md:pt-44">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SectionHeader
              index="02"
              eyebrow="Solutions"
              title={
                <>
                  Four tracks.
                  <br />
                  <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-600)]">One plan per smile.</span>
                </>
              }
            />
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="max-w-[40ch] text-[14px] leading-[1.6] text-[var(--color-graphite)] sm:text-[15px] md:text-[16px]">
              Every Smartee track starts at the same intra-oral scan and ends at a custom retention plan. What changes between them is the clinical depth, the supervision cadence, and the tray count.
            </p>
          </div>
        </div>
      </div>

      {/* Pinned scroll-jacked rail on desktop; native snap-scroll on mobile. */}
      {isDesktop ? <DesktopRail /> : <MobileRail />}
    </section>
  );
}

function DesktopRail() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <div ref={ref} className="relative mt-20 h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-10">
          {SOLUTIONS.map((s, i) => (
            <Card key={s.code} solution={s} index={i} className="h-[68vh] w-[44vw]" />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MobileRail() {
  return (
    <div
      className="relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-5 pb-12 [-webkit-overflow-scrolling:touch] [scrollbar-width:none]"
      data-lenis-prevent
      style={{ scrollbarWidth: "none" }}
    >
      {SOLUTIONS.map((s, i) => (
        <Card
          key={s.code}
          solution={s}
          index={i}
          className="h-[480px] w-[84vw] max-w-[360px] shrink-0 snap-center"
        />
      ))}
      {/* Right spacer so the last card can snap-center */}
      <div className="w-2 shrink-0" />
    </div>
  );
}

function Card({
  solution: s,
  index: i,
  className,
}: {
  solution: (typeof SOLUTIONS)[number];
  index: number;
  className: string;
}) {
  return (
    <article
      data-cursor="hover"
      className={`group relative flex flex-col justify-between rounded-[24px] bg-[var(--color-bone)] p-7 sm:p-8 md:rounded-[28px] md:p-12 ${className}`}
    >
      {/* Decorative swatch arc */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[60%] w-[60%] rounded-bl-[200px] opacity-90 transition-transform duration-[1200ms] ease-[var(--ease-quart)] group-hover:scale-[1.04] md:rounded-bl-[260px]"
        style={{
          background: `radial-gradient(120% 100% at 100% 0%, ${s.swatch} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-between font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-graphite)] md:tracking-[0.28em]">
        <span>{s.code}</span>
        <span>{String(i + 1).padStart(2, "0")} / 04</span>
      </div>

      <div className="relative z-10 flex flex-col gap-4 md:gap-5">
        <h3 className="font-[var(--font-display)] text-[clamp(1.75rem,5vw,3.4rem)] font-medium tracking-display text-[var(--color-ink)]">
          {s.name}
        </h3>
        <p className="max-w-[42ch] text-[13px] leading-[1.55] text-[var(--color-graphite)] sm:text-[14px] md:text-[15px]">
          {s.body}
        </p>
        <dl className="mt-1 grid grid-cols-2 gap-4 border-t border-[var(--color-stone)]/30 pt-4 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-graphite)] md:gap-6 md:pt-5 md:tracking-[0.24em]">
          <div>
            <dt className="text-[var(--color-graphite)]/70">Duration</dt>
            <dd className="mt-1 text-[12px] tracking-normal text-[var(--color-ink)]">{s.duration}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-graphite)]/70">Use range</dt>
            <dd className="mt-1 text-[12px] tracking-normal text-[var(--color-ink)]">{s.range}</dd>
          </div>
        </dl>
      </div>

      <a
        href="#consult"
        className="relative z-10 inline-flex h-11 w-fit items-center gap-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-iris-600)] transition-transform duration-500 ease-[var(--ease-quart)] hover:translate-x-1.5"
      >
        Configure track
        <svg width="14" height="10" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
      </a>
    </article>
  );
}
