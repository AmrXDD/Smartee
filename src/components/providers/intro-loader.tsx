"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/utils";
import { useIntro } from "./intro-context";

const TOTAL_MS = 2400;
const SEGMENTS = 64;
const SYSTEM_MESSAGES = [
  "Initializing scan engine",
  "Loading clinical pipeline",
  "Calibrating arch tolerances",
  "Streaming patient telemetry",
];

export function IntroLoader() {
  const { stage: phase } = useIntro();
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  // Progress tween (visual only; stage transitions live in IntroProvider)
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / TOTAL_MS);
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cycle system messages
  useEffect(() => {
    if (phase !== "scanning") return;
    const id = setInterval(() => setMsgIdx((n) => (n + 1) % SYSTEM_MESSAGES.length), 520);
    return () => clearInterval(id);
  }, [phase]);

  const percent = Math.floor(progress * 100);
  const filledSegments = Math.floor(progress * SEGMENTS);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          data-intro-loader
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE.quart } }}
          className="fixed inset-0 z-[300] overflow-hidden bg-[var(--color-obsidian)] text-[var(--color-bone)] noise"
        >
          {/* Background arch — draws in as progress climbs */}
          <ArchBackdrop progress={progress} />

          {/* Ambient gradient wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,oklch(46%_0.205_24/0.32),transparent_70%)]"
          />

          {/* Reveal wipe — opens from horizon */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={phase === "revealing" ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-x-0 top-0 z-[2] h-1/2 bg-[var(--color-obsidian)]"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={phase === "revealing" ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            style={{ transformOrigin: "bottom" }}
            className="absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-[var(--color-obsidian)]"
          />

          {/* All the content lives on the splitting panels so it splits with them */}
          {/* Top half content */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] flex h-1/2 flex-col justify-between p-6 md:p-10">
            <TopBar percent={percent} />
            <div />
          </div>

          {/* Bottom half content */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex h-1/2 flex-col justify-between p-6 md:p-10">
            <div />
            <BottomBar phase={phase} percent={percent} msgIdx={msgIdx} filled={filledSegments} />
          </div>

          {/* Center counter + scan line — sits on the seam between the two panels */}
          <CenterStage phase={phase} percent={percent} progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Center stage: huge counter, scan line, completion glyph ─── */

function CenterStage({
  phase,
  percent,
  progress,
}: {
  phase: "scanning" | "complete" | "revealing" | "done";
  percent: number;
  progress: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Eyebrow above */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE.quart }}
          className="mb-6 flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-bone)]/55"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-iris-300)]" />
          {phase === "complete" ? "Calibration complete" : "Scanning"}
        </motion.div>

        {/* Massive count — odometer-style stack so each digit can slide */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Scanning progress"
          className="relative flex items-center font-[var(--font-display)] text-[clamp(5.5rem,22vw,16rem)] font-medium leading-[0.85] tracking-[-0.06em] tabular-nums text-[var(--color-bone)]"
        >
          <Digit value={Math.floor(percent / 100)} />
          <Digit value={Math.floor((percent % 100) / 10)} />
          <Digit value={percent % 10} />
          <span className="ml-[0.18em] block self-end pb-[0.18em] font-[var(--font-mono)] text-[clamp(1rem,2vw,1.5rem)] font-normal leading-none tracking-[0.18em] text-[var(--color-bone)]/45">
            %
          </span>
        </div>

        {/* Progress underline that grows with the counter */}
        <div className="relative mt-2 h-px w-full max-w-[min(82vw,720px)] overflow-hidden bg-[var(--color-bone)]/10">
          <motion.div
            animate={{ scaleX: progress }}
            transition={{ ease: "linear" }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-0 bg-[var(--color-iris-300)]"
          />
        </div>

        {/* Sub-line: tagline appears only at complete */}
        <div className="relative mt-6 h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {phase === "scanning" ? (
              <motion.span
                key="scanning"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE.quart }}
                className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.32em] text-[var(--color-bone)]/45"
              >
                Frame {String(Math.min(128, Math.floor(percent * 1.28))).padStart(3, "0")} / 128
              </motion.span>
            ) : (
              <motion.span
                key="complete"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE.quart }}
                className="block font-[var(--font-editorial)] italic text-[15px] text-[var(--color-iris-200)]"
              >
                Tomorrow’s smile, today.
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Horizontal scan line cutting across the counter */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: phase === "scanning" ? 1 : 0,
            scaleX: 1,
          }}
          transition={{ duration: 0.7, ease: EASE.quart }}
          style={{ transformOrigin: "center" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[120vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-iris-300)]/70 to-transparent"
        />
      </div>
    </div>
  );
}

