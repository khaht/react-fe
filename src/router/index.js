import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import BlankLayout from 'core/components/BlankLayout';
import { loadRoutes } from './routes';

const PrivateRoute = (props) => {
  const { component: Component, layout: LayoutComponent, isAuth, ...rest } = props;
  const render = (props) => {
    if (!isAuth) {
      return <Redirect to="/login" component={Component} />;
    }
    return <Component {...props} />;
  };
  return (
    <LayoutComponent {...rest}>
      <Route {...rest} render={render} />
    </LayoutComponent>
  );
};

const PublicRoute = (props) => {
  const { component: Component, layout: LayoutComponent, ...rest } = props;
  const render = (props) => {
    return <Component {...props} />;
  };
  return (
    <LayoutComponent>
      <Route {...rest} render={render} />
    </LayoutComponent>
  );
};

const AppRouter = ({ isAuth = false }) => {
  const availableRoutes = [];
  const [routes, setRoutes] = useState([]);
  useEffect(async () => {
    const routes = await loadRoutes();
    setRoutes(routes);
  }, []);

  routes.forEach((route, idx) => {
    const {
      meta: { layout = undefined },
    } = route;
    let LayoutComponent = layout;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!!layout) {
      LayoutComponent = BlankLayout;
    }
    if (!route.meta.requiredAuth) {
      availableRoutes.push(
        <PublicRoute
          layout={LayoutComponent}
          key={idx}
          component={route.component}
          path={route.path}
          exact={route.exact}
        />,
      );
    } else {
      availableRoutes.push(
        <PrivateRoute
          key={idx}
          component={route.component}
          path={route.path}
          exact={route.exact}
          layout={LayoutComponent}
          isAuth={isAuth}
        />,
      );
    }
  });
  return <Switch>{availableRoutes}</Switch>;
};

export default AppRouter;
