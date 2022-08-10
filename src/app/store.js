import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import categoryReducer from '../features/currentCategory';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentCategory: categoryReducer,
  },
});

export default store;
