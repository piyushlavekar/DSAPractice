
import React from 'react';
import TopicHeader from './TopicHeader';
import DifficultySection from './DifficultySection';
import OverallProgress from './OverallProgress';

const MainContent = ({ topic, doneProblems, onToggleDone, overallPercentage, totalSolved, totalProblems }) => {
  return (
    <section>
      {/* This component displays the overall progress bar and stats */}
      <OverallProgress
        percentage={overallPercentage}
        solved={totalSolved}
        total={totalProblems}
      />

      {/* This component displays the header for the selected topic */}
      <TopicHeader topic={topic} doneProblems={doneProblems} />

      <div className="space-y-8 mt-6">
        {/* We map over each difficulty (Easy, Medium, Hard) in the topic */}
        {Object.entries(topic.problems).map(([difficulty, problems]) => {
          // Don't render a section if there are no problems for that difficulty
          if (problems.length === 0) return null;
          
          // Render the DifficultySection, passing all the necessary data
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