

// import React from 'react';
// // ▼▼▼ 1. LinkIcon ला इथे इम्पोर्ट करा ▼▼▼
// import { CheckCircleIcon, LinkIcon } from './icons';

// const ProblemItem = ({ problem, index, isDone, onToggle }) => {
//   // ▼▼▼ 2. लिंक वैध आहे की नाही हे तपासा ▼▼▼
//   const hasValidLink = problem.link && problem.link !== "<->";

//   return (
//     <div className="p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors duration-200">
      
//       {/* प्रॉब्लेमचे नाव आणि लिंक आयकॉन */}
//       <div className="flex items-center">
//         <span className="text-gray-500 font-mono text-sm w-8 text-right mr-4">{index + 1}.</span>
        
//         {/* ▼▼▼ 3. या संपूर्ण भागाला बदला ▼▼▼ */}
//         {hasValidLink ? (
//           // जर वैध लिंक असेल, तर <a> टॅग वापरा
//           <a
//             href={problem.link}
//             target="_blank" // नवीन टॅबमध्ये उघडण्यासाठी
//             rel="noopener noreferrer" // सुरक्षेसाठी
//             className="text-gray-200 hover:text-indigo-400 hover:underline flex items-center group"
//           >
//             {problem.name}
//             {/* लिंक आयकॉन फक्त hover केल्यावर दिसेल */}
//             <LinkIcon className="h-4 w-4 ml-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//           </a>
//         ) : (
//           // जर लिंक नसेल, तर फक्त <p> टॅग वापरा
//           <p className="text-gray-200">{problem.name}</p>
//         )}
//         {/* ▲▲▲ 3. बदल इथे संपतो ▲▲▲ */}
//       </div>

//       {/* 'Done' करण्यासाठीचा चेकमार्क बटण */}
//       {/* ▼▼▼ 4. z-10 हा क्लास जोडा, जेणेकरून लिंकच्या मागे बटण जाणार नाही ▼▼▼ */}
//       <button onClick={onToggle} className="flex-shrink-0 z-10">
//         {isDone ? (
//           <CheckCircleIcon className="h-7 w-7 text-green-500" />
//         ) : (
//           <div className="h-7 w-7 rounded-full border-2 border-gray-600 group-hover:border-indigo-500 transition-all"></div>
//         )}
//       </button>

//     </div>
//   );
// };

// export default ProblemItem;




import React from 'react';
// ▼▼▼ 1. LinkIcon ला इथे इम्पोर्ट करा ▼▼▼
import { CheckCircleIcon, LinkIcon } from './icons';

const ProblemItem = ({ problem, index, isDone, onToggle }) => {
  // ▼▼▼ 2. लिंक वैध आहे की नाही हे तपासा ▼▼▼
  const hasValidLink = problem.link && problem.link !== "<->";

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors duration-200">
      
      {/* प्रॉब्लेमचे नाव आणि लिंक आयकॉन */}
      <div className="flex items-center">
        <span className="text-gray-500 font-mono text-sm w-8 text-right mr-4">{index + 1}.</span>
        
        {/* ▼▼▼ 3. या संपूर्ण भागाला बदला ▼▼▼ */}
        {hasValidLink ? (
          // जर वैध लिंक असेल, तर <a> टॅग वापरा
          <a
            href={problem.link}
            target="_blank" // नवीन टॅबमध्ये उघडण्यासाठी
            rel="noopener noreferrer" // सुरक्षेसाठी
            className="text-gray-200 hover:text-indigo-400 hover:underline flex items-center group"
          >
            {problem.name}
            {/* लिंक आयकॉन फक्त hover केल्यावर दिसेल */}
            <LinkIcon className="h-4 w-4 ml-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          // जर लिंक नसेल, तर फक्त <p> टॅग वापरा
          <p className="text-gray-200">{problem.name}</p>
        )}
        {/* ▲▲▲ 3. बदल इथे संपतो ▲▲▲ */}
      </div>

      {/* 'Done' करण्यासाठीचा चेकमार्क बटण */}
      {/* ▼▼▼ 4. z-10 हा क्लास जोडा, जेणेकरून लिंकच्या मागे बटण जाणार नाही ▼▼▼ */}
      <button onClick={onToggle} className="flex-shrink-0 z-10">
        {isDone ? (
          <CheckCircleIcon className="h-7 w-7 text-green-500" />
        ) : (
          <div className="h-7 w-7 rounded-full border-2 border-gray-600 group-hover:border-indigo-500 transition-all"></div>
        )}
      </button>

    </div>
  );
};

export default ProblemItem;