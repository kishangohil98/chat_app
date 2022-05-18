import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesComponent } from './Routes/RoutesComponent';

const App = () => (
  <Router>
    <RoutesComponent />
  </Router>
);

export default App;
