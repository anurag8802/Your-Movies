import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: JSON.parse(localStorage.getItem('continueWatching') || '[]')
};

const continueWatchingSlice = createSlice({
  name: 'continueWatching',
  initialState,
  reducers: {
    addToContinueWatching: (state, action) => {
        state.movies = state.movies.filter(m => m.id !== action.payload.id);
        state.movies.unshift(action.payload); // Add to front
        if (state.movies.length > 10) {
          state.movies.pop(); // Remove last
        }
      },
    setContinueWatching: (state, action) => {
      state.movies = action.payload;
    },
    removeFromContinueWatching: (state, action) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
    }
  }
});

export const { addToContinueWatching, setContinueWatching, removeFromContinueWatching } = continueWatchingSlice.actions;
export default continueWatchingSlice.reducer;