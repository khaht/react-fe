import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
// createStore allows us to load/unload modules dynamically.
import { createStore } from 'redux-dynamic-modules-core';
// Saga extension allows us to use Saga middleware in the module store.
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { globalModule } from './reducers';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [getSagaExtension(), routeMiddleware];

export default function configureStore(initialState) {
  const store = createStore(
    {
      initialState,
      enhancements: [offline(offlineConfig)],
      extensions: middlewares,
    },
    globalModule(),
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(reducers);
  //   });
  // }
  return store;
}
export { history };
