import React from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Remove,
  ArrowBack,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useGetSingleMovieQuery } from '../../services/TMDB';
import { selectCategory } from '../../features/currentCategory';
import useStyles from './styles';

function MovieInfo() {
  // useParams shall be on top!
  const { id } = useParams();
  const { data, isFetching, error } = useGetSingleMovieQuery(id);
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="6rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">There is an error.</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.spaceAroundContainer}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.moviePoster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}
          `}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h4" gutterBottom align="center">
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.spaceAroundContainer}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '20px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min{' '}
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genreContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectCategory(genre.id))}
            >
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieInfo;
