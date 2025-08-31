
// src/Components/StarredProblemsView.jsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStarredView, setHighlightedProblem } from '../features/ui/uiSlice';
import { selectTopic } from '../features/topics/topicsSlice';
import { CloseIcon, StarIcon } from './icons';

const StarredProblemsView = () => {
  const dispatch = useDispatch();

  // All of the existing logic and state selectors are correct.
  const { starredProblemIds } = useSelector((state) => state.starred);
  const { allProblemsFlat, allTopics } = useSelector((state) => state.topics);

  const groupedStarredProblems = useMemo(() => {
    const starredProblems = allProblemsFlat.filter(p => 
      starredProblemIds.includes(`${p.topicName}-${p.name}`)
    );
    return starredProblems.reduce((acc, problem) => {
      const topic = problem.topicName;
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(problem);
      return acc;
    }, {});
  }, [starredProblemIds, allProblemsFlat]);

  const topicOrder = Object.keys(groupedStarredProblems);

  const handleProblemClick = (problem) => {
    const topicToSelect = allTopics.find(t => t.topic === problem.topicName);
    if (topicToSelect) {
      dispatch(selectTopic(topicToSelect));
      const problemId = `${problem.topicName}-${problem.name}`;
      dispatch(setHighlightedProblem(problemId));
    }
    dispatch(toggleStarredView());
  };

  return (
    // --- FIX IS HERE ---
    // Increased the z-index from z-50 to a higher value, z-[60].
    // This ensures it will always stack on top of the sidebar (which is z-50).
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-[60] p-4 sm:p-6 md:p-8 overflow-y-auto">
    {/* --- END FIX --- */}
    
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <StarIcon className="h-8 w-8 text-yellow-400 mr-3" isFilled={true} />
            Your Starred Problems
          </h1>
          <button onClick={() => dispatch(toggleStarredView())} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition">
            <CloseIcon className="h-7 w-7" />
          </button>
        </div>

        {topicOrder.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">You haven't starred any problems yet.</p>
            <p className="text-gray-500 mt-2">Click the star icon next to a problem to add it here!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {topicOrder.map(topicName => (
              <section key={topicName}>
                <h2 className="text-xl font-semibold text-indigo-300 pb-2 border-b-2 border-gray-700 mb-3">
                  {topicName}
                </h2>
                <ul className="space-y-1">
                  {groupedStarredProblems[topicName].map(problem => (
                    <li 
                      key={problem.name}
                      onClick={() => handleProblemClick(problem)}
                      className="p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-gray-200">{problem.name}</span>
                      <span className="text-xs font-mono px-2 py-1 rounded-full bg-gray-700 text-gray-400">
                        {problem.difficulty}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StarredProblemsView;