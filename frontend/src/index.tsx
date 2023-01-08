import React from 'react';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App/App';
import store from './store';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#43388b',
      light: '#000000',
    },
    secondary: {
      main: '#2e2575',
    },
    error: {
      main: '#b71c1c',
    },
    warning: {
      main: '#ffd740',
    },
    divider: '#edf5e1',
    background: {
      default: '#f7f7f7',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    body1: {
      fontSize: '1.2rem',
    },
    fontFamily: [
      'Poppins',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ScopedCssBaseline>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </ScopedCssBaseline>
  </Provider>
);
