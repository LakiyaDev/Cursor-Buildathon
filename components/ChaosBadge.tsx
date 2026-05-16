export function ChaosBadge({
  score,
  chaotic,
}: {
  score: number;
  chaotic?: boolean;
}) {
  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${
        chaotic || score >= 70
          ? "bg-red-900/50 text-red-300"
          : score >= 40
            ? "bg-amber-900/40 text-amber-300"
            : "bg-emerald-900/40 text-emerald-300"
      }`}
    >
      Chaos {score}
      {(chaotic || score >= 70) && " · Unstable"}
    </span>
  );
}
