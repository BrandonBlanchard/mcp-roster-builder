import React from 'react';
import './App.css';
import { RosterBuilderApp } from './components/roster-builder';
import 'microns/fonts/microns.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApplicationProvider>
        <div className="App">
          <RosterBuilderApp />
        </div>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default App;
