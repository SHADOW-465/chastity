import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { toast } from 'sonner';

export default function ChallengeList() {
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    tags: [] as string[],
  });

  const challenges = useQuery(api.functions.challenges.listChallenges, {
    category: filters.category || undefined,
    difficulty: (filters.difficulty as 'easy' | 'medium' | 'hard') || undefined,
    tags: filters.tags.length > 0 ? filters.tags : undefined,
  });

  const userChallenges = useQuery(api.functions.userChallenges.listUserChallenges, {});
  const startChallenge = useMutation(api.functions.userChallenges.startChallenge);
  const completeChallenge = useMutation(api.functions.userChallenges.completeChallenge);
  const failChallenge = useMutation(api.functions.userChallenges.failChallenge);

  const getUserChallenge = (challengeId: string) => {
    return userChallenges?.find(uc => uc.challengeId === challengeId);
  };

  const handleStartChallenge = async (challengeId: string) => {
    try {
      await startChallenge({ challengeId: challengeId as Id<'challenges'> });
      toast.success('Challenge started!');
    } catch {
      toast.error('Failed to start challenge');
    }
  };

  const handleCompleteChallenge = async (userChallengeId: string) => {
    try {
      await completeChallenge({ id: userChallengeId as Id<'user_challenges'> });
      toast.success('Challenge completed!');
    } catch {
      toast.error('Failed to complete challenge');
    }
  };

  const handleFailChallenge = async (userChallengeId: string) => {
    try {
      await failChallenge({ id: userChallengeId as Id<'user_challenges'> });
      toast.success('Challenge marked as failed');
    } catch {
      toast.error('Failed to update challenge');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'hard': return 'text-red-400 bg-red-900/20';
      default: return 'text-slate-400 bg-slate-900/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            >
              <option value="">All Categories</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="discipline">Discipline</option>
              <option value="fitness">Fitness</option>
              <option value="learning">Learning</option>
              <option value="habits">Habits</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              placeholder="Enter tags separated by commas"
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
              onChange={(e) => {
                const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                setFilters({ ...filters, tags });
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-slate-400">No challenges found</div>
        ) : (
          challenges?.map((challenge) => {
            const userChallenge = getUserChallenge(challenge._id);
            return (
              <div key={challenge._id} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{challenge.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">{challenge.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {challenge.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-800 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-400 mb-3">
                  Category: {challenge.category}
                </div>
                {userChallenge && (
                  <div className="mb-3">
                    <div className="text-sm text-slate-300 mb-1">
                      Status: <span className="capitalize">{userChallenge.status}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${userChallenge.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{userChallenge.progress}% complete</div>
                  </div>
                )}
                <div className="flex gap-2">
                  {!userChallenge ? (
                    <button
                      onClick={() => handleStartChallenge(challenge._id)}
                      className="flex-1 rounded-md bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm"
                    >
                      Start Challenge
                    </button>
                  ) : userChallenge.status === 'active' ? (
                    <>
                      <button
                        onClick={() => handleCompleteChallenge(userChallenge._id)}
                        className="flex-1 rounded-md bg-green-600 hover:bg-green-500 px-3 py-2 text-sm"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleFailChallenge(userChallenge._id)}
                        className="flex-1 rounded-md bg-red-600 hover:bg-red-500 px-3 py-2 text-sm"
                      >
                        Fail
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 text-center text-sm text-slate-400 py-2">
                      {userChallenge.status === 'completed' ? 'Completed' : 'Failed'}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
