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

  function authErrorMessage(err: unknown, flow: "signIn" | "signUp"): string {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("Invalid password")) {
      return "Password must be at least 8 characters.";
    }
    if (msg.includes("InvalidAccountId")) {
      return flow === "signIn"
        ? "No account for this email. Create an account first."
        : "Could not create account. Try again.";
    }
    if (msg.includes("InvalidSecret") || msg.includes("Invalid credentials")) {
      return "Wrong password. Try again.";
    }
    if (msg.includes("already exists")) {
      return "An account with this email already exists. Sign in instead.";
    }
    return flow === "signIn"
      ? "Sign in failed. Try again or sign up."
      : "Sign up failed. Try again or sign in.";
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmedEmail = email.trim();

    if (mode === "signUp" && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      await signIn("password", {
        email: trimmedEmail,
        password,
        flow: mode,
      });
      router.push("/timelines");
    } catch (err) {
      setError(authErrorMessage(err, mode));
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
          placeholder={
            mode === "signUp" ? "Password (min 8 characters)" : "Password"
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          minLength={mode === "signUp" ? 8 : undefined}
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