/* ─── Odometer digit (slides vertically when value changes) ─── */
function Digit({ value }: { value: number }) {
  // The inner column is 10× the cell height (one row per digit 0-9).
  // Animating "y" in % is relative to the COLUMN, so each digit step
  // is 10% (= 1 cell height). Don't use 100% here.
  return (
    <span
      className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline"
      aria-hidden
    >
      <motion.span
        animate={{ y: `${-value * 10}%` }}
        transition={{ duration: 0.55, ease: EASE.expo }}
        className="absolute inset-x-0 top-0 flex flex-col"
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="block h-[1em] text-center leading-[1]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/* ─── Top bar: brand + frame counter ─── */
function TopBar({ percent }: { percent: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE.quart }}
      className="flex items-center justify-between font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-bone)]/55"
    >
      <div className="flex items-center gap-3">
        <Corner />
        <span>Smartee · Kuwait</span>
      </div>
      <div className="hidden items-center gap-6 md:flex">
        <span>Scan engine v4.2</span>
        <span className="tabular-nums">{String(percent).padStart(3, "0")} / 100</span>
        <Corner flip />
      </div>
      <div className="md:hidden">
        <span className="tabular-nums">{String(percent).padStart(3, "0")}/100</span>
      </div>
    </motion.div>
  );
}

