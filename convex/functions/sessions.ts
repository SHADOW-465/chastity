import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const getActiveSession = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const userId = identity.subject;
    const sessions = await ctx.db.query('sessions').withIndex('by_user', q => q.eq('userId', userId)).collect();
    return sessions.find(s => s.status === 'locked') || null;
  },
});

export const createSession = mutation({
  args: { notes: v.optional(v.string()) },
  handler: async (ctx, { notes }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;
    return await ctx.db.insert('sessions', { userId, status: 'locked', startedAt: Date.now(), notes });
  },
});

export const endSession = mutation({
  args: { id: v.id('sessions') },
  handler: async (ctx, { id }) => {
    const s = await ctx.db.get(id);
    if (!s) throw new Error('Not found');
    await ctx.db.patch(id, { status: 'unlocked', endedAt: Date.now() });
  },
});

export const toggleLock = mutation({
  args: { id: v.id('sessions') },
  handler: async (ctx, { id }) => {
    const s = await ctx.db.get(id);
    if (!s) throw new Error('Not found');
    await ctx.db.patch(id, { status: s.status === 'locked' ? 'unlocked' : 'locked', ...(s.status === 'locked' ? { endedAt: Date.now() } : {}) });
  },
});

export const setKeyholder = mutation({
  args: { id: v.id('sessions'), keyholderId: v.optional(v.string()) },
  handler: async (ctx, { id, keyholderId }) => {
    await ctx.db.patch(id, { keyholderId });
  },
});


