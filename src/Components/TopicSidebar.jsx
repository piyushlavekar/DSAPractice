
// import React from 'react';
// // ▼▼▼ 1. CloseIcon ला इथे इम्पोर्ट करा ▼▼▼
// import { TopicIcon, CloseIcon } from './icons';

// // ▼▼▼ 2. Sidebar आता isOpen आणि onClose हे नवीन props घेईल ▼▼▼
// const TopicSidebar = ({ topics, selectedTopic, onSelectTopic, isOpen, onClose }) => {
//   return (
//     // ▼▼▼ 3. या <aside> टॅगच्या क्लासमध्ये मोठा बदल आहे. हे त्याला मोबाईलवर लपवते आणि बाजूने उघडण्याची सोय देते. ▼▼▼
//     <aside 
//       className={`fixed inset-y-0 left-0 bg-gray-900 border-r border-gray-700 w-72 p-4 transform transition-transform duration-300 ease-in-out z-50 
//                  lg:sticky lg:top-24 lg:self-start lg:bg-gray-800/50 lg:border-none lg:col-span-3 lg:translate-x-0 
//                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//     >
      
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-300 px-2">Topics</h2>
//         {/* ▼▼▼ 4. हे क्लोज बटण आहे, जे फक्त मोबाईलवर दिसेल ▼▼▼ */}
//         <button 
//           onClick={onClose} 
//           className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//           aria-label="Close sidebar"
//         >
//             <CloseIcon className="h-6 w-6" />
//         </button>
//       </div>
      
//       <ul className="space-y-1">
//         {topics.map(topic => (
//           <li
//             key={topic.topic}
//             // हा क्लास तसाच ठेवा
//             className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedTopic.topic === topic.topic ? 'bg-indigo-600 shadow-lg text-white font-semibold' : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'}`}
//             // ▼▼▼ 5. onClick मध्ये onClose() फंक्शन जोडा ▼▼▼
//             onClick={() => {
//               onSelectTopic(topic);
//               onClose(); // मोबाईलवर टॉपिक निवडल्यावर साईडबार आपोआप बंद होईल
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



// import React from 'react';
// import { TopicIcon, CloseIcon } from './icons'; // Assuming you have this icon file

// const TopicSidebar = ({ topics, selectedTopic, onSelectTopic, isOpen, onClose }) => {
//   return (
//     // CORRECTION: Added classes for height and independent scrolling on large screens (lg:)
//     <aside 
//       className={`fixed inset-y-0 left-0 bg-gray-800 border-r border-gray-700 w-72 p-4 transform transition-transform duration-300 ease-in-out z-50 
//                  lg:sticky lg:top-24 lg:col-span-3 lg:translate-x-0 
//                  lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:bg-transparent lg:border-none
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
//         {/* Added a check in case selectedTopic is briefly null */}
//         {topics.map(topic => (
//           <li
//             key={topic.topic}
//             className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedTopic && selectedTopic.topic === topic.topic ? 'bg-indigo-600 shadow-lg text-white font-semibold' : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'}`}
//             onClick={() => {
//               onSelectTopic(topic);
//               onClose(); // This now correctly only fires on click
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

import React from 'react';
import { TopicIcon, CloseIcon } from './icons'; 

const TopicSidebar = ({ topics, selectedTopic, onSelectTopic, isOpen, onClose }) => {
  return (
    <aside 
      // FIX: Added `overflow-y-auto` to the base classes. This enables scrolling on mobile.
      className={`fixed inset-y-0 left-0 bg-gray-800 border-r border-gray-700 w-72 p-4 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
                 lg:sticky lg:top-24 lg:col-span-3 lg:translate-x-0 
                 lg:h-[calc(100vh-7rem)] lg:bg-transparent lg:border-none
                 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-300 px-2">Topics</h2>
        <button 
          onClick={onClose} 
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          aria-label="Close sidebar"
        >
            <CloseIcon className="h-6 w-6" />
        </button>
      </div>
      
      <ul className="space-y-1">
        {topics.map(topic => (
          <li
            key={topic.topic}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedTopic && selectedTopic.topic === topic.topic ? 'bg-indigo-600 shadow-lg text-white font-semibold' : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'}`}
            onClick={() => {
              onSelectTopic(topic);
              onClose();
            }}
          >
            <TopicIcon className="h-5 w-5 mr-3" />
            <span>{topic.topic}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TopicSidebar;