"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { ReactNode } from "react";
import { api } from "@/convex/_generated/api";

export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  const stats = useQuery(api.users.getPlayerStats);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-amber-500">
            AltEra
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
        </div>
        <div className="flex flex-col items-end gap-1 text-sm">
          {stats && (
            <span className="text-amber-500/90">Wins: {stats.stabilizeWins}</span>
          )}
          <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-200">
            Feed
          </Link>
          <Link href="/signin" className="text-zinc-400 hover:text-zinc-200">
            Sign in
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
