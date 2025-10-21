import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function DailyLogList() {
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    rating: '',
    mood: '',
    search: '',
  });

  const logs = useQuery(api.functions.dailyLogs.listDailyLogs, {
    from: filters.from || undefined,
    to: filters.to || undefined,
    rating: filters.rating ? parseInt(filters.rating) : undefined,
    mood: filters.mood || undefined,
    search: filters.search || undefined,
  });

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      sad: '😢',
      neutral: '😐',
      happy: '😊',
      excited: '🤩',
      frustrated: '😤',
    };
    return emojis[mood] || '😐';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            >
              <option value="">All</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mood</label>
            <select
              value={filters.mood}
              onChange={(e) => setFilters({ ...filters, mood: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            >
              <option value="">All</option>
              <option value="sad">😢 Sad</option>
              <option value="neutral">😐 Neutral</option>
              <option value="happy">😊 Happy</option>
              <option value="excited">🤩 Excited</option>
              <option value="frustrated">😤 Frustrated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Search Journal</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search..."
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {logs?.items?.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No logs found</div>
        ) : (
          logs?.items?.map((log) => (
            <div key={log._id} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{log.date}</span>
                  <span className="text-2xl">{getMoodEmoji(log.mood)}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= log.complianceRating ? 'text-yellow-400' : 'text-slate-600'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-slate-400">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
              {log.journal && (
                <div className="text-slate-300 text-sm mt-2">{log.journal}</div>
              )}
              {log.completedChallengeIds.length > 0 && (
                <div className="text-xs text-slate-400 mt-2">
                  Completed {log.completedChallengeIds.length} challenge(s)
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
