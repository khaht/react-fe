import { intlReducer } from './reducer';

export function getIntlModule() {
  return {
    // Unique id of the module
    id: 'intlModule',
    // Maps the Store key to the reducer
    reducerMap: {
      language: intlReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [],
  };
}
