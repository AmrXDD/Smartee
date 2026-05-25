"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type IntroStage = "scanning" | "complete" | "revealing" | "done";

const SCAN_MS = 2400;
const COMPLETE_HOLD_MS = 420;
const REVEAL_MS = 900;

type Ctx = {
  stage: IntroStage;
  revealStarted: boolean;
  scanDone: boolean;
};

const IntroCtx = createContext<Ctx>({
  stage: "scanning",
  revealStarted: false,
  scanDone: false,
});

export function useIntro() {
  return useContext(IntroCtx);
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<IntroStage>("scanning");

  useEffect(() => {
    const t1 = window.setTimeout(() => setStage("complete"), SCAN_MS);
    const t2 = window.setTimeout(() => setStage("revealing"), SCAN_MS + COMPLETE_HOLD_MS);
    const t3 = window.setTimeout(
      () => setStage("done"),
      SCAN_MS + COMPLETE_HOLD_MS + REVEAL_MS
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const value: Ctx = {
    stage,
    scanDone: stage !== "scanning",
    revealStarted: stage === "revealing" || stage === "done",
  };

  return <IntroCtx.Provider value={value}>{children}</IntroCtx.Provider>;
}
