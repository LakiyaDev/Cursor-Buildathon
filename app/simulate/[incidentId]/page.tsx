"use client";

import { useAction, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageShell } from "@/components/PageShell";
import { useDemoMode } from "@/lib/useDemoMode";

function generationErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("429") || msg.includes("quota")) {
    return "Gemini API quota is exhausted. Retry shortly, add a new API key in Convex, or use ?demo=1 in the URL.";
  }
  return "Generation failed. Try again or add ?demo=1 to the URL.";
}

export default function SimulatePage() {
  const params = useParams();
  const incidentId = params.incidentId as Id<"timelineIncidents">;
  const router = useRouter();
  const createDraft = useMutation(api.simulations.createDraft);
  const setGenerating = useMutation(api.simulations.setGenerating);
  const generatePhaseOne = useAction(api.actions.generatePhaseOne.run);
  const demo = useDemoMode();
  const [whatIf, setWhatIf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (whatIf.trim().length < 5) return;
    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      const simulationId = await createDraft({
        source: "curated",
        changedIncidentId: incidentId,
        whatIfPrompt: whatIf.trim(),
      });
      await setGenerating({ simulationId });
      const result = await generatePhaseOne({ simulationId, demo });

      if (result.usedDemoFallback) {
        setNotice("Live AI quota exceeded — loaded demo timeline so you can keep going.");
      }
      router.push(`/simulation/${simulationId}${demo ? "?demo=1" : ""}`);
    } catch (err) {
      setError(generationErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <PageShell title="What if…?">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="text-sm text-zinc-400">
          One sentence that changes history (max 200 characters)
        </label>
        <textarea
          value={whatIf}
          onChange={(e) => setWhatIf(e.target.value.slice(0, 200))}
          rows={3}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          placeholder="The assassin hesitates and the motorcade escapes Sarajevo."
          required
        />
        {notice && <p className="text-sm text-amber-400">{notice}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-amber-600 py-2 font-medium text-zinc-950 disabled:opacity-50"
        >
          {loading ? "Rewriting history…" : "Generate alternate timeline"}
        </button>
      </form>
    </PageShell>
  );
}
