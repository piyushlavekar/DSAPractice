// src/Components/RandomProblemModal.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeRandomModal, setHighlightedProblem } from '../features/ui/uiSlice';
import { selectTopic } from '../features/topics/topicsSlice';
import { selectDoneProblemIds } from '../features/progress/progressSlice';
import { CloseIcon, ShuffleIcon } from './icons';

const RandomProblemModal = () => {
  const dispatch = useDispatch();

  // Local state for the user's filter choices
  const [difficulty, setDifficulty] = useState('Any');
  const [topicName, setTopicName] = useState('Any');
  const [unsolvedOnly, setUnsolvedOnly] = useState(true);
  const [error, setError] = useState('');

  // Get all necessary data from the Redux store
  const { allTopics, allProblemsFlat } = useSelector((state) => state.topics);
  const doneProblemIds = useSelector(selectDoneProblemIds);

  const handleFindProblem = () => {
    setError(''); // Reset error on new attempt

    // 1. Start with the full list of problems
    let candidateProblems = [...allProblemsFlat];

    // 2. Apply filters based on user selection
    if (unsolvedOnly) {
      candidateProblems = candidateProblems.filter(p => !doneProblemIds.includes(`${p.topicName}-${p.name}`));
    }
    if (difficulty !== 'Any') {
      candidateProblems = candidateProblems.filter(p => p.difficulty === difficulty);
    }
    if (topicName !== 'Any') {
      candidateProblems = candidateProblems.filter(p => p.topicName === topicName);
    }

    // 3. Check if any problems match the criteria
    if (candidateProblems.length === 0) {
      setError('No problems match your criteria. Try broadening your search!');
      return;
    }

    // 4. Select a random problem from the filtered list
    const randomIndex = Math.floor(Math.random() * candidateProblems.length);
    const randomProblem = candidateProblems[randomIndex];

    // 5. Dispatch actions to navigate the user
    const topicToSelect = allTopics.find(t => t.topic === randomProblem.topicName);
    if (topicToSelect) {
      const problemId = `${randomProblem.topicName}-${randomProblem.name}`;
      dispatch(selectTopic(topicToSelect));
      dispatch(setHighlightedProblem(problemId));
      dispatch(closeRandomModal());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => dispatch(closeRandomModal())}>
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <ShuffleIcon className="h-6 w-6 mr-3 text-indigo-400" />
            Pick a Random Problem
          </h2>
          <button onClick={() => dispatch(closeRandomModal())} className="p-2 rounded-full hover:bg-gray-700">
            <CloseIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full bg-gray-900 border-gray-600 rounded-lg p-2 text-white">
              <option>Any</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          
          {/* Topic Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Topic</label>
            <select value={topicName} onChange={(e) => setTopicName(e.target.value)} className="w-full bg-gray-900 border-gray-600 rounded-lg p-2 text-white">
              <option>Any</option>
              {allTopics.map(topic => <option key={topic.topic}>{topic.topic}</option>)}
            </select>
          </div>

          {/* Unsolved Only Checkbox */}
          <div className="flex items-center pt-2">
            <input id="unsolved" type="checkbox" checked={unsolvedOnly} onChange={(e) => setUnsolvedOnly(e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-indigo-500 focus:ring-indigo-600"/>
            <label htmlFor="unsolved" className="ml-2 text-sm text-gray-200">Unsolved Problems Only</label>
          </div>
        </div>

        <div className="p-6 bg-gray-800/50 border-t border-gray-700">
          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          <button onClick={handleFindProblem} className="w-full py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center">
            Find Problem
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomProblemModal;