import type { BranchChoice, TimelineEvent } from "../types/contracts";
import { demoPhase1, demoPhase2 } from "../seed/demoData";

export type FixtureContext = {
  timelineSlug?: string;
  incidentTitle?: string;
  incidentYear?: string;
};

type Phase1Fixture = {
  chaosScore: number;
  immediateRipple: TimelineEvent[];
  generationalShift: TimelineEvent[];
  branchChoices: BranchChoice[];
};

type Phase2Fixture = {
  globalConsequence: TimelineEvent[];
  lostToHistory: string[];
  gainedByHumanity: string[];
  relicPrompt: string;
};

const demoRomanPhase1: Phase1Fixture = {
  chaosScore: 82,
  immediateRipple: [
    {
      year: "44 BC",
      title: "The Ides End Differently",
      description:
        "Caesar survives the senate attack wounded but alive; Rome freezes as factions arm for a constitutional crisis.",
      impactLevel: "high",
    },
  ],
  generationalShift: [
    {
      year: "200",
      title: "A Republic That Never Fully Dies",
      description:
        "Without the assassination's shock, Rome reforms in fits and starts—never quite becoming the empire we remember.",
      impactLevel: "high",
    },
  ],
  branchChoices: [
    {
      id: "branch_1",
      title: "Caesar reforms the Republic",
      description:
        "Caesar uses his survival to push land reform, term limits, and a new senatorial compact.",
    },
    {
      id: "branch_2",
      title: "The Senate reasserts control",
      description:
        "Brutus and the optimates declare a restored Republic and purge Caesar's loyalists.",
    },
    {
      id: "branch_3",
      title: "Civil war reignites",
      description:
        "Loyalist legions march on Rome; Italy fractures between populares and optimates again.",
    },
  ],
};

const demoRomanPhase2: Phase2Fixture = {
  globalConsequence: [
    {
      year: "476",
      title: "No Single Emperor, No Single Fall",
      description:
        "The Western territories splinter into federated republics rather than collapsing under one last emperor.",
      impactLevel: "high",
    },
  ],
  lostToHistory: [
    "The triumph of Augustus as sole princeps",
    "The Pax Romana under a unified imperial bureaucracy",
  ],
  gainedByHumanity: [
    "A patchwork of Latin city-republics with elected magistrates",
    "Delayed collapse of Mediterranean trade networks",
  ],
  relicPrompt:
    "A weathered bronze fasces from an alternate timeline where the Roman Republic survived past Caesar, displayed in a Vatican side gallery, archival lighting.",
};

const demoKandyanPhase1: Phase1Fixture = {
  chaosScore: 78,
  immediateRipple: [
    {
      year: "1815",
      title: "The Rebellion of the Chiefs",
      description:
        "Instead of signing the convention, Kandyan chieftains reject British envoys and rally behind the king.",
      impactLevel: "high",
    },
  ],
  generationalShift: [
    {
      year: "1890",
      title: "A Divided Island Kingdom",
      description:
        "The highlands remain independent in name while coastal ports fall under uneven European influence.",
      impactLevel: "high",
    },
  ],
  branchChoices: [
    {
      id: "branch_1",
      title: "The king rallies the highlands",
      description:
        "Sri Vikrama Rajasinha mobilizes Kandyan forces to expel British residents from the interior.",
    },
    {
      id: "branch_2",
      title: "Chiefs negotiate a protectorate",
      description:
        "Moderate chieftains seek British recognition of the monarchy in exchange for trade access.",
    },
    {
      id: "branch_3",
      title: "Guerrilla war spreads island-wide",
      description:
        "Lowland and highland militias coordinate hit-and-run campaigns against colonial garrisons.",
    },
  ],
};

