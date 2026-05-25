"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useMemo } from "react";

/**
 * The "arch" — an abstract orthodontic-arch visualization built from
 * stacked elliptical paths that scan from anterior to posterior.
 * Reads as: scientific, precise, dental, alive.
 */
export function ArchVisual({ scrollY }: { scrollY: MotionValue<number> }) {
  const rings = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  const rotate = useTransform(scrollY, [0, 800], [0, 18]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.12]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.18]);

  return (
    <motion.div
      style={{ rotate, scale, opacity }}
      className="absolute left-1/2 top-1/2 z-[1] h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <svg viewBox="-200 -200 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="archGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(55% 0.225 25)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="oklch(55% 0.225 25)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="oklch(11% 0.024 28)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="archStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(96% 0.008 286)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(96% 0.008 286)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(96% 0.008 286)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="0" cy="0" r="200" fill="url(#archGlow)" />

        {rings.map((i) => {
          const r = 38 + i * 9;
          const delay = 2.6 + i * 0.045;
          return (
            <motion.ellipse
              key={i}
              cx="0"
              cy="0"
              rx={r * 1.05}
              ry={r * 0.78}
              fill="none"
              stroke="url(#archStroke)"
              strokeWidth={i % 4 === 0 ? 0.6 : 0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay, ease: [0.19, 1, 0.22, 1] }}
            />
          );
        })}

        {/* Center reticle */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.4, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <circle cx="0" cy="0" r="2" fill="oklch(96% 0.008 286)" />
          <circle cx="0" cy="0" r="9" fill="none" stroke="oklch(96% 0.008 286)" strokeOpacity="0.4" strokeWidth="0.25" />
          <line x1="-22" y1="0" x2="-12" y2="0" stroke="oklch(96% 0.008 286)" strokeWidth="0.3" />
          <line x1="22" y1="0" x2="12" y2="0" stroke="oklch(96% 0.008 286)" strokeWidth="0.3" />
          <line x1="0" y1="-22" x2="0" y2="-12" stroke="oklch(96% 0.008 286)" strokeWidth="0.3" />
          <line x1="0" y1="22" x2="0" y2="12" stroke="oklch(96% 0.008 286)" strokeWidth="0.3" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
