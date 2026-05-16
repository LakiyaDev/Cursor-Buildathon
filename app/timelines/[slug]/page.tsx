"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { PageShell } from "@/components/PageShell";

export default function TimelineDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = useQuery(api.timelines.getBySlug, { slug });

  if (data === undefined) {
    return (
      <PageShell title="Timeline">
        <p className="text-zinc-500">Loading…</p>
      </PageShell>
    );
  }

  if (data === null) {
    return (
      <PageShell title="Not found">
        <p>Timeline not found.</p>
      </PageShell>
    );
  }

  return (
    <PageShell title={data.timeline.title}>
      <p className="text-zinc-400">{data.timeline.summary}</p>
      <ul className="mt-8 space-y-4">
        {data.incidents.map((inc) => (
          <li key={inc._id} className="rounded-lg border border-zinc-800 p-4">
            <p className="text-xs text-amber-500">{inc.year}</p>
            <h3 className="font-medium">{inc.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{inc.description}</p>
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-zinc-500">Context briefing</summary>
              <p className="mt-2 text-zinc-400">
                <strong className="text-zinc-300">Real outcome:</strong> {inc.realOutcome}
              </p>
            </details>
            <Link
              href={`/simulate/${inc._id}`}
              className="mt-4 inline-block text-sm text-amber-500 hover:underline"
            >
              Change this moment →
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
