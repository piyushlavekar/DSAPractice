// import React, { useMemo } from 'react';

// const TopicHeader = ({ topic, doneProblems }) => {
//   const totalProgress = useMemo(() => {
//     const allProblems = Object.values(topic.problems).flat();
//     if (allProblems.length === 0) return 0;
//     const doneCount = allProblems.filter(p => doneProblems.has(`${topic.topic}-${p.name}`)).length;
//     return Math.round((doneCount / allProblems.length) * 100);
//   }, [topic, doneProblems]);

//   return (
//     <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-2xl border border-gray-700">
//       <h2 className="text-4xl font-bold text-white mb-3">{topic.topic}</h2>
//       <p className="text-gray-400 mb-4">Total Progress: {totalProgress}%</p>
//       <div className="w-full bg-gray-700 rounded-full h-3">
//         <div
//           className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
//           style={{ width: `${totalProgress}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default TopicHeader;

import React, { useMemo } from 'react';

const TopicHeader = ({ topic, doneProblems }) => {
  const totalProgress = useMemo(() => {
    if (!topic || !topic.problems) return 0; // Guard clause for safety
    const allProblems = Object.values(topic.problems).flat();
    if (allProblems.length === 0) return 0;
    const doneCount = allProblems.filter(p => doneProblems.has(`${topic.topic}-${p.name}`)).length;
    return Math.round((doneCount / allProblems.length) * 100);
  }, [topic, doneProblems]);

  return (
    // RESPONSIVE: Smaller padding for mobile (p-4), larger for medium screens up (md:p-6).
    <div className="bg-gray-800 p-4 md:p-6 rounded-xl mb-6 md:mb-8 shadow-2xl border border-gray-700">
      {/* RESPONSIVE: Make the heading much smaller on mobile (text-2xl) and larger on desktop (lg:text-4xl) */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">{topic.topic}</h2>
      <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">Total Progress: {totalProgress}%</p>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TopicHeader;