import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-[var(--color-obsidian)] px-6 text-[var(--color-bone)]">
      <div className="flex max-w-[640px] flex-col items-start gap-8">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-[var(--color-bone)]/55">
          <span className="text-[var(--color-iris-300)]">404</span>
          <span className="block h-px w-10 bg-[var(--color-bone)]/30" />
          <span>Off-arch</span>
        </div>

        <h1 className="font-[var(--font-display)] text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.035em]">
          This page slipped{" "}
          <span className="font-[var(--font-editorial)] italic text-[var(--color-iris-200)]">out of alignment.</span>
        </h1>

        <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[var(--color-bone)]/65">
          The path you asked for doesn’t exist in our studio. Head back to the main scan and we’ll route you forward.
        </p>

        <Link
          href="/"
          className="group inline-flex h-12 items-center gap-3 rounded-full bg-[var(--color-bone)] pl-6 pr-2 text-[14px] font-medium text-[var(--color-ink)] transition-transform duration-500 ease-[var(--ease-quart)] hover:scale-[1.02]"
        >
          Return to studio
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-iris-500)] text-[var(--color-bone)] transition-transform duration-500 group-hover:rotate-45">
            <svg width="11" height="11" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
          </span>
        </Link>
      </div>
    </main>
  );
}
