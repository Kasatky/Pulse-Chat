import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App/App';
import store from './store';


// адаптов для айфона
const iPhoneInput = {
  styleOverrides: {
    root: {
      "*": {
        "-webkit-user-select": "text !important" /* Chrome, Opera, Safari */,
        "-moz-user-select": "text !important" /* Firefox 2+ */,
        "-ms-user-select": "text !important" /* IE 10+ */,
        "user-select": "text !important" /* Standard syntax */,
      },
    },
  },
};

const mainTheme = createTheme({
  components: {
    MuiTextField: iPhoneInput,
    MuiInput: iPhoneInput,
    MuiFilledInput: iPhoneInput,
    MuiOutlinedInput: iPhoneInput,
  },
  palette: {
    primary: {
      main: '#296EFF',
      light: '#000000',
    },
    
    secondary: {
      main: '#1E1F25',
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
      'Mada',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  // breakpoints: {
  //   values: {
  //     xs: 0, // phone
  //     sm: 300, // tablets
  //     md: 600, // small laptop
  //     lg: 900, // desktop
  //     xl: 1536, // large screens
  //   },
  // },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
