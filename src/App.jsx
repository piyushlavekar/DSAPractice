// import React, { useState, useMemo, useEffect } from 'react';
// import dsaData from './dsa_problems_final_ai.json';

// // Components
// import Header from './Components/Header';
// import TopicSidebar from './Components/TopicSidebar';
// import MainContent from './Components/MainContent';
// import Footer from './Components/Footer';

// function App() {
//   const validTopics = useMemo(() => dsaData.filter(t => t.topic && t.topic !== "Topic:"), []);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [selectedTopic, setSelectedTopic] = useState(validTopics[0]);
//   const [doneProblems, setDoneProblems] = useState(() => {
//     const saved = localStorage.getItem('doneProblems');
//     return saved ? new Set(JSON.parse(saved)) : new Set();
//   });

//   useEffect(() => {
//     localStorage.setItem('doneProblems', JSON.stringify(Array.from(doneProblems)));
//   }, [doneProblems]);

//   const { totalProblems, totalSolved, overallPercentage } = useMemo(() => {
//     const allProblems = validTopics.reduce((acc, topic) => {
//       return acc + Object.values(topic.problems).flat().length;
//     }, 0);
//     const solvedCount = doneProblems.size;
//     const percentage = allProblems > 0 ? Math.round((solvedCount / allProblems) * 100) : 0;

//     return {
//       totalProblems: allProblems,
//       totalSolved: solvedCount,
//       overallPercentage: percentage
//     };
//   }, [doneProblems, validTopics]);

//   // ▼▼▼ handleToggleDone मध्ये टोस्ट नोटिफिकेशनसाठी बदल ▼▼▼
//   const handleToggleDone = (problemName) => {
//     const problemId = `${selectedTopic.topic}-${problemName}`;
//     setDoneProblems(prevDone => {
//       const newDone = new Set(prevDone);
//       if (newDone.has(problemId)) {
//         newDone.delete(problemId);
//         toast.error(`"${problemName}" अपूर्ण मार्क केला.`);
//       } else {
//         newDone.add(problemId);
//         toast.success(`शाब्बास! "${problemName}" पूर्ण केला.`);
//       }
//       return newDone;
//     });
//   };

//   return (

//     <div className="min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">

//       {/* Header ला साईडबार उघडण्यासाठीचा फंक्शन पास करणे */}
//       <Header onMenuClick={() => setIsSidebarOpen(true)} />

//       {/* मोबाईलवर साईडबार उघडल्यावर दिसणारा काळा ओव्हरले */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* ▼▼▼ मुख्य भागासाठीच्या लेआउटमध्ये बदल ▼▼▼ */}
//       <main className="w-full flex-grow">
//         <div className="container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

//             {/* TopicSidebar ला उघड-बंद करण्यासाठीचे props पास करणे */}
//             <TopicSidebar
//               topics={validTopics}
//               selectedTopic={selectedTopic}
//               onSelectTopic={setSelectedTopic}
//               isOpen={isSidebarOpen}
//               onClose={() => setIsSidebarOpen(false)}
//             />

//             {/* MainContent ला योग्य जागा देण्यासाठी एका div मध्ये ठेवणे */}
//             <div className="col-span-12 lg:col-span-9">
//               <MainContent
//                 topic={selectedTopic}
//                 doneProblems={doneProblems}
//                 onToggleDone={handleToggleDone}
//                 overallPercentage={overallPercentage}
//                 totalSolved={totalSolved}
//                 totalProblems={totalProblems}
//               />
//             </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;

// import React, { useState, useMemo, useEffect } from "react";
// import dsaData from "./dsa_problems_final_ai.json";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Components
// import Header from "./Components/Header";
// import TopicSidebar from "./Components/TopicSidebar";
// import MainContent from "./Components/MainContent";
// import Footer from "./Components/Footer";

// function App() {
//   const validTopics = useMemo(
//     () => dsaData.filter((t) => t.topic && t.topic !== "Topic:"),
//     []
//   );

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedTopic, setSelectedTopic] = useState(null); // Start with null

//   // Effect to set the first topic once data is loaded
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
//         toast.error(`"${problemName}" marked as incomplete.`);
//       } else {
//         newDone.add(problemId);
//         toast.success(`Excellent! You completed "${problemName}".`);
//       }
//       return newDone;
//     });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white">
//       <ToastContainer theme="dark" position="bottom-right" autoClose={3000} />

