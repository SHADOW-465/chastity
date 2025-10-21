import AppShell from '../components/layout/AppShell';
import ChallengeList from '../components/challenges/ChallengeList';
import RandomChallengeButton from '../components/challenges/RandomChallengeButton';

export default function ChallengesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Challenges</h2>
          <RandomChallengeButton />
        </div>
        <ChallengeList />
      </div>
    </AppShell>
  );
}