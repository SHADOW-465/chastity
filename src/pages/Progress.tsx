import AppShell from '../components/layout/AppShell';
import StatsCards from '../components/stats/StatsCards';
import ComplianceChart from '../components/stats/ComplianceChart';
import AchievementsGrid from '../components/stats/AchievementsGrid';

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Progress</h2>
        <StatsCards />
        <ComplianceChart />
        <AchievementsGrid />
      </div>
    </AppShell>
  );
}