/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_analyzeMuseumPhotos from "../actions/analyzeMuseumPhotos.js";
import type * as actions_generatePhaseOne from "../actions/generatePhaseOne.js";
import type * as actions_generatePhaseTwo from "../actions/generatePhaseTwo.js";
import type * as actions_generateRelicImage from "../actions/generateRelicImage.js";
import type * as actions_generateTimelineFromDuration from "../actions/generateTimelineFromDuration.js";
import type * as actions_stabilizeTimeline from "../actions/stabilizeTimeline.js";
import type * as actions_suggestTimeDurations from "../actions/suggestTimeDurations.js";
import type * as auth from "../auth.js";
import type * as devSeed from "../devSeed.js";
import type * as http from "../http.js";
import type * as incidents from "../incidents.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_constants from "../lib/constants.js";
import type * as lib_demo from "../lib/demo.js";
import type * as lib_gemini from "../lib/gemini.js";
import type * as museumScans from "../museumScans.js";
import type * as museumScansInternal from "../museumScansInternal.js";
import type * as published from "../published.js";
import type * as remix from "../remix.js";
import type * as seed_demoData from "../seed/demoData.js";
import type * as seed_run from "../seed/run.js";
import type * as simulations from "../simulations.js";
import type * as simulationsInternal from "../simulationsInternal.js";
import type * as stabilization from "../stabilization.js";
import type * as storage from "../storage.js";
import type * as timelines from "../timelines.js";
import type * as types_contracts from "../types/contracts.js";
import type * as users from "../users.js";
import type * as validators from "../validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/analyzeMuseumPhotos": typeof actions_analyzeMuseumPhotos;
  "actions/generatePhaseOne": typeof actions_generatePhaseOne;
  "actions/generatePhaseTwo": typeof actions_generatePhaseTwo;
  "actions/generateRelicImage": typeof actions_generateRelicImage;
  "actions/generateTimelineFromDuration": typeof actions_generateTimelineFromDuration;
  "actions/stabilizeTimeline": typeof actions_stabilizeTimeline;
  "actions/suggestTimeDurations": typeof actions_suggestTimeDurations;
  auth: typeof auth;
  devSeed: typeof devSeed;
  http: typeof http;
  incidents: typeof incidents;
  "lib/auth": typeof lib_auth;
  "lib/constants": typeof lib_constants;
  "lib/demo": typeof lib_demo;
  "lib/gemini": typeof lib_gemini;
  museumScans: typeof museumScans;
  museumScansInternal: typeof museumScansInternal;
  published: typeof published;
  remix: typeof remix;
  "seed/demoData": typeof seed_demoData;
  "seed/run": typeof seed_run;
  simulations: typeof simulations;
  simulationsInternal: typeof simulationsInternal;
  stabilization: typeof stabilization;
  storage: typeof storage;
  timelines: typeof timelines;
  "types/contracts": typeof types_contracts;
  users: typeof users;
  validators: typeof validators;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
