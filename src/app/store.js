
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import topicsReducer from '../features/topics/topicsSlice';
import progressReducer from '../features/progress/progressSlice';
import searchReducer from '../features/search/searchSlice';
import starredReducer from '../features/starred/starredSlice';
import notesReducer from '../features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    topics: topicsReducer,
    progress: progressReducer,
    search: searchReducer,
    starred: starredReducer,
    notes: notesReducer,
  },
});


store.subscribe(() => {
  try {
    const state = store.getState();
    
    // ▼▼▼ THIS IS THE UPDATED LINE ▼▼▼
    // Save the entire 'doneProblems' object, which includes the completion dates.
    const doneState = JSON.stringify(state.progress.doneProblems);
    // ▲▲▲ THE UPDATE IS COMPLETE ▲▲▲
    localStorage.setItem('doneProblems', doneState);
    
    // Save 'starred' problems (no change here)
    const starredState = JSON.stringify(state.starred.starredProblemIds);
    localStorage.setItem('starredProblems', starredState);
 
    // Save notes (no change here)
    const notesState = JSON.stringify(state.notes.notes);
    localStorage.setItem('problemNotes', notesState);
    
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
});