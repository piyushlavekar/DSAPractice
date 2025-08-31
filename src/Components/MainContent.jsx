
// import React from 'react';
// import TopicHeader from './TopicHeader';
// import DifficultySection from './DifficultySection';
// import OverallProgress from './OverallProgress';

// const MainContent = ({ topic, doneProblems, onToggleDone, overallPercentage, totalSolved, totalProblems }) => {
//   return (
//     <section>
//       {/* This component displays the overall progress bar and stats */}
//       <OverallProgress
//         percentage={overallPercentage}
//         solved={totalSolved}
//         total={totalProblems}
//       />

//       {/* This component displays the header for the selected topic */}
//       <TopicHeader topic={topic} doneProblems={doneProblems} />

//       <div className="space-y-8 mt-6">
//         {/* We map over each difficulty (Easy, Medium, Hard) in the topic */}
//         {Object.entries(topic.problems).map(([difficulty, problems]) => {
//           // Don't render a section if there are no problems for that difficulty
//           if (problems.length === 0) return null;
          
//           // Render the DifficultySection, passing all the necessary data
//           return (
//             <DifficultySection
//               key={difficulty}
//               topicName={topic.topic}
//               difficulty={difficulty}
//               problems={problems}
//               doneProblems={doneProblems}
//               onToggleDone={onToggleDone}
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default MainContent;



// src/Components/MainContent.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearHighlightedProblem } from '../features/ui/uiSlice';
import TopicHeader from './TopicHeader';
import DifficultySection from './DifficultySection';
import OverallProgress from './OverallProgress';
import ActivityHeatmap from './ActivityHeatmap'; // 1. Import the new ActivityHeatmap component

const MainContent = () => {
  const topic = useSelector((state) => state.topics.selectedTopic);
  const highlightedProblemId = useSelector((state) => state.ui.highlightedProblemId);
  const dispatch = useDispatch();

  // useEffect for highlighting problems remains unchanged
  useEffect(() => {
    if (highlightedProblemId) {
      const element = document.getElementById(highlightedProblemId);
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        element.classList.add('highlight-problem');

        const highlightTimer = setTimeout(() => {
          element.classList.remove('highlight-problem');
          dispatch(clearHighlightedProblem());
        }, 5000);

        return () => {
          clearTimeout(highlightTimer);
        };
      } else {
        dispatch(clearHighlightedProblem());
      }
    }
  }, [highlightedProblemId, dispatch]);

  if (!topic) return null;

  return (
    <section>
      <OverallProgress />
     
      <TopicHeader />
      <div className="space-y-8 mt-6">
        {Object.entries(topic.problems).map(([difficulty, problems]) => {
          if (problems.length === 0) return null;
          
          return (
            <DifficultySection
              key={difficulty}
              topicName={topic.topic}
              difficulty={difficulty}
              problems={problems}
            />
          );
        })}
      </div>
       <ActivityHeatmap /> {/* 2. Add the ActivityHeatmap component here */}
    </section>
  );
};

export default MainContent;