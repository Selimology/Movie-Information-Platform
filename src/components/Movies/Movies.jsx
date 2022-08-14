import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { selectCategory } from '../../features/currentCategory';

function Movies() {
  const [page, setPage] = useState(1);
  const { categoryName, searchQuery } = useSelector(
    (state) => state.currentCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    categoryName,
    page,
    searchQuery,
  });
  console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="3rem" />
      </Box>
    );
  }
  // if movies don't exist
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="16px">
        <Typography variant="h4">
          No movies found
          <br />
          Search for something else
        </Typography>
      </Box>
    );
  }

  // obscure error message
  if (error) {
    return 'Error fetching movies';
  }
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
}

export default Movies;