/* ─── Bottom bar: ticks + cycling system message + geo ─── */
function BottomBar({
  phase,
  percent,
  msgIdx,
  filled,
}: {
  phase: "scanning" | "complete" | "revealing" | "done";
  percent: number;
  msgIdx: number;
  filled: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE.quart }}
      className="flex flex-col gap-4"
    >
      {/* Segmented progress ticks — sized to fit narrow viewports */}
      <div className="flex items-end gap-px sm:gap-[2px] md:gap-[3px]">
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const active = i < filled;
          const isLeading = i === filled - 1;
          return (
            <motion.span
              key={i}
              data-active={active}
              data-leading={isLeading}
              initial={{ height: 6, opacity: 0.18 }}
              animate={{
                height: active ? (isLeading ? 22 : 10) : 5,
                opacity: active ? 1 : 0.18,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`block w-[3px] sm:w-[5px] md:w-[8px] ${isLeading ? "bg-[var(--color-iris-200)]" : "bg-[var(--color-bone)]"}`}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        {/* Cycling system message */}
        <div className="relative h-5 min-w-[180px] flex-1 overflow-hidden sm:min-w-[200px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase === "complete" || phase === "revealing" || phase === "done" ? "done" : msgIdx}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE.quart }}
              className="absolute inset-0 flex items-center gap-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-bone)]/70"
            >
              <span className="text-[var(--color-iris-300)]">›</span>
              {phase === "scanning" ? SYSTEM_MESSAGES[msgIdx] : "Channel ready"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right cluster */}
        <div className="hidden items-center gap-6 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-bone)]/45 md:flex">
          <span>29.3766° N · 47.9783° E</span>
          <Corner bottom />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Corner bracket glyph ─── */
function Corner({ flip = false, bottom = false }: { flip?: boolean; bottom?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`text-[var(--color-bone)]/40 ${flip ? "scale-x-[-1]" : ""} ${bottom ? "scale-y-[-1]" : ""}`}
      aria-hidden
    >
      <path d="M0 0 H6 M0 0 V6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ─── Background dental arch that builds as progress climbs ─── */
function ArchBackdrop({ progress }: { progress: number }) {
  const teethTop = 14;
  const teethBot = 14;
  const tCount = teethTop + teethBot;
  const visible = Math.floor(progress * tCount);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-60">
      <svg viewBox="-220 -200 440 400" className="h-[90vmin] w-[90vmin] max-h-[860px] max-w-[860px]" aria-hidden>
        <defs>
          <radialGradient id="archGlowL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(55% 0.225 25)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="oklch(55% 0.225 25)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r="200" fill="url(#archGlowL)" />

        {/* Concentric scan rings */}
        {Array.from({ length: 6 }).map((_, i) => {
          const r = 80 + i * 18;
          return (
            <motion.ellipse
              key={`r${i}`}
              cx="0"
              cy="0"
              rx={r}
              ry={r * 0.78}
              fill="none"
              stroke="oklch(96% 0.008 286)"
              strokeOpacity={0.05 + i * 0.015}
              strokeWidth="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.1 + i * 0.08, ease: EASE.expo }}
            />
          );
        })}

        {/* Arch curves */}
        <motion.path
          d="M-160 -10 Q0 -200 160 -10"
          fill="none"
          stroke="oklch(96% 0.008 286)"
          strokeWidth="1"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.15, ease: EASE.expo }}
        />
        <motion.path
          d="M-160 10 Q0 200 160 10"
          fill="none"
          stroke="oklch(96% 0.008 286)"
          strokeWidth="1"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.25, ease: EASE.expo }}
        />

        {/* Top arch teeth (build with progress) */}
        {Array.from({ length: teethTop }).map((_, i) => {
          const t = i / (teethTop - 1);
          const angle = Math.PI * (1 - t);
          const cx = Math.cos(angle) * 175;
          const cy = -Math.sin(angle) * 135 - 4;
          const on = i < visible;
          return (
            <rect
              key={`tt${i}`}
              x={cx - 6}
              y={cy - 12}
              width={12}
              height={18}
              rx={3.5}
              fill="oklch(96% 0.008 286)"
              style={{
                opacity: on ? 0.85 : 0,
                transform: on ? "translateY(0px)" : "translateY(-6px)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: "opacity 0.4s cubic-bezier(0.165,0.84,0.44,1), transform 0.4s cubic-bezier(0.165,0.84,0.44,1)",
              }}
            />
          );
        })}
        {/* Bottom arch teeth */}
        {Array.from({ length: teethBot }).map((_, i) => {
          const t = i / (teethBot - 1);
          const angle = Math.PI * (1 - t);
          const cx = Math.cos(angle) * 165;
          const cy = Math.sin(angle) * 125 + 4;
          const on = i + teethTop < visible;
          return (
            <rect
              key={`tb${i}`}
              x={cx - 5}
              y={cy - 4}
              width={10}
              height={16}
              rx={3}
              fill="oklch(96% 0.008 286)"
              style={{
                opacity: on ? 0.75 : 0,
                transform: on ? "translateY(0px)" : "translateY(6px)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: "opacity 0.4s cubic-bezier(0.165,0.84,0.44,1), transform 0.4s cubic-bezier(0.165,0.84,0.44,1)",
              }}
            />
          );
        })}

        {/* Sweep scan line */}
        <motion.line
          x1="-200"
          x2="200"
          y1="0"
          y2="0"
          stroke="oklch(78% 0.155 65)"
          strokeOpacity="0.55"
          strokeWidth="0.6"
          initial={{ y1: -180, y2: -180 }}
          animate={{ y1: [-180, 180, -180], y2: [-180, 180, -180] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
