"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeader } from "@/components/primitives/section-header";
import { EASE } from "@/lib/utils";

const ITEMS = [
  {
    q: "How is Smartee different from off-the-shelf aligner brands?",
    a: "We don't ship boxes. Every treatment is supervised end-to-end by orthodontists in our Kuwait City studio. Trays are printed in-clinic, not in a foreign lab. Mid-course refinements are included by default, not upsold.",
  },
  {
    q: "What does the first visit look like?",
    a: "Forty-five minutes. We scan, simulate, and walk you through three possible plans on the studio screen. You leave with a recommendation and an invoice; no commitment, no plaster.",
  },
  {
    q: "Is the price fixed?",
    a: "Yes. Each track is a flat price that includes scans, simulations, every tray your plan calls for, mid-course refinements, and the printed retainer set. We surface the number before you sign.",
  },
  {
    q: "How often do I come to the studio?",
    a: "Once every six to eight weeks for an in-person review, plus the weekly app check-in from home. Most of our patients book reviews back-to-back with their dentist visits.",
  },
  {
    q: "What if my teeth don't move as the simulation predicted?",
    a: "We rescan and reprint at no cost. The simulation is a hypothesis; verification is part of the plan, not a failure of it.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[var(--color-bone)] py-20 sm:py-28 md:py-44">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="06"
              eyebrow="Questions"
              title={
                <>
                  Answers,
                  <br />
                  <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-600)]">in millimeters.</span>
                </>
              }
            />
            <p className="mt-8 max-w-[40ch] text-[15px] leading-[1.6] text-[var(--color-graphite)]">
              Still unsure? Send a question and we’ll loop in the lead clinician for your case.
            </p>
          </div>

          <ul className="md:col-span-7">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-t border-[var(--color-stone)]/30 last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor="hover"
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left md:gap-6 md:py-6"
                  >
                    <span className="flex items-baseline gap-3 md:gap-5">
                      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-iris-600)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[var(--font-display)] text-[clamp(1.05rem,1.8vw,1.5rem)] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]">
                        {item.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: EASE.quart }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-stone)]/40 text-[var(--color-ink)]"
                      aria-hidden
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4"/></svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE.quart }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-[34px] pr-2 text-[14px] leading-[1.6] text-[var(--color-graphite)] md:pb-7 md:pl-[58px] md:pr-10 md:text-[16px] md:leading-[1.65]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
