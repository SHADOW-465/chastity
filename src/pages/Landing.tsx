import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold">DisciplineForge</h1>
        <p className="text-slate-400">Forge chastity and self-discipline through daily practice, challenges, and accountability.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/sign-in" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2">
            <LogIn className="h-4 w-4" /> Sign In
          </Link>
          <Link to="/sign-up" className="inline-flex items-center gap-2 rounded-md border border-slate-700 hover:bg-slate-900 px-4 py-2">
            <UserPlus className="h-4 w-4" /> Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}


