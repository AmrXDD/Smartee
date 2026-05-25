"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 38, mass: 0.6 });

  const [hover, setHover] = useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.documentElement.dataset.cursorActive = "true";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const target = t.closest<HTMLElement>("[data-cursor]");
      if (!target) {
        setHover("default");
        setLabel("");
        return;
      }
      const mode = target.dataset.cursor || "hover";
      const lbl = target.dataset.cursorLabel ?? "";
      setLabel(lbl);
      setHover(lbl ? "label" : (mode as "hover"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      delete document.documentElement.dataset.cursorActive;
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
    >
      <motion.div
        animate={{
          width: hover === "label" ? 88 : hover === "hover" ? 56 : 14,
          height: hover === "label" ? 88 : hover === "hover" ? 56 : 14,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[10px] uppercase tracking-[0.18em] bg-[var(--color-porcelain)] text-[var(--color-ink)]"
      >
        {hover === "label" && label}
      </motion.div>
    </motion.div>
  );
}
