import { authReducer } from './reducer';
import authSaga from './sagas';

export function getAuthModule() {
  return {
    // Unique id of the module
    id: 'auth',
    // Maps the Store key to the reducer
    reducerMap: {
      auth: authReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [authSaga],
  };
}
