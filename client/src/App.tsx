import React from 'react';
import './App.css';
import { RoutesComponent } from './Routes/RoutesComponent';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RoutesComponent />
      </Router>
    </>
  );
}

export default App;
