import produce from 'immer';
import { CHANGE_LOADING } from './constants';

// Reducer with initial state
export const INITIAL_STATE = {
  loading: false,
};

export const appReducer = produce((draft, { type, payload = {} }) => {
  switch (type) {
    case CHANGE_LOADING:
      draft['loading'] = payload;
      break;
  }
}, INITIAL_STATE);
