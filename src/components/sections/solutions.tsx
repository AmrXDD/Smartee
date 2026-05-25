"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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

export function Solutions() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section id="solutions" className="relative bg-[var(--color-porcelain)]">
      <div className="mx-auto max-w-[1480px] px-6 pt-32 md:px-10 md:pt-44">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
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
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-[var(--color-graphite)] md:text-[16px]">
              Every Smartee track starts at the same intra-oral scan and ends at a custom retention plan. What changes between them is the clinical depth, the supervision cadence, and the tray count.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div ref={ref} className="relative mt-20 h-[260vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 px-6 md:gap-10 md:px-10">
            {SOLUTIONS.map((s, i) => (
              <article
                key={s.code}
                data-cursor="hover"
                className="group relative flex h-[68vh] w-[78vw] flex-col justify-between rounded-[28px] bg-[var(--color-bone)] p-8 md:w-[44vw] md:p-12"
              >
                {/* Decorative swatch arc */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-[60%] w-[60%] rounded-bl-[260px] opacity-90 transition-transform duration-[1200ms] ease-[var(--ease-quart)] group-hover:scale-[1.04]"
                  style={{
                    background: `radial-gradient(120% 100% at 100% 0%, ${s.swatch} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10 flex items-center justify-between font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-graphite)]">
                  <span>{s.code}</span>
                  <span>{String(i + 1).padStart(2, "0")} / 04</span>
                </div>

                <div className="relative z-10 flex flex-col gap-5">
                  <h3 className="font-[var(--font-display)] text-[clamp(2rem,3.6vw,3.4rem)] font-medium tracking-display text-[var(--color-ink)]">
                    {s.name}
                  </h3>
                  <p className="max-w-[42ch] text-[14px] leading-[1.55] text-[var(--color-graphite)] md:text-[15px]">
                    {s.body}
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-6 border-t border-[var(--color-stone)]/30 pt-5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-graphite)]">
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

                <motion.span
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.5, ease: EASE.quart }}
                  className="relative z-10 inline-flex w-fit items-center gap-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-iris-600)]"
                >
                  Configure track
                  <svg width="14" height="10" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
                </motion.span>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