const demoKandyanPhase2: Phase2Fixture = {
  globalConsequence: [
    {
      year: "1948",
      title: "Independence Without Partition",
      description:
        "A federated Ceylon emerges earlier, blending Kandyan law with modern constitutional monarchy.",
      impactLevel: "high",
    },
  ],
  lostToHistory: [
    "British colonial rule over the entire island",
    "The rapid expansion of coffee and tea plantations",
  ],
  gainedByHumanity: [
    "Survival of the Kandyan monarchy",
    "Preservation of traditional Kandyan administrative systems",
  ],
  relicPrompt:
    "A gilded Kandyan royal seal from an alternate 1820s where the Convention never passed, brass and enamel, museum display case.",
};

const demoLankaAncientPhase1: Phase1Fixture = {
  chaosScore: 72,
  immediateRipple: [
    {
      year: "200",
      title: "The Kingdom Holds",
      description:
        "A decisive local victory delays foreign occupation and buys a generation of rebuilding.",
      impactLevel: "high",
    },
  ],
  generationalShift: [
    {
      year: "900",
      title: "Irrigation and Faith Reshape the Realm",
      description:
        "Tank networks and monastic institutions anchor a distinct Sinhalese civilization on the island.",
      impactLevel: "medium",
    },
  ],
  branchChoices: [
    {
      id: "branch_1",
      title: "Monks mediate the crisis",
      description: "The sangha brokers peace between rival claimants and foreign envoys.",
    },
    {
      id: "branch_2",
      title: "Warriors resist invasion",
      description: "Regional armies unite under a martial dynasty to repel occupiers.",
    },
    {
      id: "branch_3",
      title: "Trade alliances shift power",
      description: "Merchant guilds fund mercenaries and reshape who rules the capital.",
    },
  ],
};

const demoLankaAncientPhase2: Phase2Fixture = {
  globalConsequence: [
    {
      year: "1200",
      title: "A Lasting Island Polity",
      description:
        "Sri Lanka remains a regional power broker between South India and Southeast Asian trade routes.",
      impactLevel: "high",
    },
  ],
  lostToHistory: ["Foreign domination of the island's interior capitals"],
  gainedByHumanity: ["Hydraulic civilization traditions preserved for centuries"],
  relicPrompt:
    "A stone inscription from an alternate Sri Lankan kingdom that never fell to invasion, weathered granite, museum lighting.",
};

function resolveSlug(ctx: FixtureContext): string {
  if (ctx.timelineSlug) return ctx.timelineSlug;
  const title = (ctx.incidentTitle ?? "").toLowerCase();
  const year = ctx.incidentYear ?? "";
  if (
    title.includes("caesar") ||
    title.includes("roman") ||
    title.includes("milan") ||
    title.includes("odoacer") ||
    title.includes("empire") ||
    year.includes("BC") ||
    (year.includes("476") || year === "313")
  ) {
    return "roman-empire";
  }
  if (title.includes("kandyan") || title.includes("convention") || year === "1815") {
    return "mahanuwara";
  }
  if (title.includes("franz") || title.includes("lusitania") || title.includes("versailles")) {
    return "wwi";
  }
  if (
    title.includes("anuradhapura") ||
    title.includes("polonnaruwa") ||
    title.includes("chola") ||
    title.includes("mahinda") ||
    title.includes("parakramabahu")
  ) {
    return "anuradhapura";
  }
  return "wwi";
}

export function pickDemoPhase1(ctx: FixtureContext): Phase1Fixture {
  const slug = resolveSlug(ctx);
  switch (slug) {
    case "roman-empire":
      return demoRomanPhase1;
    case "mahanuwara":
      return demoKandyanPhase1;
    case "anuradhapura":
    case "polonnaruwa":
      return demoLankaAncientPhase1;
    case "wwi":
    default:
      return demoPhase1;
  }
}

export function pickDemoPhase2(ctx: FixtureContext): Phase2Fixture {
  const slug = resolveSlug(ctx);
  switch (slug) {
    case "roman-empire":
      return demoRomanPhase2;
    case "mahanuwara":
      return demoKandyanPhase2;
    case "anuradhapura":
    case "polonnaruwa":
      return demoLankaAncientPhase2;
    case "wwi":
    default:
      return demoPhase2;
  }
}
