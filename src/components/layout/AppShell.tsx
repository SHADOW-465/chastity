import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { BarChart2, Home, NotebookText, Settings, Swords } from 'lucide-react';

type Props = { children: ReactNode };

const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm border ${active ? 'border-emerald-500 text-emerald-400' : 'border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'}`}>
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
};

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="font-semibold">DisciplineForge</Link>
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'h-8 w-8' } }} />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 px-4 py-6">
        <aside className="space-y-2">
          <NavLink to="/dashboard" icon={Home} label="Dashboard" />
          <NavLink to="/logs" icon={NotebookText} label="Daily Logs" />
          <NavLink to="/challenges" icon={Swords} label="Challenges" />
          <NavLink to="/progress" icon={BarChart2} label="Progress" />
          <NavLink to="/settings" icon={Settings} label="Settings" />
        </aside>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}


