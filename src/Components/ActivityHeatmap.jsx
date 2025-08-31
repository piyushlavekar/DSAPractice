

// src/Components/ActivityHeatmap.jsx
import React, { useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useSelector } from 'react-redux';
import { subMonths, format } from 'date-fns'; // Import format for tooltips
import { selectDoneProblems } from '../features/progress/progressSlice';
import { transformDataForHeatmap } from '../utils/streakUtils';

const ActivityHeatmap = () => {
  const doneProblems = useSelector(selectDoneProblems);
  const heatmapData = useMemo(() => transformDataForHeatmap(doneProblems), [doneProblems]);
  
  // 1. Reduced date range from 6 to 4 months to make it more compact
  const fourMonthsAgo = subMonths(new Date(), 4);

  return (
    // 2. Main container is now constrained in width and centered
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
        {/* 3. Title is now smaller and more subtle */}
        <h3 className="text-base font-semibold text-gray-300 mb-2">Last 4 Months Activity</h3>
        <CalendarHeatmap
          startDate={fourMonthsAgo}
          endDate={new Date()}
          values={heatmapData}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return 'color-empty';
            }
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
          // 4. Added tooltips on hover for a better user experience
          titleForValue={(value) => {
            if (!value) {
              return 'No activity';
            }
            const date = format(new Date(value.date), 'MMM d, yyyy');
            const count = value.count;
            return `${count} problem${count > 1 ? 's' : ''} solved on ${date}`;
          }}
          showWeekdayLabels={true}
        />
      </div>
    </div>
  );
};

export default ActivityHeatmap;