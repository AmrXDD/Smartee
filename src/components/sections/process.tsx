"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/primitives/section-header";
import { EASE } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    day: "Day 0",
    title: "Studio scan",
    body: "Three-minute intra-oral capture. No impressions. You see your bite on the main screen before you leave the chair.",
  },
  {
    n: "02",
    day: "Day 3",
    title: "Simulation",
    body: "We project your treatment, tooth by tooth, and price the trade-offs together. You approve before we print.",
  },
  {
    n: "03",
    day: "Day 7",
    title: "First trays",
    body: "Aligners printed in-clinic on medical SLA. Fitted, adjusted, walked through, paired with your app.",
  },
  {
    n: "04",
    day: "Week 2 → Month 9",
    title: "Progression",
    body: "Two-week tray cycles. Weekly app check-ins. Quarterly studio re-scans verify the predicted versus actual.",
  },
  {
    n: "05",
    day: "Day +1",
    title: "Retention",
    body: "Printed retainers, vivera-grade. Lifetime replacement schedule. The work doesn't end at the last tray.",
  },
];

export function Process() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative bg-[var(--color-bone)] py-32 md:py-44">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <SectionHeader
          index="04"
          eyebrow="Process"
          title={
            <>
              From scan to{" "}
              <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-600)]">retention.</span>
            </>
          }
        />

        <div className="relative mt-20 grid grid-cols-[40px_1fr] gap-8 md:grid-cols-[120px_1fr]">
          {/* Vertical rail */}
          <div className="relative">
            <div className="sticky top-32 h-[60vh]">
              <div className="relative h-full w-px overflow-hidden bg-[var(--color-stone)]/25">
                <motion.div
                  style={{ height: progress }}
                  className="absolute inset-x-0 top-0 w-full bg-[var(--color-iris-500)]"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="flex flex-col gap-20 md:gap-32">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, delay: i * 0.03, ease: EASE.quart }}
                className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]"
              >
                <div className="flex flex-col gap-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-graphite)]">
                  <span className="text-[var(--color-iris-600)]">{s.n}</span>
                  <span>{s.day}</span>
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-[clamp(2rem,3.2vw,3.2rem)] font-medium tracking-display text-[var(--color-ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.65] text-[var(--color-graphite)] md:text-[16px]">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
