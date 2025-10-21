import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Trophy, Star, Target, Calendar } from 'lucide-react';

export default function AchievementsGrid() {
  const achievements = useQuery(api.functions.userAchievements.listMine, {});
  const allAchievements = useQuery(api.functions.achievements.list, {});

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'star': return <Star className="h-6 w-6" />;
      case 'target': return <Target className="h-6 w-6" />;
      case 'calendar': return <Calendar className="h-6 w-6" />;
      default: return <Trophy className="h-6 w-6" />;
    }
  };

  const unlockedIds = new Set(achievements?.map(a => a.achievementId) || []);

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAchievements?.map((achievement) => {
          const isUnlocked = unlockedIds.has(achievement._id);
          const userAchievement = achievements?.find(a => a.achievementId === achievement._id);
          
          return (
            <div
              key={achievement._id}
              className={`rounded-lg border p-4 ${
                isUnlocked
                  ? 'border-yellow-500 bg-yellow-900/20'
                  : 'border-slate-700 bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={isUnlocked ? 'text-yellow-400' : 'text-slate-500'}>
                  {getAchievementIcon(achievement.icon)}
                </div>
                <h4 className={`font-semibold ${isUnlocked ? 'text-yellow-400' : 'text-slate-400'}`}>
                  {achievement.title}
                </h4>
              </div>
              <p className={`text-sm ${isUnlocked ? 'text-yellow-200' : 'text-slate-500'}`}>
                {achievement.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs ${isUnlocked ? 'text-yellow-300' : 'text-slate-500'}`}>
                  {achievement.points} points
                </span>
                {isUnlocked && userAchievement && (
                  <span className="text-xs text-slate-400">
                    {new Date(userAchievement.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
