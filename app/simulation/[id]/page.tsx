"use client";

import { useAction, useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageShell } from "@/components/PageShell";

export default function SimulationPage() {
  const params = useParams();
  const simulationId = params.id as Id<"simulations">;
  const sim = useQuery(api.simulations.get, { simulationId });
  const selectBranch = useMutation(api.simulations.selectBranch);
  const generatePhaseTwo = useAction(api.actions.generatePhaseTwo.run);
  const save = useMutation(api.simulations.save);
  const publish = useMutation(api.published.publish);
  const [loading, setLoading] = useState(false);

  if (sim === undefined) {
    return (
      <PageShell title="Simulation">
        <p className="text-zinc-500">Loading…</p>
      </PageShell>
    );
  }

  if (sim === null) {
    return (
      <PageShell title="Simulation">
        <p>Not found or private.</p>
      </PageShell>
    );
  }

  async function onBranch(branchId: string) {
    setLoading(true);
    await selectBranch({ simulationId, selectedBranchId: branchId });
    await generatePhaseTwo({ simulationId });
    setLoading(false);
  }

  return (
    <PageShell title="Alternate timeline">
      {sim.chaosScore != null && (
        <p className="text-lg">
          Chaos score: <span className="font-semibold text-amber-500">{sim.chaosScore}</span>
        </p>
      )}
      <section className="mt-6 space-y-3">
        <h2 className="text-sm uppercase tracking-wider text-zinc-500">Events</h2>
        {sim.events.map((ev, i) => (
          <article key={i} className="rounded border border-zinc-800 p-3">
            <p className="text-xs text-amber-600">{ev.year}</p>
            <h3 className="font-medium">{ev.title}</h3>
            <p className="text-sm text-zinc-400">{ev.description}</p>
          </article>
        ))}
      </section>
      {sim.branchChoices && sim.status === "phase1" && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm uppercase tracking-wider text-zinc-500">
            Choose a branch
          </h2>
          <div className="grid gap-3">
            {sim.branchChoices.map((b) => (
              <button
                key={b.id}
                type="button"
                disabled={loading}
                onClick={() => onBranch(b.id)}
                className="rounded border border-zinc-700 p-3 text-left hover:border-amber-600"
              >
                <p className="font-medium">{b.title}</p>
                <p className="text-sm text-zinc-400">{b.description}</p>
              </button>
            ))}
          </div>
        </section>
      )}
      {sim.lostToHistory && (
        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm uppercase text-red-400">Extinct</h2>
            <ul className="mt-2 list-disc pl-4 text-sm text-zinc-400">
              {sim.lostToHistory.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm uppercase text-emerald-400">Born</h2>
            <ul className="mt-2 list-disc pl-4 text-sm text-zinc-400">
              {sim.gainedByHumanity?.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {(sim.status === "editable" || sim.status === "saved") && (
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => save({ simulationId })}
            className="rounded border border-zinc-600 px-4 py-2 text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() =>
              publish({
                simulationId,
                title: sim.events[0]?.title ?? "Alternate timeline",
                description: sim.whatIfPrompt ?? "",
              })
            }
            className="rounded bg-amber-600 px-4 py-2 text-sm font-medium text-zinc-950"
          >
            Publish
          </button>
        </div>
      )}
    </PageShell>
  );
}
