"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/utils";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({ index, eyebrow, title, align = "left" }: Props) {
  return (
    <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}>
      <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-graphite)]">
        <span className="tabular-nums text-[var(--color-iris-600)]">{index}</span>
        <span className="block h-px w-10 bg-[var(--color-stone)]/40" />
        <span>{eyebrow}</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: EASE.quart }}
        className="font-[var(--font-display)] tracking-display text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.96] text-[var(--color-ink)]"
      >
        {title}
      </motion.h2>
    </div>
  );
}
