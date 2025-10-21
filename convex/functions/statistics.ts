import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';
import { api } from '../_generated/api';

function computeStreak(sortedIsoDates: string[]): { current: number; longest: number } {
  if (sortedIsoDates.length === 0) return { current: 0, longest: 0 };
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sortedIsoDates.length; i++) {
    const prev = new Date(sortedIsoDates[i - 1]);
    const cur = new Date(sortedIsoDates[i]);
    const diffDays = Math.round((+cur - +prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }
  // If last date is today or yesterday chain continues; rely on sorted list
  return { current, longest };
}

export const getStats = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, { userId }) => {
    let uid = userId;
    if (!uid) {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return null;
      uid = identity.subject;
    }
    const stats = await ctx.db.query('statistics').withIndex('by_user', q => q.eq('userId', uid!)).unique();
    return stats;
  },
});

export const recomputeUserStats = mutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const logs = await ctx.db.query('daily_logs').withIndex('by_user', q => q.eq('userId', userId)).collect();
    const dates = logs.map(l => l.date).sort();
    const streaks = computeStreak(dates);
    const totalLogs = logs.length;
    const complianceTrend = logs
      .sort((a,b)=>a.date.localeCompare(b.date))
      .map(l => l.complianceRating);
    const existing = await ctx.db.query('statistics').withIndex('by_user', q => q.eq('userId', userId)).unique();
    const payload = { userId, currentStreak: streaks.current, longestStreak: Math.max(streaks.longest, existing?.longestStreak ?? 0), totalLogs, complianceTrend, updatedAt: Date.now() };
    if (existing) {
      await ctx.db.patch(existing._id, payload);
    } else {
      await ctx.db.insert('statistics', payload);
    }
  },
});

export const updateOnLogOrChallengeChange = mutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    await ctx.runMutation(api.functions.statistics.recomputeUserStats, { userId });
    await ctx.scheduler.runAfter(0, api.functions.userAchievements.unlockIfEligible, { userId, criteriaTriggerPayload: {} });
  },
});


