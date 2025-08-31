

// import React from 'react';
// import { TopicIcon, CloseIcon } from './icons'; 

// const TopicSidebar = ({ topics, selectedTopic, onSelectTopic, isOpen, onClose }) => {
//   return (
//     <aside 
//       // FIX: Added `overflow-y-auto` to the base classes. This enables scrolling on mobile.
//       className={`fixed inset-y-0 left-0 bg-gray-800 border-r border-gray-700 w-72 p-4 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
//                  lg:sticky lg:top-24 lg:col-span-3 lg:translate-x-0 
//                  lg:h-[calc(100vh-7rem)] lg:bg-transparent lg:border-none
//                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-300 px-2">Topics</h2>
//         <button 
//           onClick={onClose} 
//           className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
//           aria-label="Close sidebar"
//         >
//             <CloseIcon className="h-6 w-6" />
//         </button>
//       </div>
      
//       <ul className="space-y-1">
//         {topics.map(topic => (
//           <li
//             key={topic.topic}
//             className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedTopic && selectedTopic.topic === topic.topic ? 'bg-indigo-600 shadow-lg text-white font-semibold' : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'}`}
//             onClick={() => {
//               onSelectTopic(topic);
//               onClose();
//             }}
//           >
//             <TopicIcon className="h-5 w-5 mr-3" />
//             <span>{topic.topic}</span>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default TopicSidebar;





// src/Components/TopicSidebar.jsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { selectTopic } from '../features/topics/topicsSlice';
import { closeSidebar } from '../features/ui/uiSlice';
import { selectDoneProblemIds } from '../features/progress/progressSlice';
import { TopicIcon, CloseIcon } from './icons'; 

const TopicSidebar = () => {
  const dispatch = useDispatch();
  const { allTopics, selectedTopic } = useSelector((state) => state.topics);
  const isOpen = useSelector((state) => state.ui.isSidebarOpen);
  const doneProblemIds = useSelector(selectDoneProblemIds);

  const topicProgressMap = useMemo(() => {
    // This calculation logic is perfect and remains the same
    const progressMap = {};
    allTopics.forEach(topic => {
      const allProblemsInTopic = Object.values(topic.problems).flat();
      if (allProblemsInTopic.length === 0) {
        progressMap[topic.topic] = 0;
        return;
      }
      const doneCount = allProblemsInTopic.filter(p => doneProblemIds.includes(`${topic.topic}-${p.name}`)).length;
      const percentage = Math.round((doneCount / allProblemsInTopic.length) * 100);
      progressMap[topic.topic] = percentage;
    });
    return progressMap;
  }, [allTopics, doneProblemIds]);

  const handleSelectTopic = (topic) => {
    dispatch(selectTopic(topic));
    dispatch(closeSidebar());
  };
  
  return (
    <aside 
      className={clsx(
        'fixed inset-y-0 left-0 bg-gray-800 border-r border-gray-700 w-72 p-4 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto',
        'lg:sticky lg:top-24 lg:col-span-3 lg:translate-x-0',
        'lg:h-[calc(100vh-7rem)] lg:bg-transparent lg:border-none',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300 px-2">Topics</h2>
        <button 
          onClick={() => dispatch(closeSidebar())} 
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          aria-label="Close sidebar"
        >
            <CloseIcon className="h-6 w-6" />
        </button>
      </div>
      
      <ul className="space-y-1">
        {allTopics.map(topic => {
          const progress = topicProgressMap[topic.topic] || 0;
          const isSelected = selectedTopic && selectedTopic.topic === topic.topic;

          return (
            // --- UPDATED LIST ITEM ---
            <li
              key={topic.topic}
              onClick={() => handleSelectTopic(topic)}
              // 1. We now use flexbox to position the name and the progress bar
              className={clsx(
                'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200',
                isSelected 
                  ? 'bg-indigo-600 shadow-lg text-white font-semibold' 
                  : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'
              )}
            >
              {/* --- Topic Name and Icon --- */}
              <div className="flex items-center truncate">
                <TopicIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate pr-2">{topic.topic}</span>
              </div>
              
              {/* --- NEW: Simple Mini Progress Bar --- */}
              <div className="w-16 h-2 bg-gray-700 rounded-full ml-2 flex-shrink-0">
                <div 
                  className={clsx(
                    'h-2 rounded-full transition-all duration-500',
                    // Conditionally set the bar color
                    progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                  )}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default TopicSidebar;