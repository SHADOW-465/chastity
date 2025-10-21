import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const listSessionTasks = query({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, { sessionId }) => ctx.db.query('tasks').withIndex('by_session', q => q.eq('sessionId', sessionId)).collect(),
});

export const createTask = mutation({
  args: { sessionId: v.id('sessions'), assignedBy: v.string(), title: v.string(), description: v.string(), dueDate: v.optional(v.number()) },
  handler: async (ctx, args) => ctx.db.insert('tasks', { ...args, status: 'todo', createdAt: Date.now() }),
});

export const updateTask = mutation({
  args: { id: v.id('tasks'), data: v.object({ title: v.optional(v.string()), description: v.optional(v.string()), dueDate: v.optional(v.number()) }) },
  handler: async (ctx, { id, data }) => { await ctx.db.patch(id, data); },
});

export const deleteTask = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, { id }) => { await ctx.db.delete(id); },
});

export const setTaskStatus = mutation({
  args: { id: v.id('tasks'), status: v.union(v.literal('todo'), v.literal('in_progress'), v.literal('done'), v.literal('failed')) },
  handler: async (ctx, { id, status }) => {
    const payload: Record<string, unknown> = { status };
    if (status === 'done') payload.completedAt = Date.now();
    await ctx.db.patch(id, payload);
  },
});


