// src/Components/StreakCounter.jsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectDoneProblems } from '../features/progress/progressSlice';
import { calculateStreak } from '../utils/streakUtils';

const StreakCounter = () => {
  const doneProblems = useSelector(selectDoneProblems);
  
  // useMemo ensures this expensive calculation only runs when progress changes
  const streak = useMemo(() => calculateStreak(doneProblems), [doneProblems]);

  if (streak === 0) {
    return null; // Don't render anything if there's no streak
  }

  return (
    <div className="flex items-center space-x-1 text-orange-400 font-semibold text-sm">
      <span>🔥</span>
      <span>{streak} Day Streak</span>
    </div>
  );
};

export default StreakCounter;