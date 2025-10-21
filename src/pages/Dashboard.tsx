import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import SoloDashboard from '../components/dashboard/SoloDashboard';
import KeyholderDashboard from '../components/dashboard/KeyholderDashboard';

export default function DashboardPage() {

  useEffect(()=>{
    // TODO: fetch profile to decide solo vs keyholder dashboard view
  },[]);

  const profile = useQuery(api.functions.profiles.getMe);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <nav className="flex gap-3">
            <Link to="/logs" className="rounded border border-slate-700 px-3 py-1.5">Daily Logs</Link>
            <Link to="/challenges" className="rounded border border-slate-700 px-3 py-1.5">Challenges</Link>
            <Link to="/progress" className="rounded border border-slate-700 px-3 py-1.5">Progress</Link>
          </nav>
        </header>
        {!profile && (
          <div className="rounded-lg border border-yellow-800 bg-yellow-950 text-yellow-200 p-4">Complete onboarding to continue. <Link to="/onboarding" className="underline">Go to onboarding</Link></div>
        )}
        {profile?.program === 'solo' ? (
          <SoloDashboard />
        ) : profile?.program === 'keyholder' ? (
          <KeyholderDashboard />
        ) : null}
      </div>
    </AppShell>
  );
}


