/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_achievements from "../functions/achievements.js";
import type * as functions_actions from "../functions/actions.js";
import type * as functions_challenges from "../functions/challenges.js";
import type * as functions_dailyLogs from "../functions/dailyLogs.js";
import type * as functions_keyholders from "../functions/keyholders.js";
import type * as functions_profiles from "../functions/profiles.js";
import type * as functions_seed from "../functions/seed.js";
import type * as functions_sessions from "../functions/sessions.js";
import type * as functions_statistics from "../functions/statistics.js";
import type * as functions_tasks from "../functions/tasks.js";
import type * as functions_userAchievements from "../functions/userAchievements.js";
import type * as functions_userChallenges from "../functions/userChallenges.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/achievements": typeof functions_achievements;
  "functions/actions": typeof functions_actions;
  "functions/challenges": typeof functions_challenges;
  "functions/dailyLogs": typeof functions_dailyLogs;
  "functions/keyholders": typeof functions_keyholders;
  "functions/profiles": typeof functions_profiles;
  "functions/seed": typeof functions_seed;
  "functions/sessions": typeof functions_sessions;
  "functions/statistics": typeof functions_statistics;
  "functions/tasks": typeof functions_tasks;
  "functions/userAchievements": typeof functions_userAchievements;
  "functions/userChallenges": typeof functions_userChallenges;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
