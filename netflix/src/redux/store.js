import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import movieReducer from './movieSlice';
import continueWatchingReducer from './continueWatchingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    movie: movieReducer,
    continueWatching: continueWatchingReducer,
  },
});

export default store;
