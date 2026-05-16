import Link from "next/link";
import { ReactNode } from "react";

export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-amber-500">
            AltEra
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
        </div>
        <Link href="/signin" className="text-sm text-zinc-400 hover:text-zinc-200">
          Sign in
        </Link>
      </header>
      {children}
    </div>
  );
}
