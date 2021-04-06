import produce from 'immer';
import { GET_TOKEN } from './constants';

// Reducer with initial state
export const INITIAL_STATE = {
  isAuthenticated: false,
  profile: {},
};

export const authReducer = produce((draft, { type, payload = {}, meta = {} }) => {
  switch (type) {
    case GET_TOKEN:
      draft['isAuthenticated'] = payload;
      break;
  }
}, INITIAL_STATE);
