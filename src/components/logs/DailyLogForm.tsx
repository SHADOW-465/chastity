import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { toast } from 'sonner';

type Props = { onClose: () => void };

export default function DailyLogForm({ onClose }: Props) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [rating, setRating] = useState(3);
  const [mood, setMood] = useState('neutral');
  const [journal, setJournal] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const challenges = useQuery(api.functions.challenges.listChallenges, {});
  const createLog = useMutation(api.functions.dailyLogs.createDailyLog);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLog({
        date,
        complianceRating: rating,
        mood,
        journal: journal || undefined,
        completedChallengeIds: selectedChallenges as Id<'challenges'>[],
      });
      toast.success('Daily log created successfully');
      onClose();
    } catch {
      toast.error('Failed to create log');
    }
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold mb-4">Add Daily Log</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Compliance Rating (1-5)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-8 h-8 rounded-full border-2 ${
                  star <= rating ? 'border-yellow-400 bg-yellow-400' : 'border-slate-600'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2"
          >
            <option value="sad">😢 Sad</option>
            <option value="neutral">😐 Neutral</option>
            <option value="happy">😊 Happy</option>
            <option value="excited">🤩 Excited</option>
            <option value="frustrated">😤 Frustrated</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Journal (optional)</label>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 h-24"
            placeholder="How did today go?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Completed Challenges</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {challenges?.map((challenge) => (
              <label key={challenge._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedChallenges.includes(challenge._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedChallenges([...selectedChallenges, challenge._id]);
                    } else {
                      setSelectedChallenges(selectedChallenges.filter(id => id !== challenge._id));
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">{challenge.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2"
          >
            Save Log
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 hover:bg-slate-800 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
