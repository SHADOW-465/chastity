import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const userId = identity.subject;
    const profile = await ctx.db
      .query('profiles')
      .withIndex('by_userId', q => q.eq('userId', userId))
      .unique();
    return profile;
  },
});

export const upsertProfile = mutation({
  args: {
    username: v.string(),
    program: v.union(v.literal('solo'), v.literal('keyholder')),
    avatarUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;
    const now = Date.now();
    const existing = await ctx.db
      .query('profiles')
      .withIndex('by_userId', q => q.eq('userId', userId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args });
      return existing._id;
    }
    return await ctx.db.insert('profiles', {
      userId,
      username: args.username,
      program: args.program,
      createdAt: now,
      avatarUrl: args.avatarUrl,
      bio: args.bio,
    });
  },
});

export const setProgram = mutation({
  args: { program: v.union(v.literal('solo'), v.literal('keyholder')) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;
    const existing = await ctx.db
      .query('profiles')
      .withIndex('by_userId', q => q.eq('userId', userId))
      .unique();
    if (!existing) throw new Error('Profile not found');
    await ctx.db.patch(existing._id, { program: args.program });
  },
});


