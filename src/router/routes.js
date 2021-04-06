import Home from 'modules/Home';
import Layout from 'core/components/Layout';
import NotFound from 'modules/NotFoundPage';

export const routes = [
  {
    component: NotFound,
    path: '/login',
    exact: true,
    meta: {
      requiredAuth: false,
      layout: Layout,
    },
  },
  {
    component: Home,
    path: '/',
    exact: true,
    meta: {
      requiredAuth: true,
      layout: Layout,
    },
  },
];
