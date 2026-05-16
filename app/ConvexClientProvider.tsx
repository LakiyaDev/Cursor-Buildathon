"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

let convex: ConvexReactClient | undefined;

function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return undefined;
  if (!convex) {
    convex = new ConvexReactClient(url);
  }
  return convex;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const client = getConvexClient();
  if (!client) {
    return <>{children}</>;
  }
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}
