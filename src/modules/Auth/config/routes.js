import Auth from 'modules/Auth';
import Layout from 'core/components/Layout';

const routes = [
  {
    component: Auth,
    path: '/login',
    exact: true,
    meta: {
      requiredAuth: false,
      layout: Layout,
    },
  },
];
export default routes;
