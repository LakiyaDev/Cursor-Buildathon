/** Shared contracts for B/C/D — keep in sync with convex/validators.ts */

export type ImpactLevel = "low" | "medium" | "high";

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  impactLevel: ImpactLevel;
};

export type BranchChoice = {
  id: string;
  title: string;
  description: string;
};

export type SimulationSource = "museum" | "curated";

export type SimulationStatus =
  | "draft"
  | "analyzing"
  | "generating"
  | "phase1"
  | "phase2"
  | "editable"
  | "saved"
  | "published";

export const CHAOS_WIN_THRESHOLD = 40;
export const CHAOS_CHAOTIC_THRESHOLD = 70;
