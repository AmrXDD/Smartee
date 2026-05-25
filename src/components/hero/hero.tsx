"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArchVisual } from "./arch-visual";
import { DataChips } from "./data-chips";
import { Magnetic } from "@/components/nav/magnetic";
import { useIntro } from "@/components/providers/intro-context";
import { EASE } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const { revealStarted } = useIntro();

  const titleY = useTransform(scrollY, [0, 800], [0, -120]);
  const titleOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const vignetteOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  // Drive every entry animation off this flag; delays are now relative to
  // the moment the loader's panels begin parting (revealStarted = true).
  const r = revealStarted;

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--color-obsidian)] text-[var(--color-bone)] noise"
    >
      {/* Ambient gradient wash */}
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="pointer-events-none absolute inset-0 z-[0] bg-[radial-gradient(60%_60%_at_50%_45%,oklch(36%_0.165_23/0.55),transparent_70%)]"
      />

      <ArchVisual scrollY={scrollY} />

      {/* Headline column */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-[2] mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-center px-6 pt-32 md:px-10 md:pt-40"
      >
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3 overflow-hidden">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={r ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.2, duration: 1.1, ease: EASE.expo }}
            style={{ transformOrigin: "left" }}
            className="block h-px w-12 bg-[var(--color-bone)]/40"
          />
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={r ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE.quart }}
            className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.32em] text-[var(--color-bone)]/55"
          >
            Smartee Kuwait · Est. orthodontic studio
          </motion.span>
        </div>

        {/* Headline — mask-reveal per line */}
        <h1 className="font-[var(--font-display)] tracking-display text-[clamp(3.6rem,11vw,11.5rem)] font-medium leading-[0.92] text-[var(--color-bone)]">
          <Line delay={0.4} reveal={r}>Tomorrow’s</Line>
          <Line delay={0.55} reveal={r}>
            <span className="italic font-[var(--font-editorial)] tracking-normal text-[var(--color-iris-200)]">smile</span>
            <span className="mx-3 inline-block align-middle text-[var(--color-bone)]/30">/</span>
            <span>shaped</span>
          </Line>
          <Line delay={0.7} reveal={r}>by the millimeter.</Line>
        </h1>

        {/* Sub copy + CTAs */}
        <div className="mt-12 grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_auto]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={r ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 1.0, duration: 0.9, ease: EASE.quart }}
            className="max-w-[42ch] text-balance text-[15px] leading-[1.55] text-[var(--color-bone)]/70 md:text-[16px]"
          >
            A clinical-grade aligner studio in Kuwait City. We scan in three minutes,
            simulate in real time, and ship a treatment plan you can watch unfold,
            tooth by tooth, on a single screen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={r ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 1.15, duration: 0.9, ease: EASE.quart }}
            className="flex items-center gap-3"
          >
            <Magnetic strength={0.28}>
              <a
                href="#consult"
                data-cursor="label"
                data-cursor-label="Book"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-bone)] pl-6 pr-3 text-[14px] font-medium text-[var(--color-ink)] transition-transform duration-500 ease-[var(--ease-quart)] hover:scale-[1.02]"
              >
                Begin scan
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-iris-500)] text-[var(--color-bone)] transition-transform duration-500 group-hover:rotate-45">
                  <svg width="12" height="12" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#technology"
                data-cursor="hover"
                className="link-underline px-3 py-2 text-[13px] text-[var(--color-bone)]/80"
              >
                See the technology
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating data chips */}
      <DataChips reveal={r} />

      {/* Bottom rail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={r ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.3, duration: 0.9, ease: EASE.quart }}
        className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-6 px-6 pb-6 md:px-10 md:pb-8"
      >
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-bone)]/55">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-iris-300)]" />
          Live · Kuwait City studio
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-bone)]/55"
        >
          Scroll
          <span className="block h-6 w-px bg-[var(--color-bone)]/30" />
        </motion.div>
        <div className="hidden items-center gap-6 text-right font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-bone)]/55 md:flex">
          <span>FRAME 01 / 12</span>
          <span>29.3766° N · 47.9783° E</span>
        </div>
      </motion.div>
    </section>
  );
}

function Line({ children, delay, reveal }: { children: React.ReactNode; delay: number; reveal: boolean }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "108%" }}
        animate={reveal ? { y: "0%" } : { y: "108%" }}
        transition={{ duration: 1.2, delay, ease: EASE.expo }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
