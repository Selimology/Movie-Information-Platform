import React, { useState } from 'react';
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
import {
  useGetSingleMovieQuery,
  useGetRecommendatedMoviesQuery,
} from '../../services/TMDB';
import { selectCategory } from '../../features/currentCategory';
import useStyles from './styles';
import MovieList from '../MovieList/MovieList';

function MovieInfo() {
  // useParams shall be on top!
  const { id } = useParams();
  const { data, isFetching, error } = useGetSingleMovieQuery(id);

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendatedMoviesQuery({
      movie_id: id,
      list: 'recommendations',
    });
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMovieFavorited = true;
  const isMovieWatchListed = true;
  const addToFavorite = () => {};
  const addToWatchList = () => {};
  const [open, setOpen] = useState(false);

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
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '1rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (cast, index) =>
                  cast.profile_path && (
                    <Grid
                      item
                      container
                      component={Link}
                      to={`/actors/${cast.id}`}
                      key={index}
                      xs={4}
                      md={2}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                        alt={cast.name}
                      />
                      <Typography color="textPrimary">{cast?.name}</Typography>
                      <Typography color="textSecondary">
                        {cast.character.split('/'[0])}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item style={{ marginTop: '2rem' }} container>
          <div className={classes.buttonsContainer}>
            <Grid className={classes.buttonContainer} item xs={12} sm={6}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid className={classes.buttonContainer} item xs={12} sm={6}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorite}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
                >
                  {isMovieWatchListed ? 'WatchList' : 'Add to watchlist'}
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    variant="subtitle2"
                    color="inherit"
                    style={{ textDecoration: 'none' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          You might like
        </Typography>
        {recommendations ? (
          <MovieList numberOfMovies={8} movies={recommendations} />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            Sorry no recommendation
          </Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        onClose={() => setOpen(false)}
        className={classes.modal}
        open={open}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            className={classes.video}
            frameBorder="0"
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
}

export default MovieInfo;
