import type { Doc, Id } from "@/convex/_generated/dataModel";
import type {
  Branch,
  Incident,
  LedgerItem,
  Simulation,
  SimulationStatus,
  StoryCard,
  Timeline,
} from "@/lib/types";

type ConvexTimeline = {
  _id: Id<"predefinedTimelines">;
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string;
  startYear: number;
  endYear: number;
};

type ConvexIncident = {
  _id: Id<"timelineIncidents">;
  year: string;
  title: string;
  description: string;
  location?: string;
  relatedImageUrl?: string;
  realOutcome: string;
  order: number;
};

type ConvexSimulation = ReturnType<typeof mapSimInput>;

function mapSimInput(sim: {
  _id: Id<"simulations">;
  changedIncidentId?: Id<"timelineIncidents">;
  whatIfPrompt?: string;
  chaosScore?: number;
  status: string;
  immediateRipple?: { year: string; title: string; description: string }[];
  generationalShift?: { year: string; title: string; description: string }[];
  globalConsequence?: { year: string; title: string; description: string }[];
  branchChoices?: { id: string; title: string; description: string }[];
  selectedBranchId?: string;
  lostToHistory?: string[];
  gainedByHumanity?: string[];
  relicPrompt?: string;
  relicImageUrl?: string;
  events: { year: string; title: string; description: string }[];
  createdAt: number;
}) {
  return sim;
}

export function formatRipple(
  ev: { year: string; title: string; description: string },
): string {
  return `${ev.year} — ${ev.title}: ${ev.description}`;
}

export function mapConvexStatus(status: string): SimulationStatus {
  switch (status) {
    case "draft":
    case "analyzing":
    case "generating":
      return "generating";
    case "phase1":
      return "phase1_complete";
    case "phase2":
      return "phase2_generating";
    case "editable":
    case "saved":
      return "generated";
    case "published":
      return "published";
    default:
      return "generating";
  }
}

export function mapTimelineListItem(t: ConvexTimeline): Timeline {
  return {
    slug: t.slug,
    title: t.title,
    era: `${t.startYear}–${t.endYear}`,
    coverImage: t.coverImageUrl,
    description: t.summary,
    incidents: [],
  };
}

export function mapTimelineDetail(
  timeline: ConvexTimeline,
  incidents: ConvexIncident[],
): Timeline {
  return {
    ...mapTimelineListItem(timeline),
    incidents: incidents.map(mapIncident),
  };
}

export function mapIncident(inc: ConvexIncident): Incident {
  return {
    id: inc._id,
    title: inc.title,
    date: inc.year,
    description: inc.description,
    context: inc.realOutcome,
    image: inc.relatedImageUrl,
  };
}

export function mapSimulationToUi(
  sim: ConvexSimulation,
  incident?: ConvexIncident | null,
): Simulation {
  const immediate =
    sim.immediateRipple?.length
      ? sim.immediateRipple
      : sim.events.slice(0, Math.ceil(sim.events.length / 2));
  const generational =
    sim.generationalShift?.length
      ? sim.generationalShift
      : sim.events.slice(Math.ceil(sim.events.length / 2));

  const ripples = [...immediate, ...generational].map(formatRipple);

  const storyCards: StoryCard[] = [
    ...immediate.map((ev, i) => eventToStoryCard(ev, `imm-${i}`, true)),
    ...generational.map((ev, i) => eventToStoryCard(ev, `gen-${i}`, true)),
    ...(sim.globalConsequence ?? []).map((ev, i) =>
      eventToStoryCard(ev, `glob-${i}`, true),
    ),
  ];

  const branches: Branch[] = (sim.branchChoices ?? []).map((b) => ({
    id: b.id,
    title: b.title,
    description: b.description,
    chaosImpact: 0,
  }));

  const extinct: LedgerItem[] = (sim.lostToHistory ?? []).map((name, i) => ({
    id: `lost-${i}`,
    name,
    description: "",
  }));

  const born: LedgerItem[] = (sim.gainedByHumanity ?? []).map((name, i) => ({
    id: `gain-${i}`,
    name,
    description: "",
  }));

  return {
    id: sim._id,
    incidentId: sim.changedIncidentId ?? incident?._id ?? "",
    whatIf: sim.whatIfPrompt ?? "",
    chaosScore: sim.chaosScore ?? 0,
    status: mapConvexStatus(sim.status),
    ripples,
    branches,
    selectedBranch: sim.selectedBranchId,
    extinct,
    born,
    relicPrompt: sim.relicPrompt,
    relicImage: sim.relicImageUrl,
    storyCards,
    createdAt: new Date(sim.createdAt).toISOString(),
  };
}

function eventToStoryCard(
  ev: { year: string; title: string; description: string },
  id: string,
  isAlternate: boolean,
): StoryCard {
  return {
    id,
    year: ev.year,
    title: ev.title,
    description: ev.description,
    imagePrompt: ev.title,
    isAlternate,
  };
}

export type IncidentContext = {
  timeline: Pick<Timeline, "slug" | "title">;
  incident: Incident;
};

export function incidentContextFromConvex(
  timeline: ConvexTimeline,
  incident: ConvexIncident,
): IncidentContext {
  return {
    timeline: { slug: timeline.slug, title: timeline.title },
    incident: mapIncident(incident),
  };
}
