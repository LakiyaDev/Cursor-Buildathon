import Link from "next/link";
import { ChaosBadge } from "./ChaosBadge";

export function PublishedTimelineCard({
  simulationId,
  title,
  description,
  authorName,
  chaosScore,
  isChaotic,
}: {
  simulationId: string;
  title: string;
  description: string;
  authorName?: string;
  chaosScore: number;
  isChaotic: boolean;
}) {
  return (
    <li className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-medium">{title}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{description}</p>
          <p className="mt-2 text-xs text-zinc-500">by {authorName ?? "Historian"}</p>
        </div>
        <ChaosBadge score={chaosScore} chaotic={isChaotic} />
      </div>
      <div className="mt-4 flex gap-3">
        <Link
          href={`/simulation/${simulationId}`}
          className="text-sm text-amber-500 hover:underline"
        >
          View
        </Link>
        {isChaotic && (
          <Link
            href={`/stabilize/${simulationId}`}
            className="text-sm text-emerald-400 hover:underline"
          >
            Stabilize timeline
          </Link>
        )}
      </div>
    </li>
  );
}
