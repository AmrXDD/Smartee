"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Magnetic } from "@/components/nav/magnetic";
import { EASE } from "@/lib/utils";

const COLS = [
  {
    title: "Studio",
    links: ["Solutions", "Technology", "Process", "Stories", "FAQ"],
  },
  {
    title: "Practice",
    links: ["About", "Clinicians", "Careers", "Press", "Partners"],
  },
  {
    title: "Patient",
    links: ["Book a scan", "Patient portal", "App for iOS", "App for Android", "Payment plans"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-bone)] pt-16 text-[var(--color-ink)] sm:pt-20 md:pt-24">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-10">
        {/* Top — address + nav */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[var(--color-stone)]/30 pt-12 sm:pt-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <div className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-graphite)]">
              Studio
            </div>
            <address className="mt-4 not-italic text-[15px] leading-[1.6] text-[var(--color-ink)]">
              Smartee Kuwait
              <br />
              Salem Al Mubarak Street
              <br />
              Salmiya · Kuwait City
            </address>
            <div className="mt-6 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-graphite)]">
              Sun – Thu · 09:00 – 21:00
              <br />
              Sat · 10:00 – 18:00
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-graphite)]">
                {col.title}
              </div>
              <ul className="mt-4 flex flex-col gap-1 text-[14px]">
                {col.links.map((l) => (
                  <li key={l}>
                    <Magnetic strength={0.18}>
                      <Link href="#" data-cursor="hover" className="link-underline inline-flex min-h-[36px] items-center">
                        {l}
                      </Link>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2">
            <div className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-graphite)]">
              Reach
            </div>
            <ul className="mt-4 flex flex-col gap-1 text-[14px]">
              <li><a href="mailto:hello@smartee.kw" className="link-underline inline-flex min-h-[36px] items-center">hello@smartee.kw</a></li>
              <li><a href="tel:+96522000000" className="link-underline inline-flex min-h-[36px] items-center">+965 2200 0000</a></li>
              <li><a href="#" className="link-underline inline-flex min-h-[36px] items-center">Instagram</a></li>
              <li><a href="#" className="link-underline inline-flex min-h-[36px] items-center">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE.quart }}
          className="mt-16 select-none md:mt-24"
          aria-hidden
        >
          <div className="font-[var(--font-display)] leading-[0.82] tracking-[-0.05em] text-[clamp(4rem,21vw,22rem)] text-[var(--color-ink)]">
            Smartee<span className="text-[var(--color-iris-500)]">.</span>
          </div>
        </motion.div>

        {/* Foot */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-stone)]/30 py-6 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[var(--color-graphite)] md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-iris-500)]" />
            © {new Date().getFullYear()} Smartee Kuwait · MoH licensed
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="link-underline inline-flex min-h-[36px] items-center">Privacy</Link>
            <Link href="#" className="link-underline inline-flex min-h-[36px] items-center">Terms</Link>
            <Link href="#" className="link-underline inline-flex min-h-[36px] items-center">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
