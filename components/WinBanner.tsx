export function WinBanner({ won, chaos }: { won: boolean; chaos: number }) {
  if (won) {
    return (
      <div className="mt-4 rounded-lg border border-emerald-800 bg-emerald-950/40 p-4">
        <p className="text-lg font-medium text-emerald-400">
          History restored — Chaos below 40
        </p>
        <p className="mt-1 text-sm text-zinc-400">Final chaos: {chaos}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-amber-800 bg-amber-950/30 p-4">
      <p className="text-lg font-medium text-amber-400">
        Timeline still unstable — try other fixes
      </p>
      <p className="mt-1 text-sm text-zinc-400">
        Chaos {chaos} — pick fixes until chaos drops below 40.
      </p>
    </div>
  );
}
