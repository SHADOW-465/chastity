import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function SoloDashboard() {
  const stats = useQuery(api.functions.statistics.getStats, {});
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="text-sm text-slate-400">Current Streak</div>
        <div className="text-3xl font-semibold">{stats?.currentStreak ?? 0} days</div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="text-sm text-slate-400">Longest Streak</div>
        <div className="text-3xl font-semibold">{stats?.longestStreak ?? 0} days</div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="text-sm text-slate-400">Total Logs</div>
        <div className="text-3xl font-semibold">{stats?.totalLogs ?? 0}</div>
      </div>
    </div>
  );
}


