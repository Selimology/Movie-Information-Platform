import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Actors from './Actors/Actors';
import Movies from './Movies/Movies';
import MovieInfo from './MovieInfo/MovieInfo';
import NavigationBar from './NavigationBar/NavigationBar';
import Profile from './Profile/Profile';

function App() {
  return (
    <div>
      <CssBaseline />
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
