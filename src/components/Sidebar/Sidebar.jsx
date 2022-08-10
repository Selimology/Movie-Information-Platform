/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Divider,
  CircularProgress,
  Box,
  List,
  ListItemText,
  ListSubheader,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const firstLogo = '/cinemalogored.png';
const secondLogo = '/cinemalogosblack.png';

function Sidebar({ setMobileOpen }) {
  const { data, isFetching } = useGetGenresQuery();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {/* Logo */}
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'dark' ? secondLogo : firstLogo}
          alt="Cinema Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={firstLogo}
                  classes={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="3rem" />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem onClick={() => {}} button>
                {/* <ListItemIcon>
                <img
                  src={firstLogo}
                  classes={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
}

export default Sidebar;
