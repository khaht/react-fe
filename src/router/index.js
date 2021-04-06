import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import BlankLayout from 'core/components/BlankLayout';
import { routes } from './routes';

const PrivateRoute = (props) => {
  const { component: Component, isAuth, ...rest } = props;
  const render = (props) => {
    if (!isAuth) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };
  return <Route {...rest} render={render} />;
};

const AppRouter = ({ isAuth = false, ...rest }) => {
  const respRoutes = routes.map((route, index) => {
    const {
      meta: { layout = undefined },
    } = route;
    let LayoutComponent = layout;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!!layout) {
      LayoutComponent = BlankLayout;
    }
    if (route.meta.requiredAuth) {
      return (
        <LayoutComponent key={index} {...rest}>
          <PrivateRoute
            component={route.component}
            to={route.path}
            layout={route.meta.layout ? route.meta.layout : undefined}
            exact={route.exact}
            isAuth={isAuth}
          />
        </LayoutComponent>
      );
    }
    return (
      <LayoutComponent key={index}>
        <Route component={route.component} to={route.path} exact={route.exact} key={index} />
      </LayoutComponent>
    );
  });
  return <Switch>{respRoutes}</Switch>;
};

export default AppRouter;
