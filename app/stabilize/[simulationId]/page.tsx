"use client";

import { useAction, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageShell } from "@/components/PageShell";

export default function StabilizePage() {
  const params = useParams();
  const simulationId = params.simulationId as Id<"simulations">;
  const startChallenge = useAction(api.actions.stabilizeTimeline.startChallenge);
  const submitFixes = useAction(api.actions.stabilizeTimeline.submitFixes);
  const recordAttempt = useMutation(api.stabilization.recordAttempt);
  const [choices, setChoices] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<{ chaos: number; won: boolean } | null>(null);

  useEffect(() => {
    void startChallenge({ simulationId }).then((r) => setChoices(r.correctiveChoices));
  }, [simulationId, startChallenge]);

  async function onSubmit() {
    const r = await submitFixes({
      simulationId,
      selectedChoiceIds: selected,
      correctiveChoices: choices,
    });
    await recordAttempt({
      targetSimulationId: simulationId,
      correctiveChoices: choices,
      selectedChoiceIds: selected,
      resultingChaosScore: r.resultingChaosScore,
    });
    setResult({ chaos: r.resultingChaosScore, won: r.won });
  }

  return (
    <PageShell title="Stabilize timeline">
      <p className="text-zinc-400">
        Pick corrective decisions to lower chaos below 40 and restore stability.
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
        disabled={selected.length === 0}
        className="mt-6 rounded bg-emerald-600 px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        Apply fixes
      </button>
      {result && (
        <p className={`mt-4 text-lg ${result.won ? "text-emerald-400" : "text-amber-400"}`}>
          Chaos: {result.chaos} — {result.won ? "You win!" : "Still unstable"}
        </p>
      )}
    </PageShell>
  );
}
