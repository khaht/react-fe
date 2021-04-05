import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from './routes';

const Routes = () => {
  const routeComponent = routes.map((route, index) => {
    return <Route key={index} exact={route.exact} path={route.path} component={route.component} />;
  });
  return routeComponent;
};

export default Routes;
