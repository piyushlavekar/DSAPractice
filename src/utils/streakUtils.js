// src/utils/streakUtils.js
import { isToday, isYesterday, subDays, format, startOfDay } from 'date-fns';

/**
 * Calculates the user's current solving streak.
 * @param {object} doneProblems - The progress object from Redux.
 * @returns {number} The current streak in days.
 */
export function calculateStreak(doneProblems) {
  if (!doneProblems || Object.keys(doneProblems).length === 0) {
    return 0;
  }

  // Get all unique solved dates, ignoring the time part
  const solvedDates = new Set(
    Object.values(doneProblems).map(p => format(startOfDay(new Date(p.solvedDate)), 'yyyy-MM-dd'))
  );
  
  let streak = 0;
  let currentDate = new Date();

  // Check if there's a completion today or yesterday to anchor the streak
  if (solvedDates.has(format(startOfDay(currentDate), 'yyyy-MM-dd')) || solvedDates.has(format(startOfDay(subDays(currentDate, 1)), 'yyyy-MM-dd'))) {
    // If solved today, the streak is at least 1
    if (solvedDates.has(format(startOfDay(currentDate), 'yyyy-MM-dd'))) {
      streak = 1;
      currentDate = subDays(currentDate, 1); // Start checking from yesterday
    }
    
    // Check backwards from yesterday (or the day before if today wasn't a solve day)
    while (solvedDates.has(format(startOfDay(currentDate), 'yyyy-MM-dd'))) {
      streak++;
      currentDate = subDays(currentDate, 1);
    }
  }

  return streak;
}

/**
 * Transforms progress data into a format for the react-calendar-heatmap.
 * @param {object} doneProblems - The progress object from Redux.
 * @returns {Array<{date: string, count: number}>}
 */
export function transformDataForHeatmap(doneProblems) {
  if (!doneProblems) return [];

  const counts = {}; // e.g., { '2025-08-31': 3 }

  for (const problem of Object.values(doneProblems)) {
    const date = format(new Date(problem.solvedDate), 'yyyy-MM-dd');
    counts[date] = (counts[date] || 0) + 1;
  }

  return Object.keys(counts).map(date => ({
    date: date,
    count: counts[date],
  }));
}