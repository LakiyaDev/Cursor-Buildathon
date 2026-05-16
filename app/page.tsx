import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
      <Hero />
      <Ctas />
    </main>
  );
}

function Hero() {
  return (
    <div className="max-w-2xl text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-500/90">
        AltEra
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Simulate the Unseen
      </h1>
      <p className="mt-4 text-zinc-400">
        Change one moment in history — or scan a museum artifact — and watch a
        new timeline unfold.
      </p>
    </div>
  );
}

function Ctas() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link
        href="/museum"
        className="rounded-lg bg-amber-600 px-8 py-3 text-center font-medium text-zinc-950 hover:bg-amber-500"
      >
        Scan museum artifact
      </Link>
      <Link
        href="/timelines"
        className="rounded-lg border border-zinc-700 px-8 py-3 text-center font-medium hover:border-zinc-500"
      >
        Browse timelines
      </Link>
      <Link
        href="/dashboard"
        className="rounded-lg border border-zinc-800 px-8 py-3 text-center text-sm text-zinc-400 hover:text-zinc-200"
      >
        Global dashboard
      </Link>
    </div>
  );
}
