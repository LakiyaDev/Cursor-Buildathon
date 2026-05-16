"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/PageShell";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await signIn("password", { email, password, flow: mode });
      router.push("/timelines");
    } catch {
      setError("Sign in failed. Try again or sign up.");
    }
  }

  return (
    <PageShell title={mode === "signIn" ? "Sign in" : "Create account"}>
      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          required
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="rounded bg-amber-600 py-2 font-medium text-zinc-950 hover:bg-amber-500"
        >
          {mode === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <button
          type="button"
          className="text-sm text-zinc-400 hover:text-zinc-200"
          onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
        >
          {mode === "signIn" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </form>
    </PageShell>
  );
}
