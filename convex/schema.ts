/**
 * AltEra data model — maps README types to Convex tables:
 * - PredefinedTimeline → predefinedTimelines
 * - TimelineIncident → timelineIncidents
 * - Simulation → simulations (+ museumScans for artifact flow)
 * - PublishedTimeline → publishedTimelines
 * - Remix → remixes
 * - ExportFile → exportFiles
 */
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  branchChoice,
  museumScanStatus,
  simulationSource,
  simulationStatus,
  timelineEvent,
  visibility,
} from "./validators";

export default defineSchema({
  ...authTables,

  predefinedTimelines: defineTable({
    title: v.string(),
    slug: v.string(),
    summary: v.string(),
    coverImageUrl: v.string(),
    startYear: v.number(),
    endYear: v.number(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  timelineIncidents: defineTable({
    timelineId: v.id("predefinedTimelines"),
    year: v.string(),
    title: v.string(),
    description: v.string(),
    location: v.optional(v.string()),
    relatedImageUrl: v.optional(v.string()),
    realOutcome: v.string(),
    order: v.number(),
  }).index("by_timeline_order", ["timelineId", "order"]),

  museumScans: defineTable({
    userId: v.id("users"),
    artifactImageId: v.id("_storage"),
    labelImageId: v.id("_storage"),
    extractedArtifactName: v.optional(v.string()),
    extractedLabelText: v.optional(v.string()),
    extractedEra: v.optional(v.string()),
    status: museumScanStatus,
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  simulations: defineTable({
    userId: v.id("users"),
    source: simulationSource,
    originalTimelineId: v.optional(v.id("predefinedTimelines")),
    changedIncidentId: v.optional(v.id("timelineIncidents")),
    whatIfPrompt: v.optional(v.string()),
    museumScanId: v.optional(v.id("museumScans")),
    selectedDurationId: v.optional(v.string()),
    selectedDurationLabel: v.optional(v.string()),
    events: v.array(timelineEvent),
    chaosScore: v.optional(v.number()),
    lostToHistory: v.optional(v.array(v.string())),
    gainedByHumanity: v.optional(v.array(v.string())),
    branchChoices: v.optional(v.array(branchChoice)),
    selectedBranchId: v.optional(v.string()),
    relicPrompt: v.optional(v.string()),
    relicImageId: v.optional(v.id("_storage")),
    isChaotic: v.optional(v.boolean()),
    status: simulationStatus,
    visibility,
    remixOfSimulationId: v.optional(v.id("simulations")),
    stabilizedFromSimulationId: v.optional(v.id("simulations")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_updated", ["userId", "updatedAt"])
    .index("by_visibility_created", ["visibility", "createdAt"])
    .index("by_chaotic_public", ["visibility", "isChaotic"]),

  publishedTimelines: defineTable({
    simulationId: v.id("simulations"),
    authorId: v.id("users"),
    title: v.string(),
    description: v.string(),
    thumbnailUrl: v.optional(v.string()),
    chaosScore: v.number(),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),

  remixes: defineTable({
    originalSimulationId: v.id("simulations"),
    remixedSimulationId: v.id("simulations"),
    originalAuthorId: v.id("users"),
    remixAuthorId: v.id("users"),
    changedIncidentId: v.optional(v.id("timelineIncidents")),
    newWhatIfPrompt: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_original", ["originalSimulationId"]),

  stabilizationAttempts: defineTable({
    playerId: v.id("users"),
    targetSimulationId: v.id("simulations"),
    correctiveChoices: v.array(branchChoice),
    selectedChoiceIds: v.array(v.string()),
    resultingChaosScore: v.number(),
    won: v.boolean(),
    createdAt: v.number(),
  }).index("by_player", ["playerId"]),

  playerStats: defineTable({
    userId: v.id("users"),
    stabilizeWins: v.number(),
    chaosPublished: v.number(),
    totalSimulations: v.number(),
  }).index("by_user", ["userId"]),

  exportFiles: defineTable({
    simulationId: v.id("simulations"),
    userId: v.id("users"),
    format: v.union(v.literal("pdf"), v.literal("json"), v.literal("image")),
    fileUrl: v.string(),
    createdAt: v.number(),
  }).index("by_simulation", ["simulationId"]),
});
