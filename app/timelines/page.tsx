"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { PageShell } from "@/components/PageShell";

export default function TimelinesPage() {
  const timelines = useQuery(api.timelines.list);

  return (
    <PageShell title="Historical timelines">
      {timelines === undefined && <p className="text-zinc-500">Loading…</p>}
      <ul className="grid gap-4 sm:grid-cols-2">
        {timelines?.map((t) => (
          <li key={t._id}>
            <Link
              href={`/timelines/${t.slug}`}
              className="block rounded-lg border border-zinc-800 p-4 hover:border-amber-700"
            >
              <h2 className="font-medium">{t.title}</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {t.startYear}–{t.endYear}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{t.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
