"use node";

import { GoogleGenerativeAI } from "@google/generative-ai";

const TEXT_MODEL = "gemini-2.0-flash";

function getClient(): GoogleGenerativeAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set in Convex environment");
  return new GoogleGenerativeAI(key);
}

export async function generateJson<T>(
  system: string,
  user: string,
): Promise<T> {
  const model = getClient().getGenerativeModel({
    model: TEXT_MODEL,
    generationConfig: {
      responseMimeType: "application/json",
    },
    systemInstruction: system,
  });

  const result = await model.generateContent(user);
  const text = result.response.text();
  return JSON.parse(text) as T;
}

export async function generateJsonWithImages<T>(
  system: string,
  parts: Array<{ text?: string; imageUrl?: string }>,
): Promise<T> {
  const model = getClient().getGenerativeModel({
    model: TEXT_MODEL,
    generationConfig: {
      responseMimeType: "application/json",
    },
    systemInstruction: system,
  });

  const contentParts = await Promise.all(
    parts.map(async (p) => {
      if (p.text) return { text: p.text };
      if (p.imageUrl) {
        const res = await fetch(p.imageUrl);
        const buf = await res.arrayBuffer();
        const base64 = Buffer.from(buf).toString("base64");
        const mime = p.imageUrl.endsWith(".png")
          ? "image/png"
          : "image/jpeg";
        return { inlineData: { data: base64, mimeType: mime } };
      }
      return { text: "" };
    }),
  );

  const result = await model.generateContent({
    contents: [{ role: "user", parts: contentParts }],
  });
  const text = result.response.text();
  return JSON.parse(text) as T;
}

/** Returns PNG bytes or null if generation unavailable. */
export async function generateRelicPng(prompt: string): Promise<Uint8Array | null> {
  try {
    const model = getClient().getGenerativeModel({
      model: "gemini-2.0-flash-preview-image-generation",
      generationConfig: {
        responseModalities: ["image", "text"],
      } as Record<string, unknown>,
    });
    const result = await model.generateContent(prompt);
    const parts = result.response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if ("inlineData" in part && part.inlineData?.data) {
        return Uint8Array.from(Buffer.from(part.inlineData.data, "base64"));
      }
    }
    return null;
  } catch {
    return null;
  }
}
