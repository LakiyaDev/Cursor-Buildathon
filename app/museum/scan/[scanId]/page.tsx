"use client";

import { useAction, useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageShell } from "@/components/PageShell";
import { useDemoMode } from "@/lib/useDemoMode";

export default function MuseumScanPage() {
  const params = useParams();
  const scanId = params.scanId as Id<"museumScans">;
  const scan = useQuery(api.museumScans.get, { scanId });
  const analyze = useAction(api.actions.analyzeMuseumPhotos.run);
  const durations = useAction(api.actions.suggestTimeDurations.run);
  const createDraft = useMutation(api.simulations.createDraft);
  const setDuration = useMutation(api.simulations.setMuseumDuration);
  const generateTimeline = useAction(api.actions.generateTimelineFromDuration.run);
  const router = useRouter();
  const demo = useDemoMode();
  const [durationOptions, setDurationOptions] = useState<
    { id: string; label: string; description: string }[] | null
  >(null);

  useEffect(() => {
    if (scan?.status === "uploaded") {
      void analyze({ scanId, demo });
    }
  }, [scan?.status, scanId, analyze]);

  useEffect(() => {
    if (scan?.status === "analyzed" && !durationOptions) {
      void durations({ scanId, demo }).then((r) => setDurationOptions(r.options));
    }
  }, [scan?.status, scanId, durations, durationOptions]);

  async function pickDuration(id: string, label: string) {
    const simulationId = await createDraft({ source: "museum", museumScanId: scanId });
    await setDuration({ simulationId, selectedDurationId: id, selectedDurationLabel: label });
    await generateTimeline({ simulationId, durationId: id, demo });
    router.push(`/simulation/${simulationId}`);
  }

  return (
    <PageShell title="Museum scan">
      {!scan && <p className="text-zinc-500">Loading…</p>}
      {scan && (
        <div className="space-y-4">
          <p>
            <strong>{scan.extractedArtifactName ?? "Analyzing…"}</strong>
          </p>
          {scan.extractedLabelText && (
            <p className="text-sm text-zinc-400">{scan.extractedLabelText}</p>
          )}
          {durationOptions && (
            <ul className="grid gap-3">
              {durationOptions.map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => pickDuration(d.id, d.label)}
                    className="w-full rounded border border-zinc-700 p-3 text-left hover:border-amber-600"
                  >
                    <p className="font-medium">{d.label}</p>
                    <p className="text-sm text-zinc-400">{d.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </PageShell>
  );
}
