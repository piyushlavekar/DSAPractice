


// import React, { useState, useMemo, useEffect } from "react";
// import dsaData from "./dsa_problems_final_ai.json";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Components
// import Header from "./Components/Header";
// import TopicSidebar from "./Components/TopicSidebar";
// import MainContent from "./Components/MainContent";
// import Footer from "./Components/Footer";
// import Preloader from "./Components/Preloader"; // <-- 1. Import the new Preloader component

// function App() {
//   // 2. Add a new state to manage the loading status
//   const [isLoading, setIsLoading] = useState(true);

//   // 3. Add a useEffect to hide the preloader after a delay
//   useEffect(() => {
//     // Set a timer to hide the preloader after 3000 milliseconds (3 seconds)
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     // This is a cleanup function that React will run if the component unmounts
//     // It prevents memory leaks
//     return () => clearTimeout(timer);
//   }, []); // The empty array [] means this effect runs only once after the initial render


//   const validTopics = useMemo(
//     () => dsaData.filter((t) => t.topic && t.topic !== "Topic:"),
//     []
//   );

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   useEffect(() => {
//     if (validTopics.length > 0 && !selectedTopic) {
//       setSelectedTopic(validTopics[0]);
//     }
//   }, [validTopics, selectedTopic]);

//   const [doneProblems, setDoneProblems] = useState(() => {
//     const saved = localStorage.getItem("doneProblems");
//     return saved ? new Set(JSON.parse(saved)) : new Set();
//   });

//   useEffect(() => {
//     localStorage.setItem(
//       "doneProblems",
//       JSON.stringify(Array.from(doneProblems))
//     );
//   }, [doneProblems]);

//   const { totalProblems, totalSolved, overallPercentage } = useMemo(() => {
//     const allProblems = validTopics.reduce((acc, topic) => {
//       return (
//         acc + (topic.problems ? Object.values(topic.problems).flat().length : 0)
//       );
//     }, 0);
//     const solvedCount = doneProblems.size;
//     const percentage =
//       allProblems > 0 ? Math.round((solvedCount / allProblems) * 100) : 0;

//     return {
//       totalProblems: allProblems,
//       totalSolved: solvedCount,
//       overallPercentage: percentage,
//     };
//   }, [doneProblems, validTopics]);

//   const handleToggleDone = (problemName) => {
//     if (!selectedTopic) return;
//     const problemId = `${selectedTopic.topic}-${problemName}`;
//     setDoneProblems((prevDone) => {
//       const newDone = new Set(prevDone);
//       if (newDone.has(problemId)) {
//         newDone.delete(problemId);
//         toast.error(`"${problemName}" marked as incomplete.`, {
//           toastId: problemName
//         });
//       } else {
//         newDone.add(problemId);
//         toast.success(`Excellent! You completed "${problemName}".`, {
//           toastId: problemName
//         });
//       }
//       return newDone;
//     });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white">
      
//       {/* 4. Conditionally render the Preloader */}
//       {isLoading && <Preloader />}

//       {/* The rest of your app remains the same */}
//       <ToastContainer theme="dark" position="top-right" autoClose={3000} />

//       <Header onMenuClick={() => setIsSidebarOpen(true)} />

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       <div className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-12 gap-8 overflow-hidden">
//         <TopicSidebar
//           topics={validTopics}
//           selectedTopic={selectedTopic}
//           onSelectTopic={(topic) => {
//             setSelectedTopic(topic);
//             setIsSidebarOpen(false);
//           }}
//           isOpen={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//         />

//         <div className="col-span-12 lg:col-span-9 overflow-y-auto">
//           {selectedTopic ? (
//             <MainContent
//               topic={selectedTopic}
//               doneProblems={doneProblems}
//               onToggleDone={handleToggleDone}
//               overallPercentage={overallPercentage}
//               totalSolved={totalSolved}
//               totalProblems={totalProblems}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-xl text-gray-400">Loading topics...</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default App;



// src/App.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";


// Components
import Header from "./Components/Header";
import TopicSidebar from "./Components/TopicSidebar";
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";
import Preloader from "./Components/Preloader";
import { closeSidebar } from "./features/ui/uiSlice";

import NoteModal from "./Components/NoteModal";

import StarredProblemsView from "./Components/StarredProblemsView"; 
import RandomProblemModal from "./Components/RandomProblemModal"; // <-- Import the new modal
import StatsPage from "./Components/StatsPage"; 


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const selectedTopic = useSelector((state) => state.topics.selectedTopic);
  const isStarredViewOpen = useSelector((state) => state.ui.isStarredViewOpen); 
  const isRandomModalOpen = useSelector((state) => state.ui.isRandomModalOpen); // <-- Get the state
  const isStatsViewOpen = useSelector((state) => state.ui.isStatsViewOpen); // <-- Get the state

  const dispatch = useDispatch();
  

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white">
      {isLoading && <Preloader />}
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      <NoteModal />
      {isStarredViewOpen && <StarredProblemsView />} 
      {isRandomModalOpen && <RandomProblemModal />} {/* <-- Conditionally render the modal */}
      {isStatsViewOpen && <StatsPage />} {/* <-- Conditionally render the page */}

      
      <Header />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        ></div>
      )}

      <div className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-12 gap-8 overflow-hidden">
        <TopicSidebar />

        <div className="col-span-12 lg:col-span-9 overflow-y-auto">
          {selectedTopic ? (
            <MainContent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-400">Loading topics...</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;