import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject;
    return ctx.db.query('user_achievements').withIndex('by_user', q => q.eq('userId', userId)).collect();
  }
});

export const unlockIfEligible = mutation({
  args: { userId: v.string(), criteriaTriggerPayload: v.any() },
  handler: async (ctx, { userId }) => {
    // Simple sample: unlock based on streak or total logs thresholds
    const stats = await ctx.db.query('statistics').withIndex('by_user', q => q.eq('userId', userId)).unique();
    if (!stats) return;
    const achievements = await ctx.db.query('achievements').collect();
    const userAch = await ctx.db.query('user_achievements').withIndex('by_user', q => q.eq('userId', userId)).collect();
    const owned = new Set(userAch.map(a => a.achievementId));
    const now = Date.now();
    for (const a of achievements) {
      // Expected criteria example: { type: 'streak_at_least', value: 7 } or { type: 'total_logs_at_least', value: 30 }
      const c = a.criteria as Record<string, unknown>;
      const ok = c?.type === 'streak_at_least' ? stats.currentStreak >= (c.value as number) : c?.type === 'total_logs_at_least' ? stats.totalLogs >= (c.value as number) : false;
      if (ok && !owned.has(a._id)) {
        await ctx.db.insert('user_achievements', { userId, achievementId: a._id, unlockedAt: now });
      }
    }
  }
});


