import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Onboarding() {
  const { user } = useUser();
  const [program, setProgram] = useState<'solo'|'keyholder'|''>('');
  const [username, setUsername] = useState('');
  const upsertProfile = useMutation(api.functions.profiles.upsertProfile);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertProfile({
        username,
        program: program as 'solo' | 'keyholder',
      });
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to create profile');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Welcome{user?.firstName ? `, ${user.firstName}` : ''}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-2">Choose your program</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={()=>setProgram('solo')} className={`rounded px-3 py-2 border ${program==='solo'?'border-emerald-500 bg-emerald-900/20':'border-slate-700 bg-slate-900'}`}>Solo Chastity</button>
              <button type="button" onClick={()=>setProgram('keyholder')} className={`rounded px-3 py-2 border ${program==='keyholder'?'border-emerald-500 bg-emerald-900/20':'border-slate-700 bg-slate-900'}`}>Keyholder Chastity</button>
            </div>
          </div>
          <button disabled={!program||!username} className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 disabled:opacity-50">Continue</button>
        </form>
      </div>
    </div>
  );
}


