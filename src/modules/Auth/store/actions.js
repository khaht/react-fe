import { GET_TOKEN } from './constants';

export const actGetToken = (payload = {}, meta = {}) => {
  return {
    type: GET_TOKEN,
    payload,
  };
};
