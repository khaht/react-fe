import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

/**
 * Direct selector to the language domain
 */

const selectLanguage = (state) => state.language || INITIAL_STATE;

/**
 * Select the language locale
 */

const makeSelectLocale = createSelector(selectLanguage, (languageState) => languageState);

export { selectLanguage, makeSelectLocale };
