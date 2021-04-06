/* eslint-disable react/jsx-boolean-value */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../router';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const { isAuthenticated = false } = useSelector((state) => (state.auth ? state.auth : {}));
  const renderRoutesApp = (isAuth) => <Routes {...props} isAuth={isAuth} />;
  const memorizedRoutes = useMemo(() => renderRoutesApp(isAuthenticated), [isAuthenticated]);

  return (
    <>
      <Router>{memorizedRoutes}</Router>
    </>
  );
}

export default App;
