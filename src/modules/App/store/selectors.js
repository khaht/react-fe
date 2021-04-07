import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

// selector
const selector = (state) => state.app || INITIAL_STATE;

export const getStates = createSelector(selector, (state) => state);
