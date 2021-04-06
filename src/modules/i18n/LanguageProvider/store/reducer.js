/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../i18n';

export const INITIAL_STATE = {
  locale: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
export const intlReducer = produce((draft, action) => {
  const { type } = action;
  switch (type) {
    case CHANGE_LOCALE:
      draft.locale = action.locale;
      break;
  }
}, INITIAL_STATE);
