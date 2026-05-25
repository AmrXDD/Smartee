"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

type Chip = {
  x: string;
  y: string;
  label: string;
  value: string;
  drift: [number, number];
};

const CHIPS: Chip[] = [
  { x: "14%", y: "26%", label: "Scan resolution", value: "0.04 mm", drift: [-12, -8] },
  { x: "76%", y: "20%", label: "Arch correction", value: "47°", drift: [10, -14] },
  { x: "9%", y: "72%", label: "Treatment step", value: "14 / 36", drift: [-8, 12] },
  { x: "82%", y: "76%", label: "Pressure curve", value: "0.12 N", drift: [14, 10] },
];

export function DataChips() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      px.set(nx);
      py.set(ny);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      {CHIPS.map((chip, i) => (
        <ChipNode key={chip.label} chip={chip} index={i} px={spx} py={spy} />
      ))}
    </div>
  );
}

function ChipNode({
  chip,
  index,
  px,
  py,
}: {
  chip: Chip;
  index: number;
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
}) {
  const tx = useTransform(px, (v) => v * chip.drift[0]);
  const ty = useTransform(py, (v) => v * chip.drift[1]);

  return (
    <motion.div
      style={{ left: chip.x, top: chip.y, x: tx, y: ty }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2 + index * 0.12, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex items-center gap-2 rounded-full border border-[var(--color-bone)]/15 bg-[var(--color-ink)]/55 px-3 py-1.5 backdrop-blur-md">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-iris-300)]" />
        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)]/55">
          {chip.label}
        </span>
        <span className="font-[var(--font-mono)] text-[11px] tabular-nums text-[var(--color-bone)]">
          {chip.value}
        </span>
      </div>
    </motion.div>
  );
}
