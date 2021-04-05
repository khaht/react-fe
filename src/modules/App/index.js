import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </>
  );
}

export default App;
