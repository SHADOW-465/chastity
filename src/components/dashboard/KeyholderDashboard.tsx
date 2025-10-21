import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function KeyholderDashboard() {
  const session = useQuery(api.functions.sessions.getActiveSession);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="text-sm text-slate-400">Lock Status</div>
        <div className="text-3xl font-semibold">{session?.status ?? 'unlocked'}</div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">Keyholder Controls</div>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">Tasks Overview</div>
    </div>
  );
}


