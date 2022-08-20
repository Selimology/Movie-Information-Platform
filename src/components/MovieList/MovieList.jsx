import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

function MovieList({ movies, numberOfMovies }) {
  const classes = useStyles();

  return (
    <Grid className={classes.moviesContainer} container>
      {movies.results.slice(0, numberOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </Grid>
  );
}

export default MovieList;
