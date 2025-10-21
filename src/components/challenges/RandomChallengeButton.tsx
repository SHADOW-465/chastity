import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';
import { Shuffle } from 'lucide-react';

export default function RandomChallengeButton() {
  const randomChallenge = useQuery(api.functions.challenges.randomChallenge, {});
  const startChallenge = useMutation(api.functions.userChallenges.startChallenge);

  const handleRandomChallenge = async () => {
    if (!randomChallenge) {
      toast.error('No challenges available');
      return;
    }
    try {
      await startChallenge({ challengeId: randomChallenge._id });
      toast.success(`Started random challenge: ${randomChallenge.title}`);
    } catch {
      toast.error('Failed to start random challenge');
    }
  };

  return (
    <button
      onClick={handleRandomChallenge}
      className="flex items-center gap-2 rounded-md bg-purple-600 hover:bg-purple-500 px-4 py-2"
    >
      <Shuffle className="h-4 w-4" />
      Random Challenge
    </button>
  );
}
