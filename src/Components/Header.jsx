

// import React from 'react';
// import { MenuIcon } from './icons'; // 1. MenuIcon ला icons.jsx मधून इम्पोर्ट करा

// // 2. Header आता 'onMenuClick' नावाचा एक फंक्शन props म्हणून घेईल
// const Header = ({ onMenuClick }) => {
//   return (
//     // 3. z-index वाढवा (z-40), जेणेकरून तो साईडबारच्या overlay च्या वर राहील
//     <header className="bg-gray-800/70 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-700">
//       <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
//           DSA Practice
//         </h1>
        
//         {/* 4. हे हॅम्बर्गर मेनू बटण आहे */}
//         {/* हा फक्त मोबाईलवर दिसेल (lg:hidden म्हणजे मोठ्या स्क्रीनवर लपलेला) */}
//         <button 
//           onClick={onMenuClick} // 5. यावर क्लिक केल्यावर App.jsx मधील फंक्शन चालेल
//           className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//           aria-label="Open sidebar"
//         >
//           <MenuIcon className="h-6 w-6" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


// src/Components/Header.jsx
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// 1. Imports are already correct from your provided code
import { openSidebar, setHighlightedProblem, toggleStarredView, openRandomModal, toggleStatsView } from '../features/ui/uiSlice';
import { setSearchQuery, setSearchResults, clearSearch } from '../features/search/searchSlice';
import { selectTopic } from '../features/topics/topicsSlice';
// 2. Icons are also already correctly imported
import { MenuIcon, SearchIcon, StarIcon, ShuffleIcon, StatsIcon } from './icons';
import StreakCounter from './StreakCounter';



const Header = () => {
  const dispatch = useDispatch();
  
  const isStarredViewOpen = useSelector((state) => state.ui.isStarredViewOpen);
  // 3. State for the stats view is already correctly fetched
  const isStatsViewOpen = useSelector((state) => state.ui.isStatsViewOpen);
  const { query, results } = useSelector((state) => state.search);
  const { allProblemsFlat, allTopics } = useSelector((state) => state.topics);
  
  const searchContainerRef = useRef(null);

  // All hooks and helper functions remain unchanged...
  useEffect(() => {
    if (query.trim() === '') {
      dispatch(setSearchResults([]));
      return;
    }
    const filteredResults = allProblemsFlat
      .filter(problem => problem.name.toLowerCase().includes(query.toLowerCase()));
    dispatch(setSearchResults(filteredResults));
  }, [query, allProblemsFlat, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        dispatch(clearSearch());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef, dispatch]);

  const handleResultClick = (problem) => {
    const topicToSelect = allTopics.find(t => t.topic === problem.topicName);
    if (topicToSelect) {
      dispatch(selectTopic(topicToSelect));
      const problemId = `${problem.topicName}-${problem.name}`;
      dispatch(setHighlightedProblem(problemId));
    }
    dispatch(clearSearch());
  };

  return (
    <header className="bg-gray-800/70 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-2 sm:gap-4">
        
        {/* Title and StreakCounter (unchanged) */}
        <div className="flex-shrink-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            DSA Practice
          </h1>
          <StreakCounter />
        </div>
        
        {/* Search Bar and Results (unchanged) */}
        <div className="relative flex-1 max-w-lg" ref={searchContainerRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a problem..."
            value={query}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="block w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-gray-900 transition"
          />
          {results.length > 0 && (
            <ul className="absolute mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
              {results.map((problem) => (
                <li
                  key={`${problem.topicName}-${problem.name}`}
                  onClick={() => handleResultClick(problem)}
                  className="px-4 py-3 cursor-pointer hover:bg-indigo-600 transition-colors"
                >
                  <p className="font-semibold text-gray-200">{problem.name}</p>
                  <p className="text-sm text-indigo-300">{problem.topicName} - {problem.difficulty}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Container for right-side icons */}
        <div className="flex items-center space-x-2">
          {/* --- 4. NEW: Stats Page Button --- */}
          <button
            onClick={() => dispatch(toggleStatsView())}
            className={`p-2 rounded-full transition-colors ${isStatsViewOpen ? 'bg-gray-700 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            aria-label="Show statistics"
          >
            <StatsIcon className="h-6 w-6" />
          </button>

          <button
            onClick={() => dispatch(openRandomModal())}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Find a random problem"
          >
            <ShuffleIcon className="h-6 w-6" />
          </button>
        
          <button
            onClick={() => dispatch(toggleStarredView())}
            className={`p-2 rounded-full transition-colors ${isStarredViewOpen ? 'bg-gray-700 text-yellow-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            aria-label="Show starred problems"
          >
            <StarIcon className="h-6 w-6" isFilled={isStarredViewOpen} />
          </button>
          
          <button 
            onClick={() => dispatch(openSidebar())}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;