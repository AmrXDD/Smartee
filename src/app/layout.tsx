import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/providers/cursor";
import { IntroLoader } from "@/components/providers/intro-loader";
import { IntroProvider } from "@/components/providers/intro-context";
import { Navbar } from "@/components/nav/navbar";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-editorial",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smartee Kuwait — Tomorrow's smile, today.",
  description:
    "Kuwait's clear-aligner studio. Scanned, simulated, and shaped by a clinical AI pipeline that respects the millimeter.",
  metadataBase: new URL("https://smartee.kw"),
  openGraph: {
    title: "Smartee Kuwait",
    description: "Tomorrow's smile, today.",
    type: "website",
    locale: "en_KW",
  },
};

export const viewport: Viewport = {
  themeColor: "oklch(98.4% 0.006 285)",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${editorial.variable} ${mono.variable}`}>
      <body className="relative bg-[var(--color-bone)] text-[var(--color-ink)] antialiased">
        <IntroProvider>
          <IntroLoader />
          <SmoothScroll />
          <Cursor />
          <Navbar />
          <main id="main" className="relative">{children}</main>
        </IntroProvider>
      </body>
    </html>
  );
}
