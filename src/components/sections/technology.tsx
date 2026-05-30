"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/primitives/section-header";
import { EASE } from "@/lib/utils";

const PILLARS = [
  {
    code: "T-01",
    name: "Intra-oral capture",
    body: "A 0.04mm-resolution iTero scan replaces silicone impressions. Two minutes, no gag, no plaster.",
  },
  {
    code: "T-02",
    name: "Predictive simulation",
    body: "Our model projects the next 36 steps of your bite and surfaces the trade-offs before you commit.",
  },
  {
    code: "T-03",
    name: "Direct-to-tray printing",
    body: "Each tray printed in-clinic on medical-grade SLA at ±50µm tolerance. No outsourcing, no shipping wait.",
  },
  {
    code: "T-04",
    name: "Live progress telemetry",
    body: "An app that shows the actual versus the planned movement of every tooth, weekly.",
  },
];

export function Technology() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);

  return (
    <section id="technology" ref={ref} className="relative bg-[var(--color-ink)] py-20 text-[var(--color-bone)] sm:py-28 md:py-44">
      {/* Ambient panel */}
      <motion.div
        style={{ rotate }}
        className="pointer-events-none absolute -left-[20%] top-1/2 h-[120%] w-[140%] -translate-y-1/2 opacity-50"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_50%_50%,oklch(36%_0.165_23/0.45),transparent_70%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <SectionHeader
              index="03"
              eyebrow="Technology"
              title={
                <span className="text-[var(--color-bone)]">
                  The stack <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-200)]">behind</span> the smile.
                </span>
              }
            />
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-[var(--color-bone)]/65 md:text-[16px]">
              We built our pipeline around three principles: clinical precision, predictable timelines, and patient legibility. Every step ships data you can see.
            </p>
          </div>
        </div>

        {/* Centerpiece: animated tooth-scan visualization */}
        <motion.div
          style={{ scale }}
          className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-[1100px] overflow-hidden rounded-[20px] border border-[var(--color-bone)]/10 bg-[var(--color-obsidian)] noise sm:aspect-[16/10] sm:rounded-[28px] md:mt-24"
        >
          <ToothScan />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between gap-3 p-4 font-[var(--font-mono)] text-[9px] uppercase tracking-[0.24em] text-[var(--color-bone)]/55 sm:p-6 sm:text-[10px] sm:tracking-[0.28em] md:p-8">
            <span className="truncate">Simulation Engine <span className="hidden sm:inline">· v4.2</span></span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-iris-300)]" />
              <span className="hidden sm:inline">Real-time render</span>
              <span className="sm:hidden">Live</span>
            </span>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="mt-16 grid grid-cols-1 gap-y-10 md:mt-24 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: EASE.quart }}
              className="border-t border-[var(--color-bone)]/15 pt-6"
            >
              <div className="flex items-baseline justify-between font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-bone)]/45">
                <span>{p.code}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-3 font-[var(--font-display)] text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.02em] text-[var(--color-bone)]">
                {p.name}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.55] text-[var(--color-bone)]/65 md:text-[15px]">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToothScan() {
  return (
    <svg viewBox="0 0 1100 700" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="scanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(55% 0.225 25)" stopOpacity="0.45" />
          <stop offset="60%" stopColor="oklch(36% 0.165 23)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="scanLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(78% 0.155 65)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(78% 0.155 65)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(78% 0.155 65)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="550" cy="350" r="320" fill="url(#scanGlow)" />

      {/* Arch — top */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE.expo, delay: 0.3 }}
        d="M200 380 Q550 120 900 380"
        fill="none"
        stroke="oklch(96% 0.008 286)"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />
      {/* Arch — bottom */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE.expo, delay: 0.5 }}
        d="M220 420 Q550 660 880 420"
        fill="none"
        stroke="oklch(96% 0.008 286)"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />

      {/* Teeth ticks (representational) */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13;
        const angle = Math.PI * (1 - t);
        const cx = 550 + Math.cos(angle) * 350;
        const cy = 380 - Math.sin(angle) * 260;
        return (
          <motion.rect
            key={`top-${i}`}
            x={cx - 8}
            y={cy - 18}
            width={16}
            height={26}
            rx={5}
            fill="oklch(96% 0.008 286)"
            fillOpacity="0.85"
            style={{ opacity: 0 }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 + i * 0.04, ease: EASE.quart }}
          />
        );
      })}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13;
        const angle = Math.PI * (1 - t);
        const cx = 550 + Math.cos(angle) * 330;
        const cy = 420 + Math.sin(angle) * 240;
        return (
          <motion.rect
            key={`bot-${i}`}
            x={cx - 7}
            y={cy - 8}
            width={14}
            height={24}
            rx={4}
            fill="oklch(96% 0.008 286)"
            fillOpacity="0.75"
            style={{ opacity: 0 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.9 + i * 0.04, ease: EASE.quart }}
          />
        );
      })}

      {/* Sweep scan line */}
      <motion.line
        x1="200"
        x2="900"
        y1="350"
        y2="350"
        stroke="url(#scanLine)"
        strokeWidth="2"
        initial={{ y1: 120, y2: 120 }}
        animate={{ y1: [120, 600, 120], y2: [120, 600, 120] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
