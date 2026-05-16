/** True when Gemini API key has no quota (429 / RESOURCE_EXHAUSTED). */
export function isGeminiQuotaError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes("429") ||
    msg.includes("Too Many Requests") ||
    msg.includes("quota") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("limit: 0")
  );
}
