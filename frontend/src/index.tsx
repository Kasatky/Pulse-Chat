import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App/App';
import store from './store';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#000000',
    },
    secondary: {
      main: '#7d2e79',
    },
    error: {
      main: '#c62828',
    },
    warning: {
      main: '#fbc02d',
    },
    divider: '#edf5e1',
    background: {
      default: '#efecf5',
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
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <App />
    </ThemeProvider>
  </Provider>
);
