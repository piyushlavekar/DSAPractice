

// import React from 'react';
// import TopicHeader from './TopicHeader';
// import DifficultySection from './DifficultySection';
// import OverallProgress from './OverallProgress'; // <-- नवीन Component इम्पोर्ट करा

// // ▼▼▼▼▼▼▼ इथे props मध्ये नवीन व्हॅल्यूज घ्या ▼▼▼▼▼▼▼
// const MainContent = ({ topic, doneProblems, onToggleDone, overallPercentage, totalSolved, totalProblems }) => {
//   return (
//     <main className="lg:col-span-9">
//       {/* ▼▼▼▼▼▼▼ नवीन Component इथे वापरा ▼▼▼▼▼▼▼ */}
//       <OverallProgress
//         percentage={overallPercentage}
//         solved={totalSolved}
//         total={totalProblems}
//       />
//       {/* ▲▲▲▲▲▲▲ नवीन Component इथे संपतो ▲▲▲▲▲▲▲ */}

//       <TopicHeader topic={topic} doneProblems={doneProblems} />
//       <div className="space-y-8">
//         {Object.entries(topic.problems).map(([difficulty, problems]) => {
//           if (problems.length === 0) return null;
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
//     </main>
//   );
// };

// export default MainContent;


import React from 'react';
import TopicHeader from './TopicHeader';
import DifficultySection from './DifficultySection';
import OverallProgress from './OverallProgress';

const MainContent = ({ topic, doneProblems, onToggleDone, overallPercentage, totalSolved, totalProblems }) => {
  return (
    // CORRECTION: The className here was removed as it's now handled by the parent div in App.jsx
    <section>
      <OverallProgress
        percentage={overallPercentage}
        solved={totalSolved}
        total={totalProblems}
      />

      <TopicHeader topic={topic} doneProblems={doneProblems} />

      <div className="space-y-8 mt-6">
        {Object.entries(topic.problems).map(([difficulty, problems]) => {
          if (problems.length === 0) return null;
          return (
            <DifficultySection
              key={difficulty}
              topicName={topic.topic}
              difficulty={difficulty}
              problems={problems}
              doneProblems={doneProblems}
              onToggleDone={onToggleDone}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MainContent;

// With these changes, your application will now have the desired scrolling behavior: the main content will scroll independently on the right, while the topic sidebar will remain fixed and scroll its own list if necessary.