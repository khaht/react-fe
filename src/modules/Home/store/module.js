import { homeReducer } from './reducers';
import homeSaga from './sagas';

export function getHomeModule() {
  return {
    // Unique id of the module
    id: 'home',
    // Maps the Store key to the reducer
    reducerMap: {
      homeState: homeReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [homeSaga],
  };
}
