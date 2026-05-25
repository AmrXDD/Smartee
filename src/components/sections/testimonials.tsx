"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/primitives/section-header";
import { EASE } from "@/lib/utils";

const STORIES = [
  {
    quote: "I watched my own bite simulated on the screen on day one. By month nine I was looking at the result I had been promised. The same number.",
    name: "Dana A.",
    role: "Architect · Salmiya",
    track: "Studio · 11 months",
  },
  {
    quote: "I refused traditional braces twice. The Smartee plan was the first time a treatment was explained to me in math, not metaphors.",
    name: "Yousef M.",
    role: "Pilot · Hawally",
    track: "Surgical+ · 18 months",
  },
  {
    quote: "Three of my daughters started together. The compliance dashboard meant I could see who was wearing them and who was bargaining.",
    name: "Reem H.",
    role: "Pediatrician · Mishref",
    track: "Teens · 14 months × 3",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="relative overflow-hidden bg-[var(--color-mist)] py-32 md:py-44">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHeader
              index="05"
              eyebrow="Stories"
              title={
                <>
                  Not before / after.
                  <br />
                  <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-600)]">Planned / verified.</span>
                </>
              }
            />
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE.quart }}
              className="flex flex-col justify-between rounded-[24px] bg-[var(--color-bone)] p-8 md:p-10"
            >
              <p className="font-[var(--font-editorial)] text-[clamp(1.5rem,2vw,1.95rem)] leading-[1.3] text-[var(--color-ink)]">
                <span className="text-[var(--color-iris-600)]">“</span>
                {s.quote}
                <span className="text-[var(--color-iris-600)]">”</span>
              </p>
              <div className="mt-10 flex items-end justify-between border-t border-[var(--color-stone)]/30 pt-5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-[var(--color-graphite)]">
                <div>
                  <div className="text-[12px] tracking-normal text-[var(--color-ink)]">{s.name}</div>
                  <div>{s.role}</div>
                </div>
                <div className="text-right">{s.track}</div>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Marquee */}
        <div className="mt-24 overflow-hidden border-y border-[var(--color-stone)]/30 py-6">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 gap-12 whitespace-nowrap font-[var(--font-editorial)] text-[clamp(2rem,5vw,5rem)] leading-none text-[var(--color-ink)]"
          >
            {Array.from({ length: 2 }).map((_, k) =>
              ["Predicted.", "Verified.", "Printed.", "Worn.", "Witnessed."].map((w, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-12 italic">
                  {w}
                  <span aria-hidden className="block h-2 w-2 rounded-full bg-[var(--color-iris-500)]" />
                </span>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
