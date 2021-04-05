import { routerReducer } from 'react-router-redux';

export function globalModule() {
  return {
    id: 'routing',
    reducerMap: {
      routing: routerReducer,
    },
  };
}
