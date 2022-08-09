// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// dummy info
const page = 1;

// Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

// hook is created since query is created with createApi
// format is {use} + service name + endpoint name
export const { useGetMoviesQuery } = tmdbApi;
