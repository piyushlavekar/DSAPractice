// src/features/search/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Action to update the search query based on user input
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    // Action to store the filtered search results
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    // Action to clear the search query and results (e.g., after selecting an item)
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
    },
  },
});

export const { setSearchQuery, setSearchResults, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;