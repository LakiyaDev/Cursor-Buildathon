"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PageShell } from "@/components/PageShell";

export default function MuseumPage() {
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const createScan = useMutation(api.museumScans.create);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function uploadFile(file: File): Promise<string> {
    const url = await generateUploadUrl();
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await res.json();
    return storageId;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const artifact = (form.elements.namedItem("artifact") as HTMLInputElement).files?.[0];
    const label = (form.elements.namedItem("label") as HTMLInputElement).files?.[0];
    if (!artifact || !label) return;
    setLoading(true);
    try {
      const artifactImageId = await uploadFile(artifact);
      const labelImageId = await uploadFile(label);
      const scanId = await createScan({
        artifactImageId: artifactImageId as Id<"_storage">,
        labelImageId: labelImageId as Id<"_storage">,
      });
      router.push(`/museum/scan/${scanId}`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <PageShell title="Scan museum artifact">
      <p className="text-zinc-400">
        Upload a photo of the artifact and a photo of its display label.
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        <label className="text-sm">
          Artifact photo
          <input name="artifact" type="file" accept="image/*" className="mt-1 block w-full" />
        </label>
        <label className="text-sm">
          Label photo
          <input name="label" type="file" accept="image/*" className="mt-1 block w-full" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-amber-600 py-2 font-medium text-zinc-950 disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Analyze"}
        </button>
      </form>
    </PageShell>
  );
}
