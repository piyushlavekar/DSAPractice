// src/features/starred/starredSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Function to load starred problems from localStorage
const loadStarredProblems = () => {
  try {
    const serializedState = localStorage.getItem('starredProblems');
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load starred problems from localStorage", err);
    return [];
  }
};

const initialState = {
  starredProblemIds: loadStarredProblems(),
};

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    toggleProblemStar: (state, action) => {
      const { problemId, problemName } = action.payload;
      const index = state.starredProblemIds.indexOf(problemId);

      if (index >= 0) {
        // If it's already starred, unstar it
        state.starredProblemIds.splice(index, 1);
        toast.info(`"${problemName}" unstarred.`, { toastId: `star-${problemId}` });
      } else {
        // If it's not starred, star it
        state.starredProblemIds.push(problemId);
        toast.warn(`"${problemName}" was starred!`, { toastId: `star-${problemId}`, icon: "⭐" });
      }
    },
  },
});

export const { toggleProblemStar } = starredSlice.actions;
export default starredSlice.reducer;