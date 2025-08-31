
// src/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Sidebar State
  isSidebarOpen: true, // Default to true so it's open on desktop page load

  // Other UI States
  highlightedProblemId: null,
  isNoteModalOpen: false,
  currentProblemForNote: null,
  isStarredViewOpen: false, 
  isRandomModalOpen: false,
  isStatsViewOpen: false,
  // Note: I've commented out the 'theme' state as you mentioned you removed that functionality.
  // If you re-add it, you can uncomment the line below and its related reducer/action.
  // theme: getInitialTheme(), 
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // --- Sidebar Actions ---
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    // The new universal toggle for the desktop collapse button
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    // --- Highlighting Actions ---
    setHighlightedProblem: (state, action) => {
      state.highlightedProblemId = action.payload;
    },
    clearHighlightedProblem: (state) => {
      state.highlightedProblemId = null;
    },

    // --- Notes Modal Actions ---
    openNoteModal: (state, action) => {
      state.isNoteModalOpen = true;
      state.currentProblemForNote = action.payload;
    },
    closeNoteModal: (state) => {
      state.isNoteModalOpen = false;
      state.currentProblemForNote = null;
    },

    // --- Overlay Toggle Actions ---
    toggleStarredView: (state) => {
      state.isStarredViewOpen = !state.isStarredViewOpen;
    },
    toggleStatsView: (state) => {
      state.isStatsViewOpen = !state.isStatsViewOpen;
    },

    // --- Random Modal Actions ---
    openRandomModal: (state) => {
      state.isRandomModalOpen = true;
    },
    closeRandomModal: (state) => {
      state.isRandomModalOpen = false;
    },

    // --- Theme Action (kept for future use) ---
    // setTheme: (state, action) => {
    //   state.theme = action.payload;
    // },
  },
});

// Export all the actions for use in your components
export const { 
  openSidebar, 
  closeSidebar, 
  toggleSidebar, // The new action
  setHighlightedProblem, 
  clearHighlightedProblem,
  openNoteModal, 
  closeNoteModal,
  toggleStarredView,
  openRandomModal, 
  closeRandomModal,
  toggleStatsView,
  // setTheme, // Keep this commented if you're not using the theme feature
} = uiSlice.actions;

export default uiSlice.reducer;