// src/features/notes/notesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Function to load notes from localStorage
const loadNotes = () => {
  try {
    const serializedState = localStorage.getItem('problemNotes');
    if (serializedState === null) return {}; // Return an empty object if nothing is saved
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load notes from localStorage", err);
    return {};
  }
};

const initialState = {
  notes: loadNotes(),
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    saveNote: (state, action) => {
      const { problemId, content } = action.payload;
      state.notes[problemId] = content;
      toast.success("Note saved successfully!");
    },
    deleteNote: (state, action) => {
      const { problemId } = action.payload;
      delete state.notes[problemId];
      toast.error("Note deleted.");
    },
  },
});

export const { saveNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;