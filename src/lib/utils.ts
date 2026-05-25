import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EASE = {
  quart: [0.165, 0.84, 0.44, 1] as const,
  quint: [0.23, 1, 0.32, 1] as const,
  expo: [0.19, 1, 0.22, 1] as const,
  soft: [0.32, 0.72, 0.16, 1] as const,
};

export const DUR = {
  instant: 0.12,
  fast: 0.24,
  base: 0.42,
  slow: 0.72,
  cinematic: 1.2,
};
