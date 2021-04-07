import produce from 'immer';
import { GET_TOKEN, UPDATE_AUTH_USER, LOGOUT } from './constants';

// Reducer with initial state
export const INITIAL_STATE = {
  isAuthenticated: false,
  currentUser: {},
};

export const authReducer = produce((draft, { type, payload = {} }) => {
  switch (type) {
    case GET_TOKEN:
      draft['isAuthenticated'] = payload;
      break;
    case LOGOUT:
      draft['isAuthenticated'] = false;
      draft['currentUser'] = {};
      break;
    case UPDATE_AUTH_USER:
      const { isAuthenticated = false, currentUser = {} } = payload;
      draft['isAuthenticated'] = isAuthenticated;
      draft['currentUser'] = currentUser;
      break;
  }
}, INITIAL_STATE);
