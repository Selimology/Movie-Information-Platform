import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './components/App';
import store from './app/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Change the theme color to match my needs
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '_______',
//     },
//   },
//   secondary: {
//     main: '_______',
//   },
// });

const theme = createTheme({});
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
