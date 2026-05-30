"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "@/lib/utils";

const STATS = [
  { value: "2 014", label: "Treatments shaped" },
  { value: "98%", label: "Predictive accuracy" },
  { value: "0.04mm", label: "Scan resolution" },
  { value: "36", label: "Avg. step plan" },
];

export function BrandIntro() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative bg-[var(--color-bone)] py-20 sm:py-28 md:py-44">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
          {/* Left rail — eyebrow + index */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-graphite)] md:sticky md:top-32">
              <span className="tabular-nums text-[var(--color-iris-600)]">01</span>
              <span className="block h-px w-10 bg-[var(--color-stone)]/40" />
              <span>The studio</span>
            </div>
          </div>

          {/* Editorial body — oversize, mixed-weight, with italic serif accents */}
          <div className="md:col-span-9">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-20%" }}
              transition={{ staggerChildren: 0.04 }}
              className="font-[var(--font-display)] text-[clamp(1.35rem,3.2vw,3.4rem)] font-light leading-[1.25] tracking-[-0.022em] text-[var(--color-ink)] md:leading-[1.18]"
            >
              {[
                "Smartee is a",
                <span key="s1" className="font-[var(--font-editorial)] italic text-[var(--color-iris-600)]"> clear-aligner studio </span>,
                "in Kuwait City. We measure the curve of your bite",
                " to four hundredths of a millimeter,",
                <span key="s2" className="font-[var(--font-editorial)] italic text-[var(--color-iris-600)]"> simulate every step </span>,
                "of the treatment in front of you, and ship aligners",
                " printed to the same tolerances your dentist trusts in surgery.",
              ].map((chunk, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.quart } },
                  }}
                  className="inline"
                >
                  {chunk}{" "}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              style={{ y: lift }}
              className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:mt-24 md:gap-y-12 md:grid-cols-4"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: EASE.quart }}
                  className="border-t border-[var(--color-stone)]/30 pt-4"
                >
                  <div className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,3.6rem)] font-medium tracking-[-0.04em] text-[var(--color-ink)] tabular-nums">
                    {s.value}
                  </div>
                  <div className="mt-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-graphite)]">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
