import NotFoundPage from 'modules/NotFoundPage';
/**
 * Lists the modules available in the project
 * Modules exist in modules and in modules/*
 * then the routes in the config itself will be imported
 * Else if there is in modules but not in modules/*
 * will be ignored
 */
const modules = ['Home', 'Auth', 'NotImplement'];

const importRoutes = (moduleNm) => {
  try {
    return require(`modules/${moduleNm}/config/routes`);
  } catch (error) {
    return { default: [] };
  }
};

export const loadRoutes = async () => {
  let routes = [];
  const componentPromises = modules.map((moduleNm) => {
    return importRoutes(moduleNm);
  });
  const arrPromise = await Promise.all(componentPromises);
  if (arrPromise.length) {
    arrPromise.forEach((route) => {
      const { default: configRoute = [] } = route;
      if (configRoute.length) {
        routes = routes.concat(configRoute);
      }
    });
  }
  return routes.concat({ path: '*', component: NotFoundPage, exact: false, meta: { requiredAuth: false } });
};
