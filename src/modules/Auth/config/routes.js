import Login from 'modules/Auth/Login/loadable';

const routes = [
  {
    component: Login,
    path: '/login',
    exact: true,
    meta: {
      requiredAuth: false,
    },
  },
];
export default routes;
