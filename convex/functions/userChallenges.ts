import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';
import { api } from '../_generated/api';

export const listUserChallenges = query({
  args: { status: v.optional(v.union(v.literal('active'), v.literal('completed'), v.literal('failed'))) },
  handler: async (ctx, { status }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject;
    const q = ctx.db.query('user_challenges').withIndex('by_user', x => x.eq('userId', userId));
    const items = await q.collect();
    return status ? items.filter(i => i.status === status) : items;
  },
});

export const startChallenge = mutation({
  args: { challengeId: v.id('challenges') },
  handler: async (ctx, { challengeId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;
    return await ctx.db.insert('user_challenges', {
      userId,
      challengeId,
      status: 'active',
      startedAt: Date.now(),
      progress: 0,
      notes: '',
    });
  },
});

export const updateProgress = mutation({
  args: { id: v.id('user_challenges'), progress: v.number(), notes: v.optional(v.string()) },
  handler: async (ctx, { id, progress, notes }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const uc = await ctx.db.get(id);
    if (!uc) throw new Error('Not found');
    await ctx.db.patch(id, { progress, ...(notes !== undefined ? { notes } : {}) });
  },
});

export const completeChallenge = mutation({
  args: { id: v.id('user_challenges') },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const uc = await ctx.db.get(id);
    if (!uc) throw new Error('Not found');
    await ctx.db.patch(id, { status: 'completed', completedAt: Date.now(), progress: 100 });
    await ctx.scheduler.runAfter(0, api.functions.statistics.updateOnLogOrChallengeChange, { userId: uc.userId });
  },
});

export const failChallenge = mutation({
  args: { id: v.id('user_challenges') },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const uc = await ctx.db.get(id);
    if (!uc) throw new Error('Not found');
    await ctx.db.patch(id, { status: 'failed' });
    await ctx.scheduler.runAfter(0, api.functions.statistics.updateOnLogOrChallengeChange, { userId: uc.userId });
  },
});


