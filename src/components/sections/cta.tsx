"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Magnetic } from "@/components/nav/magnetic";
import { EASE } from "@/lib/utils";

export function Cta() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="consult"
      ref={ref}
      className="relative isolate overflow-hidden bg-[var(--color-obsidian)] py-40 text-[var(--color-bone)] noise md:py-56"
    >
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,oklch(46%_0.205_24/0.5),transparent_70%)]"
      />

      {/* Background orbital line */}
      <motion.svg
        viewBox="0 0 1200 800"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-50"
        aria-hidden
      >
        <motion.ellipse
          cx="600"
          cy="400"
          rx="540"
          ry="220"
          fill="none"
          stroke="oklch(96% 0.008 286)"
          strokeOpacity="0.15"
          strokeWidth="0.8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "600px 400px" }}
        />
        <motion.ellipse
          cx="600"
          cy="400"
          rx="380"
          ry="380"
          fill="none"
          stroke="oklch(72% 0.155 26)"
          strokeOpacity="0.2"
          strokeWidth="0.6"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "600px 400px" }}
        />
      </motion.svg>

      <div className="relative mx-auto max-w-[1280px] px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE.quart }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-[var(--color-bone)]/15 px-4 py-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-bone)]/65">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-iris-300)]" />
            Booking · September openings
          </span>
        </motion.div>

        <motion.h2
          style={{ y: titleY }}
          className="mx-auto mt-10 max-w-[16ch] font-[var(--font-display)] tracking-display text-[clamp(3.4rem,9vw,9rem)] font-medium leading-[0.95]"
        >
          Begin the scan{" "}
          <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-200)]">that begins the smile.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE.quart }}
          className="mx-auto mt-8 max-w-[52ch] text-[15px] leading-[1.6] text-[var(--color-bone)]/65 md:text-[16px]"
        >
          Forty-five minutes in the studio. No impressions, no commitment. You leave with three plans, three prices, and a copy of your own scan to keep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE.quart }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.3}>
            <a
              href="#"
              data-cursor="label"
              data-cursor-label="Book"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-bone)] pl-7 pr-3 text-[14px] font-medium text-[var(--color-ink)] transition-transform duration-500 ease-[var(--ease-quart)] hover:scale-[1.02]"
            >
              Book a consultation
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-iris-500)] text-[var(--color-bone)] transition-transform duration-500 group-hover:rotate-45">
                <svg width="12" height="12" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.22}>
            <a
              href="tel:+96522000000"
              data-cursor="hover"
              className="link-underline px-3 py-2 text-[13px] text-[var(--color-bone)]/80"
            >
              +965 2200 0000
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
