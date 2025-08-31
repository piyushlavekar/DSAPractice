
import React from 'react';
// Make sure you have these icon components.
import { CheckCircleIcon, LinkIcon } from './icons'; 

const DifficultySection = ({ topicName, difficulty, problems, doneProblems, onToggleDone }) => {
  const progress = {
    count: problems.filter(p => doneProblems.has(`${topicName}-${p.name}`)).length,
    total: problems.length
  };

  const difficultyStyles = {
    Easy: { text: 'text-green-400' },
    Medium: { text: 'text-yellow-400' },
    Hard: { text: 'text-red-400' }
  };

  const style = difficultyStyles[difficulty] || { text: 'text-gray-400' };

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className={`text-xl md:text-2xl font-bold ${style.text}`}>{difficulty}</h3>
        <span className="text-sm font-semibold text-gray-400">{progress.count} / {progress.total} Done</span>
      </div>
      <div className="divide-y divide-gray-700/50">
        {problems.map((problem) => {
          const isDone = doneProblems.has(`${topicName}-${problem.name}`);
          
          return (
            <div key={problem.name} className="flex items-center justify-between p-3 md:p-4 group">
              <div className="flex items-center flex-1 min-w-0">
                <button
                  onClick={() => onToggleDone(problem.name)}
                  className="mr-3 flex-shrink-0"
                  aria-label={`Toggle ${problem.name}`}
                >
                  {isDone ? (
                    <CheckCircleIcon className="h-6 w-6 text-indigo-400" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-gray-500 group-hover:border-indigo-400 transition"></div>
                  )}
                </button>
                
                {/* --- FIX is here: Changed problem.url to problem.link --- */}
                <a
                  href={problem.link} // <-- THE FIX
                  target="_blank"       
                  rel="noopener noreferrer"
                  className={`text-sm md:text-base truncate cursor-pointer transition-colors ${
                    isDone 
                      ? 'text-gray-500 line-through'
                      : 'text-gray-300 group-hover:text-indigo-400'
                  }`}
                >
                  {problem.name}
                </a>
              </div>

              {/* --- FIX is here as well: Check for problem.link --- */}
              {problem.link && ( // <-- THE FIX
                <a
                  href={problem.link} // <-- THE FIX
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-indigo-400 transition-colors ml-2"
                  aria-label={`Link to ${problem.name}`}
                >
                  <LinkIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySection;