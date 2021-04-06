import NotFoundPage from 'modules/NotFoundPage';
/**
 * liệt kê ra các module có thể có trong project
 * những module có tồn tại trong modules và trong modules/*
 * thì các routes trong config của chính nó sẽ được import vào
 * ngược lại nếu trong modules có mà trong modules/* không có
 * thì sẽ được bỏ qua
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
