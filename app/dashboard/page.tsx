"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { PageShell } from "@/components/PageShell";

export default function DashboardPage() {
  const feed = useQuery(api.published.listPublic);

  return (
    <PageShell title="Global multiverse">
      {feed === undefined && <p className="text-zinc-500">Loading timelines…</p>}
      {feed?.length === 0 && (
        <p className="text-zinc-500">
          No published timelines yet. Run <code className="text-amber-500">devSeed:run</code>{" "}
          in Convex dashboard after signing in once.
        </p>
      )}
      <ul className="grid gap-4">
        {feed?.map((item) => (
          <li
            key={item._id}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-medium">{item.title}</h2>
                <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  by {item.authorName} · Chaos {item.chaosScore}
                </p>
              </div>
              {item.isChaotic && (
                <span className="rounded bg-red-900/50 px-2 py-1 text-xs text-red-300">
                  Chaotic
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href={`/simulation/${item.simulationId}`}
                className="text-sm text-amber-500 hover:underline"
              >
                View
              </Link>
              {item.isChaotic && (
                <Link
                  href={`/stabilize/${item.simulationId}`}
                  className="text-sm text-emerald-400 hover:underline"
                >
                  Stabilize
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
