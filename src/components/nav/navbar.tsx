"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Magnetic } from "./magnetic";
import { useIntro } from "@/components/providers/intro-context";
import { EASE } from "@/lib/utils";

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "Process", href: "#process" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { revealStarted } = useIntro();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={revealStarted ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.9, ease: EASE.quart }}
        className="fixed inset-x-0 top-0 z-[150] mix-blend-difference"
      >
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 md:px-10 md:py-6">
          {/* Wordmark */}
          <Link
            href="#"
            className="group inline-flex h-11 items-center gap-3 -my-2 py-2"
            data-cursor="hover"
            aria-label="Smartee Kuwait — back to top"
          >
            <motion.span
              aria-hidden
              className="block h-6 w-6"
            >
              <svg viewBox="0 0 32 32" className="h-full w-full text-[var(--color-bone)]" fill="currentColor">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={revealStarted ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ delay: 0.3, duration: 1.4, ease: EASE.quart }}
                  d="M16 1c8.284 0 15 6.716 15 15 0 4.5-2 8-5 10.5-2.5 2-5 4-10 4S8 28.5 6 26.5C3 24 1 20.5 1 16 1 7.716 7.716 1 16 1Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="16" r="3.2" />
              </svg>
            </motion.span>
            <span className="font-[var(--font-display)] text-[15px] font-medium tracking-[-0.01em] text-[var(--color-bone)]">
              Smartee
              <span className="text-[var(--color-bone)]/55">/Kuwait</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Magnetic key={item.label} strength={0.22}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  className="link-underline px-3 py-2 text-[13px] font-medium tracking-[0.02em] text-[var(--color-bone)]"
                >
                  {item.label}
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.28}>
              <button
                data-cursor="hover"
                onClick={() => setOpenMenu(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-bone)]/30 text-[var(--color-bone)] md:hidden"
                aria-label="Menu"
              >
                <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 1h14M0 9h14" stroke="currentColor" strokeWidth="1.4"/></svg>
              </button>
            </Magnetic>
            <LoginButton />
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.quart }}
            className="fixed inset-0 z-[180] bg-[var(--color-ink)] text-[var(--color-bone)] md:hidden"
          >
            <div className="flex h-full flex-col justify-between p-8">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-bone)]/60">Menu</span>
                <button onClick={() => setOpenMenu(false)} className="text-[11px] uppercase tracking-[0.32em]">Close</button>
              </div>
              <nav className="flex flex-col gap-4">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.7, ease: EASE.expo }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(false)}
                      className="font-[var(--font-editorial)] text-5xl italic"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-bone)]/50">
                Salem Al Mubarak St · Kuwait City
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LoginButton() {
  return (
    <Magnetic strength={0.3}>
      <button
        type="button"
        data-cursor="label"
        data-cursor-label="Soon"
        className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-[var(--color-bone)] pl-4 pr-2 text-[12px] font-medium tracking-[0.02em] text-[var(--color-ink)] transition-[transform] duration-500 ease-[var(--ease-quart)] hover:scale-[1.02]"
        aria-label="Patient login"
      >
        <span className="relative z-10">Login</span>
        <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-[var(--color-iris-500)] text-[var(--color-bone)] transition-transform duration-500 ease-[var(--ease-quart)] group-hover:rotate-45">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--color-iris-200)]/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.1s_var(--ease-quart)_forwards]"
        />
      </button>
    </Magnetic>
  );
}
