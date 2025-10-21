import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

export const listChallenges = query({
  args: {
    category: v.optional(v.string()),
    difficulty: v.optional(v.union(v.literal('easy'), v.literal('medium'), v.literal('hard'))),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const q = ctx.db.query('challenges').withIndex('by_active', (x) => x.eq('isActive', true));
    const results = await q.collect();
    return results.filter(c => (
      (!args.category || c.category === args.category) &&
      (!args.difficulty || c.difficulty === args.difficulty) &&
      (!args.tags || args.tags.every(t => c.tags.includes(t)))
    ));
  },
});

export const getById = query({
  args: { id: v.id('challenges') },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const create = mutation({
  args: {
    title: v.string(), description: v.string(), category: v.string(),
    difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
    tags: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    return await ctx.db.insert('challenges', {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: { id: v.id('challenges'), data: v.object({
    title: v.optional(v.string()), description: v.optional(v.string()), category: v.optional(v.string()),
    difficulty: v.optional(v.union(v.literal('easy'), v.literal('medium'), v.literal('hard'))),
    tags: v.optional(v.array(v.string())), isActive: v.optional(v.boolean())
  }) },
  handler: async (ctx, { id, data }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    await ctx.db.patch(id, data);
  },
});

export const deactivate = mutation({
  args: { id: v.id('challenges') },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    await ctx.db.patch(id, { isActive: false });
  },
});

export const randomChallenge = query({
  args: {},
  handler: async (ctx) => {
    const active = await ctx.db.query('challenges').withIndex('by_active', x => x.eq('isActive', true)).collect();
    if (active.length === 0) return null;
    const idx = Math.floor(Math.random() * active.length);
    return active[idx];
  },
});


