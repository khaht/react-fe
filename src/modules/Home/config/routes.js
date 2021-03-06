import Home from 'modules/Home';
import Layout from 'core/components/Layout';

const routes = [
  {
    component: Home,
    path: '/',
    exact: true,
    meta: {
      requiredAuth: false,
      layout: Layout,
    },
  },
];
export default routes;
