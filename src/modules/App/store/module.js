import { appReducer } from './reducer';

export function getAuthModule() {
  return {
    // Unique id of the module
    id: 'app',
    // Maps the Store key to the reducer
    reducerMap: {
      app: appReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the module
    sagas: [],
  };
}
