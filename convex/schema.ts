import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    username: v.string(),
    program: v.union(v.literal('solo'), v.literal('keyholder')),
    createdAt: v.number(),
    avatarUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
  }).index('by_userId', ['userId']),

  challenges: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
    tags: v.array(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index('by_active', ['isActive']).index('by_category', ['category']).index('by_difficulty', ['difficulty']),

  user_challenges: defineTable({
    userId: v.string(),
    challengeId: v.id('challenges'),
    status: v.union(v.literal('active'), v.literal('completed'), v.literal('failed')),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    progress: v.number(),
    notes: v.optional(v.string()),
  }).index('by_user', ['userId']).index('by_user_status', ['userId', 'status']).index('by_challenge', ['challengeId']),

  daily_logs: defineTable({
    userId: v.string(),
    date: v.string(), // ISO date
    complianceRating: v.number(), // 1-5
    mood: v.string(),
    journal: v.optional(v.string()),
    completedChallengeIds: v.array(v.id('challenges')),
    createdAt: v.number(),
  }).index('by_user_date', ['userId', 'date']).index('by_user', ['userId']),

  achievements: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    criteria: v.any(),
    points: v.number(),
    createdAt: v.number(),
  }),

  user_achievements: defineTable({
    userId: v.string(),
    achievementId: v.id('achievements'),
    unlockedAt: v.number(),
  }).index('by_user', ['userId']).index('by_achievement', ['achievementId']),

  statistics: defineTable({
    userId: v.string(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    totalLogs: v.number(),
    complianceTrend: v.array(v.number()),
    updatedAt: v.number(),
  }).index('by_user', ['userId']),

  sessions: defineTable({
    userId: v.string(),
    status: v.union(v.literal('locked'), v.literal('unlocked')),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    keyholderId: v.optional(v.string()),
    notes: v.optional(v.string()),
  }).index('by_user', ['userId']).index('by_keyholder', ['keyholderId']),

  keyholders: defineTable({
    keyholderId: v.string(),
    userId: v.string(),
    permissions: v.any(),
    relationshipStatus: v.string(),
    createdAt: v.number(),
  }).index('by_user', ['userId']).index('by_keyholder', ['keyholderId']),

  tasks: defineTable({
    sessionId: v.id('sessions'),
    assignedBy: v.string(), // keyholderId
    title: v.string(),
    description: v.string(),
    dueDate: v.optional(v.number()),
    status: v.union(v.literal('todo'), v.literal('in_progress'), v.literal('done'), v.literal('failed')),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index('by_session', ['sessionId']).index('by_status', ['status']),
});


