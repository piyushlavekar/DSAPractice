
// src/features/topics/topicsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dsaData from '../../dsa_problems_final_ai.json';

const validTopics = dsaData.filter((t) => t.topic && t.topic !== "Topic:");

// --- NEW: Create a flattened list of all problems for easy searching ---
const allProblemsFlat = validTopics.flatMap(topic =>
  // Go through each difficulty (Easy, Medium, Hard)
  Object.entries(topic.problems).flatMap(([difficulty, problems]) =>
    // Map over the problems in that difficulty
    problems.map(problem => ({
      ...problem,
      topicName: topic.topic, // Add the parent topic name to each problem object
      difficulty: difficulty,   // Add the difficulty to each problem object
    }))
  )
);

const initialState = {
  allTopics: validTopics,
  selectedTopic: validTopics.length > 0 ? validTopics[0] : null,
  allProblemsFlat: allProblemsFlat, // --- NEW: Add the flat list to our initial state ---
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    selectTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
  },
});

export const { selectTopic } = topicsSlice.actions;
export default topicsSlice.reducer;