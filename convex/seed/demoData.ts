import type { BranchChoice, TimelineEvent } from "../types/contracts";

export const demoPhase1 = {
  chaosScore: 87,
  immediateRipple: [
    {
      year: "1915",
      title: "A Diplomatic Crisis Without War",
      description:
        "The failed assassination attempt creates outrage, but European leaders delay military escalation.",
      impactLevel: "high" as const,
    },
  ] satisfies TimelineEvent[],
  generationalShift: [
    {
      year: "1940",
      title: "Empires Decay Slowly",
      description:
        "Without the shock of World War I, old European empires survive longer but face deeper internal unrest.",
      impactLevel: "high" as const,
    },
  ] satisfies TimelineEvent[],
  branchChoices: [
    {
      id: "branch_1",
      title: "Europe chooses diplomacy",
      description:
        "Major powers form a tense diplomatic council to avoid continent-wide war.",
    },
    {
      id: "branch_2",
      title: "Militarism intensifies",
      description:
        "Nations avoid war temporarily but expand armies and weapons programs.",
    },
    {
      id: "branch_3",
      title: "Nationalist revolts spread",
      description:
        "Ethnic and nationalist movements challenge the old imperial order from within.",
    },
  ] satisfies BranchChoice[],
};

export const demoPhase2 = {
  globalConsequence: [
    {
      year: "1960",
      title: "A Fractured Peace",
      description:
        "Europe avoids world war but struggles with colonial independence movements and economic rivalry.",
      impactLevel: "high" as const,
    },
  ] satisfies TimelineEvent[],
  lostToHistory: [
    "The original Treaty of Versailles",
    "The League of Nations in its known form",
  ],
  gainedByHumanity: [
    "A permanent European crisis council",
    "Delayed mechanized warfare doctrine",
  ],
  relicPrompt:
    "A museum photograph of a 1930s European diplomatic council medal from an alternate timeline where World War I never began, brass and enamel, archival lighting.",
};

export const demoVisionAnalyze = {
  artifactName: "Archduke Franz Ferdinand Memorial Medallion",
  artifactType: "art" as const,
  labelText:
    "Assassination attempt, Sarajevo, 28 June 1914. Exhibit A, Imperial War Museum.",
  estimatedEra: "1914",
  historicalContext:
    "Commemorates the near-assassination of Archduke Franz Ferdinand in Sarajevo.",
  confidence: 0.92,
};

export const demoDurationOptions = {
  options: [
    {
      id: "dur_1",
      label: "10 years",
      spanYears: 10,
      description: "Immediate aftermath of the divergent moment",
    },
    {
      id: "dur_2",
      label: "50 years",
      spanYears: 50,
      description: "Generational transformation",
    },
    {
      id: "dur_3",
      label: "75 years",
      spanYears: 75,
      description: "Long arc to the modern era",
    },
  ],
};

export const demoStabilizeChoices = [
  {
    id: "fix_1",
    title: "Restore diplomatic alliances",
    description: "Reforge treaties that collapsed after the divergence.",
  },
  {
    id: "fix_2",
    title: "Contain militarization",
    description: "Impose arms limits on rising powers.",
  },
  {
    id: "fix_3",
    title: "Legitimize successor states",
    description: "Recognize new nations to reduce revolt chaos.",
  },
];
