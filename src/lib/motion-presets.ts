import type { Variants } from "motion/react";
import { EASE } from "./utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.quart } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE.quart } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

export const charReveal: Variants = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: 0,
    transition: { duration: 0.9, ease: EASE.expo, delay: i * 0.025 },
  }),
};

export const wordReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.05, ease: EASE.quart, delay: i * 0.045 },
  }),
};

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE.quart } },
};
