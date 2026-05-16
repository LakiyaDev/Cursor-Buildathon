/** Stabilize game UI strings — Person D → Person C. Win when chaos < 40. */

export const CHAOS_WIN_THRESHOLD = 40;

export const stabilizeCopy = {
  intro: {
    heading: "Stabilize this timeline",
    body: "Another historian broke this timeline. Pick corrective decisions to lower the Chaos Score below 40 and restore stability. You win when chaos drops under 40.",
  },
  cta: {
    dashboard: "Stabilize",
    full: "Stabilize timeline",
    submit: "Apply fixes",
    retry: "Try other fixes",
    backToFeed: "Back to dashboard",
    viewTimeline: "View timeline",
  },
  loading: {
    title: "Calculating stability…",
    subtitle: "Reweaving consequences from your choices.",
  },
  win: {
    title: "History restored — Chaos below 40",
    subtitle: "This timeline is stable enough to archive.",
    badge: "WIN",
  },
  lose: {
    title: "Timeline still unstable — try other fixes",
    subtitle: (chaosScore: number) =>
      `Chaos is still ${chaosScore}. Pick different corrective decisions.`,
    badge: "UNSTABLE",
  },
  error: {
    title: "Stabilization failed",
    subtitle: "Could not reach the server. Use ?demo=1 or try again.",
  },
  chaosMeter: {
    stable: "Stable",
    unsettled: "Unsettled",
    chaotic: "Chaotic",
    fracture: "Timeline fracture",
    winHint: "Win when chaos is below 40",
  },
  dashboard: {
    chaosBadge: (score: number) => `Chaos ${score}`,
    view: "View",
    stabilize: "Stabilize",
  },
} as const;

export function chaosBand(score: number): string {
  if (score <= 30) return stabilizeCopy.chaosMeter.stable;
  if (score <= 60) return stabilizeCopy.chaosMeter.unsettled;
  if (score <= 85) return stabilizeCopy.chaosMeter.chaotic;
  return stabilizeCopy.chaosMeter.fracture;
}

export function isStabilizeEligible(chaosScore: number): boolean {
  return chaosScore >= 70;
}

export function didWin(resultingChaosScore: number): boolean {
  return resultingChaosScore < CHAOS_WIN_THRESHOLD;
}