//       <Header onMenuClick={() => setIsSidebarOpen(true)} />

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* CORRECTION: This container now manages the layout and scrolling */}
//       <div className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-12 gap-8 overflow-hidden">
//         {/* Sidebar Column */}
//         {/* The sidebar component itself will handle its own styles and scrolling */}
//         <TopicSidebar
//           topics={validTopics}
//           selectedTopic={selectedTopic}
//           onSelectTopic={(topic) => {
//             setSelectedTopic(topic);
//             setIsSidebarOpen(false); // Close sidebar on mobile after selection
//           }}
//           isOpen={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//         />

//         {/* CORRECTION: This div wraps the MainContent and is the ONLY scrollable part */}
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


// import React, { useState, useMemo, useEffect } from "react";
// import dsaData from "./dsa_problems_final_ai.json";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Components
// import Header from "./Components/Header";
// import TopicSidebar from "./Components/TopicSidebar";
// import MainContent from "./Components/MainContent";
// import Footer from "./Components/Footer";

// function App() {
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
//         // FIX: Add a unique toastId to prevent duplicates
//         toast.error(`"${problemName}" marked as incomplete.`, {
//           toastId: problemName
//         });
//       } else {
//         newDone.add(problemId);
//         // FIX: Add the same unique toastId here
//         toast.success(`Excellent! You completed "${problemName}".`, {
//           toastId: problemName
//         });
//       }
//       return newDone;
//     });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white">
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



import React, { useState, useMemo, useEffect } from "react";
import dsaData from "./dsa_problems_final_ai.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from "./Components/Header";
import TopicSidebar from "./Components/TopicSidebar";
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";
import Preloader from "./Components/Preloader"; // <-- 1. Import the new Preloader component

function App() {
  // 2. Add a new state to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  // 3. Add a useEffect to hide the preloader after a delay
  useEffect(() => {
    // Set a timer to hide the preloader after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // This is a cleanup function that React will run if the component unmounts
    // It prevents memory leaks
    return () => clearTimeout(timer);
  }, []); // The empty array [] means this effect runs only once after the initial render


  const validTopics = useMemo(
    () => dsaData.filter((t) => t.topic && t.topic !== "Topic:"),
    []
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (validTopics.length > 0 && !selectedTopic) {
      setSelectedTopic(validTopics[0]);
    }
  }, [validTopics, selectedTopic]);

  const [doneProblems, setDoneProblems] = useState(() => {
    const saved = localStorage.getItem("doneProblems");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(
      "doneProblems",
      JSON.stringify(Array.from(doneProblems))
    );
  }, [doneProblems]);

  const { totalProblems, totalSolved, overallPercentage } = useMemo(() => {
    const allProblems = validTopics.reduce((acc, topic) => {
      return (
        acc + (topic.problems ? Object.values(topic.problems).flat().length : 0)
      );
    }, 0);
    const solvedCount = doneProblems.size;
    const percentage =
      allProblems > 0 ? Math.round((solvedCount / allProblems) * 100) : 0;

    return {
      totalProblems: allProblems,
      totalSolved: solvedCount,
      overallPercentage: percentage,
    };
  }, [doneProblems, validTopics]);

  const handleToggleDone = (problemName) => {
    if (!selectedTopic) return;
    const problemId = `${selectedTopic.topic}-${problemName}`;
    setDoneProblems((prevDone) => {
      const newDone = new Set(prevDone);
      if (newDone.has(problemId)) {
        newDone.delete(problemId);
        toast.error(`"${problemName}" marked as incomplete.`, {
          toastId: problemName
        });
      } else {
        newDone.add(problemId);
        toast.success(`Excellent! You completed "${problemName}".`, {
          toastId: problemName
        });
      }
      return newDone;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 4. Conditionally render the Preloader */}
      {isLoading && <Preloader />}

      {/* The rest of your app remains the same */}
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />

      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-12 gap-8 overflow-hidden">
        <TopicSidebar
          topics={validTopics}
          selectedTopic={selectedTopic}
          onSelectTopic={(topic) => {
            setSelectedTopic(topic);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="col-span-12 lg:col-span-9 overflow-y-auto">
          {selectedTopic ? (
            <MainContent
              topic={selectedTopic}
              doneProblems={doneProblems}
              onToggleDone={handleToggleDone}
              overallPercentage={overallPercentage}
              totalSolved={totalSolved}
              totalProblems={totalProblems}
            />
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