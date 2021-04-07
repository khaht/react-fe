import { CHANGE_LOADING } from './constants';

export const actChangeLoading = (isLoading) => {
  return {
    type: CHANGE_LOADING,
    payload: isLoading,
  };
};
