import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
});

export default store;
