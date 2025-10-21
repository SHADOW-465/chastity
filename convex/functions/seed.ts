import { mutation } from '../_generated/server';

export const seedChallenges = mutation({
  args: {},
  handler: async (ctx) => {
    const challenges = [
      {
        title: "Morning Meditation",
        description: "Spend 10 minutes in meditation each morning",
        category: "mindfulness",
        difficulty: "easy" as const,
        tags: ["meditation", "morning", "mindfulness"],
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "No Social Media",
        description: "Avoid social media for 24 hours",
        category: "discipline",
        difficulty: "medium" as const,
        tags: ["social media", "detox", "focus"],
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Cold Shower",
        description: "Take a cold shower for 2 minutes",
        category: "discipline",
        difficulty: "hard" as const,
        tags: ["cold exposure", "willpower", "health"],
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Read 30 Pages",
        description: "Read 30 pages of a book",
        category: "learning",
        difficulty: "easy" as const,
        tags: ["reading", "education", "knowledge"],
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Workout Session",
        description: "Complete a 45-minute workout",
        category: "fitness",
        difficulty: "medium" as const,
        tags: ["exercise", "fitness", "health"],
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Digital Detox",
        description: "No screens for 4 hours before bed",
        category: "habits",
        difficulty: "hard" as const,
        tags: ["sleep", "digital", "wellness"],
        isActive: true,
        createdAt: Date.now(),
      },
    ];

    const results = [];
    for (const challenge of challenges) {
      const id = await ctx.db.insert('challenges', challenge);
      results.push(id);
    }
    return results;
  },
});

export const seedAchievements = mutation({
  args: {},
  handler: async (ctx) => {
    const achievements = [
      {
        title: "First Steps",
        description: "Complete your first daily log",
        icon: "star",
        criteria: { type: "total_logs_at_least", value: 1 },
        points: 10,
        createdAt: Date.now(),
      },
      {
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "trophy",
        criteria: { type: "streak_at_least", value: 7 },
        points: 50,
        createdAt: Date.now(),
      },
      {
        title: "Month Master",
        description: "Maintain a 30-day streak",
        icon: "trophy",
        criteria: { type: "streak_at_least", value: 30 },
        points: 200,
        createdAt: Date.now(),
      },
      {
        title: "Challenge Champion",
        description: "Complete 10 challenges",
        icon: "target",
        criteria: { type: "challenges_completed", value: 10 },
        points: 100,
        createdAt: Date.now(),
      },
      {
        title: "Consistency King",
        description: "Log 50 days total",
        icon: "calendar",
        criteria: { type: "total_logs_at_least", value: 50 },
        points: 150,
        createdAt: Date.now(),
      },
    ];

    const results = [];
    for (const achievement of achievements) {
      const id = await ctx.db.insert('achievements', achievement);
      results.push(id);
    }
    return results;
  },
});
