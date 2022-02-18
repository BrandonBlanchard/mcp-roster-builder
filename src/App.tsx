import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'microns/fonts/microns.css';
import React from 'react';
import './App.css';
import { RosterBuilderApp } from './components/roster-builder';
import { ApplicationProvider } from './state/application-context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <ApplicationProvider>
      <div className="App">
        <RosterBuilderApp />
      </div>
    </ApplicationProvider>
  </ThemeProvider>
);

export default App;
