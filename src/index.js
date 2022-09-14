import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./App.css"
/*import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";

let themeOptions = createTheme({
  palette: {
    type: "main",
    primary: {
      main: "#9883f0",
    },
    secondary: {
      main: "#5280ea",
      //contrastText: "#fff",
    },
    background: {
      default: "#00264D",
    },
  },
  typography: {
    fontFamily: "Helvatica",
  },
});*/

//themeOptions = responsiveFontSizes(themeOptions);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
