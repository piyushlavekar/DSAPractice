
// src/features/progress/progressSlice.js
import { createSlice } from '@reduxjs/toolkit';

// The data structure is changing from an array of IDs: ['id1', 'id2']
// to an object mapping IDs to their completion details: { id1: { solvedDate: '...' } }

const loadDoneProblems = () => {
  try {
    const serializedState = localStorage.getItem('doneProblems');
    if (serializedState === null) {
      return {}; // Return an empty object for new users
    }
    const data = JSON.parse(serializedState);
    
    // This check handles the migration from the old array format.
    // If we find an array, we discard it and start fresh with an empty object.
    if (Array.isArray(data)) {
      return {};
    }
    
    return data;
  } catch (err) {
    console.error("Could not load done problems from localStorage", err);
    return {}; // Return empty object on error
  }
};

const initialState = {
  // 'doneProblems' is now an object, not an array of IDs
  doneProblems: loadDoneProblems(), 
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    toggleProblemStatus: (state, action) => {
      const problemId = action.payload;
      
      // Check if the problem is already in our object by checking for the key
      if (state.doneProblems[problemId]) {
        // If it exists, the user is marking it as UNDONE. So, we delete the key-value pair.
        delete state.doneProblems[problemId];
      } else {
        // If it doesn't exist, the user is marking it as DONE. 
        // We add it to the object with the current date and time.
        state.doneProblems[problemId] = {
          solvedDate: new Date().toISOString(),
        };
      }
    },
  },
});

// --- SELECTORS ---
// We now export selectors to abstract the new data structure away from the components.
// Components should use these instead of accessing the state directly.

// This selector returns the entire object, useful for calculations like the heatmap.
export const selectDoneProblems = (state) => state.progress.doneProblems;

// This selector mimics the old data structure (an array of IDs),
// so components that use `.includes()` can continue to work with a minimal change.
export const selectDoneProblemIds = (state) => Object.keys(state.progress.doneProblems);


export const { toggleProblemStatus } = progressSlice.actions;
export default progressSlice.reducer;