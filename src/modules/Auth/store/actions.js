import { GET_TOKEN, UPDATE_AUTH_USER, GET_CURRENT_USER, LOGIN, LOGOUT } from './constants';

export const actGetToken = (payload = {}) => {
  return {
    type: GET_TOKEN,
    payload,
  };
};

export const actGetCurrentUser = (payload = {}) => {
  return {
    type: GET_CURRENT_USER,
    payload,
  };
};

export const actLogin = (payload = {}) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const actLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const actUpdateAuthUser = (payload = {}) => {
  return {
    type: UPDATE_AUTH_USER,
    payload,
  };
};
