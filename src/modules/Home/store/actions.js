import { GET_HOME_SUCCESS } from './constants';

export const actGetHome = (payload = {}, meta = {}) => {
  return {
    type: GET_HOME_SUCCESS,
    payload,
  };
};
