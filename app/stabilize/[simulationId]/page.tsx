"use client";

import { useAction, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageShell } from "@/components/PageShell";
import { WinBanner } from "@/components/WinBanner";
import { useDemoMode } from "@/lib/useDemoMode";

export default function StabilizePage() {
  const params = useParams();
  const simulationId = params.simulationId as Id<"simulations">;
  const demo = useDemoMode();
  const startChallenge = useAction(api.actions.stabilizeTimeline.startChallenge);
  const submitFixes = useAction(api.actions.stabilizeTimeline.submitFixes);
  const recordAttempt = useMutation(api.stabilization.recordAttempt);
  const [choices, setChoices] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<{ chaos: number; won: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void startChallenge({ simulationId, demo }).then((r) => {
      setChoices(r.correctiveChoices);
      if (demo) {
        setSelected(["fix_2", "fix_4"]);
      }
    });
  }, [simulationId, demo, startChallenge]);

  async function onSubmit() {
    setSubmitting(true);
    try {
      const r = await submitFixes({
        simulationId,
        selectedChoiceIds: selected,
        correctiveChoices: choices,
        demo,
      });
      await recordAttempt({
        targetSimulationId: simulationId,
        correctiveChoices: choices,
        selectedChoiceIds: selected,
        resultingChaosScore: r.resultingChaosScore,
      });
      setResult({ chaos: r.resultingChaosScore, won: r.won });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell title="Stabilize timeline">
      <p className="text-zinc-400">
        Pick fixes until chaos drops below 40.
      </p>
      <ul className="mt-6 space-y-3">
        {choices.map((c) => (
          <li key={c.id}>
            <label className="flex cursor-pointer gap-3 rounded border border-zinc-800 p-3">
              <input
                type="checkbox"
                checked={selected.includes(c.id)}
                onChange={(e) => {
                  setSelected((prev) =>
                    e.target.checked ? [...prev, c.id] : prev.filter((x) => x !== c.id),
                  );
                }}
              />
              <span>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-zinc-400">{c.description}</p>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onSubmit}
        disabled={selected.length === 0 || submitting}
        className="mt-6 rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-zinc-950 disabled:opacity-50"
      >
        {submitting ? "Applying fixes…" : "Stabilize timeline"}
      </button>
      {result && <WinBanner won={result.won} chaos={result.chaos} />}
    </PageShell>
  );
}
