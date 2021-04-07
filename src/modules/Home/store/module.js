import { homeReducer } from './reducer';
import homeSaga from './sagas';

export default function getHomeModule() {
  return {
    // Unique id of the module
    id: 'home',
    // Maps the Store key to the reducer
    reducerMap: {
      home: homeReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [homeSaga],
  };
}
