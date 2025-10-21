import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

export default function StatsCards() {
  const stats = useQuery(api.functions.statistics.getStats, {});
  const achievements = useQuery(api.functions.userAchievements.listMine, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-medium text-slate-400">Current Streak</span>
        </div>
        <div className="text-3xl font-bold">{stats?.currentStreak ?? 0}</div>
        <div className="text-sm text-slate-500">days</div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-slate-400">Longest Streak</span>
        </div>
        <div className="text-3xl font-bold">{stats?.longestStreak ?? 0}</div>
        <div className="text-sm text-slate-500">days</div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Target className="h-5 w-5 text-purple-400" />
          <span className="text-sm font-medium text-slate-400">Total Logs</span>
        </div>
        <div className="text-3xl font-bold">{stats?.totalLogs ?? 0}</div>
        <div className="text-sm text-slate-500">entries</div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Award className="h-5 w-5 text-yellow-400" />
          <span className="text-sm font-medium text-slate-400">Achievements</span>
        </div>
        <div className="text-3xl font-bold">{achievements?.length ?? 0}</div>
        <div className="text-sm text-slate-500">unlocked</div>
      </div>
    </div>
  );
}
