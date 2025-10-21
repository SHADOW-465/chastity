import { action } from '../_generated/server';
import { v } from 'convex/values';
import { api } from '../_generated/api';

export const recomputeDerivedDataOnSchedule = action({
  args: {},
  handler: async (ctx): Promise<unknown> => {
    // Iterate over all users with stats and recompute
    const stats = await ctx.runQuery(api.functions.statistics.getStats, { userId: undefined });
    // Placeholder: In real cron, list users explicitly
    return stats;
  },
});

export const issueRandomChallengeToUser = action({
  args: { userId: v.string() },
  handler: async (ctx): Promise<unknown> => {
    const challenge = await ctx.runQuery(api.functions.challenges.randomChallenge, {});
    if (!challenge) return null;
    await ctx.runMutation(api.functions.userChallenges.startChallenge, { challengeId: challenge._id });
    return challenge;
  },
});


