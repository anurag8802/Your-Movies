import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: JSON.parse(localStorage.getItem('favouriteMovies') || '[]')
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      if (!state.movies.find(m => m.id === action.payload.id)) {
        state.movies.push(action.payload);
        localStorage.setItem('favouriteMovies', JSON.stringify(state.movies));
      }
    },
    removeFromFavourite: (state, action) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
      localStorage.setItem('favouriteMovies', JSON.stringify(state.movies));
    },
    toggleFavourite: (state, action) => {
      const exists = state.movies.find(m => m.id === action.payload.id);
      if (exists) {
        state.movies = state.movies.filter(m => m.id !== action.payload.id);
      } else {
        state.movies.push(action.payload);
      }
      localStorage.setItem('favouriteMovies', JSON.stringify(state.movies));
    }
  }
});

export const { addToFavourite, removeFromFavourite, toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer; 