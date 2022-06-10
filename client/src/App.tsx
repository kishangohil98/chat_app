import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RoutesComponent } from './Routes/RoutesComponent';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './Theme/index';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { store } from './Store/store';
import 'react-perfect-scrollbar/dist/css/styles.css';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => getTheme({ darkMode: prefersDarkMode }), [prefersDarkMode]);
  console.log(theme);

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
};

export default App;
