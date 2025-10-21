import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';
import { api } from '../_generated/api';

export const getLogByDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const userId = identity.subject;
    return await ctx.db
      .query('daily_logs')
      .withIndex('by_user_date', q => q.eq('userId', userId).eq('date', date))
      .unique();
  },
});

export const listDailyLogs = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
    from: v.optional(v.string()),
    to: v.optional(v.string()),
    rating: v.optional(v.number()),
    mood: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { items: [], nextCursor: undefined };
    const userId = identity.subject;
    const all = await ctx.db
      .query('daily_logs')
      .withIndex('by_user', q => q.eq('userId', userId))
      .collect();
    let filtered = all.sort((a,b)=>a.date.localeCompare(b.date) * -1);
    if (args.from) filtered = filtered.filter(l => l.date >= args.from!);
    if (args.to) filtered = filtered.filter(l => l.date <= args.to!);
    if (args.rating) filtered = filtered.filter(l => l.complianceRating === args.rating);
    if (args.mood) filtered = filtered.filter(l => l.mood === args.mood);
    if (args.search) filtered = filtered.filter(l => (l.journal||'').toLowerCase().includes(args.search!.toLowerCase()));
    const pageSize = args.limit ?? 20;
    const start = args.cursor ? parseInt(args.cursor, 10) : 0;
    const items = filtered.slice(start, start + pageSize);
    const nextCursor = start + pageSize < filtered.length ? String(start + pageSize) : undefined;
    return { items, nextCursor };
  },
});

export const createDailyLog = mutation({
  args: {
    date: v.string(),
    complianceRating: v.number(),
    mood: v.string(),
    journal: v.optional(v.string()),
    completedChallengeIds: v.array(v.id('challenges')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const userId = identity.subject;
    const existing = await ctx.db
      .query('daily_logs')
      .withIndex('by_user_date', q => q.eq('userId', userId).eq('date', args.date))
      .unique();
    if (existing) throw new Error('Log already exists for this date');
    const id = await ctx.db.insert('daily_logs', {
      userId,
      ...args,
      createdAt: Date.now(),
    });
    await ctx.scheduler.runAfter(0, api.functions.statistics.updateOnLogOrChallengeChange, { userId });
    return id;
  },
});

export const updateLog = mutation({
  args: {
    id: v.id('daily_logs'),
    complianceRating: v.optional(v.number()),
    mood: v.optional(v.string()),
    journal: v.optional(v.string()),
    completedChallengeIds: v.optional(v.array(v.id('challenges'))),
  },
  handler: async (ctx, { id, ...changes }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const log = await ctx.db.get(id);
    if (!log) throw new Error('Not found');
    const userId = identity.subject;
    if (log.userId !== userId) throw new Error('Forbidden');
    await ctx.db.patch(id, changes);
    await ctx.scheduler.runAfter(0, api.functions.statistics.updateOnLogOrChallengeChange, { userId });
  },
});


