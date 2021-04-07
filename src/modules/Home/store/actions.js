import { GET_HOME_SUCCESS } from './constants';

export const actGetHome = (payload = {}) => {
  return {
    type: GET_HOME_SUCCESS,
    payload,
  };
};
