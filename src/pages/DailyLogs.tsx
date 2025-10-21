import { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import DailyLogForm from '../components/logs/DailyLogForm';
import DailyLogList from '../components/logs/DailyLogList';

export default function DailyLogsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Daily Logs</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2"
          >
            {showForm ? 'Cancel' : 'Add Log'}
          </button>
        </div>
        {showForm && <DailyLogForm onClose={() => setShowForm(false)} />}
        <DailyLogList />
      </div>
    </AppShell>
  );
}