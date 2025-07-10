import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import movieReducer from './movieSlice';
import continueWatchingReducer from './continueWatchingSlice';
import favouriteReducer from './favouriteSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    movie: movieReducer,
    continueWatching: continueWatchingReducer,
    favourite: favouriteReducer,
  },
});

export default store;
