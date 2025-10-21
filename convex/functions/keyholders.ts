import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const listMyKeyholders = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject;
    return ctx.db.query('keyholders').withIndex('by_user', q => q.eq('userId', userId)).collect();
  },
});

export const addKeyholder = mutation({
  args: { keyholderId: v.string(), permissions: v.any(), relationshipStatus: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;
    return await ctx.db.insert('keyholders', { userId, keyholderId: args.keyholderId, permissions: args.permissions, relationshipStatus: args.relationshipStatus, createdAt: Date.now() });
  },
});

export const updateKeyholder = mutation({
  args: { id: v.id('keyholders'), permissions: v.optional(v.any()), relationshipStatus: v.optional(v.string()) },
  handler: async (ctx, { id, ...data }) => {
    await ctx.db.patch(id, data);
  },
});

export const removeKeyholder = mutation({
  args: { id: v.id('keyholders') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});


