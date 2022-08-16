import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';

function Profile() {
  const favoriteMovies = [];
  const { user } = useSelector(userSelector);
  const logout = () => {
    localStorage.clear();

    // reload the page
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Sign Out & <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? (
        <Typography variant="h5">Add favorites or watch movies</Typography>
      ) : (
        <Box>Favorite Movies</Box>
      )}
    </Box>
  );
}

export default Profile;
