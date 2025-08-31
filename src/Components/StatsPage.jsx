
// src/Components/StatsPage.jsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toggleStatsView } from '../features/ui/uiSlice';
import { selectDoneProblems } from '../features/progress/progressSlice';
import { CloseIcon, StatsIcon } from './icons';

const COLORS = {
  Easy: '#22c55e',   // green-500
  Medium: '#facc15', // yellow-400
  Hard: '#ef4444',   // red-500
};

// --- FIX for Tooltip ---
// Define the custom style for the chart tooltip
const customTooltipStyle = {
  backgroundColor: '#1f2937', // Corresponds to Tailwind's bg-gray-800
  border: '1px solid #4b5563', // Corresponds to border-gray-600
  borderRadius: '0.5rem',
  color: '#e5e7eb', // Corresponds to text-gray-200
};

const StatsPage = () => {
  const dispatch = useDispatch();
  const { allTopics, allProblemsFlat } = useSelector((state) => state.topics);
  const doneProblems = useSelector(selectDoneProblems);
  const doneProblemIds = Object.keys(doneProblems);

  // All the useMemo calculations remain the same...
  const difficultyData = useMemo(() => {
    const solvedCounts = { Easy: 0, Medium: 0, Hard: 0 };
    const solvedProblems = allProblemsFlat.filter(p => doneProblemIds.includes(`${p.topicName}-${p.name}`));
    
    solvedProblems.forEach(p => {
      if (solvedCounts[p.difficulty] !== undefined) {
        solvedCounts[p.difficulty]++;
      }
    });

    return Object.entries(solvedCounts).map(([name, value]) => ({ name, value }));
  }, [doneProblemIds, allProblemsFlat]);
  
  const topicProgressData = useMemo(() => {
    return allTopics.map(topic => {
      const problemsInTopic = Object.values(topic.problems).flat();
      const total = problemsInTopic.length;
      if (total === 0) return { name: topic.topic, progress: 0 };

      const solved = problemsInTopic.filter(p => doneProblemIds.includes(`${topic.topic}-${p.name}`)).length;
      const progress = Math.round((solved / total) * 100);
      return { name: topic.topic, progress };
    });
  }, [allTopics, doneProblemIds]);

  const weakestTopics = useMemo(() => {
    return [...topicProgressData]
      .sort((a, b) => a.progress - b.progress)
      .slice(0, 3);
  }, [topicProgressData]);

  return (
    // --- FIX for Z-Index ---
    // Increased z-index from z-50 to a higher arbitrary value z-[60]
    // This ensures it appears on top of the sidebar (which is z-50)
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-[60] p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <StatsIcon className="h-8 w-8 text-indigo-400 mr-3" />
            Your Progress Statistics
          </h1>
          <button onClick={() => dispatch(toggleStatsView())} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition">
            <CloseIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Difficulty Pie Chart & Weakest Topics */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
              <h2 className="font-bold text-lg text-white mb-4">Solved by Difficulty</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={difficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  {/* --- FIX for Tooltip --- */}
                  {/* Pass the custom style object to the Tooltip */}
                  <Tooltip contentStyle={customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Weakest Topics section remains the same */}
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700"> ... </div>
          </div>

          {/* Column 2: Topic Progress Bar Chart */}
          <div className="lg:col-span-2 bg-gray-800/60 p-4 rounded-xl border border-gray-700">
            <h2 className="font-bold text-lg text-white mb-4">Progress by Topic (%)</h2>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={topicProgressData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
                <YAxis type="category" dataKey="name" width={100} stroke="#9ca3af" tick={{ fontSize: 12 }} />
                {/* --- FIX for Tooltip --- */}
                {/* Pass the custom style object to the Tooltip here as well */}
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} />
                <Bar dataKey="progress" fill="#4f46e5" barSize={15}>
                  {topicProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.progress > 75 ? '#22c55e' : entry.progress > 40 ? '#facc15' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;