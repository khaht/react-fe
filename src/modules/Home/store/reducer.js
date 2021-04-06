import produce from 'immer';
import { GET_HOME_SUCCESS } from './constants';

// Reducer with initial state
export const INITIAL_STATE = {
  data: 'test',
  data1: '123',
};

export const homeReducer = produce((draft, { type, payload = {}, meta = {} }) => {
  switch (type) {
    case GET_HOME_SUCCESS:
      draft['data'] = payload;
      break;
  }
}, INITIAL_STATE);
