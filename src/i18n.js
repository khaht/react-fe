/* eslint-disable operator-linebreak */
/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
require('@formatjs/intl-pluralrules/polyfill');
require('@formatjs/intl-pluralrules/locale-data/de'); // Add locale data for de

require('@formatjs/intl-relativetimeformat/polyfill');
require('@formatjs/intl-relativetimeformat/locale-data/de'); // Add locale data for de

const enTranslationMessages = require('./locales/en_US/index.json');
const jaTranslationMessages = require('./locales/ja_JP/index.json');
const zhTranslationMessages = require('./locales/zh_TW/index.json');

const DEFAULT_LOCALE = 'en';

// prettier-ignore
const appLocales = [
  'en',
  'ja',
  'zh',
];

const appLocaleMap = {
  en: 'en_US',
  ja: 'ja_JP',
  zh: 'zh_TW',
};

const appLocalesOptions = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ja',
    label: '日本語',
  },
  {
    value: 'zh',
    label: '中国語',
  },
];

const formatTranslationMessages = (locale, messages) => {
  const vifaultFormattedMessages =
    // eslint-disable-next-line max-len
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? vifaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

exports.appLocales = appLocales;
exports.appLocaleMap = appLocaleMap;
exports.appLocalesOptions = appLocalesOptions;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
