import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

export const list = query({ args: {}, handler: async (ctx) => ctx.db.query('achievements').collect() });

export const getById = query({ args: { id: v.id('achievements') }, handler: async (ctx, { id }) => ctx.db.get(id) });

export const create = mutation({
  args: { title: v.string(), description: v.string(), icon: v.string(), criteria: v.any(), points: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    return await ctx.db.insert('achievements', { ...args, createdAt: Date.now() });
  }
});

export const update = mutation({
  args: { id: v.id('achievements'), data: v.object({
    title: v.optional(v.string()), description: v.optional(v.string()), icon: v.optional(v.string()), criteria: v.optional(v.any()), points: v.optional(v.number())
  }) },
  handler: async (ctx, { id, data }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    await ctx.db.patch(id, data);
  }
});


