/* eslint-disable react/jsx-boolean-value */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'core/components/Layout';
import Routes from '../../router';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const { isAuthenticated = false } = useSelector((state) => (state.auth ? state.auth : {}));

  const renderRoutesAuth = (isAuth) => {
    return (
      isAuth && (
        <Layout>
          <Switch>
            <Routes layout={true} />
          </Switch>
        </Layout>
      )
    );
  };
  const memorizedRoutesAuth = useMemo(() => renderRoutesAuth(isAuthenticated), [isAuthenticated]);

  return (
    <>
      <Router>
        <Routes {...props} isAuth={isAuthenticated} />
      </Router>
    </>
  );
}

export default App;
