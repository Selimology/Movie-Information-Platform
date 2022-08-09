import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import useStyles from './styles';

function Movie({ movie, index }) {
  const classes = useStyles();

  console.log(movie, index);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.movie}>
      <Typography variant="h6" className={classes.movieTitle}>
        {movie.title}
      </Typography>
    </Grid>
  );
}

export default Movie;
