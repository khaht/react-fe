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

const importModules = (moduleNm) => {
  try {
    return require(`modules/${moduleNm}/store/module`);
  } catch (error) {
    return { notFound: {} };
  }
};

export default function configureStore(initialState) {
  const authModule = importModules('Auth');
  const modules = [globalModule()];
  if (authModule.default) {
    modules.push(authModule.default());
  }
  const store = createStore(
    {
      initialState,
      enhancements: [offline(offlineConfig)],
      extensions: middlewares,
    },
    ...modules,
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
