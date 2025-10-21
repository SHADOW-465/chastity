import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import AppShell from '../components/layout/AppShell';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user } = useUser();
  const profile = useQuery(api.functions.profiles.getMe);
  const setProgram = useMutation(api.functions.profiles.setProgram);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProgramChange = async (newProgram: 'solo' | 'keyholder') => {
    if (profile?.program === newProgram) return;
    setIsUpdating(true);
    try {
      await setProgram({ program: newProgram });
      toast.success('Program updated successfully');
    } catch {
      toast.error('Failed to update program');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
        
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="text-slate-300">{profile?.username || 'Not set'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="text-slate-300">{user?.emailAddresses[0]?.emailAddress || 'Not available'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Program</label>
              <div className="text-slate-300 capitalize">{profile?.program || 'Not selected'}</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold mb-4">Program Selection</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleProgramChange('solo')}
                disabled={isUpdating || profile?.program === 'solo'}
                className={`p-4 rounded-lg border text-left ${
                  profile?.program === 'solo'
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-slate-700 hover:border-slate-600'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h4 className="font-semibold mb-2">Solo Chastity</h4>
                <p className="text-sm text-slate-400">Personal self-discipline tracking</p>
              </button>
              <button
                onClick={() => handleProgramChange('keyholder')}
                disabled={isUpdating || profile?.program === 'keyholder'}
                className={`p-4 rounded-lg border text-left ${
                  profile?.program === 'keyholder'
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-slate-700 hover:border-slate-600'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h4 className="font-semibold mb-2">Keyholder Chastity</h4>
                <p className="text-sm text-slate-400">Advanced session management</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}


