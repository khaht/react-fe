import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

// selector
const selector = (state) => state.home || INITIAL_STATE;

export const getStates = createSelector(selector, (home) => home);
