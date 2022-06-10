import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { RoutesComponent } from './Routes/RoutesComponent';
import { getTheme } from './Theme/index';
import { store } from './Store/store';
import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => getTheme({ darkMode: prefersDarkMode }), [prefersDarkMode]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <RoutesComponent />
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
