
// import React from 'react';
// // Make sure you have these icon components.
// import { CheckCircleIcon, LinkIcon } from './icons'; 

// const DifficultySection = ({ topicName, difficulty, problems, doneProblems, onToggleDone }) => {
//   const progress = {
//     count: problems.filter(p => doneProblems.has(`${topicName}-${p.name}`)).length,
//     total: problems.length
//   };

//   const difficultyStyles = {
//     Easy: { text: 'text-green-400' },
//     Medium: { text: 'text-yellow-400' },
//     Hard: { text: 'text-red-400' }
//   };

//   const style = difficultyStyles[difficulty] || { text: 'text-gray-400' };

//   return (
//     <div className="bg-gray-800/80 border border-gray-700 rounded-xl shadow-lg">
//       <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//         <h3 className={`text-xl md:text-2xl font-bold ${style.text}`}>{difficulty}</h3>
//         <span className="text-sm font-semibold text-gray-400">{progress.count} / {progress.total} Done</span>
//       </div>
//       <div className="divide-y divide-gray-700/50">
//         {problems.map((problem) => {
//           const isDone = doneProblems.has(`${topicName}-${problem.name}`);
          
//           return (
//             <div key={problem.name} className="flex items-center justify-between p-3 md:p-4 group">
//               <div className="flex items-center flex-1 min-w-0">
//                 <button
//                   onClick={() => onToggleDone(problem.name)}
//                   className="mr-3 flex-shrink-0"
//                   aria-label={`Toggle ${problem.name}`}
//                 >
//                   {isDone ? (
//                     <CheckCircleIcon className="h-6 w-6 text-indigo-400" />
//                   ) : (
//                     <div className="h-6 w-6 rounded-full border-2 border-gray-500 group-hover:border-indigo-400 transition"></div>
//                   )}
//                 </button>
                
//                 {/* --- FIX is here: Changed problem.url to problem.link --- */}
//                 <a
//                   href={problem.link} // <-- THE FIX
//                   target="_blank"       
//                   rel="noopener noreferrer"
//                   className={`text-sm md:text-base truncate cursor-pointer transition-colors ${
//                     isDone 
//                       ? 'text-gray-500 line-through'
//                       : 'text-gray-300 group-hover:text-indigo-400'
//                   }`}
//                 >
//                   {problem.name}
//                 </a>
//               </div>

//               {/* --- FIX is here as well: Check for problem.link --- */}
//               {problem.link && ( // <-- THE FIX
//                 <a
//                   href={problem.link} // <-- THE FIX
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 text-gray-500 hover:text-indigo-400 transition-colors ml-2"
//                   aria-label={`Link to ${problem.name}`}
//                 >
//                   <LinkIcon className="h-5 w-5" />
//                 </a>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DifficultySection;


// src/Components/DifficultySection.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// 1. Import the new selector from the progress slice
import { toggleProblemStatus, selectDoneProblemIds } from '../features/progress/progressSlice';
import { toggleProblemStar } from '../features/starred/starredSlice';
import { openNoteModal } from '../features/ui/uiSlice';
import { CheckCircleIcon, LinkIcon, StarIcon, NoteIcon } from './icons';


const DifficultySection = ({ topicName, difficulty, problems }) => {
  const dispatch = useDispatch();
  // 2. Use the new selector to get the array of done problem IDs
  const doneProblemIds = useSelector(selectDoneProblemIds);
  const starredProblemIds = useSelector((state) => state.starred.starredProblemIds);
  const notes = useSelector((state) => state.notes.notes);

  // The rest of the component's logic does not need to change because
  // selectDoneProblemIds returns the data in the expected format (an array of strings).
  
  const handleToggleDone = (problemName) => {
    const problemId = `${topicName}-${problemName}`;
    const isDone = doneProblemIds.includes(problemId);
    dispatch(toggleProblemStatus(problemId));
    
    if (isDone) {
      toast.error(`"${problemName}" marked as incomplete.`, { toastId: problemName });
    } else {
      toast.success(`Excellent! You completed "${problemName}".`, { toastId: problemName });
    }
  };

  const handleToggleStar = (problemName) => {
    const problemId = `${topicName}-${problemName}`;
    dispatch(toggleProblemStar({ problemId, problemName }));
  };

  const handleOpenNoteModal = (problemName, problemId) => {
    dispatch(openNoteModal({ problemName, problemId }));
  };

  const solvedCount = problems.filter(p => doneProblemIds.includes(`${topicName}-${p.name}`)).length;

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
        <span className="text-sm font-semibold text-gray-400">{solvedCount} / {problems.length} Done</span>
      </div>
      <div className="divide-y divide-gray-700/50">
        {problems.map((problem) => {
          const problemId = `${topicName}-${problem.name}`;
          const isDone = doneProblemIds.includes(problemId);
          const isStarred = starredProblemIds.includes(problemId);
          const hasNote = notes[problemId] && notes[problemId].length > 0;

          return (
            <div 
              key={problem.name} 
              id={problemId}
              className="flex items-center justify-between p-3 md:p-4 group transition-all duration-300"
            >
              {/* --- LEFT SIDE: Checkbox and Problem Name --- */}
              <div className="flex items-center flex-1 min-w-0">
                <button
                  onClick={() => handleToggleDone(problem.name)}
                  className="mr-3 flex-shrink-0"
                  aria-label={`Toggle ${problem.name}`}
                >
                  {isDone ? <CheckCircleIcon className="h-6 w-6 text-indigo-400" /> : <div className="h-6 w-6 rounded-full border-2 border-gray-500 group-hover:border-indigo-400 transition"></div>}
                </button>
                
                <a
                  href={problem.link}
                  target="_blank"       
                  rel="noopener noreferrer"
                  className={`text-sm md:text-base truncate cursor-pointer transition-colors ${isDone ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-indigo-400'}`}
                >
                  {problem.name}
                </a>
              </div>

              {/* --- RIGHT SIDE: Action Icons (Note, Star, Link) --- */}
              <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
                <button
                  onClick={() => handleOpenNoteModal(problem.name, problemId)}
                  className="p-1"
                  aria-label={`Notes for ${problem.name}`}
                >
                  <NoteIcon 
                    className={`h-5 w-5 transition-colors duration-200 ${hasNote ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'}`}
                  />
                </button>

                <button
                  onClick={() => handleToggleStar(problem.name)}
                  className="p-1"
                  aria-label={`Star ${problem.name}`}
                >
                  <StarIcon 
                    className={`h-6 w-6 transition-colors duration-200 ${isStarred ? 'text-yellow-400' : 'text-gray-500 group-hover:text-yellow-400'}`}
                    isFilled={isStarred}
                  />
                </button>

                {problem.link && (
                  <a href={problem.link} target="_blank" rel="noopener noreferrer" className="p-1 text-gray-500 hover:text-indigo-400 transition-colors" aria-label={`Link to ${problem.name}`}>
                    <LinkIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySection;