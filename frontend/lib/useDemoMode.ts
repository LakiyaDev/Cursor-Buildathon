"use client";

import { useSearchParams } from "next/navigation";

export function useDemoMode(): boolean {
  const params = useSearchParams();
  return params.get("demo") === "1";
}
