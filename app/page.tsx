import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-0px)] flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-500/90">
        AltEra
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
        Simulate the Unseen
      </h1>
      <p className="mt-5 max-w-lg text-lg text-zinc-400">
        Change one moment in history. Watch the butterfly effect reshape the
        world.
      </p>
      <Link
        href="/timelines"
        className="mt-10 rounded-lg bg-amber-600 px-8 py-3 font-medium text-zinc-950 transition hover:bg-amber-500"
      >
        Explore timelines
      </Link>
    </main>
  );
}
