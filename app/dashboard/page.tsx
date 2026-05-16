"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PageShell } from "@/components/PageShell";
import { PublishedTimelineCard } from "@/components/PublishedTimelineCard";

export default function DashboardPage() {
  const feed = useQuery(api.published.listPublic);

  return (
    <PageShell title="Global multiverse">
      <p className="text-sm text-zinc-400">
        Chaotic timelines need stabilization — chaos 70+ can be fixed below 40.
      </p>
      {feed === undefined && <p className="text-zinc-500">Loading timelines…</p>}
      {feed?.length === 0 && (
        <p className="text-zinc-500">
          No published timelines yet. Run{" "}
          <code className="text-amber-500">devSeed:run</code> with{" "}
          <code className="text-amber-500">force: true</code> in Convex after signing in.
        </p>
      )}
      <ul className="grid gap-4">
        {feed?.map((item) => (
          <PublishedTimelineCard
            key={item._id}
            simulationId={item.simulationId}
            title={item.title}
            description={item.description}
            authorName={item.authorName}
            chaosScore={item.chaosScore}
            isChaotic={item.isChaotic}
          />
        ))}
      </ul>
    </PageShell>
  );
}
